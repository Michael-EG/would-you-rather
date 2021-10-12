import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css';
import 'antd/dist/antd.css'
import HomeScreen from './Screens/HomeScreen';
import PrivateRoute from './Components/PrivateRoute';
import LoginScreen from './Screens/LoginScreen';

function App() {
  return (
    <BrowserRouter >
      <div className="App">
        <main>
          <Switch>
            <Route path='/sign-in' exact>
              <LoginScreen />
            </Route>
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
