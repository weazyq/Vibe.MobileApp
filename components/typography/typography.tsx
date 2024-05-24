import { Text, TextStyle } from "react-native"

interface TypographyProps {
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph' | 'smallFont'
    align?: 'left' | 'center' | 'right'
    text: string
    sx?: TextStyle
    gutterBottom?: boolean
}

function Typography({ variant, align, text, sx, gutterBottom }: TypographyProps) {
    const variantStyles = getVariantStyles(variant)
    const alignStyles = getAlignStyles(align)
    const gutterStyles: TextStyle = gutterBottom ? { marginBottom: 10 } : { marginBottom: 0 }

    return (
        <Text style={[variantStyles, alignStyles, gutterStyles, sx]}>
            {text}
        </Text>
    )

    function getAlignStyles(align: string): TextStyle {
        switch (align) {
            case 'left':
                return { textAlign: 'left' }
            case 'center':
                return { textAlign: 'center' }
            case 'right':
                return { textAlign: 'right' }
            default:
                break;
        }
    }

    function getVariantStyles(variant: string): TextStyle {
        switch (variant) {
            case 'h1':
                return {
                    fontSize: 36,
                    fontWeight: '400'
                }
            case 'h2':
                return {
                    fontSize: 28,
                    fontWeight: '400'
                }
            case 'h3':
                return {
                    fontSize: 24,
                    fontWeight: '400'
                }
            case 'h4':
                return {
                    fontSize: 18,
                    fontWeight: '400'
                }
            case 'h5':
                return {
                    fontSize: 12,
                    fontWeight: '400'
                }
            case 'h6':
                return {
                    fontSize: 10,
                    fontWeight: '400'
                }
            case 'paragraph':
                return {
                    fontSize: 16,
                    fontWeight: '300'
                }
            case 'smallFont':
                return {
                    fontSize: 12,
                    fontWeight: '300'
                }
            default:
                break;
        }
    }
}


export default Typography