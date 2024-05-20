import { Keyboard, View } from "react-native"
import Input from "../../components/inputs/input"
import { ClientProvider } from "../../domain/clients/clientProvider"
import { containerStyles } from "../../styles/styles"
import ModalDialog from "../../components/modals/modalDialog"
import { useLoginPage } from "../../contexts/loginContext"
import { useRouter } from "expo-router"
import useModal from "../../hooks/useModal"
import { ReactElement } from "react"
import Button from "../../components/buttons/button"

function AuthPage() {

    const {clientBlank, setClientBlank} = useLoginPage()
    const [modal, showModal, hideModal] = useModal<ReactElement>()
    const router = useRouter()

    async function handleChangePhone(value: string, isValid?: boolean) {
        if(isValid) {
            Keyboard.dismiss()
            setClientBlank((blank) => ({...blank, phone: value}))
            
            const isPhoneNumberExist = await ClientProvider.checkIsPhoneNumberExist(value)
            
            if(isPhoneNumberExist == true) 
                return router.push(
                    { 
                        pathname: '/login/checkSmsPage', 
                        params: {isAuthorize: 'authorize'}
                    }
                )
            
            showModal(<ModalDialog 
                isOpen 
                title="Ошибка авторизации"
                bodyText="Указанный тобой номер телефона ещё не зарегистрирован в системе"
                actionsContent={<>
                    <Button variant="elevated" label="Изменить номер" size="medium" onClick={hideModal}/>
                    <Button variant="contained" label="Перейти к регистрации" size="medium" onClick={() => router.push("login/registerPage")}/>
                </>}
                onClose={hideModal}
            />)
        }
    }

    return (
        <>
            {modal}
            <View style={[containerStyles.fullHeight, containerStyles.spaceBetween, containerStyles.flexColumn, 
                { padding: 20 }]}>
                <Input
                    type="phone"
                    label="Твой номер телефона?"
                    value={clientBlank.phone}
                    onChange={handleChangePhone}
                />
            </View>
        </>
    )
}

export default AuthPage