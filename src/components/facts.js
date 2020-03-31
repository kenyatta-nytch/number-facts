import React,{useState} from 'react';
import styled,{css} from 'styled-components';
import {Container,Content,ErrorMessage} from './comon.js';

const FactWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;

`
const Link = styled.p`
    cursor: pointer;
    margin: 0 5px;
    padding: 5px;
    border-radius: 2px;
    font-size: 17px;
    color: #bbb;
    font-weight: bold;
    ${props=>props.active && css`
        color: #008000;
        background-color: rgba(0, 255, 0, 0.2);
    `}
`

export default function FactComponent({math,trivia,today,year,error}){
    const [active,setActive] = useState('today');

    //function to switch displays
    function displays(){
        switch(active){
            case 'today':
                return <Content>{today === ''?'Chill, Im getting my facts': today }</Content>
            case 'trivia':
                return <Content>{trivia === ''?'Chill, Im getting my facts': trivia }</Content>
            case 'math':
                return <Content>{math === ''?'Chill, Im getting my facts': math }</Content>
            case 'year':
                return <Content>{year === ''?'Chill, Im getting my facts': year }</Content>
            default:
                return undefined;
        }
    }
    
    return(
        <FactWrapper>
            <Container nav>
                <Link active={active === 'math'} onClick={e=>setActive('math')}>Math</Link>
                <Link active={active === 'trivia'} onClick={e=>setActive('trivia')}>Trivia</Link>
                <Link active={active === 'today'} onClick={e=>setActive('today')}>Today</Link>
                <Link active={active === 'year'} onClick={e=>setActive('year')}>Year</Link>
            </Container>
            <Container content>
                {error? <ErrorMessage/> : displays()}
            </Container>
        </FactWrapper>
    )
}
