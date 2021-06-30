import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const App = () => {

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                <div className="container px-4 px-lg-5">
                    <a className="navbar-brand" href="#page-top"><span style={{ textDecoration: 'underline' }}>Spend</span>ie</a>
                    <button className="navbar-toggler navbar-toggler-right" id="button-toggle-navbar" type="button">
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <div className={`collapse navbar-collapse`} id="collapser">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item"><a className="nav-link" href="#features">Features</a></li>
                            <li className="nav-item"><a className="nav-link" href="#getstarted">Get Started</a></li>
                            <li className="nav-item"><a className="nav-link" href="#signup">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <header className="masthead">
                <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
                    <div className="d-flex justify-content-center">
                        <div className="text-center">
                            <h1 className="mx-auto my-0 text-uppercase"><span style={{ textDecoration: 'underline' }}>SPEND</span>IE</h1>
                            <h2 className="text-dark-50 mx-auto mt-2 mb-5">A free tool for money expense management and analyze.</h2>
                            <Link className="btn btn-primary" to="/dashboard">Get Started</Link>
                        </div>
                    </div>
                </div>
            </header>
            <section className="projects-section bg-white" id="features">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-0 mb-4 mb-lg-5 align-items-center">
                        <div className="rounded shadow col-xl-8 col-lg-7"><img className="shadow-lg rounded img-fluid mb-3 mb-lg-0" src="assets/img/main-page.png" alt="..." /></div>
                        <div className="col-xl-4 col-lg-5">
                            <div className="featured-text text-center text-lg-left">
                                <h4>Easier to manage</h4>
                                <p className="text-dark-50 mb-0">Review asset trend in your chart</p>
                            </div>
                        </div>
                    </div>
                    <div className="row gx-0 mb-5 mb-lg-0 justify-content-center">
                        <div className="rounded shadow col-lg-6"><img className="shadow rounded img-fluid" src="assets/img/transaction-date-page.png" alt="..." /></div>
                        <div className="col-lg-6">
                            <div className="bg-white text-center h-100 project">
                                <div className="d-flex h-100">
                                    <div className="project-text w-100 my-auto text-center text-lg-left">
                                        <h4 className="text-dark">Easy content access</h4>
                                        <p className="mb-0 text-dark-50">Weekly, Monthly total and budget are provided</p>
                                        <hr className="d-none d-lg-block mb-0 ms-0 bg-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row gx-0 justify-content-center">
                        <div className="rounded shadow col-lg-6"><img className="shadow rounded img-fluid" src="assets/img/transaction-create.png" alt="..." /></div>
                        <div className="col-lg-6 order-lg-first">
                            <div className="bg-black text-center h-100 project">
                                <div className="d-flex h-100">
                                    <div className="project-text w-100 my-auto text-center text-lg-right">
                                        <h4 className="text-dark">Keep your note</h4>
                                        <p className="mb-0 text-dark-50">Save receipt or memories together</p>
                                        <hr className="d-none d-lg-block mb-0 me-0 bg-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row gx-0 mb-5 mb-lg-0 justify-content-center">
                        <div className="rounded shadow col-lg-6"><img className="shadow rounded img-fluid" src="assets/img/category-page.png" alt="..." /></div>
                        <div className="col-lg-6">
                            <div className="bg-black text-center h-100 project">
                                <div className="d-flex h-100">
                                    <div className="project-text w-100 my-auto text-center text-lg-left">
                                        <h4 className="text-dark">Unique style</h4>
                                        <p className="mb-0 text-dark-50">Create and manage your own habits</p>
                                        <hr className="d-none d-lg-block mb-0 ms-0 bg-whte" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="text-center background-red" id="getstarted">
                <div className="container about-section ">
                    <div className="row">
                        <div className="col-lg-5 text-center">
                            <h2 className="text-white mb-2">Get Started</h2>
                            <p className="text-white-50">Manage your asset more conveniently</p>
                            <Link className="btn btn-primary" to="/dashboard">Get Started</Link>
                        </div>
                        <div className="col-lg-5">

                        </div>

                    </div>
                </div>
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                    <img className="img-fluid" className="image-get-started" src="assets/img/main-page-croped.png" alt="..." />
                </div>
            </section>
            <section className="signup-section bg-dark" id="signup">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5">
                        <div className="col-md-10 col-lg-8 mx-auto text-center">
                            <i className="far fa-paper-plane fa-2x mb-2 text-white"></i>
                            <h2 className="text-white mb-5">Subscribe to receive updates!</h2>
                            <form className="form-signup d-flex flex-column flex-sm-row">
                                <input className="form-control flex-fill me-0 me-sm-2 mb-3 mb-sm-0" id="inputEmail" type="email" placeholder="Enter email address..." />
                                <button className="btn btn-primary" type="submit">Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section className="contact-section bg-dark">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5">
                        <div className="col-md-4 mb-3 mb-md-0">
                            <div className="card py-4 h-100">
                                <div className="card-body text-center">
                                    <i className="fas fa-map-marked-alt text-primary mb-2"></i>
                                    <h4 className="text-uppercase m-0">Address</h4>
                                    <hr className="my-4 mx-auto" />
                                    <div className="small text-black-50">4923 Market Street, Orlando FL</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3 mb-md-0">
                            <div className="card py-4 h-100">
                                <div className="card-body text-center">
                                    <i className="fas fa-envelope text-primary mb-2"></i>
                                    <h4 className="text-uppercase m-0">Email</h4>
                                    <hr className="my-4 mx-auto" />
                                    <div className="small text-black-50"><a href="#!">hello@yourdomain.com</a></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3 mb-md-0">
                            <div className="card py-4 h-100">
                                <div className="card-body text-center">
                                    <i className="fas fa-mobile-alt text-primary mb-2"></i>
                                    <h4 className="text-uppercase m-0">Phone</h4>
                                    <hr className="my-4 mx-auto" />
                                    <div className="small text-black-50">+1 (555) 902-8832</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="social d-flex justify-content-center bg-dark">
                        <a className="mx-2" href="#!"><i className="fab fa-twitter"></i></a>
                        <a className="mx-2" href="#!"><i className="fab fa-facebook-f"></i></a>
                        <a className="mx-2" href="#!"><i className="fab fa-github"></i></a>
                    </div>
                </div>
            </section>
            <footer className="footer bg-dark text-center text-white-50"><div className="container px-4 px-lg-5">Copyright &copy; Your Website 2021</div></footer>
        </div>
    )
}

export default App
