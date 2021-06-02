import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom"
import { useState, useEffect } from 'react'


import Topbar from '../../Components/AppPage/TopBar'
import Sidebar from '../../Components/AppPage/SideBar'
import Dashboard from './Dashboard'
import Transaction from './TransactionPage'
import CreateTransaction from '../../Components/AppPage/TransactionsPage/CreateTransaction'

import API from '../../Utils/API'
import './App.css'

const App = () => {
    const { path, url } = useRouteMatch()
    const [activeSideBar, setActiveSideBar] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)
    const [activePage, setActivePage] = useState(0)
    const history = useHistory()

    const checkAuthenticated = async () => {
        const token = localStorage.getItem('accessToken')
        if (token == null || token === '') {
            history.push(`/auth/login`)

        }
        try {
            const response = await API.get('auth/', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).catch(err => {
                setAuthenticated(false)
                history.push('/auth/login')
            })
            if (response.status == 200) {
                setAuthenticated(true)
            }
        } catch (err) {
            setAuthenticated(false)
            history.push('/auth/login')
        }
    }
    useState(async () => {
        await checkAuthenticated()
        console.log(history.location)
    }, [history.location])

    const onActiveSideBar = (e) => {
        e.preventDefault()
        setActiveSideBar(!activeSideBar)
    }
    return (
        <div style={{ backgroundColor: '#f1f2f6', minHeight: '100%' }}>
            <Sidebar activeSideBar={activeSideBar} onActiveSideBar={onActiveSideBar} />
            <div id="main" style={{ minHeight: '100%' }}>
                <Topbar onActiveSideBar={onActiveSideBar} />
                <div id="main-content">
                    <Switch>
                        <Route exact path={`${path}/`}  >
                            <Dashboard />
                        </Route>
                        <Route path={`${path}/dashboard`} >
                            <Dashboard />
                        </Route>
                        <Route path={`${path}/transactions`}  >
                            <Transaction />
                        </Route>
                    </Switch>
                </div>
            </div>
            <CreateTransaction />
        </div>
    );
};

export default App;
