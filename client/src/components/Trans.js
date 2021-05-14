import { Fragment, useState, useEffect, forwardRef } from "react";
import DatePicker from 'react-datepicker'
import DailyLog from "./Dashboard/DailyLog";
import MonthlyLog from "./Dashboard/MonthlyLog"
import WeeklyLog from './Dashboard/WeeklyLog'
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import OverViewLogs from "./Dashboard/OverViewLog"

import CreateNote from './Dashboard/CreateNote'
import CreateLog from './Dashboard/CreateLog'

import 'react-datepicker/dist/react-datepicker.css'


import Host from "../AppURL";

function Dashboard() {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const [windowType, setWindowType] = useState(0)
  const [logs, setLog] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date(new Date().getFullYear(), new Date().getMonth()))

  const activeToggleSideBar = (e) => {
    e.preventDefault();
    setToggleSideBar(!toggleSideBar);
  };

  const fetchLog = async (startDate, endDate) => {
    try {
      const response = await fetch(`${Host}/money_expense?startDate=${startDate}&endDate=${endDate}`, {
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
    await fetchLog(Math.floor(selectedDate / 1000), Math.floor(new Date() / 1000));
  }, []);

  const onCreateLog = (log) => {
    setLog([log, ...logs])
  }

  const onRemoveRecord = async (record) => {
    console.log('remove record: ', record)
    try {
      const response = await fetch(`${Host}/money_expense/${record.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      const parseRes = await response.json()
      if (response.status === 200) {
        setLog(logs.filter(log => log.id != record.id))
      } else {
        console.log(parseRes)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onUpdateRecord = async (record) => {
    const newRecord = { ...record, date_created: Math.floor(new Date(record.date_created) / 1000) }
    console.log('update record: ', newRecord)
    try {
      const response = await fetch(`${Host}/money_expense/${newRecord.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newRecord)
      })
      const parseRes = await response.json()

      if (response.status === 200) {
        setLog(logs.map(log => log.id != record.id ? log : record))
        console.log(parseRes)
      } else {
        console.log(parseRes)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onChangeDate = async (e, direct) => {
    e.preventDefault()
    let date = new Date()
    let endMonth = new Date()
    switch (windowType) {
      case 1:
        date = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + direct)
        endMonth = new Date(selectedDate.getFullYear(), date.getMonth() + 1, 0)
        await fetchLog(Math.floor(date / 1000), Math.floor(endMonth / 1000));
        break
      case 2:
        const year = selectedDate.getFullYear() + direct
        date = new Date(year, 1)
        const endYear = new Date(year, 12, 31)
        await fetchLog(Math.floor(date / 1000), Math.floor(endYear / 1000));
        break
      default:
        date = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + direct)
        endMonth = new Date(selectedDate.getFullYear(), date.getMonth() + 1, 0)
        await fetchLog(Math.floor(date / 1000), Math.floor(endMonth / 1000));
        break
    }
    setSelectedDate(date)
  }

  const onChangeShowType = (e, type) => {
    e.preventDefault()
    setWindowType(type)
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
                    <div className="btn-group" role="group" aria-label="group-change-window">
                      <button className={`${windowType == 0 ? "border-bottom-primary" : ""} btn`} onClick={(e) => onChangeShowType(e, 0)}><span className={`text-gray-800`}>Daily</span></button>
                      <button className={`${windowType == 1 ? "border-bottom-primary" : ""} btn`} onClick={(e) => onChangeShowType(e, 1)}><span className={`text-gray-800 mx-3`}>Weekly</span></button>
                      <button className={`${windowType == 2 ? "border-bottom-primary" : ""} btn`} onClick={(e) => onChangeShowType(e, 2)}><span className={`text-gray-800`}>Monthly</span></button>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row pb-2">
                  <div className="col-8">
                    <div className="float-left">
                      <div className="float-left">
                        <button onClick={e => onChangeDate(e, -1)} type="button float-left" className="btn btn-light"><i className="fas fa-angle-left"></i></button>
                      </div>
                      <div className="float-left px-2">
                        <SelectDatePicker window={windowType} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                      </div>
                      <div className="float-left">
                        <button onClick={e => onChangeDate(e, 1)} type="button" className="btn btn-light float-left"><i className="fas fa-angle-right"></i></button>
                      </div>
                    </div>
                  </div>
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
                <OverViewLogs logs={logs} />

                <SelectWindow window={windowType} onRemoveRecord={record => onRemoveRecord(record)} onUpdateRecord={record => onUpdateRecord(record)} logs={logs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function SelectWindow({ window, onRemoveRecord, onUpdateRecord, logs }) {
  switch (window) {
    case 1: return (<WeeklyLog logs={logs} />)
    case 2: return (<MonthlyLog logs={logs} />)
    default: return (<DailyLog onRemoveRecord={record => onRemoveRecord(record)} onUpdateRecord={record => onUpdateRecord(record)} logs={logs} />)
  }
}
function SelectDatePicker({ window, selectedDate, setSelectedDate }) {
  const ModifiedDatePickerInput = forwardRef(
    ({ value, onClick }, ref) => (
      <button className="btn btn-dark" onClick={onClick} ref={ref}>{value}</button>
    ),
  );
  switch (window) {
    case 1: return (
      <DatePicker
        customInput={<ModifiedDatePickerInput />}
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        dateFormat="MMM yyyy"
        showMonthYearPicker
      />
    )
    case 2: return (
      <DatePicker
        customInput={<ModifiedDatePickerInput />}
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        dateFormat="yyyy"
        showMonthYearPicker
      />
    )
    default: return (
      <DatePicker
        customInput={<ModifiedDatePickerInput />}
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        dateFormat="MMM yyyy"
        showMonthYearPicker
      />)
  }
}

export default Dashboard;
