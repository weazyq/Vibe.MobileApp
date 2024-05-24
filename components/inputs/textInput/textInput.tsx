import { useState } from "react"
import { StyleProp, Text, TextStyle, View } from "react-native"
import { Colors, inputStyles } from "../../../styles/styles"
import BaseInput from "../baseInput"

interface IProps {
    label?: string
    value: string
    maxLength?: number
    sx?: StyleProp<TextStyle>
    onChange: (value: string) => void
}

function CTextInput(props: IProps) {

    const isMaxLengthReached = props.maxLength != null && props.maxLength == props.value?.length

    return (
        <View style={props.sx}>
            {props.label &&
                <Text style={inputStyles.inputTitle}>
                    {props.label}
                </Text>
            }
            <BaseInput
                value={props.value}
                maxLength={props.maxLength}
                onChangeText={props.onChange}
            />
            {props.maxLength &&
                <View style={{alignItems: "flex-end"}}>
                    <Text style={{color: isMaxLengthReached 
                        ? Colors.error
                        : Colors.disabledText
                    }}>{props.value?.length ?? 0} / {props.maxLength}</Text>
                </View>
            }
        </View>
    )
}

export default CTextInput