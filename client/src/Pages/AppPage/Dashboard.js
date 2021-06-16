import RecentTransactions from '../../Components/AppPage/OverviewPage/RecentTransaction'
import StatisticsChart from '../../Components/AppPage/OverviewPage/ModifiedChart'
import { useEffect, useState } from "react"
import API from '../../Utils/API'


const Dashboard = ({ }) => {
    const [transactions, setTransactions] = useState([])
    useEffect(() => {
        fetchMonthTransactionByTime(new Date())
    }, [])
    const fetchMonthTransactionByTime = async (time) => {
        const { fromDate, toDate } = getStartAndEndMonth(time)
        const data = await fetchTransactionByTime(Math.floor(fromDate / 1000), Math.floor(toDate / 1000))
        setTransactions(data)
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
                            <StatisticsChart chartName='Most income' data={createIncomeStructure(transactions)} />
                            <StatisticsChart chartName='Most Spending' data={createExpenseStructure(transactions)} />
                            <RecentTransactions transactions={transactions} />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-3">

                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard
