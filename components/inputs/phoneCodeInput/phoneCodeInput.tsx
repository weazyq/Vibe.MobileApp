import { useRef, useState } from "react"
import { NativeSyntheticEvent, TextInput, TextInputKeyPressEventData, View } from "react-native"
import { containerStyles } from "../../../styles/styles"

interface IProps {
    length: number
    onChange: (code: string) => void
}

function PhoneCodeInput({ length, onChange }: IProps) {
    const [code, setCode] = useState<Array<string>>([])
    const inputRefs = useRef<Array<TextInput>>([])

    function onChangeValue(text: string, valueIndex: number) {
        let newValue: string[] = [];
        for (let index = 0; index <= valueIndex; index++) {
            if(index === valueIndex) {
                newValue[index] = text
            } else {
                newValue[index] = code[index]
            }
        }

        setCode(newValue)
        onChange(newValue.join(''))
    }

    function handleTextChange(text: string, index: number) {
        onChangeValue(text, index)

        if(text.length !== 0) {
            return inputRefs.current[index + 1]?.focus()
        }

        return inputRefs.current[index - 1]?.focus()
    }

    function handleBackSpace(event: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) {
        const {nativeEvent} = event

        if (nativeEvent.key === 'Backspace') {
            handleTextChange('', index)
        }
    }

    return (
        <View style={[containerStyles.spaceBetween, {gap: 20}]}>
            {[...new Array(length)].map((item, index) => (
                <TextInput
                    ref={ref => {
                        if(ref && !inputRefs.current.includes(ref)) {
                            inputRefs.current = [...inputRefs.current, ref]
                        }
                    }}
                    key={index}
                    inputMode="numeric"
                    maxLength={1}
                    style={{ borderColor: "#000", borderWidth: 1, width: 40, height: 60, borderRadius: 10, textAlign: 'center' }}
                    contextMenuHidden
                    selectTextOnFocus
                    keyboardType="decimal-pad"
                    testID={`OTPInput-${index}`}

                    value={code[index]}
                    onChangeText={text => handleTextChange(text, index)}
                    onKeyPress={event => handleBackSpace(event, index)}
                />
            ))}
        </View>
    )
}

export default PhoneCodeInput