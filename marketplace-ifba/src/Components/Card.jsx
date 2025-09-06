import React from 'react';
import styled from 'styled-components';
import 'primeicons/primeicons.css';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 300px;  
    max-width: 300px;
    min-height: 220px;
    position: relative;
    border-radius: var(--standard-border);
    box-shadow: 0 4px 4px 0px #00000046;
    cursor: pointer;
    background-color: white;

    &:hover {
        transform: translateY(-15px);
        transition: transform 0.3s ease-in-out;
        box-shadow: 0 8px 8px #00000039;
    }
`

const ContainerIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #00ff2f88;
    width: 50px;
    height: 50px;
    position: absolute;
    margin-top: -20px;
    margin-left: 20px;
    border-radius: var(--standard-border);
    box-shadow: 0 4px 4px 0px #00000046;
`

const Icon = styled.div`
    font-size: 2rem;
    color: #025911;
`

const Title = styled.h1`
    font-size: 1.3rem;
    margin: 40px 0px 0px 20px;
`

const Infos = styled.p`
    margin-left: 20px;
`

const FooterCard = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    margin-top: auto;
    border-top: 2px solid #00ff2f88;
`

const IconFooter = styled.i`
    font-size: 1rem;
    color: #025911;
    margin-left: 20px;
`

const Views = styled.p`
    margin-left: 5px;
    color: #025911;
`

const Status = styled.p`
    font-weight: bold;
    margin-left: auto;
    margin-right: 20px;
`

const Statistics = styled.h1`
    font-size: 3rem;
    margin-left: 20px;
`

const ButtonNewIdea = styled.button`
    background-color: #00ff2f88;
    width: 200px;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-left: 20px;
    border-radius: var(--standard-border);
    font-size: 1.2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
`

const ContainerTags = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
    flex-wrap: wrap;
    margin-left: 20px;
`

const ContainerStars = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 20px;
    gap: 5px;
`

const ButtonCard = styled.button`
    background-color: #00ff2f88;
    width: 150px;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: var(--standard-border);
    font-size: 1rem;
    border: none;
    font-weight: bold;
    bottom: 20px;
    right: 20px;
    position: absolute;
    cursor: pointer;

    &:hover, &:focus {
      background: #00ff2f88;
      box-shadow: 0 0 0 1px #00ff2f88, 0 0 0 2px #00ff2f88;
    }
`

const Card = (props) => {

    return (
        <Container style={{
            ...(props.Statistics || props.ButtonNewIdea) && { height: '100px' },
            ...(props.ButtonViewDetails || props.ButtonOpenConversation) && { paddingBottom: '100px' }
        }} onClick={!props.ButtonNewIdea && props.onClick ? props.onClick : undefined}>
            <ContainerIcon>
                <Icon className={props.IconContainer} alt="Icon" />
            </ContainerIcon>
            <Title>{props.Title}</Title>
            {props.Infos &&
                props.Infos.map((info) => <Infos key={info}>{info}</Infos>)}
            {props.Statistics &&
                <Statistics>{props.Statistics}</Statistics>}
            {(!props.Statistics && !props.ButtonNewIdea && !props.Tags && !props.ButtonOpenConversation) &&
                (<FooterCard>
                    <IconFooter className={`${props.HideView === "yes" ? 'pi pi-eye' : ''}`} alt="Icon" />
                    <Views className={props.HideView === "yes" ? '' : 'displayNone'} >{props.CountViews}</Views>
                    <Status style={{ color: props.ColorStatus }}>{props.Status}</Status>
                </FooterCard>)
            }
            {props.ReviewsStars &&
                <ContainerStars>
                    <span className='pi pi-star-fill' style={{ color: '#cbc749' }} />
                    <p>{props.ReviewsStars}</p>
                </ContainerStars>
            }
            {props.NewMessages &&
                <ContainerStars>
                    <span className='pi pi-envelope' style={{ color: '#018e1b', fontSize: '1.3rem' }} />
                    <p style={{ color: '#018e1b' }}>{props.NewMessages} Novas Mensagens</p>
                </ContainerStars>
            }
            {props.Tags &&
                <ContainerTags>
                    {props.Tags.map((tag, index) => (
                        <span key={index} style={{ backgroundColor: '#00ff2f88', padding: '5px 10px', borderRadius: '5px', color: '#025911' }}>
                            {tag}
                        </span>
                    ))}
                </ContainerTags>
            }
            {props.ButtonViewDetails &&
                <ButtonCard onClick={props.onClickButtonViewDetails}>
                    <Icon className='pi pi-eye' alt="Icon" style={{ fontSize: '1.5rem' }} />
                    Ver Detalhes
                </ButtonCard>}
            {props.ButtonOpenConversation &&
                <ButtonCard style={{ width: '170px' }} onClick={(props.onClickOpenConversation) && props.onClickOpenConversation}>
                    <Icon className='pi pi-eye' alt="Icon" style={{ fontSize: '1.5rem' }} />
                    Abrir Conversa
                </ButtonCard>}
            {props.ButtonNewIdea &&
                <ButtonNewIdea onClick={props.onClick}>
                    <Icon className='pi pi-plus' alt="Icon" />
                    Criar Demanda
                </ButtonNewIdea>}
        </Container>
    )
}

export default Card;