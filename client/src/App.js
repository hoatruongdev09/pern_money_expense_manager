
// import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import AppPage from './Pages/AppPage/App'
import LandingPage from './Pages/LandingPage/App'
import AuthPage from './Pages/AuthPage/App'
function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/dashboard' component={AppPage} />
          <Route path='/auth' component={AuthPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
