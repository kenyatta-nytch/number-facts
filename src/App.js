import React from 'react';
import { Switch,Route } from 'react-router-dom';
import HomeComponent from './pages/home.js';
import DateFacts from './pages/dates.js';
import NumberFacts from './pages/numbers.js';

function App() {
  return (
    <div className="App">
        <Switch>
            <Route exact path='/' component={ HomeComponent }/>
            <Route path='/dates' component={ DateFacts }/>
            <Route path='/numbers' component={ NumberFacts }/>
        </Switch>
    </div>
  );
}

export default App;
