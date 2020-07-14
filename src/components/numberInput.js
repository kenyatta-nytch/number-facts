import React,{useEffect,useRef} from 'react';
import styled from 'styled-components';
import {Container} from './comon';
import {device} from '../device';

const NumberContainer = styled(Container)`
    flex: 1;
    justify-content: center;
`

const InputContainer = styled(Container)`
    width: 80%;
    min-width: 250px;
    max-width: 620px;
    height: 250px;
    justify-content: space-around;
    border-radius: 16px;
    background-color: #333;
    flex-direction: column;
    @media ${device.tabletL}{
        width: 90%;
    }
    @media ${device.laptopM}{
        font-size: 200px;
        height: 350px;
    }
`
const StyledInput = styled.input`
    outline: none;
    border: none;
    width: 100%;
    font-size: 130px;
    padding: 5px 10px;
    text-align: center;
    border-radius: 4px;
    color: #ddd;
    background: transparent;
    transition: .5s ease;
    &:focus{
        outline: none;
    }
    @media ${device.laptop}{
        font-size: 150px;
    }
    @media ${device.laptopM}{
        font-size: 200px;
    }
`
const Text = styled.code`
    padding: 5px 10px;
    width: 90%;
    max-width: 325px;
    font-size: 16px;
    text-align: center;
    background-color: #aaa;
    border-radius: 6px;
    color: #ff1c60;
    box-shadow: 0 7px 14px -7px #00000040;
    cursor: pointer;
`
export default function NumberComponent({value,isFetching,setValue,handleClick}){
    const input = useRef();

    useEffect(() => input.current.focus())
    return(
        <NumberContainer>
        <InputContainer>
            <StyledInput
                name='number'
                type='number'
                ref={input}
                value={value}
                min='0'
                required={true}
                disabled={isFetching}
                onChange={e=>setValue(e.target.value)}
            />
             <Text type='button' onClick={() => handleClick()} disabled={isFetching}>Pick A Number then click me :)</Text>
        </InputContainer>
        </NumberContainer>
    ) 
}
