import { Pressable, StyleSheet, Text } from 'react-native';

interface ButtonProps {
    disabled?: boolean
    children?: React.ReactNode
    onClick?: () => void
}

function Button(props: ButtonProps) {
    const styles = StyleSheet.create({
        container: {
            width: "100%",
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: props.disabled
                ? "#BCBCBC"
                : "#299CDD",
            borderWidth: 0,
            borderRadius: 10,
        },
        text: {
            textAlign: "center",
            fontSize: 14,
            fontFamily: "Inter-Regular",
            color: props.disabled
                ? "#A1A1A1"
                : "#fff"
            ,
        }
    })

    return (
        <Pressable style={styles.container} onPress={props.onClick}>
            <Text style={styles.text}>{props.children}</Text>
        </Pressable>
    )
}


export default Button