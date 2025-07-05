import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-left: 4px solid #107421;
    background-color: #00ff2f81;
    padding: 20px;
`

const ContainerMembers = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 10px;
`

const ContainerImage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
`

const Image = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 50%;
`

const NoImage = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
`

const Information = ({ Title, Informations, Tags }) => {
    return <Container>
        <h2>{Title}</h2>
        {Informations && Informations.map((info, index) => (
            <div key={index}>
                <h3>{info.subTitle}</h3>
                {(info.description) && <p style={{ textAlign: 'justify' }}>{info.description}</p>}
                {(info.members) && (
                    <ContainerMembers>
                        {info.members.map((member) => (
                            <ContainerImage key={member.name}>
                                {(member.img_perfil) ? (<Image src={member.img_perfil} alt={member.name} />) : (<NoImage className='pi pi-user' />)}
                                <p>{member.name}</p>
                            </ContainerImage>
                        ))}
                    </ContainerMembers>
                )}
            </div>
        ))}
        {(Tags && Tags.length > 0) && (
            <>
                <p style={{ fontWeight: 'bold' }}>Áreas:</p>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {Tags.map((tag) => (
                        <span key={tag} style={{ backgroundColor: '#d4f7d4', padding: '5px', borderRadius: '5px', marginRight: '5px', width: 'fit-content', color: '#025911' }}>
                            {tag}
                        </span>
                    ))}
                </div>
            </>
        )}
    </Container>
}

export default Information;