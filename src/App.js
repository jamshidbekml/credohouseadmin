import { Route, Switch } from 'react-router-dom';
import './App.css';
import Bank from './components/banks/Bank';
import Company from './components/companys/Company';
import Complex from './components/complex/Complex';
import Header from './components/header/Header';
import Orders from './components/orders/Order';
import Room from './components/rooms/Rooms';

function App() {
    return (
        <div className="App">
            <Header />
            <div className="container">
                <Switch>
                    <Route path="/" exact>
                        <Company />
                    </Route>
                    <Route path="/complexes">
                        <Complex />
                    </Route>
                    <Route path="/rooms">
                        <Room />
                    </Route>
                    <Route path="/banks">
                        <Bank />
                    </Route>
                    <Route path="/orders">
                        <Orders />
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;
