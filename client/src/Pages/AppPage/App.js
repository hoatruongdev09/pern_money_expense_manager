import { Route, Switch, useRouteMatch } from "react-router-dom"
import { useState, useEffect } from 'react'

import Sidebar from '../../Components/AppPage/SideBar'
import Dashboard from './Dashboard'
import Transaction from './TransactionPage'

const App = () => {
    const { path, url } = useRouteMatch()
    const [activeSideBar, setActiveSideBar] = useState(true)

    const onActiveSideBar = (e) => {
        e.preventDefault()
        setActiveSideBar(!activeSideBar)
    }
    return (
        <div style={{ backgroundColor: '#f1f2f6', minHeight: '100%' }}>
            <Sidebar activeSideBar={activeSideBar} onActiveSideBar={onActiveSideBar} />
            <div id="main" style={{ minHeight: '100%' }}>
                <header className="mb-3">
                    <a role='button' onClick={e => onActiveSideBar(e)} className="burger-btn d-block d-xl-none">
                        <i className="bi bi-justify fs-3"></i>
                    </a>
                </header>
                <Switch>
                    <Route exact path={`${path}/`} component={Dashboard} />
                    <Route path={`${path}/dashboard`} component={Dashboard} />
                    <Route path={`${path}/transactions`} component={Transaction} />
                </Switch>
                {/* <footer>
                    <div className="footer clearfix mb-0 text-muted">
                        <div className="float-start">
                            <p>2021 &copy; Mazer</p>
                        </div>
                        <div className="float-end">
                            <p>Crafted with <span className="text-danger"><i className="bi bi-heart"></i></span> by <a
                                href="http://ahmadsaugi.com">A. Saugi</a></p>
                        </div>
                    </div>
                </footer> */}
            </div>
        </div>
    );
};

export default App;
