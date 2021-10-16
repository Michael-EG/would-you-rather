import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css';
import 'antd/dist/antd.css'
import HomeScreen from './Screens/HomeScreen';
import PrivateRoute from './Components/PrivateRoute';
import LoginScreen from './Screens/LoginScreen';
import NewQuestionScreen from './Screens/NewQuestionScreen';
import LeaderboardScreen from './Screens/LeaderboardScreen';
import PollViewScreen from './Screens/PollViewScreen';

function App() {
  return (
    <BrowserRouter >
      <div className="App">
        <main>
          <Switch>
            <Route path='/sign-in' exact>
              <LoginScreen />
            </Route>
            <PrivateRoute path='/questions/:id' component={PollViewScreen}></PrivateRoute>
            <PrivateRoute path='/leaderboard' component={LeaderboardScreen}></PrivateRoute>
            <PrivateRoute path='/add' component={NewQuestionScreen}></PrivateRoute>
            <PrivateRoute path='/' component={HomeScreen}>
              {/* <HomeScreen /> */}
            </PrivateRoute>
          </Switch>
          {/* < */}
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
