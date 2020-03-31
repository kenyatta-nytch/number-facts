import React,{useState,useEffect} from 'react';
import styled,{css} from 'styled-components';
import axios from 'axios';
import {format,toDate,addMonths,addDays,subMonths,startOfMonth,startOfWeek,endOfMonth,endOfWeek,isSameMonth,isSameDay,getDate,getMonth,getYear} from 'date-fns';
import {Card,Container,Content,ErrorMessage} from './comon.js';

const FactWrapper = styled(Container)`
    flex-direction: column;
    width: 500px;
`

const Calendar = styled.div`
    margin: 0 auto;
    width: 500px;
    height: 260px;
    position: relative;
    border: 1px solid #bbb;
    border-radius: 4px;
`
const HeaderContainer = styled(Container)`
    justify-content: space-between;
    background-color: #fff;
`
const NavBtn = styled.div`
    cursor: pointer;
    padding: 5px 10px;
    font-size: 18px;
    transition: .5s ease;
    &:hover{
        background-color: rgba(0, 255, 0, 0.2);
        color: #00aa00;
    }
`
const Header = styled.h3`
    margin: 0;
    text-transform: uppercase;
`
const DaysContainer = styled(Container)`
    justify-content: space-evenly;
    background-color: #eee;
`
const WeekDay = styled.p`
    margin: 0;
    width: 70px;
    padding: 10px;
    font-weight: bold;
    font-size: 18px;
    text-align: center;
    text-transform: uppercase;
`
const CellContainer = styled.div`
    position: relative;
`
const Week = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`
const Cell = styled.div`
    cursor: pointer;
    width: 70px;
    height: 30px;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: none;
    transition: .5s ease;
    &:hover{
        background-color: rgba(0, 255, 0, .2);
    }
    ${props => props.disabled && css`
        background-color: #f5f5f5;
    `}
    ${props => props.selected && css`
        background-color: rgba(0, 255, 0, .2);
        color: #00aa00;
    `}
`
const Title = styled(Content)`
    padding: 5px 0;
    color: #00aa00;

`
export default function CalendarComponent(){
    //save current and selected days
    const [currentDate,setCurrentDate] = useState(new Date());
    const [selectedDate,setSelectedDate] = useState(new Date());
    //get the date, month and year from selected date
    const activeDate = getDate(selectedDate);
    const activeMonth = getMonth(selectedDate);
    const activeYear = getYear(selectedDate);
    //save date and year facts
    const [dateFact,setDateFact] = useState('');
    const [yearFact,setYearFact] = useState('');
    const [isError,setIsError] = useState(false);
    const [isFetching,setIsFetching] = useState(false);

    useEffect(()=>{
        get_date_fact();
        get_year_fact();
    },[])

    function get_date_fact(){
        //make the facts requests
        setIsFetching(true);
        axios({
            method:"GET",
            url:`https://numbersapi.p.rapidapi.com/${activeDate}/${activeMonth}/date`,
            headers:{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"numbersapi.p.rapidapi.com",
                "x-rapidapi-key":"e94b61b478msh7dee581da5c28dep1726cfjsn0ddfcb013628"
            },
            params:{
                "fragment":"true",
                "json":"true"
            }
        })
        .then(res=>{ setDateFact(res.data.text) })
        .catch(err=>{ setIsError(true) })
        .then(()=>{ setIsFetching(false) });
    }

    function get_year_fact(){
        setIsFetching(true);
        axios({
            method: "GET",
            url:`https://numbersapi.p.rapidapi.com/${activeYear}/year`,
            headers:{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"numbersapi.p.rapidapi.com",
                "x-rapidapi-key":"e94b61b478msh7dee581da5c28dep1726cfjsn0ddfcb013628"
            },
            params:{
                "fragment":"false",
                "json":"true"
            }
        })
        .then(res=>{ setYearFact(res.data.text) })
        .catch(err=>{ setIsError(true) })
        .then(()=>{ setIsFetching(false) });
    }
    //function to get our calendar header that includes current month, year and nav buttons
    function renderHeader(){
        const dateFormat = 'MMMM yyyy';
        return(
            <HeaderContainer>
                <NavBtn onClick={e=>prevMonth()}> Prev </NavBtn>
                <Header>{ format(currentDate,dateFormat) }</Header>
                <NavBtn onClick={e=>nextMonth()}> Next </NavBtn>
            </HeaderContainer>
        )
    }
    
    //buttons for navigating previous and next months
    const nextMonth = () => { setCurrentDate(addMonths(currentDate, 1)) };
    const prevMonth = () => { setCurrentDate(subMonths(currentDate, 1)) };

    //function to render days of the week
    function renderWeekDays(){
        const dateFormat = 'EEE';
        const days = [];
        let startDate = startOfWeek(currentDate);

        for (let i = 0; i < 7; i++){
            days.push(
                <WeekDay key={i}>{ format(addDays(startDate, i), dateFormat) }</WeekDay>
            );
        }
        return <DaysContainer>{ days }</DaysContainer>;
    }

    const onDateClick = day => {
        setIsError(false);
        //set the selected date
        setSelectedDate(day);
        //get the facts
        get_date_fact();
        get_year_fact();

    }

    //generate cells
    function renderCells(){
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);
        const dateFormat = 'd';
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = '';

        while (day <= endDate){
            for (let i = 0; i < 7; i++){
                formattedDate = format(day,dateFormat);
                const cloneDay = day;
                days.push(
                    <Cell 
                        key={day}
                        disabled={!isSameMonth(day, monthStart)}
                        selected={isSameDay(day, selectedDate)}
                        onClick={()=> onDateClick(toDate(cloneDay))}
                    >{ formattedDate }</Cell>
                );
                day = addDays(day, 1);
            }

            rows.push( <Week key={day}>{ days }</Week> );
            days = [];
        }

        return <CellContainer>{ rows }</CellContainer>;
    }

    return(
        <Card alt='true'>
            <Calendar>
                <Container>{ renderHeader() }</Container>
                <Container>{ renderWeekDays() }</Container>
                <Container>{ renderCells() }</Container>
            </Calendar>
            <Title>Pick A Date</Title>
            <FactWrapper>
                { isFetching?<Content>Getting facts</Content> : isError? <ErrorMessage/> : <Content small>{ dateFact }</Content> }
                { isFetching?<Content>Getting facts</Content> : isError? <ErrorMessage/> : <Content small>{ yearFact }</Content> }
            </FactWrapper>
        </Card>
    )
}
