import axios from "axios";
import Result from "../../tools/result";
import SupportRequestBlank from "./supportRequestBlank";
import SupportRequestDTO from "./supportRequestDto";
import Constants from "../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SupportRequest, mapToSupportRequest, mapToSupportRequests } from "./supportRequest";
import { SupportRequestDetail, mapToSupportRequestDetail } from "./supportRequestDetail";
import { SupportMessageDTO } from "./messages/supportMessageDTO";

export default class SupportRequestProvider {
  static async saveSupportRequest(blank: SupportRequestBlank): Promise<Result<null>> {
    const request = new SupportRequestDTO(blank.title, blank.description);
    const token = await AsyncStorage.getItem('token')
    
    const response = await axios.post(`${Constants.serverUrl}/SaveSupportRequest`, request,
    {
      headers: {
        ...Constants.axiosConfig.headers,
        Authorization: `Bearer ${token}`
      }
    })

    if(!response.data.isSuccess) return Result.fail(response.data.errors[0])
    return Result.success(null)
  }

  static async saveSupportMessage(message: SupportMessageDTO): Promise<Result<null>> {
    const token = await AsyncStorage.getItem('token')
    
    const response = await axios.post(`${Constants.serverUrl}/SupportRequests/SaveSupportMessage`, message, 
    {
      headers: {
        ...Constants.axiosConfig.headers,
        Authorization: `Bearer ${token}`
      }
    })

    if(!response.data.isSuccess) return Result.fail(response.data.errors[0])
    return Result.success(null)
  }

  static async get(id: string): Promise<SupportRequestDetail | null> {
    const token = await AsyncStorage.getItem('token')

    const response = await axios.get(`${Constants.serverUrl}/SupportRequests/GetSupportRequestDetail`, {
      params: {
        id
      },
      headers: {
        ...Constants.axiosConfig.headers,
        Authorization: `Bearer ${token}`
      }
    })

    if(response.data == null) return null
    return mapToSupportRequestDetail(response.data)
  }

  static async list(): Promise<SupportRequest[]> {
    const token = await AsyncStorage.getItem('token')
    
    const response = await axios.get(`${Constants.serverUrl}/SupportRequests/GetSupportRequests`, {
      headers: {
        ...Constants.axiosConfig.headers,
        Authorization: `Bearer ${token}`
      }
    })

    return mapToSupportRequests(response.data)
  }
}
