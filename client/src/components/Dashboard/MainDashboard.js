import { Fragment, useState, useEffect, forwardRef } from "react";
import { Pie, Doughnut } from 'react-chartjs-2'
import randomFlatColor from 'random-flat-colors'
import Host from "../../AppURL";

const formatter = new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' })

function MainDashboard() {
  const [analyzedExpense, setAnalyzedExpense] = useState(new Map())
  const [analyzedIncome, setAnalyzedIncome] = useState(new Map())

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
    await fetchMethod()
    await fetchCategories()
    await fetchType()
    await getThisMonthLog()
  }, [])
  const getThisMonthLog = async () => {
    const toDay = new Date()
    const firstDayOfMonth = new Date(toDay.getFullYear(), toDay.getMonth(), 1)
    const lastDayOfMonth = new Date(toDay.getFullYear(), toDay.getMonth() + 1, 0)
    await fetchLog(Math.floor(firstDayOfMonth / 1000), Math.floor(lastDayOfMonth / 1000))
  }
  const createLogCategoryDataSet = (title, colorTag, logMap, categories) => {
    const logs = []
    for (let [key, value] of logMap) {
      logs.push({
        category_id: value.category_id,
        category_name: value.category_name,
        amount: value.amount,
        color: randomFlatColor(colorTag)
      })
    }
    return {
      labels: logs.map(log => log.category_name),
      datasets: [
        {
          label: title,
          data: logs.map(log => log.amount),
          backgroundColor: logs.map(log => log.color),
          hoverOffset: 5
        }
      ]
    }
  }
  const analyzeExpenseLog = (logs) => {
    const expenseLogs = logs.filter(log => log.expense_type_id == 2)
    const map = new Map()
    expenseLogs.forEach(log => {
      const logCat = log.category_id
      const value = map.get(logCat)
      if (!value) {
        map.set(logCat, {
          category_id: log.category_id,
          category_name: log.category_name,
          amount: parseInt(log.money_amount)
        })
      } else {
        value.amount += parseInt(log.money_amount)
      }
    })
    setAnalyzedExpense(map)
  }
  const analyzeIncomeLog = (logs) => {
    const incomeLogs = logs.filter(log => log.expense_type_id == 1)
    const map = new Map()
    incomeLogs.forEach(log => {
      const logCat = log.category_id
      const value = map.get(logCat)
      if (!value) {
        map.set(logCat, {
          category_id: log.category_id,
          category_name: log.category_name,
          amount: parseInt(log.money_amount)
        })
      } else {
        value.amount += parseInt(log.money_amount)
      }
    })
    setAnalyzedIncome(map)
  }
  const totalIncome = () => {
    let total = 0
    for (let [key, value] of analyzedIncome) {
      total += parseInt(value.amount)
    }
    return total
  }
  const totalExpense = () => {
    let total = 0
    for (let [key, value] of analyzedExpense) {
      total += parseInt(value.amount)
    }
    return total
  }
  const finalBalance = () => {
    return totalIncome() - totalExpense();
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
        analyzeExpenseLog(parseRes)
        analyzeIncomeLog(parseRes)
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
        <InComeTab value={formatter.format(totalIncome())} />
        <ExpenseTab value={formatter.format(totalExpense())} />
        <TotalTab value={formatter.format(finalBalance())} />
      </div>
      <div className="row">
        <div className="col-xl-4 col-md-4">
          <div className="card shadow mb-1 mt-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Income in this month</h6>
            </div>
            <div className="card-body">
              <Doughnut data={createLogCategoryDataSet("Expense in this month", ["blue", "teal", "green", "purple", "dark", "yellow", "orange", "red"], analyzedIncome, [])} />
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-md-4">
          <div className="card shadow mb-1 mt-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-danger">Income in this month</h6>
            </div>
            <div className="card-body">
              <Doughnut data={createLogCategoryDataSet("Expense in this month", ["blue", "teal", "green", "purple", "dark", "yellow", "orange", "red"], analyzedExpense, [])} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
function TotalTab({ value }) {
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
                {value}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function ExpenseTab({ value }) {
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
                {value}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function InComeTab({ value }) {
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
                {value}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
