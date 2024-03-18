import { Tabs } from "expo-router"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Colors } from "../../styles/styles"
import RentalProvider from "../../contexts/rentalContext"

function RentLayout() {
  return (
    <RentalProvider>
        <Tabs screenOptions={{headerShown: false, tabBarActiveTintColor: Colors.primary.light }}>
            <Tabs.Screen
                name="help"
                options={{
                    title: "Помощь",
                    tabBarIcon: ({color}) => <Icon name="help-box" color={color} size={32}/>
                }}
            />
            <Tabs.Screen
                name="map"
                options={{
                    title: "Поехали",
                    tabBarIcon: ({color}) => <Icon name="scooter" color={color} size={32}/>
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Профиль",
                    tabBarIcon: ({color}) => <Icon name="account-box" color={color} size={32}/>
                }}
            />
        </Tabs>
    </RentalProvider>
  )
}

export default RentLayout