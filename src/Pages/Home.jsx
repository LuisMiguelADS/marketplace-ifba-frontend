import React from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import Button from '../Components/Forms/Button';
import { useNavigate } from 'react-router-dom';

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
  padding: 15px 20px;
  
  @media (max-width: 1200px) {
    padding: 15px 40px;
  }
  
  @media (max-width: 768px) {
    padding: 15px 20px;
  }
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

  @media (max-width: 768px) {
    display: none;
  }
`

const BtnLoginCadastro = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`

const HamburgerButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;

  @media (max-width: 768px) {
    display: flex;
  }

  span {
    width: 30px;
    height: 3px;
    background: #00420c;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    &:first-child {
      transform: ${({ $isOpen }) => $isOpen ? 'rotate(45deg)' : 'rotate(0)'};
    }

    &:nth-child(2) {
      opacity: ${({ $isOpen }) => $isOpen ? '0' : '1'};
      transform: ${({ $isOpen }) => $isOpen ? 'translateX(20px)' : 'translateX(0)'};
    }

    &:nth-child(3) {
      transform: ${({ $isOpen }) => $isOpen ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`

const MobileMenu = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  transform: ${({ $isOpen }) => $isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  padding: 80px 30px 30px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
`

const MobileMenuOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${({ $isOpen }) => $isOpen ? '1' : '0'};
  visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;

  @media (max-width: 768px) {
    display: block;
  }
`

const MobileMenuLink = styled.a`
  text-decoration: none;
  color: #00420c;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #004d00;
  }
`

const MobileMenuButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
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
    
    @media (max-width: 768px) {
        margin-left: 20px;
        margin-right: 20px;
    }
`;

const ContainerHeroButtons = styled.div`
    display: flex;
    gap: 30px;
    align-items: center;
    
    @media (max-width: 550px) {
        flex-direction: column;
        gap: 20px;
    }
`

const HeroButton = styled(Button)`
    background-color: ${props => props.$isActive ? '#107421' : 'white'};
    color: ${props => props.$isActive ? 'white' : '#107421'};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 60px;
    min-width: 200px;
    width: 200px;
    padding: 0 20px;
    box-shadow: 0 3px 6px #00420c;
    transition: all 0.1s ease;
    position: relative;

    @media (max-width: 768px) {
        width: 260px;
        min-width: 220px;
    }

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
    width: 100%;
    max-width: 1020px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    
    @media (max-width: 1200px) {
        padding: 0 40px;
    }
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 20px;
        align-items: center;
    }
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
    padding: 60px 20px;
    
    @media (max-width: 1200px) {
        padding: 60px 40px;
    }
    
    @media (max-width: 768px) {
        padding: 40px 20px;
    }
`

const CardsWhyChooseUs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  width: 100%;
  max-width: 1260px;
  padding: 0 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 900px) {
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
  
  @media (max-width: 1200px) {
    padding: 5rem 3rem;
  }
  
  @media (max-width: 768px) {
    padding: 3rem 2rem;
  }
`
const ConnectionButton = styled(Button)`
    background-color: ${props => props.$isActive ? '#107421' : 'white'};
    color: ${props => props.$isActive ? 'white' : '#107421'};
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

    @media (max-width: 768px) {
        width: 260px;
    }
`

const IconAnimationRight = styled.span`
    animation: oscilarRight 2s ease-in-out infinite alternate;

    @keyframes oscilarRight {
      0% {
        transform: translateX(-4px);
      }
      100% {
        transform: translateX(4px);
      }
    }
`

const IconAnimationLeft = styled.span`
    animation: oscilarLeft 2s ease-in-out infinite alternate;

    @keyframes oscilarLeft {
      0% {
        transform: translateX(4px);
      }
      100% {
        transform: translateX(-4px);
      }
    }
`

const IconAnimationTop = styled.span`
    animation: oscilarTop 2s ease-in-out infinite alternate;

    @keyframes oscilarTop {
      0% {
        transform: translateY(-4px);
      }
      100% {
        transform: translateY(4px);
      }
    }
`

const IconAnimationBottom = styled.span`
    animation: oscilarBottom 2s ease-in-out infinite alternate;

    @keyframes oscilarBottom {
      0% {
        transform: translateY(4px);
      }
      100% {
        transform: translateY(-4px);
      }
    }
`

const ArrowContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: white;
    gap: 5px;

    .arrow-vertical {
        display: none;
    }

    @media (max-width: 600px) {
        flex-direction: row;
        gap: 10px;
        
        .arrow-horizontal {
            display: none;
        }
        
        .arrow-vertical {
            display: inline;
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
    padding: 10px;
    background-color: white;
    color: black;
    min-height: 120px;
    border-radius: 5px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.378);
    text-align: start;

    animation: left 1s ease;

    @media (max-width: 768px) {
        padding: 15px;
    }

    @media (max-width: 480px) {
        align-items: flex-start;
        gap: 10px;
    }

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

    @media (max-width: 768px) {
        min-width: 60px;
        min-height: 60px;
        font-size: 1.7rem;
    }

    @media (max-width: 480px) {
        min-width: 50px;
        min-height: 50px;
        font-size: 1.4rem;
    }

    @media (max-width: 360px) {
        min-width: 45px;
        min-height: 45px;
        font-size: 1.2rem;
    }
`

const LineDesignStep = styled.div`
    min-width: 3px;
    height: 120px;
    background-color: #107421;

    @media (max-width: 768px) {
        height: 180px;
    }

    @media (max-width: 480px) {
        display: none;
    }
`

const StepContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    height: 100%;
`

const StepHeader = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
    }
`

const StepBadge = styled.p`
    background-color: #107421;
    padding: 5px;
    border-radius: 5px;
    color: white;
    white-space: nowrap;
    margin: 0;
`

const Footer = styled.footer`
    height: 330px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
    padding: 50px 0px;

    @media (max-width: 768px) {
        padding: 30px 20px 50px 20px;
        text-align: center;
    }

    p {
        @media (max-width: 768px) {
            text-align: center;
            margin: 0;
        }
    }
`

const ContainerColumnsFooter = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 30px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        width: 90%;
    }
