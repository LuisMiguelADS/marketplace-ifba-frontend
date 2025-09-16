import { useContext } from "react";
import { UserContext } from "../../Components/UserContext";
import ContainerMainContent from '../../Components/ContainerMainContent';
import Card from '../../Components/Cardd';

const ProfileProvider = () => {
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

  // Informações da instituição
  const instituicaoInfos = [
    `Nome: ${instituicao?.nome || "Não informado"}`,
    `Sigla: ${instituicao?.sigla || "Não informado"}`,
    `Cidade: ${instituicao?.cidade || "Não informado"}`,
    `Estado: ${instituicao?.estado || "Não informado"}`
  ];

  // Informações do grupo de pesquisa
  const grupoPesquisaInfos = [
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
          Title="Informações da Instituição"
          Infos={instituicaoInfos}
        />
        <Card
          IconContainer="pi pi-users"
          Title="Informações do Grupo de Pesquisa"
          Infos={grupoPesquisaInfos}
        />
      </div>
    </ContainerMainContent>
  );
};

export default ProfileProvider;
