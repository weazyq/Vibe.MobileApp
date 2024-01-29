import { useState } from "react"
import { Alert, SafeAreaView, StyleSheet, View } from "react-native"
import { useAuth } from "../../../AuthProvider"
import Button from "../../../components/buttons/button"
import Input from "../../../components/inputs/input"
import { ClientBlank } from "../../../domain/clients/clientBlank"
import { ClientProvider } from "../../../domain/clients/clientProvider"

function GetDataPage() {
    const { setIsAuthenticated } = useAuth()
    const [clientBlank, setClientBlank] = useState<ClientBlank>(ClientBlank.getDefaultBlank())

    function handleChangeName(name: string) {
        setClientBlank((prevState) => ({ ...prevState, name }))
    }

    function handleChangePhone(phone: string) {
        setClientBlank((prevState) => ({ ...prevState, phone }))
    }

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: '100%'
        }
    })

    const isDataEntered = clientBlank.name == null || clientBlank.phone == null

    return (
        <>
            <SafeAreaView>
                <View style={styles.container}>
                    <View>
                        <View style={{ marginBottom: 10 }}>
                            <Input
                                type="text"
                                label="Как тебя зовут?"
                                value={clientBlank.name}
                                onChange={handleChangeName}
                            />
                        </View>
                        <Input
                            type="phone"
                            label="Твой номер телефона?"
                            regex={/^\+7\d{10}$/}
                            validateMessage="Укажите телефон в формате +7 000 000 00 00"
                            onSmsSend={sendSms}
                            value={clientBlank.phone}
                            onChange={handleChangePhone}
                        />
                    </View>

                    <Button disabled={isDataEntered} onClick={async () => registerClient(clientBlank)}>Продолжить</Button>
                </View>
            </SafeAreaView>
        </>
    )

    async function sendSms(phoneNumber: string) {
        const response = await ClientProvider.sendSms(phoneNumber)
    }

    async function registerClient(blank: ClientBlank) {
        const response = await ClientProvider.registerClient(blank)
        showAlert(response)
    }

    function showAlert(response: any) {
        Alert.alert(JSON.stringify(response))
    }
}

export default GetDataPage