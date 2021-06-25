import RecentTransactions from '../../Components/AppPage/OverviewPage/RecentTransaction'
import StatisticsChart from '../../Components/AppPage/OverviewPage/ModifiedChart'
import InterpolateChart from '../../Components/AppPage/OverviewPage/InterpolateChart'
import { useEffect, useState } from "react"
import API from '../../Utils/API'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons'

import jsFileDownload from 'js-file-download'
const Dashboard = ({ }) => {
    const [transactions, setTransactions] = useState([])
    const [yearTransactions, setYearTransactions] = useState([])
    useEffect(() => {
        fetchMonthTransactionByTime(new Date())
        fetchYearTransactionByTime(new Date())
    }, [])
    const fetchMonthTransactionByTime = async (time) => {
        const { fromDate, toDate } = getStartAndEndMonth(time)
        const data = await fetchTransactionByTime(Math.floor(fromDate / 1000), Math.floor(toDate / 1000))
        setTransactions(data)
    }
    const fetchYearTransactionByTime = async (time) => {
        const { fromDate, toDate } = getStartAndEndYear(time)
        const data = await fetchTransactionByTime(Math.floor(fromDate / 1000), Math.floor(toDate / 1000))
        setYearTransactions(data)
    }
    const getStartAndEndYear = (currentTime) => {
        const fromDate = new Date(currentTime.getFullYear(), 1, 1)
        const toDate = new Date(currentTime.getFullYear(), 12, 31)
        return { fromDate, toDate }
    }
    const getStartAndEndMonth = (currentTime) => {
        const fromDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1)
        const toDate = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 0)
        return { fromDate, toDate }
    }
    const fetchTransactionByTime = async (from, to) => {
        try {

            const response = await API.get(`/money_expense/?startDate=${from}&endDate=${to}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).catch(err => {
                return []
            })
            if (response && response.status === 200) {
                return response.data
            }
        } catch (error) {
            return []
        }
    }

    const createStatisticData = (transactions) => {
        const labels = ['Income', 'Expense', 'Transfer']
        let totalIncome = 0
        let totalExpense = 0
        let totalTransfer = 0
        transactions.forEach(record => {
            if (record.expense_type_id === 1) {
                totalIncome += parseInt(record.money_amount)
            }
            if (record.expense_type_id === 2) {
                totalExpense += parseInt(record.money_amount)
            }
            if (record.expense_type_id === 3) {
                totalTransfer += parseInt(record.money_amount)
            }

        })
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Statistic',
                    data: [totalIncome, totalExpense, totalTransfer],
                    backgroundColor: [
                        '#0dcaf0',
                        '#dc3545',
                        '#ffc107',
                    ],
                },
            ]
        };
        return data
    }
    const createExpenseStructure = (transactions) => {
        const categoryMap = new Map()
        transactions.forEach(record => {
            if (record.expense_type_id === 2) {
                let mapValue = categoryMap.get(record.category_name)
                if (mapValue == null) {
                    categoryMap.set(record.category_name, parseInt(record.money_amount))
                } else {
                    mapValue += parseInt(record.money_amount)
                }
            }
        })
        let dataMap = []
        for (let [key, value] of categoryMap) {
            dataMap.push({ name: key, value: value })
        }
        dataMap = dataMap.sort((a, b) => b.value - a.value)
        let otherSource = 0;
        for (let i = 2; i < dataMap.length; i++) {
            otherSource += dataMap[i].value
        }
        const data = {
            labels: [...dataMap.slice(0, 2).map(data => {
                if (data.name.length >= 13) {
                    return data.name.substring(0, 10) + "..."
                }
                return data.name
            }), 'Other'],
            datasets: [
                {
                    label: 'Most Income Source',
                    data: [...dataMap.slice(0, 2).map(data => data.value), otherSource],
                    backgroundColor: ['#0dcaf0',
                        '#dc3545',
                        '#ffc107',]
                }

            ]
        }
        return data
    }
    const createIncomeStructure = (transactions) => {
        const categoryMap = new Map()
        transactions.forEach(record => {
            if (record.expense_type_id === 1) {
                let mapValue = categoryMap.get(record.category_name)
                if (mapValue == null) {
                    categoryMap.set(record.category_name, parseInt(record.money_amount))
                } else {
                    mapValue += parseInt(record.money_amount)
                }
            }
        })
        let dataMap = []
        for (let [key, value] of categoryMap) {
            dataMap.push({ name: key, value: value })
        }
        dataMap = dataMap.sort((a, b) => b.value - a.value)
        let otherSource = 0;
        for (let i = 2; i < dataMap.length; i++) {
            otherSource += dataMap[i].value
        }
        const data = {
            labels: [...dataMap.slice(0, 2).map(data => data.name), 'Other'],
            datasets: [
                {
                    label: 'Most Income Source',
                    data: [...dataMap.slice(0, 2).map(data => data.value), otherSource],
                    backgroundColor: ['#0dcaf0',
                        '#dc3545',
                        '#ffc107',]
                }

            ]
        }
        return data
    }
    const createData = (transactions) => {
        const currentDate = new Date()
        const endDateOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

        const currentMonth = currentDate.getMonth() + 1
        const DATA_COUNT = 12
        const labels = [];
        for (let i = 1; i <= DATA_COUNT; ++i) {
            labels.push(i.toString());
        }
        const inComeDataMap = new Map()
        const expenseDataMap = new Map()

        transactions.forEach(record => {
            if (record.expense_type_id == 1) {
                let incomeData = inComeDataMap.get(new Date(record.date_created).getMonth())
                if (incomeData != null) {
                    incomeData += parseInt(record.money_amount)
                } else {
                    inComeDataMap.set(new Date(record.date_created).getMonth(), parseInt(record.money_amount))
                }
            }
            if (record.expense_type_id == 2) {
                let incomeData = expenseDataMap.get(new Date(record.date_created).getMonth())
                if (incomeData != null) {
                    incomeData += parseInt(record.money_amount)
                } else {
                    expenseDataMap.set(new Date(record.date_created).getMonth(), parseInt(record.money_amount))
                }
            }
        })
        let incomeData = []
        let expenseData = []
        let balanceData = []

        let totalIncome = 0
        let totalExpense = 0
        for (let i = 0; i < currentMonth; i++) {
            const monthIncome = inComeDataMap.get(i)
            const monthExpense = expenseDataMap.get(i)
            totalIncome += monthIncome == null ? 0 : monthIncome
            totalExpense += monthExpense == null ? 0 : monthExpense
            incomeData[i] = totalIncome
            expenseData[i] = totalExpense
            balanceData[i] = totalIncome - totalExpense


        }
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Income',
                    data: incomeData,
                    borderColor: '#0dcaf0',
                    fill: false,
                    cubicInterpolationMode: 'monotone',
                    tension: 0.4
                }, {
                    label: 'Expense',
                    data: expenseData,
                    borderColor: '#dc3545',
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Balance',
                    data: balanceData,
                    borderColor: '#6c757d',
                    fill: false
                }
            ]
        };
        return data
    }

    const generateReport = async (e) => {
        e.preventDefault()
        const { fromDate, toDate } = getStartAndEndMonth(new Date())
        const from = Math.floor(new Date(fromDate) / 1000)
        const to = Math.floor(new Date(toDate) / 1000)
        try {

            const response = await API.get(`/money_expense/excel?startDate=${from}&endDate=${to}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                responseType: 'blob'
            }).catch(err => {

            })
            if (response && response.status === 200) {
                jsFileDownload(response.data, 'report.xlsx')
            }
        } catch (error) {

        }
    }

    return (
        <>
            <div className="page-heading">
                <h3>Overview</h3>
            </div>

            <div className="page-content" >
                <div className="row">
                    <div className="col-sm-12 col-md-9">
                        <div className="row">
                            <StatisticsChart chartName='Statistics' data={createStatisticData(transactions)} />
                            <StatisticsChart chartName='Earned in this month' data={createIncomeStructure(transactions)} />
                            <StatisticsChart chartName='Spend in this month' data={createExpenseStructure(transactions)} />
                            <InterpolateChart chartName="Earned, spend & balance in this month" data={createData(yearTransactions)} />
                            <RecentTransactions transactions={transactions} />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-3">
                        <div className="card">
                            {/* <div className="card-header pb-1">
                                <h6 className="float-start">Generate Report</h6>

                            </div> */}
                            <div className="card-content pt-3">
                                <div className="card-body pt-1">
                                    <button onClick={e => generateReport(e)} className='btn btn-primary w-100'><FontAwesomeIcon icon={faFileExcel} /> Generate Report</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard
