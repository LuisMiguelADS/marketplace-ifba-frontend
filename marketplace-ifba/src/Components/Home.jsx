import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { BsFillBuildingsFill } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { GrNotes } from "react-icons/gr";
import { FaClock } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";





export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
    font-family: Arial, sans-serif;
  }

  #root {
    width: 100%;
    overflow-x: hidden;
  }
`;


// === Styled Components ===




const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;





const Header = styled.header`
  background: white;
  padding: 1.5rem 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
`;

const MarketPlace = styled.div`
  h1 {
    color: #006400;
    font-size: 1.5rem;
    margin: 0;
  }
`;

const TextCentral = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  color: #000;
  font-size: 1rem;

  h2 {
    margin: 0;
    cursor: pointer;
    font-weight: normal;
    transition: color 0.3s ease;

    &:hover {
      color: #004d00;
    }
  }
`;




const BtnLoginCadastro = styled.div`
  display: flex;
  gap: 1rem;
`;

const BtnLogin = styled(Link)`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  background-color: white;
  color: #004d00;
  border: 2px solid #004d00;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #004d00;
    color: white;
  }
`;

const BtnRegister = styled.button`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  background-color: #004d00;
  color: white;
  border: 2px solid #004d00;

  &:hover {
    background-color: #003d00;
  }
`;

const Hero = styled.section`
  background: linear-gradient(to bottom, #004d00, #006400);
  color: white;
  text-align: center;
  padding: 4rem 2rem;
`;

const Titulo1 = styled.h1`
  font-size: 75px;
`;

const Inovacao = styled.span`
  color: #facc15;
`;

const Tecnologia = styled.span`
  color: #22c55e;
`;

const Subtitulo = styled.p`
  margin: 1rem auto;
  max-width: 600px;
  font-size: 25px;
`;

const BotoesHero = styled.div`
  button {
    margin: 0.5rem;
    padding: 0.7rem 1.5rem;
    border-radius: 8px;
    border: none;
    font-weight: bold;
    cursor: pointer;
  }
`;

const BtnEmpresa = styled.button`
  background-color: #22c55e;
  color: white;
`;

const BtnInstituicao = styled.button`
  background-color: white;
  color: #004d00;
`;

const Stats = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 2rem;
  font-size: 25px;

  div {
    text-align: center;
  }
`;

const Diferenciais = styled.section`
  background: #fdfdfd;
  color: #111;
  padding: 4rem 2rem;
  text-align: center;
`;

const DiferenciaisTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #004d00;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 60px;
    height: 4px;
    background-color: #22c55e;
    margin: 10px auto 0;
    border-radius: 2px;
  }
`;

const DiferenciaisSubTitle = styled.h2`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: black;
  position: relative;
  }
`;

const CardsDiferenciais = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  text-align: left;

  h4 {
    margin-bottom: 0.8rem;
    color: #006400;
    font-size: 1.2rem;
  }

  p {
    font-size: 0.95rem;
    color: #333;
    line-height: 1.5;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 600px) {
    text-align: center;
  }
`;

const Conexao = styled.section`
  background: linear-gradient(to bottom right, #004d00, #006400);
  color: #ffffff;
  padding: 5rem 2rem;
  text-align: center;
  position: relative;
`;

const ConexaoTitle = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 1rem;
  color: #ffffff;
`;

const Destaque = styled.span`
  color: #facc15; /* dourado */
  font-weight: bold;
`;

const ConexaoText = styled.p`
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto 2.5rem;
  color: #f1f1f1;
`;

const BotoesConexao = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;

    button {
    display: flex; 
    align-items: center; 
    gap: 0.5rem; 

    padding: 0.8rem 1.8rem;
    border-radius: 30px;
    border: 2px solid #facc15;
    background-color: transparent;
    color: #facc15;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: #facc15;
      color: #004d00;
      transform: translateY(-3px);
    }
  }

`;

const Seta = styled.div`
  display: flex;
  align-items: center; 
  color: white;
`;



const fadeUp = keyframes`
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const EtapasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  padding-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EtapaCard = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-left: 4px solid #facc15;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  animation: ${fadeUp} 0.8s forwards;
  animation-delay: ${props => props.delay || '0s'};

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
`;

const EtapaIcone = styled.div`
  font-size: 2rem;
  color: #facc15;
  margin-right: 0.5rem;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
