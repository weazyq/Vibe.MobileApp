import { useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"
import { inputStyles } from "../../../styles/styles"

interface IProps {
    label?: string
    onChange: (value: string, isValid: boolean) => void
    hasErrors?: boolean
}

function PhoneInput(props: IProps) {
    const [value, setValue] = useState<string | null>('')
    const [validateMessage, setValidateMessage] = useState<string | null>(null)

    const phoneRegex = /^\+7\d{10}$/

    function validate(text: string) {
        const isValid = phoneRegex.test(text)

        if (!isValid) {
            setValidateMessage('Введите номер телефона в формате +7 000 000-00-00')
            props.onChange(text, isValid)
            return;
        }

        setValidateMessage(null)
        props.onChange(text, isValid)
    }

    function handleTextChange(text: string) {
        setValue(text)
        validate(text)
    }

    const styles = StyleSheet.create({
        inputContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: 10,
            justifyContent: 'space-between',
            alignItems: "center",
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#767676"
        },
    })

    return (
        <View>
            {props.label &&
                <Text style={inputStyles.inputTitle}>
                    {props.label}
                </Text>
            }

            <View style={styles.inputContainer}>
                <TextInput
                    style={{
                        flex: 1,
                        fontSize: 16
                    }}
                    maxLength={12}
                    inputMode={'tel'}
                    value={value}
                    onChangeText={handleTextChange}
                />
            </View>

            {validateMessage &&
                <Text>{validateMessage}</Text>
            }
        </View>
    )
}

export default PhoneInput