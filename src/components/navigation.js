import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = styled.div`
    display: flex;
    height: 50px;
    width: 100vw;
    margin-bottom: 10px;

`
const NavSection = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`
const NavLogo = styled.img`

`
const Link = styled(NavLink)`
    text-decoration: none;
    margin: 0 10px;
    font-size: 18px;
    font-weight: 600;
    color: #777;
    transition: .5s ease;
    &.active{
        color: #f1485f;
        font-size: 20px;
        letter-spacing: 1px;
    }
`

export default function Navigation(){
    return(
        <NavBar>
            <NavSection></NavSection>
            <NavSection>
                <Link exact to='/'>Home</Link>
                <Link to='/dates'>Dates</Link>
                <Link to='/numbers'>Numbers</Link>
            </NavSection>
            <NavSection></NavSection>
        </NavBar>
    )
}
