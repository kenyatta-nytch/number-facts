import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import Navigation from './navigation';
import NumberComponent from './numberInput';
import FactComponent from './facts';
import {device} from '../device';

const NumberPage = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #222;
`
const PageContent = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    @media ${device.tabletL}{
        flex-direction: row;
        justify-content: space-around;
    }
`

export default function NumberFactsPage(){
    //input value constant and facts constants
    const [inputValue,setValue] = useState(Math.floor(Math.random()*1000));
    const [fetchValue,setFetch] = useState(inputValue);
    const [triviaFact,setTrivia] = useState('');
    const [mathFact,setMath] = useState('');
    const [isError,setIsError] = useState(false);
    const [isFetching,setIsFetching] = useState(false);

    const handle_click = () => setFetch(inputValue);

    useEffect(() => {
    //get trivia fact request
    function get_trivia_fact(){
        setIsFetching(true);
        fetch(`https://numbersapi.p.rapidapi.com/${fetchValue}/trivia`,{
            headers:{
                "content-type":"application/json",
                "x-rapidapi-host":"numbersapi.p.rapidapi.com",
                "x-rapidapi-key":"e94b61b478msh7dee581da5c28dep1726cfjsn0ddfcb013628",
            }
        })
        .then(response => response.json())
        .then(data => setTrivia(data.text))
        .catch(err=> setIsError(true))
        .then(()=>{ setIsFetching(false) });
    }
        get_trivia_fact()
    },[fetchValue])

    //make math fact request
    useEffect(() => {
    function get_math_fact(){
        setIsFetching(true);
        fetch(`https://numbersapi.p.rapidapi.com/${fetchValue}/math`,{
            headers:{
                "content-type":"application/json",
                "x-rapidapi-host":"numbersapi.p.rapidapi.com",
                "x-rapidapi-key":"e94b61b478msh7dee581da5c28dep1726cfjsn0ddfcb013628"
            }
        })
        .then(response => response.json())
        .then(data => setMath(data.text))
        .catch(err => setIsError(true))
        .then(()=>{ setIsFetching(false) });
    }
        get_math_fact()
    },[fetchValue])
    return(
        <NumberPage>
            <Navigation/>
            <PageContent>
                <NumberComponent value={inputValue} setValue={setValue} handleClick={handle_click} isFetching={isFetching}/>
                <FactComponent type='numbers' trivia={triviaFact} math={mathFact} error={isError}/>
            </PageContent>
        </NumberPage>
    )
}
