import { Route, Switch, useHistory, useRouteMatch, Redirect } from "react-router-dom"
import { useState, useEffect } from 'react'


import Topbar from '../../Components/AppPage/TopBar'
import Sidebar from '../../Components/AppPage/SideBar'
import Dashboard from './Dashboard'
import Transaction from './TransactionPage'
import CategoryPage from './CategoryPage'

import API from '../../Utils/API'
import './App.css'

const App = () => {
    const { path, url } = useRouteMatch()
    const [activeSideBar, setActiveSideBar] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)
    const history = useHistory()
    console.log('dashboard')
    const checkAuthenticated = async () => {
        const token = localStorage.getItem('accessToken')
        if (token == null || token === '') {
            history.push(`/auth/login`)
        }
        console.log(token)
        try {
            const response = await API.get('auth/', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).catch(err => {
                setAuthenticated(false)
                history.push('/auth/login')
            })
            if (response.status === 200) {
                setAuthenticated(true)
            }
        } catch (err) {
            setAuthenticated(false)
            history.push('/auth/login')
        }
    }
    useEffect(() => {
        checkAuthenticated()
        console.log(history.location)
    }, [])

    const onActiveSideBar = (e) => {
        e.preventDefault()
        setActiveSideBar(!activeSideBar)
    }
    if (authenticated) {
        return (
            <div style={{ backgroundColor: '#f1f2f6', minHeight: '100%' }}>
                <Sidebar activeSideBar={activeSideBar} onActiveSideBar={onActiveSideBar} />
                <div id="main" style={{ minHeight: '100%' }}>
                    <Topbar onActiveSideBar={onActiveSideBar} />
                    <div id="main-content">
                        <Switch>
                            <Route exact path={`${path}/`}  >
                                {/* <Dashboard /> */}
                                <Redirect to={`/dashboard/overview`} />
                            </Route>
                            <Route path={`${path}/overview`} >
                                <Dashboard />
                            </Route>
                            <Route path={`${path}/transactions`}>
                                <Transaction />
                            </Route>
                            <Route path={`${path}/category`}>
                                <CategoryPage />
                            </Route>
                        </Switch>
                    </div>
                </div>

            </div>
        );
    } else {
        return (<div>waiting</div>)
    }
};

export default App;
