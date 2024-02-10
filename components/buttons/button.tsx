import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { Colors } from '../../styles/styles';

interface ButtonProps {
    sx?: StyleProp<ViewStyle>
    size?: 'small' | 'medium' | 'large'
    disabled?: boolean
    label?: string
    onClick?: () => void
}

function Button(props: ButtonProps) {
    let padding = 0
    let fontSize = 10
    switch (props.size) {
        case 'small':
            padding = 5
            fontSize = 10
            break;
        case 'medium':
            padding = 10
            fontSize = 14
            break;
        case 'large':
            padding = 15
            fontSize = 18
            break;
    }

    const styles = StyleSheet.create({
        container: {
            padding: padding,
            backgroundColor: props.disabled
                ? Colors.disabled
                : Colors.primary.light,
            borderWidth: 0,
            borderRadius: 10,
        },
        text: {
            textAlign: "center",
            fontSize: fontSize,
            fontFamily: "Inter-Regular",
            color: props.disabled
                ? Colors.disabledText
                : Colors.primary.contrastText
        }
    })

    return (
        <Pressable style={[props.sx, { ...styles.container }]} onPress={props.onClick}>
            <Text style={styles.text}>{props.label}</Text>
        </Pressable>
    )
}


export default Button