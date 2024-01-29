import { Text, View } from 'react-native';
import Scooter from '../../../assets/scooter';
import Button from '../../../components/buttons/button';
import { LoginPageType, useLoginPage } from '../LoginContext';

function Hello() {
    const { changePage } = useLoginPage()

    function handleButtonClick() {
        changePage(LoginPageType.GetData)
    }

    return (
        <>
            <View style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 5,
                marginHorizontal: "auto",
                flex: 1,
            }}>
                <Scooter />
            </View>

            <Text style={{
                fontWeight: "bold",
                fontFamily: "Inter-Bold",
                fontSize: 14,
                marginBottom: 10
            }}>Привет, поехали ловить <Text>Vibe</Text> вместе!</Text>
            <Button children={"Поехали"} onClick={handleButtonClick} />
        </>
    )
}

export default Hello