import { useContext, useEffect, useState } from "react"
import { Alert, Text, View } from "react-native"
import { AuthContext } from "../../../AuthProvider"
import PhoneCodeInput from "../../../components/inputs/phoneCodeInput/phoneCodeInput"
import { ClientProvider } from "../../../domain/clients/clientProvider"
import { containerStyles, textStyles } from "../../../styles/styles"
import { useLoginPage } from "../LoginContext"

function CheckSmsPage() {
    const { clientBlank } = useLoginPage()
    const { onAuthorize } = useContext(AuthContext)

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

        onAuthorize(response.data.userId, response.data.token, response.data.refreshToken)
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