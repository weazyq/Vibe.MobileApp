import { Pressable, StyleSheet, Text, View } from "react-native"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors, textStyles } from "../../../../styles/styles"
import { RentalTabType } from "../../types/RentalTab"

interface IProps {
    activeTab: RentalTabType
    onActiveTabChanged: (activeTab: RentalTabType) => void
}

export default function AppBar({ activeTab, onActiveTabChanged }: IProps) {
    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 80,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 40,
            flexShrink: 0,
            zIndex: 1000,

            borderWidth: 1,
            borderColor: 'lightgray',
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            backgroundColor: '#fff'
        }
    })

    const handleActiveTabChange = (tab: RentalTabType) => {
        onActiveTabChanged(tab)
    }

    return (
        <View
            style={styles.container}
        >
            <AppBarItem
                type={RentalTabType.Help}
                isActive={activeTab === RentalTabType.Help}
                onPress={() => handleActiveTabChange(RentalTabType.Help)}
            />
            <AppBarItem
                type={RentalTabType.Ride}
                isActive={activeTab === RentalTabType.Ride}
                onPress={() => handleActiveTabChange(RentalTabType.Ride)}
            />
            <AppBarItem
                type={RentalTabType.Profile}
                isActive={activeTab === RentalTabType.Profile}
                onPress={() => handleActiveTabChange(RentalTabType.Profile)}
            />
        </View>
    )
}

interface AppBarItemInterface {
    type: RentalTabType,
    isActive: boolean,
    onPress: () => void,
}
function AppBarItem({ type, isActive, onPress }: AppBarItemInterface) {
    const styles = StyleSheet.create({
        container: {
            display: 'flex',
            padding: 5,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
            borderRadius: 5,

            backgroundColor:
                isActive
                    ? 'rgba(40, 156, 221, 0.3)'
                    : 'rgba(40, 156, 221, 0)',
            color:
                isActive
                    ? Colors.primary.light
                    : '#5B5B5B',
        }
    })

    return (
        <Pressable style={styles.container} onPress={onPress}>
            <AppBarItemContent type={type} isActive={isActive} />
        </Pressable>
    )
}

const AppBarItemContent = ({ type: tab, isActive }) => {
    const iconColor = isActive
        ? Colors.primary.light
        : '#5B5B5B'

    const textStyle = isActive
        ? textStyles.primaryText
        : textStyles.secondaryText

    switch (tab) {
        case RentalTabType.Help:
            return <>
                <Icon
                    name="help-box"
                    size={32}
                    color={iconColor}
                />
                <Text style={textStyle}>{RentalTabType.GetOptionLabel(tab)}</Text>
            </>
        case RentalTabType.Ride:
            return <>
                <Icon
                    name="scooter"
                    size={32}
                    color={iconColor}
                />
                <Text style={textStyle}>{RentalTabType.GetOptionLabel(tab)}</Text>
            </>
        case RentalTabType.Profile:
            return <>
                <Icon
                    name="account-box"
                    size={32}
                    color={iconColor}
                />
                <Text style={textStyle}>{RentalTabType.GetOptionLabel(tab)}</Text>
            </>
    }
}