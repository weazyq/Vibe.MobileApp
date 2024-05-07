import { StyleSheet } from 'react-native'

export class Colors {
    static primary = {
        light: "#53AFE3",
        main: "#299CDD",
        dark: "#1C6D9A",
        contrastText: "#fff"
    }

    static secondary = {
        light: "#8F97ED",
        main: "#737DE9",
        dark: "#5057A3",
        contrastText: "#000"
    }

    static inputBorder = '#767676'
    static disabled = '#BCBCBC'
    static disabledText = '#A1A1A1'
    static error = '#BD5050'
    static warning = '#B67A42'
}

export const modalStyles = StyleSheet.create({
    modalBase: {
        position: 'absolute',
        bottom: 0,
        zIndex: 1000
    }
})

export const textStyles = StyleSheet.create({
    header1: {
        fontSize: 36,
        fontWeight: 'bold'
    },
    header2: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    header3: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    header4: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    paragraph: {
        fontSize: 10
    },

    primaryText: {
        color: Colors.primary.light
    },

    secondaryText: {
        color: Colors.disabledText
    },

    textCenter: {
        textAlign: 'center'
    },
})

export const containerStyles = StyleSheet.create({
    spaceBetween: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    flex: {
        display: 'flex',
        flexDirection: 'row'
    },
    flexCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column'
    },
    fullHeight: {
        height: '100%'
    },
    fullWidth: {
        width: '100%'
    }
})

export const inputStyles = StyleSheet.create({
    default: {
        padding: 10,
        borderRadius: 10,
        fontSize: 16,
        borderColor: Colors.inputBorder,
        borderWidth: 1
    },

    blur: {
        borderColor: Colors.primary.light
    },

    inputTitle: {
        ...textStyles.header4,
        marginBottom: 10
    }
})
