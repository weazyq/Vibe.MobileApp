import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native';
import { SupportRequestDetail } from '../../domain/supportrequests/supportRequestDetail';
import SupportRequestProvider from '../../domain/supportrequests/supportRequestsProvider';
import { SupportMessage } from '../../domain/supportrequests/messages/supportMessage';
import { Colors, containerStyles } from '../../styles/styles';
import Typography from '../../components/typography/typography';
import Input from '../../components/inputs/input';
import Button from '../../components/buttons/button';
import { SupportMessageDTO } from '../../domain/supportrequests/messages/supportMessageDTO';

function SupportRequest() {
    const {id} = useLocalSearchParams();
    const [supportRequestDetail, setSupportRequestDetail] = useState<SupportRequestDetail | null>(null)    
    const [message, setMessage] = useState<string>('')

    useEffect(() => {
        loadSupportRequestDetail(id as string)
    }, [])

    function handleChangeMessage(message: string){
        setMessage(message)
    }

    async function handleSaveMessage(){
        const messageDTO = new SupportMessageDTO(message, supportRequestDetail.id)
        const response = await SupportRequestProvider.saveSupportMessage(messageDTO)
        if(!response.isSuccess) return 

        setMessage('')
    }

    return (
        <View style={[containerStyles.fullHeight, containerStyles.spaceBetween, containerStyles.flexColumn, {padding: 20}]}>
            {supportRequestDetail != null &&
                <View>
                    <View style={{ backgroundColor: "white", borderRadius: 5, padding: 10 }}>
                        <Typography text={supportRequestDetail.title}/>
                        <Typography text={supportRequestDetail.description}/>
                    </View>

                    {supportRequestDetail.messages.map(message => renderMessage(message))}
                </View>
            }

            <View style={[containerStyles.flex, {alignItems: 'flex-start', gap: 5}]}>
                <Input type="text" maxLength={200} value={message} onChange={handleChangeMessage} sx={{width: '80%'}}/>
                <Button 
                    disabled={message?.length === 0}
                    label='Отправить' 
                    size="medium" 
                    onClick={handleSaveMessage}
                />
            </View>
        </View>
    )

    function renderMessage(message: SupportMessage){
        const isClientMessage = supportRequestDetail.clientId === message.createdBy
        
        const baseMessageStyle: StyleProp<ViewStyle> = {
            display: 'flex',
            position: 'relative',
            maxWidth: '80%',
            marginTop: 10,
            padding: 10,
            borderRadius: 10,
        }

        const messageStyle: StyleProp<ViewStyle> = isClientMessage 
            ? {
                backgroundColor: Colors.primary.light,
                justifyContent: 'flex-start'
            }
            : {
                backgroundColor: 'white',
                justifyContent: 'flex-end'
            }

        return (
            <View key={message.id} style={[baseMessageStyle, messageStyle]}>
                <Typography text={message.text} sx={{color: 'white'}}/>
                <View style={{position: 'absolute', bottom: 2, right: 5}}>
                    <Typography text={message.createdAt.toLocaleTimeString()} sx={{color: 'white'}}/>
                </View>
            </View>
        )
    }

    async function loadSupportRequestDetail(requestId: string) {
        const supportRequestDetail: SupportRequestDetail | null = await SupportRequestProvider.get(requestId)
        if(supportRequestDetail == null) return

        setSupportRequestDetail(supportRequestDetail)
    }
}

export default SupportRequest