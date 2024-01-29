import PhoneInput from "./phoneInput/phoneInput";
import CTextInput from "./textInput/textInput";

interface IProps {
    type: 'text' | 'textarea' | 'number' | 'phone'
    label?: string
    validateMessage?: string
    regex?: RegExp
    value: string
    onChange: (value: string | number) => void
    onSmsSend?: (phone: string) => void
}

function Input(props: IProps) {

    switch (props.type) {
        case 'text':
            return (
                <CTextInput onChange={props.onChange} label={props.label} />
            )
        case 'phone':
            return (
                <PhoneInput
                    label={props.label}
                    validateMessage={props.validateMessage}
                    regex={props.regex}
                    onChange={props.onChange}
                    onSend={props.onSmsSend}
                />
            )
        default:
            break;
    }
}

export default Input