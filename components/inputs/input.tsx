import PhoneCodeInput from "./phoneCodeInput/phoneCodeInput";
import PhoneInput from "./phoneInput/phoneInput";
import CTextInput from "./textInput/textInput";

export type TextInputPropsType = {type: 'text'} & {
    label?: string,
    value: string,
    onChange: (value: string) => void
}
export type PhoneInputPropsType = {type: 'phone'} & {
    label?: string
    value: string
    onChange: (value: string, isValid: boolean) => void
}
export type CodeInputPropsType = {type: 'code'} & {
    length: number
    onChange: (code: string) => void
}

export type Props<T> = (
    TextInputPropsType |
    PhoneInputPropsType |
    CodeInputPropsType
)

function Input<T>(props: Props<T>) {
    switch (props.type) {
        case 'text':
            return (
                <CTextInput
                    label={props.label}
                    value={props.value}
                    onChange={props.onChange}
                />
            )
        case 'code':
            return (
                <PhoneCodeInput
                    length={props.length}
                    onChange={props.onChange}
                />
            )
        case 'phone':
            return (
                <PhoneInput
                    label={props.label}
                    value={props.value}
                    onChange={props.onChange}
                />
            )
        default:
            break;
    }
}

export default Input