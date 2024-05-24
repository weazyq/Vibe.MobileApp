import { View, Text } from "react-native";
import { Colors, containerStyles, textStyles } from "../../styles/styles";
import Typography from "../../components/typography/typography";
import Input from "../../components/inputs/input";
import { useState } from "react";
import SupportRequestBlank from "../../domain/supportrequests/supportRequestBlank";
import Divider from "../../components/dividers/divider";
import Button from "../../components/buttons/button";
import SupportRequestProvider from "../../domain/supportrequests/supportRequestsProvider";
import { router } from "expo-router";

function SaveSupportRequest() {
  const [supportRequestBlank, setSupportRequestBlank] =
    useState<SupportRequestBlank>(SupportRequestBlank.getDefaultBlank());
  const [errorMessage, setError] = useState<string | null>(null)    

  function handleChangeTitle(title: string) 
  {
    setSupportRequestBlank((supportRequestBlank) => ({...supportRequestBlank, title}))
  }

  function handleChangeDescription(description: string) 
  {
    setSupportRequestBlank((supportRequestBlank) => ({...supportRequestBlank, description}))
  }

  async function handleSaveSupportRequest() {
    const response = await SupportRequestProvider.saveSupportRequest(supportRequestBlank)
    if(!response.isSuccess) return setError(response.errors[0].message)

    router.push('rent/help')
  }

  return (
    <View style={{ padding: 10 }}>
      <View
        style={[
          containerStyles.fullWidth,
          { backgroundColor: "white", borderRadius: 5, padding: 10 },
        ]}
      >
        <Typography text="Чем можем Вам помочь?" variant="h4" gutterBottom/>
        <Divider/>
        
        <Input
          type="text"
          label="Кратко назовите проблему"
          maxLength={50}
          value={supportRequestBlank.title}
          sx={{marginTop: 20}}
          onChange={handleChangeTitle}
          
        />
        <Input
          type="text"
          label="Подробно опишите что случилось"
          maxLength={1000}
          value={supportRequestBlank.description}
          sx={{marginTop: 20}}
          onChange={handleChangeDescription}
        />

        {errorMessage &&
            <Text style={{color: Colors.error}}>{errorMessage}</Text>
        }
        
        <Button 
          variant="contained" 
          size="medium" 
          label="Сохранить" 
          sx={{marginTop: 20, width: 100}}
          onClick={handleSaveSupportRequest}
        />
      </View>
    </View>
  );
}

export default SaveSupportRequest;
