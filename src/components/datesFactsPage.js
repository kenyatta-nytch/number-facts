import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import {getDate,getMonth,getYear} from 'date-fns';
import Navigation from './navigation';
import CalendarComponent from './calendar';
import FactComponent from './facts';
import {device} from '../device';

const DatePage = styled.div`
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #222;
`
const PageContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    @media ${device.tabletL}{
        flex-direction: row;
        justify-content: space-around;
    }
`

export default function DateFactsPage(){
    const [selectedDate,setSelectedDate] = useState(new Date());
    //const for fetching facts from api 
    const activeDate = getDate(selectedDate);
    const activeMonth = getMonth(selectedDate)+1;
    const activeYear = getYear(selectedDate);
    //save the date facts
    const [dateFact,setDateFact] = useState('');
    const [yearFact,setYearFact] = useState('');
    const [isError,setIsError] = useState(false);
    // const [isFetching,setIsFetching] = useState(false);

    //fetch facts
    useEffect(() => {
        const getDateFact = () => {
            fetch(`https://numbersapi.p.rapidapi.com/${activeMonth}/${activeDate}/date`,{
                headers:{
                    "content-type":"application/json",
                    "x-rapidapi-host":"numbersapi.p.rapidapi.com",
                    "x-rapidapi-key":"e94b61b478msh7dee581da5c28dep1726cfjsn0ddfcb013628"
                }
            })
                .then(response => response.json())
                .then(data => setDateFact(data.text))
                .catch(error => setIsError(true));
        }
        getDateFact();
    },[selectedDate,activeMonth,activeDate])

    useEffect(() => {
        const getYearFact = () => {
            fetch(`https://numbersapi.p.rapidapi.com/${activeYear}/year`,{
                headers:{
                    "content-type":"application/json",
                    "x-rapidapi-host":"numbersapi.p.rapidapi.com",
                    "x-rapidapi-key":"e94b61b478msh7dee581da5c28dep1726cfjsn0ddfcb013628"
                }
            })
                .then(response => response.json())
                .then(data => setYearFact(data.text))
                .catch(error => setIsError(true));
        }
        getYearFact();
    },[selectedDate,activeYear])

    return(
        <DatePage>
            <Navigation/>
            <PageContent>
                <CalendarComponent setSelectedDate={setSelectedDate} selectedDate={selectedDate}/>
                <FactComponent type='dates' today={dateFact} year={yearFact} error={isError}/>
            </PageContent>
        </DatePage>
    )
}
