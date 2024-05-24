import { useState } from "react"
import { TextInput, TextInputProps } from "react-native"
import { Colors, inputStyles } from "../../styles/styles"

interface CInputProps extends TextInputProps {}

const BaseInput: React.FC<CInputProps> = (props) => {
    const [isFocused, setIsFocused] = useState<boolean>(false)

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleBlur = () => {
        setIsFocused(false)
    }

    return (
        <TextInput
            {...props}
            style={
                [
                    { ...inputStyles.default },
                    isFocused
                        ? { ...inputStyles.blur }
                        : {}
                ]}
            selectionColor={Colors.primary.light}
            onFocus={handleFocus}
            onBlur={handleBlur}
        />
    )
}

export default BaseInput