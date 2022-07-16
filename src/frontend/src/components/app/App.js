import {lazy, Suspense, useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AuthService from '../../services/authService';
import Login from '../login/Login';
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
            <Route exact path="/login">
              <Login/>
            </Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
    </div>
  );
}

export default App;
