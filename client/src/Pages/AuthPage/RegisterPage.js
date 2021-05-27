
import { useState } from 'react'
import { useHistory, useRouteMatch, Link } from 'react-router-dom'

import API from '../../Utils/API'

const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showError, setShowError] = useState(false)
    const [error, setError] = useState('')

    const history = useHistory()

    const onSubmitRegister = async (e) => {
        e.preventDefault()
        if (email == '') {
            setError("Please enter the email!")
            setShowError(true)
            return
        }
        if (password !== confirmPassword || password == '') {
            setError("Password and confirm password is not the same!")
            setShowError(true)
            return
        }
        try {
            const response = await API.post('auth/register', {
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }).catch(err => {
                if (err.response.status == 400) {
                    setError(err.response.data.message)
                    setShowError(true)
                }
            })
            if (response.status == 200) {
                localStorage.setItem('accessToken', response.data.token)
                history.push('/auth/verify-account')
            }
        } catch (err) {
            console.error(err)
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
                        <h1 className="auth-title">Sign Up</h1>
                        <p className="auth-subtitle mb-5">Input your data to register to our website.</p>

                        <form>
                            {
                                showError ? (<div className="alert alert-light-danger color-danger"><i className="bi bi-exclamation-circle"></i> {error} </div>) : <></>
                            }

                            <div className="form-group position-relative has-icon-left mb-4">
                                <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control form-control-xl" placeholder="Email" />
                                <div className="form-control-icon">
                                    <i className="bi bi-envelope"></i>
                                </div>
                            </div>
                            {/* <div className="form-group position-relative has-icon-left mb-4">
                                <input type="text" className="form-control form-control-xl" placeholder="Username" />
                                <div className="form-control-icon">
                                    <i className="bi bi-person"></i>
                                </div>
                            </div> */}
                            <div className="form-group position-relative has-icon-left mb-4">
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control form-control-xl" placeholder="Password" />
                                <div className="form-control-icon">
                                    <i className="bi bi-shield-lock"></i>
                                </div>
                            </div>
                            <div className="form-group position-relative has-icon-left mb-4">
                                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="form-control form-control-xl" placeholder="Confirm Password" />
                                <div className="form-control-icon">
                                    <i className="bi bi-shield-lock"></i>
                                </div>
                            </div>
                            <button onClick={e => onSubmitRegister(e)} className="btn btn-primary btn-block btn-lg shadow-lg mt-5">Sign Up</button>
                        </form>
                        <div className="text-center mt-5 text-lg fs-4">
                            <p className='text-gray-600'>Already have an account? <Link to={`/auth/login`} className="font-bold">Log in</Link>.</p>
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

export default RegisterPage
