import React,{useState,useEffect} from 'react';
import styled,{css} from 'styled-components';
import { Transition } from 'react-transition-group';
import axios from 'axios';
import Navigation from './navigation';
import FactComponent from './facts';
import { trial_data,GettingFacts } from './comon';
import {device} from '../device';

const HomeWrapper = styled.div`
    width: 100vw;
    min-height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #222;
`
const Footer = styled.h1`
    width: 100%;
    margin: 0;
    text-align: center;
    font-family: 'Gravitas One', cursive;
    font-size: 50px;
    color: #222;
    text-shadow: -6px 10px 18px #111;
    display: inline-block;
    position: relative;
    left: -100%;
    opacity: 0;
    transition: 1s ease;
    ${props => props.month && css`
        margin-bottom: 0;
    `}
    ${props => props.state === 'entering' && css`
        left: -100%;
        opacity: 0;
    `}
    ${props => props.state === 'entered' && css`
        left: 0;
        opacity: 1;
    `}
    ${props => props.state === 'exiting' && css`
        left: -100%;
        opacity: 0;
    `}
    ${props => props.state === 'exited' && css`
        left: -100%;
        opacity: 0;
    `}
    @media ${device.mobileM}{
        font-size: 60px;
    }
    @media ${device.mobileL}{
        font-size: 65px;
    }
    @media ${device.tablet}{
        font-size: 90px;
    }
    @media ${device.tabletL}{
        font-size: 110px;
    }
    @media ${device.laptop}{
        font-size: 130px;
    }
    @media ${device.laptopM}{
        font-size: 190px;
    }
`
const HomeMain = styled.div`
    flex: 1;
    width: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background-color: #222;
    @media ${device.laptop}{
        flex-direction: row;
        justify-content: space-around;
    }
    @media ${device.laptopM}{
        justify-content: flex-start;
    }
`
const HomeFooter = styled.div`
    height: 80px;
    width: 100vw;
    overflow-x: hidden;
    @media ${device.tablet}{
        height: 114px;
    }
    @media ${device.tabletL}{
        height: 140px;
    }
    @media ${device.laptop}{
        height: 165px;
    }
    @media ${device.laptopM}{
        height: 245px;
    }
`
const HomeDate = styled.div`
    opacity: 0;
    transition: 1s ease;
    display: flex;
    justify-content: center;

    ${props => props.state === 'entered' && css`
        opacity: 1;
    `}
    @media ${device.laptop}{
        display: block;
        flex: 1;
    }
    @media ${device.laptopM}{
        flex: none;
        margin: 0 100px;
    }
`
const DateDisplay = styled.h1`
    margin: 0 10px;
    text-align: center;
    font-size: 50px;
    color: #ff1c60;
    @media ${device.mobileM}{
        font-size: 70px;
    }
    @media ${device.tablet}{
        font-size: 80px;
    }
    @media ${device.laptop}{
        font-size: 90px;
    }
    @media ${device.laptopM}{
        font-size: 100px;
    }
`


function HomeComponent() {
    const today_date = new Date();
    //in prop for transition
    const [inProp, setInProp] = useState(false);
    const [fetching,setFetching] = useState(false);

    //set in prop true on mount and false on unmount
    useEffect(() => {
        setInProp(true);
        setFetching(true);
        
        const timer = setTimeout(() => {
            setFetching(false);
        },11000)
        return () =>{ 
            setInProp(false);
            clearTimeout(timer);
        }
    },[])

    //date constants
    const day = today_date.getDate();
    const month = today_date.getMonth()
    const current_year = today_date.getUTCFullYear();

    //request constants
    const [math,setMath] = useState('');
    const [trivia,setTrivia] = useState('');
    const [today,setToday] = useState('');
    const [year,setYear] = useState('');
    const [isError,setIsError] = useState(false);

    //perform requests
    useEffect(()=>{
        axios({
            method:"GET",
            url:`https://numbersapi.p.rapidapi.com/${day}/math`,
            headers:{
                "content-type":"application/json",
                "x-rapidapi-host":"numbersapi.p.rapidapi.com",
                "x-rapidapi-key":"e94b61b478msh7dee581da5c28dep1726cfjsn0ddfcb013628"
            },
            params:{
                "fragment":"false",
            }
        })
        .then((response)=>{
            setMath(day+' is '+response.data);
        })
        .catch((error)=>{
            setIsError(true);
        }) 
    },[day])

    useEffect(()=>{
        axios({
            method:"GET",
            url:`https://numbersapi.p.rapidapi.com/${day}/trivia`,
            headers:{
                "content-type":"application/json",
                "x-rapidapi-host":"numbersapi.p.rapidapi.com",
                "x-rapidapi-key":"e94b61b478msh7dee581da5c28dep1726cfjsn0ddfcb013628"
            },
            params:{
                "fragment":"false",
            }
        })
        .then((response)=>{
            setTrivia(day+' is '+response.data);
        })
        .catch((error)=>{
            setIsError(true);
        }) 
    },[day])

    useEffect(()=>{
        axios({
            method:"GET",
            url:`https://numbersapi.p.rapidapi.com/${day}/${month}/date`,
            headers:{
                "content-type":"application/json",
                "x-rapidapi-host":"numbersapi.p.rapidapi.com",
                "x-rapidapi-key":"e94b61b478msh7dee581da5c28dep1726cfjsn0ddfcb013628"
            },
            params:{
                "fragment":"false",
            }
        })
        .then((res)=>{
            console.log(res)
            setToday(`On this date, ${res.data}`);
        })
        .catch((error)=>{
            setIsError(true);
        }) 
    },[day, month])

    useEffect(()=>{
        axios({
            method:"GET",
            url:`https://numbersapi.p.rapidapi.com/${current_year}/year`,
            headers:{
                "content-type":"application/json",
                "x-rapidapi-host":"numbersapi.p.rapidapi.com",
                "x-rapidapi-key":"e94b61b478msh7dee581da5c28dep1726cfjsn0ddfcb013628"
            },
            params:{
                "fragment":"false",
            }
        })
        .then((response)=>{
            setYear('This year, '+response.data);
        })
        .catch((error)=>{
            setIsError(true);
        }) 
    },[current_year])

  return (
    <HomeWrapper>
        <Navigation/>
        <HomeMain>
            <Transition in={inProp} timeout={1000}>
                {state => 
                    <HomeDate state={state}>
                        <DateDisplay>{ today_date.toLocaleString('default',{ day: 'numeric',year: 'numeric' }) }</DateDisplay>
                        <DateDisplay>{ today_date.toLocaleString('default',{month: 'long'}) }</DateDisplay>
                    </HomeDate>
                }
            </Transition>
            <FactComponent type='home' math={math} trivia={trivia} today={today} year={year} error={isError}/>
        </HomeMain>
        <HomeFooter>
            <Transition in={inProp} timeout={1000}>
                {state => <Footer state={state}>{ today_date.toLocaleString('default',{weekday: 'long'}) }</Footer> }
            </Transition>
        </HomeFooter>
    </HomeWrapper>
  );
}

export default HomeComponent;
