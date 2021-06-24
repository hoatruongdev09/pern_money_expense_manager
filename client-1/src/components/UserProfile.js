import { Fragment, useState } from 'react'
import Host from "../AppURL";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

function UserProfile({ setAuth, user }) {
    const [toggleSideBar, setToggleSideBar] = useState(false);
    const activeToggleSideBar = (e) => {
        e.preventDefault();
        setToggleSideBar(!toggleSideBar);
    };
    return (
        <Fragment>
            <div id="page-top" className={`big-body ${toggleSideBar ? "sidebar-toggled" : ""}`} >
                <div id="wrapper">
                    <SideBar
                        showSideBar={toggleSideBar}
                        toggleSidebar={activeToggleSideBar}
                        selectedTab={1}
                    />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <TopBar toggleSidebar={activeToggleSideBar} user={user} />
                            <div className="container-fluid">
                                <div className="card" >
                                    <div className="card-img-top">
                                        <img className="card-img-top" style={{ height: "15rem", width: "100%", objectFit: "cover", objectPosition: "0 55%" }} src={`https://scontent-hkt1-2.xx.fbcdn.net/v/t1.6435-9/107871677_3029865077067544_771400207538713311_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=fAIdBTncarMAX8mIkO3&_nc_ht=scontent-hkt1-2.xx&oh=2236fe76858da556ffe6b86f14adc45f&oe=60CB8FF9`} alt="Card image cap" />
                                    </div>
                                    <div className="card-body" style={{ marginTop: "-7.5rem" }}>
                                        <div className="row">
                                            <div className="col-12 col-xs-12 text-center">
                                                <img className="card-img-top " style={{ borderWidth: "0.25rem", borderColor: "white", borderStyle: "solid", height: "10rem", width: "auto", objectFit: "cover", borderRadius: "50%", objectPosition: "0 55%" }} src={`https://scontent-hkt1-2.xx.fbcdn.net/v/t1.6435-9/107871677_3029865077067544_771400207538713311_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=fAIdBTncarMAX8mIkO3&_nc_ht=scontent-hkt1-2.xx&oh=2236fe76858da556ffe6b86f14adc45f&oe=60CB8FF9`} alt="Card image cap" />
                                                <button className="btn text-center" style={{ display: "block" }}><i class="fa fa-camera" aria-hidden="true"></i></button>
                                            </div>
                                        </div>

                                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
export default UserProfile