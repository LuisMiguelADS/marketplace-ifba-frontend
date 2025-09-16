import { useContext } from "react";
import { UserContext } from "../../Components/UserContext";
import ContainerMainContent from '../../Components/ContainerMainContent';
import Card from '../../Components/Cardd';

const ProfileRequester = () => {
  const { user, grupoPesquisa, instituicao } = useContext(UserContext);

  // Informações do usuário
  const userInfos = [
    `Email: ${user?.email || "Não informado"}`,
    `Telefone: ${user?.telefone || "Não informado"}`,
    `CPF: ${user?.cpf || "Não informado"}`,
    `Data de Nascimento: ${user?.dataNascimento || "Não informado"}`,
    `Biografia: ${user?.biografia || "Não informado"}`,
    `Tipo de Usuário: ${user?.role || "Não informado"}`
  ];

  // Informações da organização
    const instituicaoInfos = [
    `Nome: ${grupoPesquisa?.nome || "Não informado"}`,
    `Descrição: ${grupoPesquisa?.descricao || "Não informado"}`
  ];
    return (
    <ContainerMainContent>
      <h1>Perfil</h1>
      <div className="flex flex-col gap-8">
        <Card
          IconContainer="pi pi-user"
          Title={user?.nomeCompleto || "Usuário do Instituto"}
          Infos={userInfos}
        />
        <Card
          IconContainer="pi pi-building"
          Title="Informações da Organização"
          Infos={instituicaoInfos}
        />
      </div>
    </ContainerMainContent>
  );
};

export default ProfileRequester;