`;

const EtapaConteudo = styled.div`
  h4 {
    margin: 0;
    color: #ffffff;
    font-size: 1.2rem;
  }

  p {
    margin-top: 0.4rem;
    color: #f1f1f1;
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const Footer = styled.footer`
  background-color: white;
  color: #d9d9d9;
  padding: 4rem 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  border-top: 1px solid #0a4521;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 300;
  letter-spacing: 0.02em;

  h4 {
    margin-bottom: 1.2rem;
    font-size: 1.3rem;
    color: black;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  p {
    margin: 0.4rem 0;
    font-size: 1rem;
    color: black;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #0a4521;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 3rem 2rem;

    > div:not(:last-child) {
      border-right: none;
      padding-right: 0;
      border-bottom: 1px solid #0a4521;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
    }
  }

  *,
  *::before,
  *::after {
    transition: all 0.3s ease;
  }
`;

// === JSX Component ===

function Home() {
  const [tipoSelecionado, setTipoSelecionado] = useState("demandantes");
  return (
    
    <Container>
      <Header>
        <HeaderContainer>
          <MarketPlace>
            <h1>Marketplace IFBA</h1>
          </MarketPlace>

          <TextCentral>
            <h2>Como funciona</h2>
            <h2>Projetos</h2>
            <h2>Sobre</h2>
            <h2>Instituições</h2>
          </TextCentral>

          <BtnLoginCadastro >
            <BtnLogin to="/login">Entrar</BtnLogin>
            <BtnRegister>Cadastrar</BtnRegister>
          </BtnLoginCadastro>
        </HeaderContainer>
      </Header>

      <Hero>
        <Titulo1>
          Conectando <Inovacao>Inovação</Inovacao> e <Tecnologia>Tecnologia</Tecnologia>
        </Titulo1>
        <Subtitulo>
          Plataforma que une instituições tecnológicas e grupos de pesquisa com empresas que precisam resolver problemas por meio da ciência e inovação.
        </Subtitulo>
        <BotoesHero>
          <BtnEmpresa>Sou uma Empresa</BtnEmpresa>
          <BtnInstituicao>Sou uma Instituição</BtnInstituicao>
        </BotoesHero>
        <Stats>
          <div><strong>100+</strong><br />Projetos realizados</div>
          <div><strong>20+</strong><br />Especialistas disponíveis</div>
          <div><strong>90%</strong><br />Taxa de Sucesso</div>
        </Stats>
      </Hero>

      <Diferenciais>
        <DiferenciaisTitle>Por que utilizar nossa plataforma?</DiferenciaisTitle>
        <DiferenciaisSubTitle>Oferecemos as ferramentas e conexões necessárias para transformar 
          desafios em oportunidades de inovação</DiferenciaisSubTitle>
        <CardsDiferenciais>
          <Card>
            <h4>Encontre especialistas</h4>
            <p>Conecte-se com os melhores especialistas para sua demanda.</p>
          </Card>
          <Card>
            <h4>Comunicação Eficiente</h4>
            <p>Canal direto com pesquisadores e instituições.</p>
          </Card>
          <Card>
            <h4>Resultados Comprovados</h4>
            <p>Projetos acompanhados com dados e entregas validadas.</p>
          </Card>
          <Card>
            <h4>Segurança e confiança</h4>
            <p>Plataforma confiável com apoio institucional.</p>
          </Card>
          <Card>
            <h4>Encontre oportunidades</h4>
            <p>Veja projetos abertos e crie novas conexões.</p>
          </Card>
          <Card>
            <h4>Ecossistema local</h4>
            <p>Fortaleça a inovação na sua região.</p>
          </Card>
        </CardsDiferenciais>
      </Diferenciais>

      <Conexao>
        <ConexaoTitle>
          Como a <Destaque>Conexão</Destaque> Acontece?
        </ConexaoTitle>
        <ConexaoText>Descubra como conectar demandas e grupos de pesquisa de forma simples e eficaz.</ConexaoText>

       <BotoesConexao>
        <button 
          onClick={() => setTipoSelecionado("demandantes")}
          style={{
            backgroundColor: tipoSelecionado === "demandantes" ? "#facc15" : "transparent",
            color: tipoSelecionado === "demandantes" ? "#004d00" : "#facc15"
          }}
        >
          <BsFillBuildingsFill size={25}/>

          Demandantes
        </button>

        <Seta> 
        <FaArrowRightArrowLeft size={30}/>
        </Seta>


        <button
          onClick={() => setTipoSelecionado("grupos")}
          style={{
            backgroundColor: tipoSelecionado === "grupos" ? "#facc15" : "transparent",
            color: tipoSelecionado === "grupos" ? "#004d00" : "#facc15"
          }}
        >
          <MdGroups size={25} />
          Grupos de pesquisa
        </button>
      </BotoesConexao>


        <EtapasGrid>
  {tipoSelecionado === "demandantes" && (
    <>
      <EtapaCard className="animated" delay="0.1s">
        <EtapaIcone><GrNotes /></EtapaIcone>
        <EtapaConteudo>
          <h4>Defina sua Necessidade</h4>
          <p>Identifique o problema ou desafio que precisa ser solucionado com inovação.</p>
        </EtapaConteudo>
      </EtapaCard>
      <EtapaCard className="animated" delay="0.3s">
        <EtapaIcone><GrNotes /></EtapaIcone>
        <EtapaConteudo>
          <h4>Alinhe a Proposta</h4>
          <p>Converse com especialistas e instituições para ajustar expectativas e objetivos.</p>
        </EtapaConteudo>
      </EtapaCard>
      <EtapaCard className="animated" delay="0.5s">
        <EtapaIcone><MdGroups /></EtapaIcone>
        <EtapaConteudo>
          <h4>Acompanhe o Desenvolvimento</h4>
          <p>Monitore o progresso do projeto e participe das etapas de validação.</p>
        </EtapaConteudo>
      </EtapaCard>
      <EtapaCard className="animated" delay="0.7s">
        <EtapaIcone><FaClock /></EtapaIcone>
        <EtapaConteudo>
          <h4>Finalize com Sucesso</h4>
          <p>Receba os resultados finais e fortaleça sua rede de inovação.</p>
        </EtapaConteudo>
      </EtapaCard>
    </>
  )}

  {tipoSelecionado === "grupos" && (
    <>
      <EtapaCard className="animated" delay="0.1s">
            <EtapaIcone><FaSearch /></EtapaIcone>
            <EtapaConteudo>
              <h4>Busque Projetos</h4>
              <p>Encontre demandas compatíveis com sua área de atuação e expertise.</p>
            </EtapaConteudo>
          </EtapaCard>
          <EtapaCard className="animated" delay="0.3s">
            <EtapaIcone><GrNotes /></EtapaIcone>
            <EtapaConteudo>
              <h4>Apresente uma Proposta</h4>
              <p>Crie propostas técnicas alinhadas às necessidades das empresas.</p>
            </EtapaConteudo>
          </EtapaCard>
          <EtapaCard className="animated" delay="0.5s">
            <EtapaIcone><MdGroups /></EtapaIcone>
            <EtapaConteudo>
              <h4>Colabore com Empresas</h4>
              <p>Participe ativamente da execução e validação das soluções propostas.</p>
            </EtapaConteudo>
          </EtapaCard>
          <EtapaCard className="animated" delay="0.7s">
            <EtapaIcone><FaTrophy /></EtapaIcone>
            <EtapaConteudo>
              <h4>Ganhe Visibilidade</h4>
              <p>Fortaleça seu grupo de pesquisa com resultados de impacto.</p>
            </EtapaConteudo>
          </EtapaCard>
        </>
      )}
    </EtapasGrid>

      </Conexao>

      <Footer>
        <div>
          <h4>Marketplace IFBA</h4>
          <p>Conectando inovação através da tecnologia</p>
        </div>
        <div>
          <h4>Plataforma</h4>
          <p>Como Funciona</p>
          <p>Projetos</p>
          <p>Sobre</p>
        </div>
        <div>
          <h4>Suporte</h4>
          <p>FAQ</p>
          <p>Ajuda</p>
        </div>
        <div>
          <h4>Legal</h4>
          <p>Termos</p>
          <p>Política</p>
        </div>
      </Footer>
    </Container>
  );
}

export default Home;
