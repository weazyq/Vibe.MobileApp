import { useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"

interface IProps {
    label?: string
    onChange: (value) => void
    onSend: (value) => void
    regex?: RegExp
    validateMessage?: string
    hasErrors?: boolean
}

function PhoneInput(props: IProps) {
    const [value, setValue] = useState<string>('')
    const [validateMessage, setValidateMessage] = useState<string | null>(null)
    const [hasErrors, setHasErrors] = useState<boolean>(false)

    function validate(text: string) {
        const isValid = props.regex.test(text)
        if (!isValid) {
            setValidateMessage(props.validateMessage)
            setHasErrors(true)
            return;
        }

        setHasErrors(false)
        setValidateMessage(null)
    }

    const styles = StyleSheet.create({
        inputContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#767676"
        },
        input: {
            width: "70%"
        },
        button: {
            width: "30%",
            backgroundColor: "rgb(0 0 0 / .1)"
        }
    })

    function handleTextChange(text: string) {
        setValue(text)
    }

    return (
        <View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    keyboardType={'phone-pad'}
                    onChangeText={handleTextChange}
                    onEndEditing={() => validate(value)}
                />
                <Pressable
                    style={styles.button}
                    disabled={hasErrors}
                    onPress={props.onSend}>
                    <Text>Получить СМС</Text>
                </Pressable>
            </View>
            {validateMessage != null &&
                <Text>{validateMessage}</Text>
            }
        </View>
    )
}

export default PhoneInput