import { useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"

interface IProps {
    label?: string
    onChange: (value) => void
}

function CTextInput(props: IProps) {
    const [value, setValue] = useState<string>('')

    function handleInputChange(text: string) {
        setValue(text)
        props.onChange(text)
    }

    const styles = StyleSheet.create({
        input: {
            padding: 10,
            fontFamily: "Inter-Regular",
            fontSize: 14,
            borderRadius: 10,
            borderColor: '#767676',
            borderWidth: 1,
        }
    })

    return (
        <View>
            {props.label !== undefined &&
                <Text style={{
                    marginBottom: 5
                }}>
                    {props.label}
                </Text>
            }
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={handleInputChange}
            />
        </View>
    )
}

export default CTextInput