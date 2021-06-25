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
                            <li className="nav-item"><a className="nav-link" href="#screenshots">Screenshots</a></li>
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
                            <h2 className="text-white-50 mx-auto mt-2 mb-5">A free tool for money expense management and analyze.</h2>
                            <Link className="btn btn-primary" to="/dashboard">Get Started</Link>
                        </div>
                    </div>
                </div>
            </header>
            <section className="projects-section bg-light" id="features">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-0 mb-4 mb-lg-5 align-items-center">
                        <div className="col-xl-8 col-lg-7"><img className="img-fluid mb-3 mb-lg-0" src="assets/img/bg-masthead.jpg" alt="..." /></div>
                        <div className="col-xl-4 col-lg-5">
                            <div className="featured-text text-center text-lg-left">
                                <h4>Shoreline</h4>
                                <p className="text-black-50 mb-0">Grayscale is open source and MIT licensed. This means you can use it for any project - even commercial projects! Download it, customize it, and publish your website!</p>
                            </div>
                        </div>
                    </div>
                    <div className="row gx-0 mb-5 mb-lg-0 justify-content-center">
                        <div className="col-lg-6"><img className="img-fluid" src="assets/img/demo-image-01.jpg" alt="..." /></div>
                        <div className="col-lg-6">
                            <div className="bg-black text-center h-100 project">
                                <div className="d-flex h-100">
                                    <div className="project-text w-100 my-auto text-center text-lg-left">
                                        <h4 className="text-black">Misty</h4>
                                        <p className="mb-0 text-black-50">An example of where you can put an image of a project, or anything else, along with a description.</p>
                                        <hr className="d-none d-lg-block mb-0 ms-0" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row gx-0 justify-content-center">
                        <div className="col-lg-6"><img className="img-fluid" src="assets/img/demo-image-02.jpg" alt="..." /></div>
                        <div className="col-lg-6 order-lg-first">
                            <div className="bg-black text-center h-100 project">
                                <div className="d-flex h-100">
                                    <div className="project-text w-100 my-auto text-center text-lg-right">
                                        <h4 className="text-black">Mountains</h4>
                                        <p className="mb-0 text-black-50">Another example of a project with its respective description. These sections work well responsively as well, try this theme on a small screen!</p>
                                        <hr className="d-none d-lg-block mb-0 me-0" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="about-section text-center" id="screenshots">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-8">
                            <h2 className="text-white mb-4">Built with Bootstrap 5</h2>
                            <p className="text-white-50">
                                Grayscale is a free Bootstrap theme created by Start Bootstrap. It can be yours right now, simply download the template on
                                <a href="https://startbootstrap.com/theme/grayscale/">the preview page.</a>
                                The theme is open source, and you can use it for any purpose, personal or commercial.
                            </p>
                        </div>
                    </div>
                    <img className="img-fluid" src="assets/img/ipad.png" alt="..." />
                </div>
            </section>
            <section className="signup-section" id="signup">
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
            <section className="contact-section bg-black">
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
                    <div className="social d-flex justify-content-center">
                        <a className="mx-2" href="#!"><i className="fab fa-twitter"></i></a>
                        <a className="mx-2" href="#!"><i className="fab fa-facebook-f"></i></a>
                        <a className="mx-2" href="#!"><i className="fab fa-github"></i></a>
                    </div>
                </div>
            </section>
            <footer className="footer bg-black small text-center text-white-50"><div className="container px-4 px-lg-5">Copyright &copy; Your Website 2021</div></footer>
        </div>
    )
}

export default App
