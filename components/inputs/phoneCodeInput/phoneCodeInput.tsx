import { useState } from "react"
import { Text, TextInput } from "react-native"

interface IProps {
    label?: string
    onChange: (value: string | number) => void
}

function PhoneCodeInput({ label, onChange }: IProps) {
    const [phoneCode, setPhoneCode] = useState<string>('')
    const codePattern: RegExp = /^\d+$/;

    function handleTextChange(text: string) {
        if (!codePattern.test(text)) return
        setPhoneCode(text)
        onChange(text)
    }

    return (
        <>
            {label &&
                <Text>{label}</Text>
            }
            <TextInput
                inputMode="numeric"
                maxLength={4}
                onChangeText={handleTextChange}
                style={{ borderColor: "#000", borderWidth: 1, width: 100 }}
                value={phoneCode}
            />
        </>
    )
}

export default PhoneCodeInput