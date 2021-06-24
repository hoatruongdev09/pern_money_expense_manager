import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import Host from "../AppURL";

function Register({ setAuth }) {

    const [inputs, setInputs] = useState({
        user_name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirm_password: ""
    })
    const { user_name, email, phone, address, password, confirm_password } = inputs

    const onChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    }
    const onRegisterClicked = async (e) => {
        e.preventDefault()
        try {
            const body = {
                user_name: user_name,
                email: email,
                password: password,
                phone: phone,
                address: address
            }
            const response = await fetch(`${Host}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            const parseRes = await response.json()
            if (response.status === 200) {
                const token = parseRes.token
                localStorage.setItem('token', token)
                setAuth(true)
            } else {
                console.log(parseRes)
                setAuth(false)
            }
        } catch (error) {
            setAuth(false)
        }
    }

    return (
        <Fragment>
            <div className="container-fluid">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                            <div className="col-lg-7">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                    </div>
                                    <form className="user" onSubmit={e => onRegisterClicked(e)}>
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-user"
                                                    id="exampleFirstName"
                                                    placeholder="Full Name"
                                                    name="user_name"
                                                    value={user_name}
                                                    onChange={e => onChange(e)}
                                                />
                                            </div>
                                            <div className="col-sm-6">
                                                <input
                                                    type="email"
                                                    className="form-control form-control-user"
                                                    id="exampleLastName"
                                                    placeholder="Email Address"
                                                    name="email"
                                                    value={email}
                                                    onChange={e => onChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="tel"
                                                className="form-control form-control-user"
                                                id="exampleInputEmail"
                                                placeholder="Phone Number"
                                                pattern="[0-9]{4}[0-9]{3}[0-9]{3}"
                                                name="phone"
                                                value={phone}
                                                onChange={e => onChange(e)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                className="form-control form-control-user"
                                                id="exampleAddress"
                                                placeholder="Address"
                                                name="address"
                                                value={address}
                                                onChange={e => onChange(e)}
                                            />
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-6 mb-3 mb-sm-0">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-user"
                                                    id="exampleInputPassword"
                                                    placeholder="Password"
                                                    name="password"
                                                    value={password}
                                                    onChange={e => onChange(e)}
                                                />
                                            </div>
                                            <div className="col-sm-6">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-user"
                                                    id="exampleRepeatPassword"
                                                    placeholder="Confirm Password"
                                                    name="confirm_password"
                                                    value={confirm_password}
                                                    onChange={e => onChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-user btn-block" >
                                            Register Account
                                        </button>
                                    </form>
                                    <hr />
                                    <div className="text-center">
                                        <a className="small" href="forgot-password.html">Forgot Password?</a>
                                    </div>
                                    <div className="text-center">
                                        <p className="small">Already have an account? <Link to="/login">Login!</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Register;
