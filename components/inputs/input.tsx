import PhoneCodeInput from "./phoneCodeInput/phoneCodeInput";
import PhoneInput from "./phoneInput/phoneInput";
import CTextInput from "./textInput/textInput";

interface IProps {
    type: 'text' | 'textarea' | 'number' | 'phone'
    label?: string
    value: string
    onChange: (value: string | number, isValid?: boolean) => void
}

function Input(props: IProps) {
    switch (props.type) {
        case 'text':
            return (
                <CTextInput
                    label={props.label}
                    onChange={props.onChange}
                />
            )
        case 'number':
            return (
                <PhoneCodeInput
                    label={props.label}
                    onChange={props.onChange}
                />
            )
        case 'phone':
            return (
                <PhoneInput
                    label={props.label}
                    onChange={props.onChange}
                />
            )
        default:
            break;
    }
}

export default Input