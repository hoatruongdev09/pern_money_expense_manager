import { Fragment, useState } from "react";

import SideBar from "./SideBar";
import TopBar from "./TopBar";

function Dashboard() {
  const [toggleSideBar, setToggleSideBar] = useState(false);

  const activeToggleSideBar = (e) => {
    e.preventDefault();
    const bigBody = document.getElementById("page-top");
    // bigBody.classList.toggle("sidebar-toggled");

    setToggleSideBar(!toggleSideBar);
    console.log("wtf pls 4");
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
            <TopBar toggleSidebar={activeToggleSideBar} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Dashboard;
