import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { Colors } from '../../styles/styles';

interface ButtonProps {
    sx?: StyleProp<ViewStyle>
    variant?: 'contained' | 'elevated'
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
            borderRadius: 10,
        },
        text: {
            textAlign: "center",
            fontSize: fontSize,
            fontFamily: "Inter-Regular"
        }
    })

    let containerStylesByVariant;
    let textStylesByVariant;

    switch (props.variant) {
        case 'contained':
            containerStylesByVariant = {
                backgroundColor: props.disabled
                    ? Colors.disabled
                    : Colors.primary.light,
            };
            textStylesByVariant = {
                color: props.disabled 
                ? Colors.disabledText
                : Colors.primary.contrastText
            }
            break; 
        case 'elevated':
            containerStylesByVariant = {
                backgroundColor: '#fff',
                borderColor: props.disabled
                    ? Colors.disabled
                    : Colors.primary.light,
                borderWidth: 3,
            };
            textStylesByVariant = {
                color: props.disabled 
                    ? Colors.disabledText
                    : Colors.primary.light
            };
            break;
        default:
            containerStylesByVariant = {
                backgroundColor: props.disabled
                    ? Colors.disabled
                    : Colors.primary.light,
            };
            textStylesByVariant = {
                color: props.disabled 
                ? Colors.disabledText
                : Colors.primary.contrastText
            }
            break;
    }

    return (
        <Pressable style={[props.sx, styles.container, containerStylesByVariant]} onPress={props.onClick}>
            <Text style={[styles.text, textStylesByVariant]}>{props.label}</Text>
        </Pressable>
    )
}

export default Button