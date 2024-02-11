import { View } from "react-native"

interface DividerProps {
    color?: string
    width?: number
}

function Divider({ color, width }: DividerProps) {
    const colorStyle = color != null ? color : 'lightgray'
    const widthStyle = width != null ? width : 1

    return (
        <View style={{
            width: '100%',
            borderBottomColor: colorStyle,
            borderBottomWidth: widthStyle
        }} />
    )
}

export default Divider