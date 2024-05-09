import { View, Text, StyleSheet } from "react-native"
import { Colors, containerStyles, textStyles } from "../../styles/styles"
import PhoneCodeInput from "../../components/inputs/phoneCodeInput/phoneCodeInput"
import { useEffect, useState } from "react"
import { ClientProvider } from "../../domain/clients/clientProvider"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"
import { useLoginPage } from "../../contexts/loginContext"
import { useLocalSearchParams } from "expo-router"
import { LoginResultDTO } from "../../domain/infrastructure/loginResultDTO"
import Timer from "../../components/timer"
import Typography from "../../components/typography/typography"
import Button from "../../components/buttons/button"

function CheckSmsPage() {
    const { isAuthorize } = useLocalSearchParams()
    const { clientBlank } = useLoginPage()

    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isShowTimer, setIsShowTimer] = useState<boolean>(false)
    const [isCanRepeatSendSms, setIsCanRepeatSendSms] = useState<boolean>(false)

    const phoneCodeLength = 4
    const codePatternRegex: RegExp = new RegExp(`^\\d{${phoneCodeLength}}$`)
    
    useEffect(() => {
        sendSms()
    }, [])

    async function sendSms() {
        setErrorMessage(null)

        const response = await ClientProvider.sendSms(clientBlank.phone)
        if(!response.isSuccess) 
        {
            setErrorMessage(response.errors[0].message)

            if(response.errors[0].key == 'phoneCodeAlreadyExist')
                setIsShowTimer(true)
        }
    }

    function authorize(userId: string, token: string, refreshToken: string) {
        AsyncStorage.setItem('refreshToken', refreshToken)
        AsyncStorage.setItem('token', token)
        AsyncStorage.setItem('userId', userId)
        
        router.replace('rent/map')
    }

    async function handlePhoneCodeChanged(phoneCode: string) {
        if (!codePatternRegex.test(phoneCode) || isShowTimer) return

        let loginResult: LoginResultDTO

        if(!isAuthorize) {
            const response = await ClientProvider.checkSms(clientBlank, phoneCode)
            if (!response.isSuccess) return setErrorMessage(response.errors[0].message)
            loginResult = response.data
        } else {
            const response = await ClientProvider.login(clientBlank, phoneCode)
            if (!response.isSuccess) return setErrorMessage(response.errors[0].message)
            loginResult = response.data
        }

        authorize(loginResult.userId, loginResult.token, loginResult.refreshToken)
    }

    function handleTimerEnded() {
        setIsShowTimer(false)
        setIsCanRepeatSendSms(true)
    }

    function handleChangePhoneNumber(){
        router.replace('login/authPage')
    }

    function handleRepeatSendSms() {
        sendSms()
        setIsCanRepeatSendSms(false)
    }

    const styles = StyleSheet.create({
        phoneContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 5,
            gap: 10,
            backgroundColor: 'white',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: Colors.disabledText
        }
    })

    return (
        <View style={[containerStyles.flexCenter, containerStyles.fullHeight, { gap: 20 }]}>
            <Typography variant="h2" text="Введи код из SMS" gutterBottom/>
            <Typography variant="h4" text="Код придёт в течении 5 минут на номер:" gutterBottom/>

            <View style={styles.phoneContainer}>
                <Typography variant="h4" text={clientBlank.phone}/>
                <Button label="Изменить" size="medium" variant="elevated" onClick={handleChangePhoneNumber}/>
            </View>

            <PhoneCodeInput
                length={phoneCodeLength}
                onChange={handlePhoneCodeChanged}
            />

            {errorMessage &&
                <Text style={{color: Colors.error}}>{errorMessage}</Text>
            }

            {isShowTimer &&
                <View style={[containerStyles.flex, {gap: 5}]}>
                    <Text>
                        Отправить заново
                    </Text>
                    <Timer 
                        duration={{minutes: 1, seconds: 0}}
                        onEnded={handleTimerEnded}
                    />
                </View>
            }

            {isCanRepeatSendSms &&
                <Button 
                    variant="contained"
                    size="medium" 
                    label="Отправить повторно"
                    onClick={handleRepeatSendSms}
                />
            }
        </View>
    )
}

export default CheckSmsPage