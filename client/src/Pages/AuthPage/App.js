import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom"
import { useState, useEffect } from 'react'

import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import ForgotPasswordPage from './ForgotPasswordPage'
import RegisterVerifyAccountPage from './RegisterVerifyAccountPage'

import API from '../../Utils/API'

const App = () => {
    const { path } = useRouteMatch()
    const history = useHistory()
    useEffect(() => {
        checkAuthenticate()
    }, [])
    const checkAuthenticate = async () => {
        const token = localStorage.getItem('accessToken')
        if (token == null || token === '') {
            return
        }
        try {
            const response = await API.get('auth/', {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).catch(err => {
                console.log(err.response)
            })
            if (response.status == 200) {
                history.push('/dashboard/')
            }
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <>
            <Switch>
                <Route exact path={`${path}/`} component={LoginPage} />
                <Route path={`${path}/login`} component={LoginPage} />
                <Route path={`${path}/register`} component={RegisterPage} />
                <Route path={`${path}/forgot-password`} component={ForgotPasswordPage} />
                <Route path={`${path}/verify-account`} component={RegisterVerifyAccountPage} />
            </Switch>
        </>
    )
}

export default App
