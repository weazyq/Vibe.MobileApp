import { View } from "react-native"
import { containerStyles, modalStyles } from "../../styles/styles"
import Typography from "../typography/typography"
import Divider from "../dividers/divider"
import { StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

interface ModalProps{
  isOpen: boolean
  title: string
  bodyText?: string
  actionsContent?: JSX.Element
  onClose: () => void
}

function ModalDialog(props: ModalProps) {

  if(props.isOpen = false) return

  const modalDialogStyles = StyleSheet.create({
    baseStyles: modalStyles.modalBase,
    dialogStyles: {
      backgroundColor: '#fff',
      width: '100%',
      padding: 20
    }
  })

  return (
    <View style={[modalDialogStyles.baseStyles, modalDialogStyles.dialogStyles]}>
      <View style={{marginBottom: 20}}>
        <View style={[containerStyles.spaceBetween, containerStyles.alignItemsCenter]}>
          <Typography text={props.title} variant="h4" gutterBottom/>
          <Icon name="close" size={32} onPress={props.onClose}/>
        </View>
        <Divider/>
      </View>

      {props.bodyText != null &&
        <View>
          <Typography text={props.bodyText}/>
        </View>
      }

      <View style={[containerStyles.flex, {marginTop: 10, gap: 10}]}>
        {props.actionsContent}
      </View>
    </View>
  )
}

export default ModalDialog