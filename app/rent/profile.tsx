import { View } from "react-native"
import { useRentalContext } from "../../contexts/rentalContext"
import { useEffect } from "react"
import { ClientProvider } from "../../domain/clients/clientProvider"
import { useAuthContext } from "../../contexts/authContext"
import Typography from "../../components/typography/typography"
import { containerStyles } from "../../styles/styles"
import Divider from "../../components/dividers/divider"

function Profile() {

  const {client, onClientLoaded} = useRentalContext()
  const { userId } = useAuthContext()
  
  useEffect(() => {
    loadClient()
  }, [])
  
  async function loadClient() {
    const client = await ClientProvider.getClient(userId)
    onClientLoaded(client)
  }

  return (
    <View style={[containerStyles.fullHeight, containerStyles.fullWidth, { paddingHorizontal: 20, paddingTop: 50 }]}>
            <Typography
                variant="h2"
                text="Профиль"
                gutterBottom
            />
            <Divider />
            <Typography
                variant="paragraph"
                text={client.name}
            />
            <Typography
                variant="paragraph"
                text={client.phone}
            />
        </View>
  )
}

export default Profile