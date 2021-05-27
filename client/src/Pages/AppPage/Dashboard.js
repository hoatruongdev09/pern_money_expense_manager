import { useEffect } from "react"

const Dashboard = ({ }) => {

    return (
        <>
            <div className="page-heading">
                <h3>Dashboard</h3>
            </div>

            <div className="page-content" >
                <div className="row justify-content-md-center">
                    <div className="col-xl-4 col-md-6 col-xs-12">
                        <div className="card">
                            <div className="card-content">
                                <img src="/assets/images/samples/motorcycle.jpg" className="card-img-top img-fluid" alt="singleminded" />
                                <div className="card-body">
                                    <h5 className="card-title">Be Single Minded</h5>
                                    <p className="card-text">
                                        Chocolate sesame snaps apple pie danish cupcake sweet roll jujubes
                                        tiramisu.Gummies
                                        bonbon apple pie fruitcake icing biscuit apple pie jelly-o sweet roll.
                                        </p>
                                </div>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Cras justo odio</li>
                                <li className="list-group-item">Dapibus ac facilisis in</li>
                                <li className="list-group-item">Vestibulum at eros</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard
