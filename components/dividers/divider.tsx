import { StyleProp, View, ViewStyle } from "react-native"

interface DividerProps {
    color?: string
    borderWidth?: number
    sx?: StyleProp<ViewStyle>
}

function Divider({ color, borderWidth, sx }: DividerProps) {
    const colorStyle = color != null ? color : 'lightgray'
    const widthStyle = borderWidth != null ? borderWidth : 1

    return (
        <View style={[{
            width: '100%',
            borderBottomColor: colorStyle,
            borderBottomWidth: widthStyle,
        }, sx]} />
    )
}

export default Divider