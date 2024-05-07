import { View, Text } from "react-native"
import { Colors, containerStyles } from "../../styles/styles"
import Typography from "../../components/typography/typography"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

function Help() {
  
  const titles = ["Актуальные вопросы", "Как аредновать самокат?", "Как припарковать самокат?", "Можно-ли передвигаться вдвоём?", "Что делать если я повредил самокат?"]

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
  
  return (
    <View style={[containerStyles.fullHeight, containerStyles.fullWidth, containerStyles.flexColumn,  
    { paddingHorizontal: 20, paddingBottom: 20, paddingTop: 50 }]}>
        <View>
          <Typography text="Полезные ссылки:" variant="h3" style={{fontWeight: 'bold', marginBottom: 10}}/>

          <View style={[containerStyles.fullWidth, {
            backgroundColor: '#eee'
          }]}>
            {titles.map((t, index) => renderQuestion(t, index))}
          </View>
        </View>

        <View style={{marginTop: 50}}>
          <Typography text="Возникли сложности?" variant="h4"/>
          <Typography text="Наша опытная поддержка поможет!" variant="h4"/>
        </View>

        <Typography text="Ваши обращения" variant="h3" style={{fontWeight: 'bold', marginTop: 50}}/>
        <Typography text="В разработке" variant="h3" style={{textAlign: 'center', marginTop: 80}}/>
    </View>
  )
}

export default Help