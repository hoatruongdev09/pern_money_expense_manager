import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

import Host from '../AppURL'

function Login({ setAuth }) {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })
    const { email, password } = inputs

    const onChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        try {

            const body = { email: email, password: password }
            const response = await fetch(`${Host}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            if (response.status === 200) {
                const parseRes = await response.json()

                localStorage.setItem("token", parseRes.token)
                setAuth(true)
                console.log(parseRes)
            } else if (response.status === 401) {
                console.log(await response.json())
            } else if (response.status === 400) {
                console.log(await response.json())
            }
        } catch (error) {

        }

    }
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                            </div>
                                            <form className="user" onSubmit={e => onSubmit(e)}>
                                                <div className="form-group">
                                                    <input type="email" name="email" className="form-control form-control-user"
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder="Enter Email Address..." onChange={e => onChange(e)} value={email} />
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" name="password" className="form-control form-control-user"
                                                        id="exampleInputPassword" placeholder="Password" onChange={e => onChange(e)} value={password} />
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                        <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                                                    </div>
                                                </div>
                                                <button className="btn btn-primary btn-user btn-block" type="submit">Login</button>
                                            </form>
                                            <hr></hr>
                                            <div className="text-center">
                                                <a className="small" href="forgot-password.html">Forgot Password?</a>
                                            </div>
                                            <div className="text-center">
                                                <p className="small">Don't have account? <Link to="/register">Create an Account. </Link></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Login