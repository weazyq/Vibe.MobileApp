import { Text, View } from 'react-native';
import ScooterIcon from '../../assets/scooter';
import Button from '../../components/buttons/button';
import { textStyles } from '../../styles/styles';
import Typography from '../../components/typography/typography';
import { router } from 'expo-router';

function LoginHome() {

    function handleButtonClick() {
        router.push("/login/getDataPage")
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
                onClick={handleButtonClick} />

            <Button
                label={"Я уже зарегестрирован"}
                size="medium"
                variant="elevated"
            />

            <Typography variant="smallFont" align="center" style={textStyles.secondaryText}
                text="Нажимая «Регистрация», Вы принимаете договор присоединения и политику конфиденциальности"
            />
        </View>
    )
}

export default LoginHome