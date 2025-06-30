import React from 'react';
import styled from 'styled-components';
import 'primeicons/primeicons.css';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 300px;
    height: 200px;
    position: relative;
    border-radius: 20px;
    box-shadow: 0 4px 4px 0px #00000046;
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
    border-radius: 10px;
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
    background-color: #00ff2f88;
    border-radius: 0px 0px 20px 20px;
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
    border-radius: 10px;
    font-size: 1.2rem;
    border: none;
    font-weight: bold;
`

const Card = (props) => {

    return (
        <Container style={(props.Statistics || props.ButtonNewIdea) && { height: '150px' }}>
            <ContainerIcon>
                <Icon className={props.IconContainer} alt="Icon" />
            </ContainerIcon>
            <Title>{props.Title}</Title>
            {props.Infos &&
                props.Infos.map((info) => <Infos>{info}</Infos>)}
            {props.Statistics &&
                <Statistics>{props.Statistics}</Statistics>}
            {(!props.Statistics && !props.ButtonNewIdea) &&
                (<FooterCard>
                    <IconFooter className={`${props.HideView === "yes" ? 'pi pi-eye' : ''}`} alt="Icon" />
                    <Views className={props.HideView === "yes" ? '' : 'displayNone'} >{props.CountViews}</Views>
                    <Status style={{ color: props.ColorStatus }}>{props.Status}</Status>
                </FooterCard>)
            }
            {props.ButtonNewIdea &&
                <ButtonNewIdea>
                    <Icon className='pi pi-plus' alt="Icon" />
                    Criar Demanda
                </ButtonNewIdea>}

        </Container>
    )
}

export default Card;