import { Fragment, useState, useEffect, forwardRef } from "react";
import { Pie, Doughnut } from 'react-chartjs-2'

import Host from "../../AppURL";

function MainDashboard() {
  const data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
  useEffect(async () => {
    await getThisMonthLog()
    await fetchMethod()
    await fetchCategories()
    await fetchType()
  }, [])
  const getThisMonthLog = async () => {
    const toDay = new Date()
    const firstDayOfMonth = new Date(toDay.getFullYear(), toDay.getMonth(), 1)
    const lastDayOfMonth = new Date(toDay.getFullYear(), toDay.getMonth() + 1, 0)
    await fetchLog(Math.floor(firstDayOfMonth / 1000), Math.floor(lastDayOfMonth / 1000))
  }
  const fetchLog = async (startDate, endDate) => {
    try {
      const response = await fetch(`${Host}/money_expense?startDate=${startDate}&endDate=${endDate}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const parseRes = await response.json();
      if (response.status === 200) {
        console.log(parseRes)
        // setLog(parseRes);
      } else {
        console.error(parseRes);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${Host}/category`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      const parseRes = await response.json()
      if (response.status === 200) {
        console.log(`categories: `, parseRes)
      } else {
        console.error(parseRes)
      }
    } catch (error) {
      console.error(error.message)
    }

  }
  const fetchMethod = async () => {
    try {
      const response = await fetch(`${Host}/money_expense/methods`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      const parseRes = await response.json()
      if (response.status === 200) {
        console.log(`method: `, parseRes)
      } else {
        console.error(parseRes)
      }
    } catch (error) {
      console.error(error.message)
    }
  }
  const fetchType = async () => {
    try {
      const response = await fetch(`${Host}/money_expense/types`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      const parseRes = await response.json()
      if (response.status === 200) {
        console.log(`type: `, parseRes)
      } else {
        console.error(parseRes)
      }
    } catch (error) {
      console.error(error.message)
    }
  }
  return (
    <Fragment>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
        <a
          href="#"
          className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        >
          <i className="fas fa-download fa-sm text-white-50"></i> Generate
          Report
        </a>
      </div>
      <div className="row">
        <InComeTab />
        <ExpenseTab />
        <TotalTab />
      </div>
      <div className="row">
        <div className="col-6">
          <div className="card shadow mb-1 mt-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Income in this month</h6>
            </div>
            <div className="card-body">
              <Pie data={data} />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card shadow mb-1 mt-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-danger">Income in this month</h6>
            </div>
            <div className="card-body">
              <Doughnut data={data} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
function TotalTab() {
  return (
    <div className="col-xl-4 col-md-4 mb-1">
      <div className="card border-left-warning shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col">
              <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                Balance
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                $40,000
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function ExpenseTab() {
  return (
    <div className="col-xl-4 col-md-4 mb-1">
      <div className="card border-left-danger shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col">
              <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                Expense
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                $215,000
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function InComeTab() {
  return (
    <div className="col-xl-4 col-md-4 mb-1">
      <div className="card border-left-primary shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col">
              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                Income
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                $40,000
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
