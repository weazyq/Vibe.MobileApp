import { ReactElement, useState } from "react";
import { View } from "react-native";
import Button from "../../components/buttons/button";
import Input from "../../components/inputs/input";
import { containerStyles } from "../../styles/styles";
import { router } from "expo-router";
import { useLoginPage } from "../../contexts/loginContext";
import { ClientProvider } from "../../domain/clients/clientProvider";
import useModal from "../../hooks/useModal";
import ModalDialog from "../../components/modals/modalDialog";

function GetDataPage() {
  const { clientBlank, setClientBlank } = useLoginPage();
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<boolean>(false);
  const [isPhoneNumberAvailable, setIsPhoneNumberAvailable] = useState<boolean>(false);
  const [modal, showModal, hideModal] = useModal<ReactElement>();

  function handleChangeName(name: string) {
    setClientBlank((prevState) => ({ ...prevState, name }));
  }

  async function handleChangePhone(phone: string, isValid: boolean) {
    setClientBlank((prevState) => ({ ...prevState, phone }));
    setIsPhoneNumberValid(isValid);

    if (isValid) checkIsPhoneNumberExist(phone);
  }

  async function checkIsPhoneNumberExist(phone: string) {
    const isPhoneNumberExist = await ClientProvider.checkIsPhoneNumberExist(
      phone
    );
    if (!isPhoneNumberExist) return setIsPhoneNumberAvailable(true);

    showModal(<PhoneNumberAlreadyExistModal onClose={hideModal} />);
  }

  async function handleButton() {
    router.push("/login/checkSmsPage");
  }

  const isRegisterAvailable =
    clientBlank.name != null &&
    clientBlank.phone != null &&
    isPhoneNumberValid &&
    isPhoneNumberAvailable;

  return (
    <>
      {modal}
      <View
        style={[
          containerStyles.fullHeight,
          containerStyles.spaceBetween,
          containerStyles.flexColumn,
          { padding: 20 },
        ]}
      >
        <View style={{ marginTop: 50 }}>
          <View style={{ marginBottom: 35 }}>
            <Input
              type="text"
              label="Как тебя зовут?"
              value={clientBlank.name}
              onChange={handleChangeName}
            />
          </View>
          <Input
            type="phone"
            label="Твой номер телефона?"
            value={clientBlank.phone}
            onChange={handleChangePhone}
          />
        </View>

        <Button
          label="Продолжить"
          size="large"
          disabled={!isRegisterAvailable}
          onClick={handleButton}
        />
      </View>
    </>
  );
}

interface Props {
  onClose: () => void;
}
function PhoneNumberAlreadyExistModal(props: Props) {
  return (
    <ModalDialog
      isOpen
      title="Номер уже зарегестрирован"
      bodyText="Перейти к авторизации?"
      actionsContent={
        <>
          <Button
            variant="elevated"
            size="medium"
            label="Отмена"
            onClick={props.onClose}
          />
          <Button
            variant="contained"
            size="medium"
            label="Авторизоваться"
            onClick={() => router.push("/login/authPage")}
          />
        </>
      }
      onClose={props.onClose}
    />
  );
}

export default GetDataPage;
