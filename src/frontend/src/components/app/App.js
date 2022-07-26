import {lazy, Suspense, useContext, useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import StartPage from '../../pages/startPage/StartPage';
import LoginPage from '../../pages/loginPage/LoginPage';
import RegistrationPage from '../../pages/registrationPage/RegistrationPage';
import ResetPasswordPage from '../../pages/resetPasswordPage/ResetPasswordPage';
import MainPage from '../../pages/mainPage/MainPage';
import Spinner from '../spinner/Spinner';
import './App.css';
import { ThemeContext }  from '../../contexts/ThemeContext';
import { MainProvider } from '../../contexts/MainContext';


const App = () => {
  const {theme} = useContext(ThemeContext);

  return (
    <div>
      <Router>
        <div className="App" id={theme}>
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
              <Route exact path="/reset_password">
                <ResetPasswordPage/>
              </Route>
              <MainProvider>
                <Route exact path="/home">
                  <MainPage/>
                </Route>
              </MainProvider>
            </Switch>
          </Suspense>
        </div>
    </Router>
    </div>
  );
}

export default App;
