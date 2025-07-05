import React from 'react';
import styled from 'styled-components';
import ContainerMainContent from './ContainerMainContent';
import Card from './Card';
import Chat from './Chat';
import Modal from './Modal';

const ContainerCards = styled.div`
    width: 100%;
    margin: 30px 0px 20px 0px;
    display: flex;
    gap: 30px;
`

const Conversations = () => {
    const [modal, setModal] = React.useState(false);

    function handleClickModal(event) {
        event.preventDefault();
        setModal(!modal);
    }

    return <ContainerMainContent>
        <h1>Conversas</h1>
        <ContainerCards>
            <Card IconContainer="pi pi-users" Title="Landing Page" Infos={['Grupo: Web Soluções', 'Instituição: IFBA']} ButtonOpenConversation NewMessages="5" onClickOpenConversation={handleClickModal} />
            <Card IconContainer="pi pi-users" Title="Landing Page" Infos={['Grupo: Web Soluções', 'Instituição: IFBA']} ButtonOpenConversation NewMessages="5" onClickOpenConversation={handleClickModal} />
        </ContainerCards>
        {(modal) && <Modal SetModal={setModal} View={modal}>
            <Chat Title='Landing Page' Messages={[{
                user: {
                    img_perfil: '',
                    name: 'Integrante 1'
                },
                message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac urna et lectus tristique auctor. Nam eleifend, velit eu imperdiet sollicitudin, sem magna vulputate magna, ut commodo nulla magna eget enim. Sed vel nunc eu neque elementum imperdiet. Proin et dolor eu elit ullamcorper tempus. Donec ut ornare arcu, at maximus eros. Nam sed varius nisi. Maecenas non felis non est venenatis venenatis. Praesent sed neque ut ligula pulvinar efficitur. Integer vitae erat quis massa vestibulum posuere.',
                dateTime: '17:20 | 20/02/2025'
            }, {
                user: {
                    img_perfil: '',
                    name: 'Integrante 1'
                },
                message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac urna et lectus tristique auctor. Nam eleifend, velit eu imperdiet sollicitudin, sem magna vulputate magna, ut commodo nulla magna eget enim. Sed vel nunc eu neque elementum imperdiet. Proin et dolor eu elit ullamcorper tempus. Donec ut ornare arcu, at maximus eros. Nam sed varius nisi. Maecenas non felis non est venenatis venenatis. Praesent sed neque ut ligula pulvinar efficitur. Integer vitae erat quis massa vestibulum posuere.',
                dateTime: '17:20 | 20/02/2025'
            }, {
                user: {
                    img_perfil: '',
                    name: 'Integrante 2'
                },
                message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac urna et lectus tristique auctor. Nam eleifend, velit eu imperdiet sollicitudin, sem magna vulputate magna, ut commodo nulla magna eget enim. Sed vel nunc eu neque elementum imperdiet. Proin et dolor eu elit ullamcorper tempus. Donec ut ornare arcu, at maximus eros. Nam sed varius nisi. Maecenas non felis non est venenatis venenatis. Praesent sed neque ut ligula pulvinar efficitur. Integer vitae erat quis massa vestibulum posuere.',
                dateTime: '17:20 | 20/02/2025'
            }, {
                user: {
                    img_perfil: '',
                    name: 'Integrante 2'
                },
                message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac urna et lectus tristique auctor. Nam eleifend, velit eu imperdiet sollicitudin, sem magna vulputate magna, ut commodo nulla magna eget enim. Sed vel nunc eu neque elementum imperdiet. Proin et dolor eu elit ullamcorper tempus. Donec ut ornare arcu, at maximus eros. Nam sed varius nisi. Maecenas non felis non est venenatis venenatis. Praesent sed neque ut ligula pulvinar efficitur. Integer vitae erat quis massa vestibulum posuere.',
                dateTime: '17:20 | 20/02/2025'
            }, {
                user: {
                    img_perfil: '',
                    name: 'Integrante 2'
                },
                message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac urna et lectus tristique auctor. Nam eleifend, velit eu imperdiet sollicitudin, sem magna vulputate magna, ut commodo nulla magna eget enim. Sed vel nunc eu neque elementum imperdiet. Proin et dolor eu elit ullamcorper tempus. Donec ut ornare arcu, at maximus eros. Nam sed varius nisi. Maecenas non felis non est venenatis venenatis. Praesent sed neque ut ligula pulvinar efficitur. Integer vitae erat quis massa vestibulum posuere.',
                dateTime: '17:20 | 20/02/2025'
            }
            ]} /> </Modal>}

    </ContainerMainContent>
}

export default Conversations;