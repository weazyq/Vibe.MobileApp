import { View, Text, StyleSheet, StyleProp, TextStyle, Pressable } from "react-native"
import { Colors, containerStyles } from "../../styles/styles"
import Typography from "../../components/typography/typography"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import Button from "../../components/buttons/button"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import SupportRequestProvider from "../../domain/supportrequests/supportRequestsProvider"
import { SupportRequest } from "../../domain/supportrequests/supportRequest"

function Help() {
  
  const titles = ["Актуальные вопросы", "Как арендовать самокат?", "Как припарковать самокат?", "Можно-ли передвигаться вдвоём?", "Что делать если я повредил самокат?"]
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([])
  
  useEffect(() => {
    loadSupportRequests()
  }, [])

  function handleCreateSupportRequestClick(){
    router.push('/support/createSupportRequest')
  }

  function handleSupportRequestClick(id: string){
    router.push(`/support/${id}`)
  }

  const styles = StyleSheet.create({
    supportRequestList: {
      marginTop: 20,
      borderRadius: 5,
      gap: 5,
      backgroundColor: 'white',
      ...containerStyles.flex
    }
  })
  
  return (
    <View style={[containerStyles.fullHeight, containerStyles.fullWidth, containerStyles.flexColumn,  
    { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 50 }]}>
        <View>
          <Typography text="Полезные ссылки:" variant="h3" sx={{fontWeight: 'bold', marginBottom: 10}}/>

          <View style={[containerStyles.fullWidth, {
            backgroundColor: '#eee'
          }]}>
            {titles.map((t, index) => renderQuestion(t, index))}
          </View>
        </View>

        <View style={{marginTop: 30}}>
          <Typography text="Возникли сложности?" variant="h4"/>
          <Typography text="Наша опытная поддержка поможет!" variant="h4"/>
        </View>

        <View style={[containerStyles.spaceBetween, {marginTop: 50}]}>
          <Typography text="Ваши обращения" variant="h3" sx={{fontWeight: 'bold'}}/>
          <Button label="+ Создать заявку" size="medium" onClick={handleCreateSupportRequestClick}/>
        </View>
        
        <View style={styles.supportRequestList}>
          {supportRequests.map(request => renderSupportRequest(request))}
        </View>
    </View>
  )

  function renderSupportRequest(request: SupportRequest): JSX.Element {
    const style = StyleSheet.create({
      container: {
        marginTop: 5,
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.disabledText,
        position: 'relative',
        width: '100%',
      }
    })

    function renderSupportRequestStatus(isClosed: boolean): JSX.Element {
      return (
        <>
          {isClosed
            ? <Icon name="lock" size={15} style={{position: 'absolute', right: 3, top: 3}}/>
            : <Icon name="lock-open" size={15} style={{position: 'absolute', right: 3, top: 3}}/>
          }
        </>
      )    
    }

    return (
      <Pressable key={request.id} style={style.container} onPress={() => handleSupportRequestClick(request.id)}>
        <View>
          <Typography text={`Обращение от ${request.openedAt.toLocaleDateString()}`}/>
          {renderSupportRequestStatus(request.isClosed)}
          <Typography text={request.title}/>
        </View>
      </Pressable>
    )
  }

  async function loadSupportRequests() {
    const supportRequests = await SupportRequestProvider.list()
    setSupportRequests(supportRequests)
  }
}

function renderQuestion(title: string, index: number){
  return <View key={index} style={[containerStyles.spaceBetween, {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#BCBCBC'
  }]}>
    <Typography variant="h4" text={title}/>
    <Icon name="arrow-right-thin" size={28} color={Colors.secondary.light}/>
  </View>
}

export default Help