import { Fragment, useState } from "react";

import MainDashboard from "./Dashboard/MainDashboard";

import SideBar from "./SideBar";
import TopBar from "./TopBar";

function Dashboard() {
  const [toggleSideBar, setToggleSideBar] = useState(false);

  const activeToggleSideBar = (e) => {
    e.preventDefault();
    setToggleSideBar(!toggleSideBar);
  };

  return (
    <Fragment>
      <div
        id="page-top"
        className={`big-body ${toggleSideBar ? "sidebar-toggled" : ""}`}
      >
        <div id="wrapper">
          <SideBar
            showSideBar={toggleSideBar}
            toggleSidebar={activeToggleSideBar}
          />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <TopBar toggleSidebar={activeToggleSideBar} />
              <div className="container-fluid">
                <MainDashboard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Dashboard;