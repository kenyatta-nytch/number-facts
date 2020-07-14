import React from 'react';
import { Switch,Route } from 'react-router-dom';
import HomeComponent from './components/homePage.js';
import DateFactsPage from './components/datesFactsPage.js';
import NumberFactsPage from './components/numberFactsPage.js';

function App() {
  return (
    <div className="App">
        <Switch>
            <Route exact path='/' component={ HomeComponent }/>
            <Route path='/dates' component={ DateFactsPage }/>
            <Route path='/numbers' component={ NumberFactsPage }/>
        </Switch>
    </div>
  );
}

export default App;
