import { Text, View } from 'react-native';
import ScooterIcon from '../../../assets/scooter';
import Button from '../../../components/buttons/button';
import { textStyles } from '../../../styles/styles';
import { LoginPageType, useLoginPage } from '../LoginContext';
import Typography from '../../../components/typography/typography';

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
                label={"Регистрация"}
                size="large"
                sx={{ marginBottom: 15 }}
                onClick={handleButtonClick} />

            <Button
                label={"Я уже зарегестрирован"}
                size="medium"
                variant="elevated"
            />

            <Typography variant="smallFont" align="center" style={textStyles.secondaryText}
                text="Нажимая «Регистрация», Вы принимаете договор присоединения и политику конфиденциальности"
            />
        </>
    )
}

export default Hello