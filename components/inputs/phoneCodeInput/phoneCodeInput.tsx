import { useRef, useState } from "react"
import { NativeSyntheticEvent, StyleProp, StyleSheet, TextInput, TextInputKeyPressEventData, TextStyle, View } from "react-native"
import { Colors, containerStyles } from "../../../styles/styles"

interface IProps {
    length: number
    onChange: (code: string) => void
}

function PhoneCodeInput({ length, onChange }: IProps) {
    const inputRefs = useRef<Array<TextInput>>([])
    const [code, setCode] = useState<Array<string>>([])
    const [currentInputIndex, setCurrentInputIndex] = useState<number | null>(null)

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

    const getStyle = (index: number): StyleProp<TextStyle> => {
        return {
            borderWidth: 2, 
            width: 40, 
            height: 60, 
            borderRadius: 10,
            fontSize: 20,
            fontWeight: '600',
            textAlign: 'center', 
            backgroundColor: 'white',
            borderColor: currentInputIndex == index 
                ? Colors.primary.light
                : Colors.disabledText
        }
    } 

    function handleFocus(index: number){
        setCurrentInputIndex(index)
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
                    contextMenuHidden
                    selectTextOnFocus
                    keyboardType="decimal-pad"
                    testID={`OTPInput-${index}`}
                    value={code[index]}
                    style={getStyle(index)}
                    onFocus={() => handleFocus(index)}
                    onChangeText={text => handleTextChange(text, index)}
                    onKeyPress={event => handleBackSpace(event, index)}
                />
            ))}
        </View>
    )
}

export default PhoneCodeInput