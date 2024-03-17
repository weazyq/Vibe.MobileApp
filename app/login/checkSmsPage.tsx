import { View, Text } from "react-native"
import { containerStyles, textStyles } from "../../styles/styles"
import PhoneCodeInput from "../../components/inputs/phoneCodeInput/phoneCodeInput"
import { useEffect, useState } from "react"
import { ClientProvider } from "../../domain/clients/clientProvider"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"
import { useLoginPage } from "../../contexts/loginContext"

function CheckSmsPage() {
  const {clientBlank} = useLoginPage()

  function authorize(userId: string, token: string, refreshToken: string) {
    AsyncStorage.setItem('refreshToken', refreshToken)
    AsyncStorage.setItem('token', token)
    AsyncStorage.setItem('userId', userId)
    
    router.replace('rent')
  }

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const phoneCodeLength = 4
  const codePatternRegex: RegExp = new RegExp(`^\\d{${phoneCodeLength}}$`)

  useEffect(() => {
      sendSms()
  }, [])

  async function sendSms() {
      await ClientProvider.sendSms(clientBlank.phone)
  }

  async function handlePhoneCodeChanged(phoneCode: string) {
      if (!codePatternRegex.test(phoneCode)) return

      const response = await ClientProvider.checkSms(clientBlank, phoneCode)
      if (!response.isSuccess) return setErrorMessage(response.errors[0])

      authorize(response.data.userId, response.data.token, response.data.refreshToken)
  }

  return (
    <View style={[containerStyles.flexCenter, containerStyles.fullHeight, { gap: 10 }]}>
            <Text style={[textStyles.header2, textStyles.textCenter, { marginBottom: 20 }]}>
                Введи код из SMS
            </Text>
            <Text style={[textStyles.header4, textStyles.textCenter]}>
                Код придёт в течении минуты на номер:
            </Text>
            <Text style={[textStyles.primaryText, textStyles.textCenter]}>
                {clientBlank.phone}
            </Text>
            <PhoneCodeInput
                length={phoneCodeLength}
                onChange={handlePhoneCodeChanged}
            />
            {errorMessage &&
                <Text>
                    {errorMessage}
                </Text>
            }
        </View>
  )
}

export default CheckSmsPage