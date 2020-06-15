import React,{useState,useEffect} from 'react';
import styled,{css} from 'styled-components';
import axios from 'axios';
import {PageWrapper,Card,Section} from './comon';
import FactComponent from './facts';

const Header = styled.h1`
    width: 100%;
    text-align: center;
    font-size: 78px;
    color: #bbb;
    display: inline-block;
    ${props => props.month && css`
        margin-bottom: 0;
    `}
`

function HomeComponent() {
    const today_date = new Date();

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
    <PageWrapper>
        <Card>
            <Section>
                <Header>{ today_date.toDateString() }</Header>
            </Section>
            <Section>
                <FactComponent math={math} trivia={trivia} today={today} year={year} error={isError}/>
            </Section>
        </Card>
    </PageWrapper>
  );
}

export default HomeComponent;
