import React from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import Button from '../Components/Forms/Button';

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
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 0px;
`

const Options = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  color: #000;
  font-size: 1rem;

  a {
    text-decoration: none;
    cursor: pointer;
    transition: color 0.3s ease;
    font-size: 1.2rem;
    &:hover {
      color: #004d00;
    }
  }
`

const BtnLoginCadastro = styled.div`
  display: flex;
  gap: 1rem;
`

const Hero = styled.section`
  background: linear-gradient(to bottom, #004d00, #006400);
  color: white;
  text-align: center;
  padding: 60px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`

const Title = styled.h1`
    font-size: 4rem;
`

const SubTitle = styled.p`
    margin-top: -20px;
    max-width: 800px;
    text-align: center;
    font-size: 25px;
`;

const ContainerHeroButtons = styled.div`
    display: flex;
    gap: 30px;
    align-items: center;
`

const HeroButton = styled(Button)`
    background-color: ${props => props.isActive ? '#107421' : 'white'};
    color: ${props => props.isActive ? 'white' : '#107421'};
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 60px;
    box-shadow: 0 3px 6px #00420c;
    transition: all 0.1s ease;
    position: relative;

    &:hover {
      background-color: #107421;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 6px 12px #00420c;
    }

    &:focus {
      background-color: #107421;
      color: white;
    }
`

const Icon = styled.i`
    font-size: 2rem;
`

const Data = styled.div`
    width: 1020px;
    display: flex;
    justify-content: space-between;
`

const DataItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.4rem;
`

const WhyChooseUsContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fdfdfd;
    color: black;
    gap: 60px;
    padding: 60px 0px;
`

const CardsWhyChooseUs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1260px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const CardWhyChooseUs = styled.div`
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.378);
    transition: all 0.3s ease;
    height: 200px;
    position: relative;            
`

const LineDesignCard = styled.div`
    background-color: #00420C;
    width: 180px;
    height: 3px;
    position: absolute;
    margin-left: -20px; 
`

const InfosCardWhyChooseUs = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: column;
    margin-top: 40px;
`

const ConnectionContainer = styled.section`
  background: linear-gradient(to bottom right, #004d00, #006400);
  color: #ffffff;
  padding: 5rem 2rem;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`
const ConnectionButton = styled(Button)`
    background-color: ${props => props.isActive ? '#107421' : 'white'};
    color: ${props => props.isActive ? 'white' : '#107421'};
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 60px;
    box-shadow: 0 3px 6px #00420c;
    transition: all 0.1s ease;
    position: relative;

    &:hover {
      background-color: #107421;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 6px 12px #00420c;
    }

    &:focus {
      background-color: #107421;
      color: white;
    }
`

const IconAnimationRight = styled.span`
    animation: oscilar 2s ease-in-out infinite alternate;

    @keyframes oscilar {
      0% {
        transform: translateX(-4px);
      }
      100% {
        transform: translateX(4px);
      }
    }
`

const IconAnimationLeft = styled.span`
    animation: oscilar 2s ease-in-out infinite alternate;
    animation-delay: 2s;

    @keyframes oscilar {
      0% {
        transform: translateX(4px);
      }
      100% {
        transform: translateX(-4px);
      }
    }
`

const Step = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1000px;
`

const StepCard = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    padding: 20px;
    background-color: white;
    color: black;
    height: 120px;
    border-radius: 5px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.378);
    text-align: start;

    animation: left 1s ease;

    @keyframes left {
      0% {
        transform: translateX(-100px);
      }
      100% {
        transform: translateX(0px);
      }
    }
`

const IconStep = styled.i`
    color: white;
    min-width: 72px;
    min-height: 72px;
    background-color: #107421;
    border-radius: 50%;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const LineDesignStep = styled.div`
    min-width: 3px;
    height: 120px;
    background-color: #107421;
`

const Footer = styled.footer`
    height: 330px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    padding: 50px 0px;
`

const ContainerColumnsFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 30px;
    width: 1000px;
`

const ColumnFooter = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const LineDesignFooter = styled.div`
    width: 1200px;
    min-height: 2px;
    background-color: #107421;
