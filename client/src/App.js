
// import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import AppPage from './Pages/AppPage/App'
import LandingPage from './Pages/LandingPage/App'
function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/dashboard' component={AppPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