`

const ColumnFooter = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (max-width: 768px) {
        align-items: center;
        text-align: center;
    }
`

const LineDesignFooter = styled.div`
    width: 100%;
    max-width: 1200px;
    min-height: 2px;
    background-color: #107421;
    margin: 0 20px;

    @media (max-width: 1200px) {
        margin: 0 40px;
    }

    @media (max-width: 768px) {
        width: 90%;
        max-width: 400px;
        margin: 0;
    }
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
    description: 'Descreva sua necessidade de forma detalhada para encontrar pessoas que possam solucioná-la. Nesse caso, aceite propostas de grupos interessados ou envie diretamente para um grupo que gerou interesse.'
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
    description: 'Após a conclusão, realize as formalidades finais, como efetuar o pagamento e deixe sua avaliação para fortalecer nosso ecossistema.'
  }
]

const cardStepsProvider = [
  {
    icon: 'pi pi-crown',
    passo: '1',
    title: 'Mostre seu Potencial',
    description: 'Junte-se a grupos de pesquisa e comece a desenvolver soluções. Sendo assim, o grupo pode aceitar demandas ou procurar uma que gerou interesse.'
  },
  {
    icon: 'pi pi-file-check',
    passo: '2',
    title: 'Apresente a Proposta',
    description: 'Após aceitar uma demanda ou selecionar uma demanda específica, realize propostas detalhadas e converse com o demandante a partir do chat privado, para alinhar o projeto e expectativas. Formalize os termos de parceria de forma profissional.'
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
    description: 'Após a conclusão, realize as formalidades finais e deixe sua avaliação para fortalecer nosso ecossistema.'
  }
]

const TitleLogo = styled.h1`
  color: #00420c;
  font-size: 2rem;
  font-weight: bold;
