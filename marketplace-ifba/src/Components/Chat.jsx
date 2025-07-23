import React from 'react';
import styled from 'styled-components';
import useForm from '../Hooks/useForm';
import Input from './Forms/Input';

const Container = styled.div`
    min-width: 400px;
    max-width: 1000px;
    background-color: #D6FFDE;
    padding: 30px 0px;
    border-radius: var(--standard-border);
    max-height: 700px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    
`

const Messages = styled.div`
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
    height: fit-content;
    padding: 10px 30px;
    border-top: 1px solid #01420c; 
    border-bottom: 1px solid #01420c; 

    &::-webkit-scrollbar {
        width: 20px;
        background-color: #01420c;
    }

    &::-webkit-scrollbar-thumb {
        height: 60px; 
        background-color: #018e1b;
        border-radius: 5px;
        border: 2px solid #00420C;
    }&::-webkit-scrollbar {
        width: 20px;
        background-color: #01420c;
    }

    &::-webkit-scrollbar-thumb {
        height: 60px; 
        background-color: #018e1b;
        border-radius: 5px;
        border: 2px solid #00420C;
    }
`

const Message = styled.div`
    text-align: justify;
    display: flex;
    flex-direction: column;
`

const ContentMessage = styled.p`
    margin-left: 70px;
    background-color: white;
    padding: 5px;
    border: 1px solid black;
    border-radius: var(--standard-border);
    margin-bottom: 5px;
`

const ContainerImage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
`

const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`

const NoImage = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
`

const SendMessage = styled.form`
    margin: 0px 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`

const SendButton = styled.button`
    font-size: 1.5rem;
    cursor: pointer;
    border: none;
    border-radius: 50%;
    background: #025911;
    color: white;
    min-width: 60px;
    min-height: 60px;
    transition: 0.1s;

    &:hover, &:focus {
      outline: none;
      background: #018e1b;
      box-shadow: 0 0 0 1px #018e1b, 0 0 0 2px #025911;
      font-size: 1.8rem;
    }

    &:disabled {
      opacity: 0.5;
      cursor: wait;
    }
`

const Chat = (props) => {
    const contentMessage = useForm();

    return <Container>
        <h1 style={{ paddingLeft: '30px' }}>{props.Title}</h1>
        <Messages>
            {props.Messages && props.Messages.map((msg, index) => {
                return <div key={index}>
                    {(msg.user.name === 'Integrante 1') ?
                        <Message>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <ContainerImage>
                                    {(msg.user.img_perfil) ? (<Image src={msg.user.img_perfil} alt={msg.user.name} />) : (<NoImage className='pi pi-user' />)}
                                </ContainerImage>
                                <h3>{msg.user.name}</h3>
                            </div>
                            <ContentMessage>{msg.message}</ContentMessage>
                            <p style={{ marginLeft: '70px' }}>{msg.dateTime}</p>
                        </Message> :
                        <Message style={{ alignItems: 'end' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <h3>Você</h3>
                                <ContainerImage>
                                    {(msg.user.img_perfil) ? (<Image src={msg.user.img_perfil} alt={msg.user.name} />) : (<NoImage className='pi pi-user' />)}
                                </ContainerImage>
                            </div>
                            <ContentMessage style={{ marginRight: '70px', backgroundColor: '#77FF90' }}>{msg.message}</ContentMessage>
                            <p style={{ marginRight: '70px' }}>{msg.dateTime}</p>
                        </Message>
                    }
                </div>
            })}
        </Messages>
        <SendMessage>
            <Input editStyle={{ width: '870px' }} type="textarea" name="message" {...contentMessage} placeholder="Escreva..." />
            <SendButton className='pi pi-send' />
        </SendMessage>
    </Container>
}

export default Chat;