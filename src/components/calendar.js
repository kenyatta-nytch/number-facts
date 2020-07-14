import React,{useState} from 'react';
import styled,{css} from 'styled-components';
import {format,toDate,addMonths,addDays,subMonths,startOfMonth,startOfWeek,endOfMonth,endOfWeek,isSameMonth,isSameDay} from 'date-fns';
import {Container} from './comon';
import {device} from '../device';

const CalendarContainer = styled(Container)`
    flex: 1;
    justify-content: center;
`

const Calendar = styled.div`
    margin: 0;
    width: 300px;
    height: 350px;
    position: relative;
    border-radius: 12px;
    background: #333;
    display: flex;
    flex-direction: column;
    transition: .3s ease;
    @media ${device.tablet}{
        width: 400px;
        height: 450px;
    }
    @media ${device.tabletL}{
        width: 350px;
        height: 400px;
    }
    @media ${device.laptopM}{
        width: 450px;
        height: 500px;
    }
    @media ${device.laptopL}{
        width: 500px;
        height: 550px;
    }
`
const CalendarHeader = styled.div`
    flex: 2;
    position: relative;
`
const CalendarBody = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;

`
const HeaderContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`
const NavBtn = styled.div`
    cursor: pointer;
    width: 20px;
    height: 100%;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #4444;
    transition: .5s ease;
    ${props => props.next && css`
        right: 8px;
        border-radius: 0 12px 0 0;
    `}
    ${props => props.prev && css`
        left: 8px;
        border-radius: 12px 0 0 0;
    `}
`
const Header = styled.h1`
    width: 100%;
    margin: 0;
    font-size: ${props => props.year? '32px':'50px'};
    text-align: center;
    font-weight: 600px;
    color: #ff1c60;
    text-transform: uppercase;
`
const YearMonth = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const WeekDayContainer = styled(Container)`
    justify-content: space-evenly;
    background-color: #444;
`
const WeekDay = styled.p`
    margin: 0;
    width: 70px;
    padding: 10px 0;
    color: #ddd;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    text-transform: uppercase;
`
const MonthContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
`
const Week = styled.div`
    flex: 1;
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`
const Cell = styled.div`
    cursor: pointer;
    width: 70px;
    height: 100%;
    padding: 0;
    display: flex;
    color: #fff;
    justify-content: center;
    align-items: center;
    border: none;
    transition: .5s ease;
    ${props => props.disabled && css`
        color: #999;
    `}
    ${props => props.selected && css`
        background-color: #fff1;
        color: #fff;
        font-weight: 600px;
    `}
`
export default function CalendarComponent({selectedDate,setSelectedDate}){
    //save current and selected days
    const [currentDate,setCurrentDate] = useState(new Date());
        
    //function to get our calendar header that includes current month, year and nav buttons
    function renderHeader(){
        return(
            <HeaderContainer>
                <NavBtn onClick={e=>prevMonth()} prev={true}/>
                <YearMonth>
                    <Header>{ format(currentDate,'MMMM') }</Header>
                    <Header year={true}>{ format(currentDate,'yyyy') }</Header>
                </YearMonth>
                <NavBtn onClick={e=>nextMonth()} next={true}/>
            </HeaderContainer>
        )
    }
    
    //buttons for navigating previous and next months
    const nextMonth = () => { setCurrentDate(addMonths(currentDate, 1)) };
    const prevMonth = () => { setCurrentDate(subMonths(currentDate, 1)) };

    //function to render days of the week
    function renderWeekDays(){
        const dateFormat = 'EEEEEE';
        const weekDays = [];
        let startDate = startOfWeek(currentDate);

        for (let i = 0; i < 7; i++){
            weekDays.push(
                <WeekDay key={i}>{ format(addDays(startDate, i), dateFormat) }</WeekDay>
            );
        }
        return weekDays
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
                        onClick={()=> setSelectedDate(toDate(cloneDay))}
                    >{ formattedDate }</Cell>
                );
                day = addDays(day, 1);
            }

            rows.push( <Week key={day}>{ days }</Week> );
            days = [];
        }

        return rows
    }

    return(
        <CalendarContainer>
        <Calendar>
            <CalendarHeader>{ renderHeader() }</CalendarHeader>
            <CalendarBody>
                <WeekDayContainer>{ renderWeekDays() }</WeekDayContainer>
                <MonthContainer>{ renderCells() }</MonthContainer>
            </CalendarBody>
        </Calendar>
        </CalendarContainer>
    )
}
