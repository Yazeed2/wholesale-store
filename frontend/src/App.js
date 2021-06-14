import './styling/main.scss';
import Navbar from './components/navbar/Navbar'
import {Switch, Route} from 'react-router-dom'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Home from './pages/home/Home'
import Store from './pages/store/Store'
import contextValue from './components/context/Context'
import Cart from './components/cart/Cart';
import react,{useContext} from 'react'

function App() {
  const [context, setContext] =  useContext(contextValue)

  return (
    <div className="App">
      <Navbar /> 
      <div className="main_page">    <Switch> 
    <Route exact path="/"><Home /></Route>
    <Route exact path="/login"><Login /></Route>
    <Route exact path="/register"><Register /> </Route>
    <Route path="/store/:id"><Store /></Route>
    </Switch>
    {context.user && context.user.userType === 'client'? <Cart />:""}
    </div>

    </div>
  );
}

export default App;
