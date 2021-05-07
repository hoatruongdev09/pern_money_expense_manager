import { Fragment, useState, useEffect } from "react";

import Log from "./Dashboard/DiaryLog";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

import CreateNote from './Dashboard/CreateNote'
import CreateLog from './Dashboard/CreateLog'


import Host from "../AppURL";

function Dashboard() {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const [logs, setLog] = useState([]);

  const activeToggleSideBar = (e) => {
    e.preventDefault();
    setToggleSideBar(!toggleSideBar);
  };

  const fetchLog = async () => {
    try {
      const response = await fetch(`${Host}/money_expense`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const parseRes = await response.json();
      if (response.status === 200) {
        setLog(parseRes);
      } else {
        console.error(parseRes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(async () => {
    await fetchLog();
  }, []);

  const onCreateLog = (log) => {
    setLog([log, ...logs])
  }

  return (
    <Fragment>
      <div id="page-top" className={`big-body ${toggleSideBar ? "sidebar-toggled" : ""}`} >
        <div id="wrapper">
          <SideBar
            showSideBar={toggleSideBar}
            toggleSidebar={activeToggleSideBar}
          />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <TopBar toggleSidebar={activeToggleSideBar} />
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <h1 className="h3 text-gray-800">Diary</h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8"></div>
                  <div className="col-4">
                    <div className="float-right">
                      <CreateLog onCreateLog={log => onCreateLog(log)} />
                    </div>
                    <div className="float-right pr-1">
                      <CreateNote />
                    </div>
                  </div>
                </div>
                <hr />
                <Log logs={logs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Dashboard;
