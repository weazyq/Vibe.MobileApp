import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native';
import { SupportRequestDetail } from '../../domain/supportrequests/supportRequestDetail';
import SupportRequestProvider from '../../domain/supportrequests/supportRequestsProvider';
import { SupportMessage, mapToSupportMessage } from '../../domain/supportrequests/messages/supportMessage';
import { Colors, containerStyles } from '../../styles/styles';
import Typography from '../../components/typography/typography';
import Input from '../../components/inputs/input';
import Button from '../../components/buttons/button';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SupportMessageDTO } from '../../domain/supportrequests/messages/supportMessageDTO';
import Constants from '../../constants/constants';

function SupportRequestChat() {
    const {id} = useLocalSearchParams();
    const [supportRequest, setSupportRequest] = useState<SupportRequestDetail | null>(null)
    const [messages, setMessages] = useState<SupportMessage[]>([])
    const [message, setMessage] = useState<string>('')
    const [connection, setConnection] = useState<HubConnection | null>(null)

    const joinChat = async() => {
        const connection = new HubConnectionBuilder()
            .withUrl(`${Constants.serverUrl}/SupportRequestChat`, {
                headers: {
                    "ngrok-skip-browser-warning": "1"
                }
            })
            .withAutomaticReconnect()
            .build();

        const clientId = await AsyncStorage.getItem('clientId')
            
        connection.on("ReceiveMessage", (message: SupportMessage) => {
            const mappedMessage = mapToSupportMessage(message)
            setMessages((messages) => [...messages, mappedMessage])
        })

        try {
            await connection.start();
            await connection.invoke("JoinChat", {supportRequestId: supportRequest.id, userId: clientId})
            setConnection(connection)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadSupportRequestDetail(id as string)
    }, [])

    useEffect(() => {
        if(supportRequest == null) return
        joinChat()
    }, [supportRequest])

    function handleChangeMessage(message: string){
        setMessage(message)
    }

    async function handleSaveMessage(){
        const messageDTO = new SupportMessageDTO(message, supportRequest.id)
        const response = await SupportRequestProvider.saveSupportMessage(messageDTO)
        if(!response.isSuccess) return 

        setMessage('')
    }

    return (
        <View style={[containerStyles.fullHeight, containerStyles.spaceBetween, containerStyles.flexColumn, {padding: 20}]}>
            {supportRequest != null &&
                <View>
                    <View style={{ backgroundColor: "white", borderRadius: 5, padding: 10 }}>
                        <Typography text={supportRequest.title}/>
                        <Typography text={supportRequest.description}/>
                    </View>

                    {messages.map(message => renderMessage(message))}
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
        const isClientMessage = supportRequest.client.id === message.createdBy
        
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
                justifyContent: 'flex-end',
            }

        return (
            <View key={message.id} style={[baseMessageStyle, messageStyle]}>
                <Typography text={message.text} gutterBottom sx={{
                    color: isClientMessage 
                        ? 'white'
                        : 'black'
                    }}/>
                <View style={{position: 'absolute', bottom: 2, right: 5}}>
                    <Typography text={message.createdAt.toLocaleTimeString()} sx={{color: isClientMessage 
                        ? 'white'
                        : 'black'
                    }}/>
                </View>
            </View>
        )
    }

    async function loadSupportRequestDetail(requestId: string) {
        const supportRequestDetail: SupportRequestDetail | null = await SupportRequestProvider.get(requestId)
        if(supportRequestDetail == null) return

        setSupportRequest(supportRequestDetail)
        setMessages(supportRequestDetail.messages)
    }
}

export default SupportRequestChat