import { Text, View } from 'react-native';
import ScooterIcon from '../../../assets/scooter';
import Button from '../../../components/buttons/button';
import { textStyles } from '../../../styles/styles';
import { LoginPageType, useLoginPage } from '../LoginContext';

function Hello() {
    const { changePage } = useLoginPage()

    function handleButtonClick() {
        changePage(LoginPageType.GetData)
    }

    return (
        <>
            <View style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}>
                <ScooterIcon />
            </View>

            <Text style={{
                fontWeight: "bold",
                fontFamily: "Inter-Bold",
                marginBottom: 10
            }}>Привет, поехали ловить <Text style={textStyles.primaryText}>Vibe</Text> вместе!</Text>

            <Button
                label={"Поехали"}
                size="large"
                sx={{ marginBottom: 15 }}
                onClick={handleButtonClick} />

            <Text style={{ ...textStyles.secondaryText, ...textStyles.textCenter }}>
                Нажимая «Поехали», Вы принимаете договор присоединения и политику конфиденциальности
            </Text>
        </>
    )
}

export default Hello