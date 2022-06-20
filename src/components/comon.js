import React from 'react';
// import Typing from 'react-typing-animation';
import styled,{css} from 'styled-components';

export const PageWrapper = styled.div`
    background: #222;
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: ${props => props.facts? 'space-around' : 'center'};
`

export const Section = styled.section`
    width: 100%;
    position: relative;
    height: 50%;
`
export const Container = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    ${props=>props.content && css`
        height: 90%;
        justify-content: center;
    `}
`
export const Content = styled.p`
    margin: 0;
    color: #808080;
    padding: 10px;
    font-size:${props => props.small? '22px' : '28px'};
    width: 100%;
    text-align: center;
`
export const StyledError = styled.p`
    color: #ff195e;
`
const MessageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const LoadingMessage = styled.p`
    color: #808080;
    margin: 0;
    font-size: 26px;
`

export const Card = styled.div`
    width: ${props=>props.alt? '500px':'800px'};
    height: ${props=>props.alt? '550px':'500px'};
    background: #fff;
    border-radius: 8px;
    margin-right: 10px;
    box-shadow: 0 20px 40px hsla(0, 0%, 0%, .4);

`

export function ErrorMessage(){
    return(
        <StyledError>Something wrong happended</StyledError>
    )
}




//********//
export const trial_data = 'Proident dolore amet consectetur consequat est ex. Minim magna et do consectetur consequat.'
