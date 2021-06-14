import './styling/main.scss';
import Navbar from './components/navbar/Navbar'
import {Switch, Route} from 'react-router-dom'
import Login from './pages/login/Login'
import Register from './pages/register/Register'

function App() {
  return (
    <div className="App">
      <Navbar /> 
    <Switch> 
    <Route exact path="/login"><Login /></Route>
    <Route exact path="/register"><Register /> </Route>
    </Switch>
    </div>
  );
}

export default App;
