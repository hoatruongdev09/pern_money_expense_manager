import RecentTransactions from '../../Components/AppPage/OverviewPage/RecentTransaction'
import StatisticsChart from '../../Components/AppPage/OverviewPage/StatisticsChart'
import { useEffect, useState } from "react"


import API from '../../Utils/API'

const Dashboard = ({ }) => {
    const [transactions, setTransactions] = useState([])
    useEffect(async () => {
        await fetchTransactionByMonth(new Date())
    }, [])
    const fetchTransactionByMonth = async (startDate) => {
        const { fromDate, toDate } = getStartAndEndMonth(startDate)
        const data = await fetchTransactionByTime(Math.floor(fromDate / 1000), Math.floor(toDate / 1000))
        console.log(data)
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
            if (response && response.status == 200) {
                return response.data
            }
        } catch (error) {
            return []
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
                            <StatisticsChart />
                            <StatisticsChart />
                            <StatisticsChart />
                            <RecentTransactions recentTransactions={transactions} />
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
