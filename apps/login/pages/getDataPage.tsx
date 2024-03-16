import { useState } from "react"
import { View } from "react-native"
import Button from "../../../components/buttons/button"
import Input from "../../../components/inputs/input"
import { containerStyles } from "../../../styles/styles"
import { LoginPageType, useLoginPage } from "../LoginContext"

function GetDataPage() {
    const { clientBlank, changePage, setClientBlank } = useLoginPage()

    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(false)

    function handleChangeName(name: string) {
        setClientBlank((prevState) => ({ ...prevState, name }))
    }

    function handleChangePhone(phone: string, isValid: boolean) {
        setClientBlank((prevState) => ({ ...prevState, phone }))
        setIsPhoneNumberValid(isValid)
    }

    const isDataNotEntered = clientBlank.name == null || clientBlank.phone == null || !isPhoneNumberValid

    return (
        <View style={[containerStyles.fullHeight, containerStyles.spaceBetween, containerStyles.flexColumn]}>
            <View style={{ marginTop: 50 }}>
                <View style={{ marginBottom: 35 }}>
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
                    value={clientBlank.phone}
                    onChange={handleChangePhone}
                />
            </View>

            <Button
                label="Продолжить"
                size="large"
                disabled={isDataNotEntered}
                onClick={() => changePage(LoginPageType.PhoneConfirmPage)} />
        </View>
    )
}

export default GetDataPage