import { Link } from "react-router-dom"
import API from '../../Utils/API'
import { baseUrl, createRequest } from '../../Utils/requestManager'
import { useEffect, useState, useRef } from "react"

function UserPage() {
    const [username, setUserName] = useState('')
    const [userAddress, setUserAddress] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [userAvatar, setUserAvatar] = useState('')

    const [editValueUserName, setEditValueUserName] = useState('')
    const [editValueUserAddress, setEditValueUserAddress] = useState('')
    const [editValueUserEmail, setEditValueUserEmail] = useState('')
    const [editValueUserPhone, setEditValueUserPhone] = useState('')

    const [editMode, setEditMode] = useState(false)
    const [updatePassword, setUpdatePassword] = useState(false)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [validOldPassword, setValidOldPassword] = useState(false)
    const [validNewPassword, setValidNewPassword] = useState(false)
    const [validConfirmPassword, setValidConfirmPassword] = useState(false)

    const [validOldPasswordContent, setValidOldPasswordContent] = useState('')
    const [validNewPasswordContent, setValidNewPasswordContent] = useState('')
    const [validConfirmPasswordContent, setValidConfirmPasswordContent] = useState('')

    const [alertSuccess, setAlertSuccess] = useState(false)
    const [alertContent, setAlertContent] = useState('')
    const inputFile = useRef(null)
    useEffect(async () => {
        const token = localStorage.getItem('accessToken')
        if (token == null || token == '') {
            return
        }
        try {
            const response = await API.get("/user/info/current", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).catch(err => {
                console.log(err.response)
            })
            if (response && response.status === 200) {
                const { activated, is_admin, trial_expired, user_address, user_email, user_name, user_phone, avatar } = response.data
                setUserName(user_name != null ? user_name : '')
                setUserAddress(user_address != null ? user_address : '')
                setUserEmail(user_email != null ? user_email : '')
                setUserPhone(user_phone != null ? user_phone : '')
                setUserAvatar(avatar)
            }
        } catch (err) {
            console.error(err)
        }
    }, [])

    const onStartEdit = (e) => {
        e.preventDefault()
        if (!editMode) {
            setAlertSuccess(false)
            setEditValueUserName(username)
            setEditValueUserAddress(userAddress)
            setEditValueUserEmail(userEmail)
            setEditValueUserPhone(userPhone)
        }
        setEditMode(!editMode)
    }
    const onSubmitUpdate = async (e) => {
        e.preventDefault()
        const data = {
            user_address: editValueUserAddress,
            user_email: editValueUserEmail,
            user_phone: editValueUserPhone,
            user_name: editValueUserName
        }
        const token = localStorage.getItem('accessToken')
        try {
            const response = await API.put("/user", data, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }).catch(err => {
                console.log(err)
            })
            if (response && response.status === 200) {
                const { activated, is_admin, trial_expired, user_address, user_email, user_name, user_phone } = response.data
                setUserName(user_name != null ? user_name : '')
                setUserAddress(user_address != null ? user_address : '')
                setUserEmail(user_email != null ? user_email : '')
                setUserPhone(user_phone != null ? user_phone : '')
                setEditMode(false)
                setAlertSuccess(true)
                setAlertContent('Update info succeeded')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const onStartUpdatePassword = (e) => {
        e.preventDefault()
        setAlertSuccess(false)
        setOldPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setUpdatePassword(!updatePassword)
    }
    const onSubmitUpdatePassword = async (e) => {
        e.preventDefault()
        console.log('submit change password')
        if (oldPassword == '') {
            setValidOldPassword(true)
            setValidOldPasswordContent('Please enter old password')
            return
        }
        if (newPassword != confirmPassword) {
            setValidNewPassword(true)
            setValidConfirmPassword(true)
            setValidNewPasswordContent('Password and Confirm password not match')
            setValidConfirmPasswordContent('Password and Confirm password not match')
            return
        }
        try {

            const data = {
                old_password: oldPassword,
                new_password: newPassword
            }
            const token = localStorage.getItem('accessToken')
            API.put('/user/password/update', data, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            }).then(response => {
                setUpdatePassword(false)
                setAlertSuccess(true)
                setAlertContent('Change password succeeded')
            }).catch(err => {
                if (err.response.data.message == "password_not_match") {
                    setValidOldPassword(true)
                    setValidOldPasswordContent('You old password not correct')
                }
                // console.log(err.response.status)
                // console.log(err.response.data)
            })
            // const response = await fetch(`${baseUrl}/user/password/update`, {
            //     method: 'PUT',
            //     headers: {
            //         "Authorization": `Bearer ${token}`,
            //         'Content-type': 'application/json; charset=UTF-8'
            //     },
            //     body: JSON.stringify(data)
            // })

            // if (response.status == 200) {
            //     setUpdatePassword(false)
            // } else if (response.status == 400) {
            //     setValidOldPassword(true)
            //     setValidOldPasswordContent('You old password not correct')
            // }
        } catch (error) {
            console.error(error)
        }
    }
    const onChangeOldPassword = (e) => {
        setOldPassword(e.target.value)
        setValidOldPassword(e.target.value == '')
        setValidOldPasswordContent('Please enter old password')
    }
    const onChangeNewPassword = (e) => {
        setNewPassword(e.target.value)
        setValidNewPassword(e.target.value == '')
        setValidNewPasswordContent('Please enter new password')
    }
    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
        setValidConfirmPassword(e.target.value == '')
        if (e.target.value == '') {
            setValidConfirmPasswordContent('Please enter confirm password')
        } else if (e.target.value != newPassword) {
            setValidConfirmPasswordContent('Password and Confirm password not match')
        }
    }
    const onUploadFile = async (e) => {
        const file = e.target.files[0]
        const data = new FormData()
        data.append('avatar', file)
        const token = localStorage.getItem('accessToken')
        API.put('/user/avatar/update', data, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }).then(res => {
            setUserAvatar(res.data.avatar)
        }).catch(err => {
            console.log(err.response)
        })
    }

    return (
        <>
            <div className="page-heading">
                <section className="section">
                    <div className="container" >
                        <div className='row justify-content-center' >
                            <div className="col-12">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src={userAvatar ? `/public/images/${userAvatar}` : "/assets/images/faces/1.jpg"} alt="Admin" className="rounded-circle" width="150" height="150" />
                                    <a role="button" onClick={e => inputFile.current.click()} className="btn btn-link my-0">Change Avatar</a>
                                    <input type='file' onChange={e => onUploadFile(e)} multiple={false} ref={inputFile} style={{ display: 'none' }}></input>
                                    <div>
                                        <h4>{
                                            username ? username : 'Anonymous'
                                        }</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 col-sm-12">
                                <div className="card mt-3">
                                    <div className="card-body">
                                        {
                                            alertSuccess ?
                                                <div className={`alert alert-success alert-dismissible show fade`}>
                                                    {alertContent}
                                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                </div> : <></>
                                        }
                                        <form className="form form-horizontal">
                                            <div className="form-body">
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <label>User Name</label>
                                                    </div>
                                                    <div className="col-md-8 form-group">
                                                        <input type="text" id="first-name" value={editMode ? editValueUserName : username} onChange={e => editMode ? setEditValueUserName(e.target.value) : setUserName(e.target.value)} className="form-control" readOnly={!editMode} name="fname" placeholder="User Name" />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label>Email</label>
                                                    </div>
                                                    <div className="col-md-8 form-group">
                                                        <input type="email" id="email-id" value={editMode ? editValueUserEmail : userEmail} onChange={e => editMode ? setEditValueUserEmail(e.target.value) : setUserEmail(e.target.value)} className="form-control" readOnly={!editMode} name="email-id" placeholder="Email" />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label>Phone</label>
                                                    </div>
                                                    <div className="col-md-8 form-group">
                                                        <input type="number" value={editMode ? editValueUserPhone : userPhone} onChange={e => editMode ? setEditValueUserPhone(e.target.value) : setUserPhone(e.target.value)} id="contact-info" className="form-control" readOnly={!editMode} name="contact" placeholder="Mobile" />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label>Address</label>
                                                    </div>
                                                    <div className="col-md-8 form-group">
                                                        <input type='text' id="address-id" value={editMode ? editValueUserAddress : userAddress} onChange={e => editMode ? setEditValueUserAddress(e.target.value) : setUserAddress(e.target.value)} className="form-control" readOnly={!editMode} name="email-id" placeholder="Address" />
                                                    </div>
                                                    {
                                                        updatePassword ? <>
                                                            <div className="col-md-4">
                                                                <label>Old password</label>
                                                            </div>
                                                            <div className="col-md-8 form-group">
                                                                <input type="password" value={oldPassword} onChange={e => onChangeOldPassword(e)} className={`form-control ${validOldPassword ? 'is-invalid' : 'is-valid'}`} name="password" placeholder="Old Password" />
                                                                <div className="invalid-feedback">
                                                                    <i className="bx bx-radio-circle"></i>
                                                                    {validOldPasswordContent}
                                                                </div>
                                                                <div className="valid-feedback">
                                                                    <i className="bx bx-radio-circle"></i>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <label>New password</label>
                                                            </div>
                                                            <div className="col-md-8 form-group">
                                                                <input type="password" value={newPassword} onChange={e => onChangeNewPassword(e)} className={`form-control ${validNewPassword ? 'is-invalid' : 'is-valid'}`} name="password" placeholder="New Password" />
                                                                <div className="invalid-feedback">
                                                                    <i className="bx bx-radio-circle"></i>
                                                                    {validNewPasswordContent}
                                                                </div>
                                                                <div className="valid-feedback">
                                                                    <i className="bx bx-radio-circle"></i>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <label>Confirm password</label>
                                                            </div>
                                                            <div className="col-md-8 form-group">
                                                                <input type="password" value={confirmPassword} onChange={e => onChangeConfirmPassword(e)} className={`form-control ${validConfirmPassword ? 'is-invalid' : 'is-valid'}`} name="password" placeholder="Confirm Password" />
                                                                <div className="invalid-feedback">
                                                                    <i className="bx bx-radio-circle"></i>
                                                                    {validConfirmPasswordContent}
                                                                </div>
                                                                <div className="valid-feedback">
                                                                    <i className="bx bx-radio-circle"></i>
                                                                </div>
                                                            </div>
                                                        </> : <></>
                                                    }
                                                    {/* <div className="col-md-4">
                                                        <label>Password</label>
                                                    </div> 
                                                    <div className="col-md-8 form-group">
                                                        <input type="password" id="password" className="form-control" readonly="readonly" name="password" placeholder="Password" />
                                                    </div>
                                                    */}
                                                    <div className="col-sm-12">
                                                        <div className="d-flex float-end justify-content-end">
                                                            {
                                                                updatePassword ? <></> :
                                                                    <>
                                                                        {editMode ? <a role="button" onClick={e => onSubmitUpdate(e)} className="btn btn-primary me-1 mb-1">Submit</a> : <></>}
                                                                        <a role='button' onClick={e => onStartEdit(e)} className={`btn btn-${editMode ? 'secondary' : 'primary'} me-1 mb-1`}> {editMode ? 'Cancel' : 'Edit'}</a>
                                                                    </>
                                                            }
                                                        </div>
                                                        <div className="d-flex float-start justify-content-start">
                                                            {
                                                                editMode ? <></> :
                                                                    <>
                                                                        <a role='button' onClick={e => onStartUpdatePassword(e)} className={`btn btn-${updatePassword ? 'secondary' : 'primary'} me-1 mb-1`}>{updatePassword ? 'Cancel' : 'Change password'}</a>
                                                                        {updatePassword ? <a role="button" onClick={e => onSubmitUpdatePassword(e)} className="btn btn-primary me-1 mb-1">Submit</a> : <></>}
                                                                    </>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}

export default UserPage
