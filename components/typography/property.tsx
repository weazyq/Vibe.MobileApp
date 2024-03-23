import Typography from "./typography";
import { Text } from "react-native";

interface PropertyProps{
    label: string
    value: string | null
}

function Property({label, value}: PropertyProps) {
  return (
    <Text>
        <Typography text={label}/> <Typography text={value ?? '-'}/>
    </Text>
  )
}

export default Property