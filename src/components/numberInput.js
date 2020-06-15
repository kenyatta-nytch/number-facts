import React,{useState,useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {Card,Container,Content,ErrorMessage} from './comon.js';

const InputContainer = styled(Container)`
    height: 40%;
    justify-content: space-around;
    flex-direction: column;

`
const ResultContainer = styled(Container)`
    height: 60%;
    flex-direction: column;
`
const StyledInput = styled.input`
    outline: none;
    border: none;
    width: 90%;
    font-size: 80px;
    padding: 5px 10px;
    text-align: center;
    border-radius: 4px;
    color: #808080;
    background: #fff;
    transition: .5s ease;
    &:hover{
        background-color: #f5f5f5;
    }
    &:focus{
        outline: 1px solid #00ff0040;
        backround-color: #f5f5f5;
    }
`
const Text = styled.code`
    padding: 5px 10px;
    font-size: 16px;
    background-color: #f5f5f5;
    border-radius: 5px;
    color: #00aa00;
    box-shadow: 0 7px 14px -7px #00000040;
    cursor: pointer;
`
export default function NumberComponent(){
    //input value constant and facts constants
    const [value,setValue] = useState(Math.floor(Math.random()*1000));
    const [fetchValue,setFetchValue] = useState()
    const [trivia,setTrivia] = useState('');
    const [math,setMath] = useState('');
    const [isError,setIsError] = useState(false);
    const [isFetching,setIsFetching] = useState(false);

    useEffect(() => {
    //get trivia fact request
    function get_trivia_fact(){
        setIsFetching(true);
        axios({
            method: "GET",
            url: `https://numbersapi.p.rapidapi.com/${value}/trivia`,
            headers:{
                "content-type":"application/json",
                "x-rapidapi-host":"numbersapi.p.rapidapi.com",
                "x-rapidapi-key":"e94b61b478msh7dee581da5c28dep1726cfjsn0ddfcb013628",
            }
        })
        .then(res=>{ setTrivia(res.data) })
        .catch(err=>{ 
            setIsError(true);
            console.log(err.message);
        })
        .then(()=>{ setIsFetching(false) });
    }
        get_trivia_fact()
    },[fetchValue])

    //make math fact request
    useEffect(() => {
    function get_math_fact(){
        setIsFetching(true);
        axios({
            method: "GET",
            url: `https://numbersapi.p.rapidapi.com/${value}/math`,
            headers:{
                "content-type":"application/json",
                "x-rapidapi-host":"numbersapi.p.rapidapi.com",
                "x-rapidapi-key":"e94b61b478msh7dee581da5c28dep1726cfjsn0ddfcb013628"
            }
        })
        .then(res=>{ setMath(res.data) })
        .catch(err=>{
            setIsError(true);
            console.log(err.message);
        })
        .then(()=>{ setIsFetching(false) });
    }
        get_math_fact()
    },[fetchValue])

    return(
        <Card alt='true'>
            <InputContainer>
                <StyledInput
                    name='number'
                    type='number'
                    value={value}
                    min='0'
                    required={true}
                    disabled={isFetching? true : false}
                    onChange={e=>setValue(e.target.value)}
                />
                <Text type='button' onClick={e=>setFetchValue(value)} disabled={isFetching}>Pick A Number then click me :)</Text>
            </InputContainer>
            <ResultContainer>
                {isFetching? <Content>Getting Facts</Content> : isError? <ErrorMessage/> : <Content>{ trivia }</Content>}
                {isFetching? <Content>Getting Facts</Content> : isError? <ErrorMessage/> : <Content>{ math }</Content>}
            </ResultContainer>
        </Card>
    )
}
