import { Text, View } from 'react-native';
import ScooterIcon from '../../assets/scooter';
import Button from '../../components/buttons/button';
import { textStyles } from '../../styles/styles';
import Typography from '../../components/typography/typography';
import { router } from 'expo-router';

function LoginHome() {

    function handleRegisterButtonClick() {
        router.push("/login/registerPage")
    }

    function handleAuthButtonClick() {
        router.push("/login/authPage")
    }

    return (
        <View style={{height: '100%', padding: 20}}>
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
                marginBottom: 10
            }}>Привет, поехали ловить <Text style={textStyles.primaryText}>Vibe</Text> вместе!</Text>

            <Button
                label={"Регистрация"}
                size="large"
                sx={{ marginBottom: 15 }}
                onClick={handleRegisterButtonClick} />

            <Button
                label={"Я уже зарегестрирован"}
                size="medium"
                variant="elevated"
                onClick={handleAuthButtonClick}
            />

            <Typography variant="smallFont" align="center" sx={textStyles.secondaryText}
                text="Нажимая «Регистрация», Вы принимаете договор присоединения и политику конфиденциальности"
            />
        </View>
    )
}

export default LoginHome