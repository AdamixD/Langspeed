import {lazy, Suspense, useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import StartPage from '../../pages/startPage/StartPage';
import LoginPage from '../../pages/loginPage/LoginPage';
import RegistrationPage from '../../pages/registrationPage/RegistrationPage';
import AuthService from '../../services/authService';
import Spinner from '../spinner/Spinner';
import './App.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if(user){
      setCurrentUser(user);
    }
  }, []);


  return (

    <div>
      <Router>
      <div className="App">
        <Suspense fallback={<Spinner/>}>
          <Switch>
            <Route exact path="/">
              <StartPage/>
            </Route>
            <Route exact path="/registration">
              <RegistrationPage/>
            </Route>
            <Route exact path="/login">
              <LoginPage/>
            </Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
    </div>
  );
}

export default App;
