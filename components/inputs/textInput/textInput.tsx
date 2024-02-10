import { useState } from "react"
import { Text, View } from "react-native"
import { inputStyles } from "../../../styles/styles"
import BaseInput from "../baseInput"

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


    return (
        <View>
            {props.label &&
                <Text style={inputStyles.inputTitle}>
                    {props.label}
                </Text>
            }
            <BaseInput
                value={value}
                onChangeText={handleInputChange}
            />
        </View>
    )
}

export default CTextInput