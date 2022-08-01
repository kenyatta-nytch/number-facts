import React,{useState,useEffect} from 'react';
import styled,{css} from 'styled-components';
import { Transition } from 'react-transition-group';
import {Content,ErrorMessage} from './comon.js';
import {device} from '../device';

const FactWrapper = styled.div`
    flex: 1;
    width: 100%;
    max-width: 500px;
    display: flex;
    padding: 20px 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media ${device.mobileL}{
        width: 400px;
    }
    @media ${device.tablet}{
        width: 500px;
    }
    @media ${device.tabletL}{
        flex: 1;
        padding: 0 20px;
    }
    @media ${device.laptopM}{${props => props.home && css`
        flex: none;
        background-color: #222;
    `}}

`
const FactContent = styled.p`
    margin: 0;
    width: 100%;
    color: #ddd;
    padding: 10px;
    font-size: ${props => props.home? '16px':'18px'};
    text-align: center;
    position: relative;
    right: -100%;
    opacity: 0;
    transition: 1s ease;
    ${props => props.state === 'entering' && css`
        right: -100%;
        opacity: 0;
    `}
    ${props => props.state === 'entered' && css`
        right: 0;
        opacity: 1;
    `}
    ${props => props.state === 'exiting' && css`
        right: -100%;
        opacity: 0.5;
    `}
    ${props => props.state === 'exited' && css`
        right: -100%;
        opacity: 0;
    `}
    @media ${device.laptop}{
        font-size: 20px;
    }
    @media ${device.laptopM}{
        font-size: 22px;
    }
    @media ${device.laptop}{
        font-size: 24px;
    }
`

export default function FactComponent({type,math,trivia,today,year,error}){
    const [inProp,setProp] = useState(false);

    useEffect(() => {
        setProp(true);
        return () => setProp(false);
    },[])

    if( error ) return <ErrorMessage/>

    switch(type){
        case 'home':
        return(
            <FactWrapper home={true}>
                <Transition in={inProp} timeout={500}>
                    {state => <FactContent home={true} state={state}>{math}</FactContent>}
                </Transition>
                <Transition in={inProp} timeout={1000}>
                    {state => <FactContent home={true} state={state}>{trivia}</FactContent>}
                </Transition>
                <Transition in={inProp} timeout={1500}>
                    {state => <FactContent home={true} state={state}>{today}</FactContent>}
                </Transition>
                <Transition in={inProp} timeout={2000}>
                    {state => <FactContent home={true} state={state}>{year}</FactContent>}
                </Transition>
            </FactWrapper>
        )
        case 'dates':
            return(
                <FactWrapper>
                    <Transition in={inProp} timeout={500}>
                        {state => <FactContent state={state}>{ today }</FactContent>}
                    </Transition>
                    <Transition in={inProp} timeout={1000}>
                        {state => <FactContent state={state}>{ year }</FactContent>}
                    </Transition>
                </FactWrapper>
            )
        case 'numbers':
            return(
                <FactWrapper>
                    <Transition in={inProp} timeout={500}>
                        {state => <FactContent state={state}>{ trivia }</FactContent>}
                    </Transition>
                    <Transition in={inProp} timeout={1000}>
                        {state => <FactContent state={state}>{ math }</FactContent>}
                    </Transition>
                </FactWrapper>
            )
        default:
            return null;
    }
}
    