`

const cardInfos = [
  {
    title: 'Encontre Especialistas',
    description: 'Conecte-se com grupos de pesquisa especializados para atender a sua área de interesse.'
  },
  {
    title: 'Comunicação Eficiente',
    description: 'Facilitamos a gestão e o alinhamento entre as partes. Trabalhem juntos e de forma transparente.'
  },
  {
    title: 'Resultados Comprovados',
    description: 'Acompanhe o andamento das demandas e soluções, baseadas em conhecimento científico e tecnológico.'
  },
  {
    title: 'Segurança e Confiança',
    description: 'Conecte-se com grupos de pesquisa especializados para atender a sua área de interesse.'
  },
  {
    title: 'Encontre Oportunidades',
    description: 'Apresente seu conhecimento e do seu grupo de pesquisa e encontre demandas reais do mercado.'
  },
  {
    title: 'Ecossistema Local',
    description: 'A união de empresas/organizações locais, cria um ciclo que impulsiona a economia local e retém talentos.'
  }
]

const cardStepsRequester = [
  {
    icon: 'pi pi-file',
    passo: '1',
    title: 'Defina sua Necessidade',
    description: 'Para definir um grupo de pesquisa para o seu projeto, você terá duas opções: publicar a demanda de forma detalhada para que o grupos visualizem ou explorar os grupos disponíveis e escolher o que mais se encaixa no seu problema.'
  },
  {
    icon: 'pi pi-comments',
    passo: '2',
    title: 'Alinhe a Proposta',
    description: 'Receba propostas, após aceitar uma proposta será possível conversar com os pesquisadores pelo chat privado, aproveite para tirar dúvidas, negociar escopos, prazos e os custos da demanda.'
  },
  {
    icon: 'pi pi-users',
    passo: '3',
    title: 'Acompanhe o Desenvolvimento',
    description: 'Com o acordo entre as partes firmado, acompanhe o desenvolvimento da solução, valide as entregas e veja a sua solução ganhar vida.'
  },
  {
    icon: 'pi pi-check-circle',
    passo: '4',
    title: 'Finalize com Sucesso',
    description: 'Após a conclusão, realize os tramites finais, como efetuar o pagamento e deixe sua avaliação para fortalecer nosso ecossistema.'
  }
]

const cardStepsProvider = [
  {
    icon: 'pi pi-crown',
    passo: '1',
    title: 'Mostre seu Potencial',
    description: 'Para definir uma demanda e começar a desenvolver uma solução, você terá duas opções: criar umgrupo de pesquisa e tornar disponível para receber ofertas de demanda ou procurar por alguma demanda específica.       '
  },
  {
    icon: 'pi pi-file-check',
    passo: '2',
    title: 'Apresente a Proposta',
    description: 'Após encontrar uma demanda que interesse a equipe ou receba uma demanda, realize propostas detalhadas, converse com o demandante a partir do chat privado para alinhar expetativas e formalize os termos da parceria de forma clara e profissional.'
  },
  {
    icon: 'pi pi pi-cog',
    passo: '3',
    title: 'Execute o Projeto',
    description: 'Coloque a mão na massa, desenvolva a solução, realize as entregas combinadas e utilize a plataforma para registrar todo o progresso.'
  },
  {
    icon: 'pi pi-star-fill',
    passo: '4',
    title: 'Finalize com Sucesso',
    description: 'Após a conclusão, realize os tramites finais, como receber o pagamento e deixe sua avaliação para fortalecer nosso ecossistema.'
  }
]

function Home() {
  const [demand, setDemand] = React.useState(true);

  const handleButtonClick = () => {
    setDemand(!demand);
  };

  return (
    <Container>
      <Header>
        <h1 style={{ color: '#00420c', fontSize: '2rem' }}>Marketplace IFBA</h1>
        <Options>
          <a href="">Como funciona</a>
          <a href="">Projetos</a>
          <a href="">Sobre</a>
          <a href="">Instituições</a>
        </Options>
        <BtnLoginCadastro >
          <Button editStyle={{ backgroundColor: 'white', border: '1px solid #025911', color: '#00420c', minWidth: '100px' }}>Entrar</Button>
          <Button editStyle={{ minWidth: '100px' }}>Cadastro</Button>
        </BtnLoginCadastro>
      </Header>

      <Hero>
        <Title>Conectando <span style={{ color: '#FFE522' }}>Inovação</span> e <span style={{ color: '#FFE522' }}>Tecnologia</span></Title>
        <SubTitle>
          Plataforma que une instituições tecnológicas e grupos de pesquisa com empresas que precisam resolver problemas e desafios através da ciência, tecnologia e inovação.
        </SubTitle>
        <ContainerHeroButtons>
          <HeroButton>
            <Icon className='pi pi-building' />
            <p style={{ marginLeft: '20px' }}>Sou Empresa</p>
          </HeroButton>
          <HeroButton>
            <Icon className='pi pi-building-columns' />
            <p style={{ marginLeft: '20px' }}>Sou Instituição</p>
          </HeroButton>
        </ContainerHeroButtons>
        <Data>
          <DataItem><strong style={{ fontSize: '2.2rem' }}>100+</strong>Projetos realizados</DataItem>
          <DataItem><strong style={{ fontSize: '2.2rem' }}>20+</strong>Especialistas disponíveis</DataItem>
          <DataItem><strong style={{ fontSize: '2.2rem' }}>90%</strong>Taxa de Sucesso</DataItem>
        </Data>
      </Hero>

      <WhyChooseUsContainer>
        <h1 style={{ fontSize: '2.5rem' }}>Por que utilizar nossa plataforma?</h1>
        <p style={{ fontSize: '1.1rem', maxWidth: '590px', textAlign: 'center', marginTop: '-40px' }}>Oferecemos as ferramentas e conexões necessárias para transformar desafios em oportunidades de inovação.</p>
        <CardsWhyChooseUs>
          {cardInfos.map((card, index) => {
            return (
              <CardWhyChooseUs key={index}>
                <LineDesignCard />
                <InfosCardWhyChooseUs>
                  <h1>{card.title}</h1>
                  <p>{card.description}</p>
                </InfosCardWhyChooseUs>
              </CardWhyChooseUs>
            )
          })}
        </CardsWhyChooseUs>
      </WhyChooseUsContainer>

      <ConnectionContainer>
        <h1 style={{ fontSize: '2.5rem' }}>Como a <span style={{ color: '#FFE522' }}>Conexão</span> Acontece?</h1>
        <p style={{ fontSize: '1.1rem', marginTop: '-20px' }}>Descubra como conectar demandas e grupos de pesquisa de forma simples e eficaz.</p>

        <ContainerHeroButtons>
          <ConnectionButton isActive={demand} onClick={handleButtonClick}>
            <Icon className='pi pi-building' />
            <p style={{ marginLeft: '20px' }}>Demandante</p>
          </ConnectionButton>
          <div style={{ display: 'flex', flexDirection: 'column', color: 'white', gap: '5px' }}>
            <IconAnimationRight className='pi pi-arrow-left' />
            <IconAnimationLeft className='pi pi-arrow-right' />
          </div>
          <ConnectionButton isActive={!demand} onClick={handleButtonClick}>
            <Icon className='pi pi-building-columns' />
            <p style={{ marginLeft: '20px' }}>Demandado</p>
          </ConnectionButton>
        </ContainerHeroButtons>

        <Step>
          {demand === true && (
            <>
              {cardStepsRequester.map((step, index) => {
                return (
                  <StepCard key={index}>
                    <IconStep className={step.icon} />
                    <LineDesignStep />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-around', height: '100%' }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <p style={{ backgroundColor: '#107421', padding: '5px', borderRadius: '5px', color: 'white' }}>Passo {step.passo}</p>
                        <h3>{step.title}</h3>
                      </div>
                      <p>{step.description}</p>
                    </div>
                  </StepCard>
                )
              })}
            </>
          )}

          {demand === false && (
            <>
              {cardStepsProvider.map((step, index) => {
                return (
                  <StepCard key={index}>
                    <IconStep className={step.icon} />
                    <LineDesignStep />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-around', height: '100%' }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <p style={{ backgroundColor: '#107421', padding: '5px', borderRadius: '5px', color: 'white' }}>Passo {step.passo}</p>
                        <h3>{step.title}</h3>
                      </div>
                      <p>{step.description}</p>
                    </div>
                  </StepCard>
                )
              })}
            </>
          )}
        </Step>
      </ConnectionContainer>

      <Footer>
        <ContainerColumnsFooter>
          <ColumnFooter>
            <h2>Marketplace IFBA</h2>
            <p>Conectando inovação e tecnologia.</p>
          </ColumnFooter>
          <ColumnFooter>
            <h4>Plataforma</h4>
            <p>Como Funciona</p>
            <p>Recursos</p>
            <p>Sobre Nós</p>
          </ColumnFooter>
          <ColumnFooter>
            <h4>Suporte</h4>
            <p>Central de Ajuda</p>
            <p>Contato</p>
            <p>FAQ</p>
          </ColumnFooter>
          <ColumnFooter>
            <h4>Legal</h4>
            <p>Privacidade</p>
            <p>Termos</p>
            <p>Licenças</p>
          </ColumnFooter>
        </ContainerColumnsFooter>
        <LineDesignFooter />
        <p>© 2025 Marketplace IFBA. Todos os direitos reservados.</p>
      </Footer>
    </Container>
  );
}

export default Home;