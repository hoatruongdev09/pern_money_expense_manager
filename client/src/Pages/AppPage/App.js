import React, { Suspense, useState, useEffect } from 'react'
import { Route, Switch, useHistory, useRouteMatch, Redirect } from "react-router-dom"

import Topbar from '../../Components/AppPage/TopBar'
import Sidebar from '../../Components/AppPage/SideBar'
// import Dashboard from './Dashboard'
// import Transaction from './TransactionPage'
// import CategoryPage from './CategoryPage'
// import UserPage from './UserPage'

import API from '../../Utils/API'
import './App.css'

// const Topbar = React.lazy(() => import('../../Components/AppPage/TopBar'))
// const Sidebar = React.lazy(() => import('../../Components/AppPage/SideBar'))
const Dashboard = React.lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(import('./Dashboard'))
        }, 300);
    })
})
const Transaction = React.lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(import('./TransactionPage'))
        }, 300);
    })
})
const CategoryPage = React.lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(import('./CategoryPage'))
        }, 300);
    })
})
const UserPage = React.lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(import('./UserPage'))
        }, 300);
    })
})
const App = () => {
    const { path, url } = useRouteMatch()
    // const [activeSideBar, setActiveSideBar] = useState(true)
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
            // setTimeout(() => {
            setAuthenticated(false)
            // }, 500)
            history.push('/auth/login')
        }
    }
    useEffect(() => {
        checkAuthenticated()
        console.log(history.location)
    }, [])

    const onActiveSideBar = (e) => {
        e.preventDefault()
        // setActiveSideBar(!activeSideBar)
    }
    if (!authenticated) {
        return (
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )
    }
    const LoadingScreen = () => {
        return (
            <button className="btn btn-primary" type="button" disabled="">
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
            </button>
        )
    }
    return (
        <div style={{ backgroundColor: '#f1f2f6', minHeight: '100%' }}>
            <Sidebar />
            <div id="main" style={{ minHeight: '100%' }}>
                <Topbar />
                <Suspense fallback={<LoadingScreen />} >
                    <div id="main-content">
                        <Switch>
                            <Route exact path={`${path}/`} >
                                <Redirect to={`${path}/overview`} />
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
                            <Route path={`${path}/user`}>
                                <UserPage />
                            </Route>
                        </Switch>
                    </div>
                </Suspense>
            </div>

        </div>
    );
}

export default App;
