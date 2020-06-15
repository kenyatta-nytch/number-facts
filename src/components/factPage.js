import React from 'react';
import CalendarComponent from './calendar.js';
import NumberComponent from './numberInput.js';
import {PageWrapper} from './comon.js';

export default function FactPage(){
    return(
        <PageWrapper facts='true'>
            <CalendarComponent/>
            <NumberComponent/>
        </PageWrapper>
    )
}