`

function Home() {
  const [demand, setDemand] = React.useState(true);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDemandanteClick = () => {
    setDemand(true);
  };

  const handleDemandadoClick = () => {
    setDemand(false);
  };

  const handleClickButtonsHeader = (event) => {
    if (event.target.name === 'login') {
      navigate("/login")
    } else if (event.target.name === 'register') {
      navigate("/register")
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <Container>
      <Header>
        <TitleLogo>Marketplace IFBA</TitleLogo>
        <Options>
          <a href="">Como funciona</a>
          <a href="">Projetos</a>
          <a href="">Sobre</a>
          <a href="">Instituições</a>
        </Options>
        <BtnLoginCadastro >
          <Button name='login' onClick={handleClickButtonsHeader} editStyle={{ backgroundColor: 'white', border: '1px solid #025911', color: '#00420c', minWidth: '100px' }}>Entrar</Button>
          <Button name='register' onClick={handleClickButtonsHeader} editStyle={{ minWidth: '100px' }}>Cadastro</Button>
        </BtnLoginCadastro>
        <HamburgerButton $isOpen={isMenuOpen} onClick={toggleMenu}>
          <span />
          <span />
          <span />
        </HamburgerButton>
      </Header>

      <MobileMenuOverlay $isOpen={isMenuOpen} onClick={closeMenu} />
        <MobileMenu $isOpen={isMenuOpen}>
        <MobileMenuLink href="">Como funciona</MobileMenuLink>
        <MobileMenuLink href="">Projetos</MobileMenuLink>
        <MobileMenuLink href="">Sobre</MobileMenuLink>
        <MobileMenuLink href="">Instituições</MobileMenuLink>
        <MobileMenuButtons>
          <Button name='login' onClick={(e) => { handleClickButtonsHeader(e); closeMenu(); }} editStyle={{ backgroundColor: 'white', border: '1px solid #025911', color: '#00420c', minWidth: '100px' }}>Entrar</Button>
          <Button name='register' onClick={(e) => { handleClickButtonsHeader(e); closeMenu(); }} editStyle={{ minWidth: '100px' }}>Cadastro</Button>
        </MobileMenuButtons>
      </MobileMenu>

      <Hero>
        <Title>Conectando <span style={{ color: '#FFE522' }}>Inovação</span> e <span style={{ color: '#FFE522' }}>Tecnologia</span></Title>
        <SubTitle>
          Plataforma que une instituições tecnológicas e grupos de pesquisa com organizações que precisam resolver problemas e desafios através da ciência, tecnologia e inovação.
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
          <ConnectionButton $isActive={demand} onClick={handleDemandanteClick}>
            <Icon className='pi pi-building' />
            <p style={{ marginLeft: '20px' }}>Demandante</p>
          </ConnectionButton>
          <ArrowContainer>
            <IconAnimationRight className='pi pi-arrow-right arrow-horizontal' />
            <IconAnimationLeft className='pi pi-arrow-left arrow-horizontal' />
            <IconAnimationTop className='pi pi-arrow-up arrow-vertical' />
            <IconAnimationBottom className='pi pi-arrow-down arrow-vertical' />
          </ArrowContainer>
          <ConnectionButton $isActive={!demand} onClick={handleDemandadoClick}>
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
                    <StepContent>
                      <StepHeader>
                        <StepBadge>Passo {step.passo}</StepBadge>
                        <h3>{step.title}</h3>
                      </StepHeader>
                      <p style={{ margin: '10px 0', textAlign: 'justify' }}>{step.description}</p>
                    </StepContent>
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
                    <StepContent>
                      <StepHeader>
                        <StepBadge>Passo {step.passo}</StepBadge>
                        <h3>{step.title}</h3>
                      </StepHeader>
                      <p>{step.description}</p>
                    </StepContent>
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