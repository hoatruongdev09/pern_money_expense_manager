
import { useState } from 'react'
import { useHistory, useRouteMatch, Link } from 'react-router-dom'
import API from '../../Utils/API'

const LoginPage = () => {
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')

    const { path, url } = useRouteMatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [remember, setRemember] = useState(false)

    const history = useHistory()

    const onLogin = async (e) => {
        e.preventDefault()
        if (email == '') {
            setError("Please enter the email!")
            setShowError(true)
            return;
        }
        if (password == '') {
            setError("Password cannot be empty!")
            setShowError(true)
            return
        }
        try {
            const response = await API.post('auth/login', {
                email: email,
                password: password
            }).catch(err => {
                if (err.response.status == 400) {
                    setError(err.response.data.message)
                    setShowError(true)
                }
                if (err.response.status == 401) {
                    setError(`Email not found or password incorrect`)
                    setShowError(true)
                }
            })
            if (response && response.status == 200) {
                console.log(response.data)
                localStorage.setItem('accessToken', response.data.token)
                history.push('/dashboard/')
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div id="auth">

            <div className="row h-100">
                <div className="col-lg-6 col-12">
                    <div id="auth-left">
                        <div className="auth-logo">
                            <a href="index.html"><img src="/assets/images/logo/logo.png" alt="Logo" /></a>
                        </div>
                        <h1 className="auth-title">Log in.</h1>
                        <p className="auth-subtitle mb-5">Log in with your data that you entered during registration.</p>

                        <form>
                            {
                                showError ? (<div className="alert alert-light-danger color-danger"><i className="bi bi-exclamation-circle"></i> {error} </div>) : <></>
                            }
                            <div className="form-group position-relative has-icon-left mb-4">
                                <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="form-control form-control-xl" placeholder="Email" />
                                <div className="form-control-icon">
                                    <i className="bi bi-person"></i>
                                </div>
                            </div>
                            <div className="form-group position-relative has-icon-left mb-4">
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control form-control-xl" placeholder="Password" />
                                <div className="form-control-icon">
                                    <i className="bi bi-shield-lock"></i>
                                </div>
                            </div>
                            {/* <div className="form-check form-check-lg d-flex align-items-end">
                                <input className="form-check-input me-2" type="checkbox" value={remember} onChange={e => setRemember(e.target.value)} id="flexCheckDefault" />
                                <label className="form-check-label text-gray-600" for="flexCheckDefault">
                                    Keep me logged in
                            </label>
                            </div> */}
                            <button onClick={e => onLogin(e)} className="btn btn-primary btn-block btn-lg shadow-lg mt-5">Log in</button>
                        </form>
                        <div className="text-center mt-5 text-lg fs-4">
                            <p className="text-gray-600">Don't have an account? <Link to={`/auth/register`} className="font-bold">Sign up</Link>.</p>
                            <p><Link className="font-bold" to={`/auth/forgot-password`}>Forgot password?</Link>.</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 d-none d-lg-block">
                    <div id="auth-right">

                    </div>
                </div>
            </div>

        </div>
    )
}

export default LoginPage
