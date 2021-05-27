import { Link } from 'react-router-dom'

function RegisterVerifyAccountPage() {
    return (
        <div id="error">
            <div className="container">
                <div className="col-md-8 col-12 offset-md-2">
                    <div className="text-center">
                        <h4 className="error-title">Register Success</h4>
                        <p className="fs-5 text-gray-600">We sent you an email to verify your account.</p>
                        <Link to='/dashboard/' className="mt-3">Go to your dashboard</Link>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default RegisterVerifyAccountPage
