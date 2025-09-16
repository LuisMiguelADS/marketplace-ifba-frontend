import { useContext } from "react";
import ContainerMainContent from '../../Components/ContainerMainContent';
import InformationsPerfil from "../../Components/InformationsPerfil";

const ProfileProvider = () => {

  return (
    <ContainerMainContent>
      <h1>Perfil</h1>
      <InformationsPerfil />
    </ContainerMainContent>
  );
};

export default ProfileProvider;
