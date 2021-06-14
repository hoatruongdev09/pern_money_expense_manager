import RecentTransactions from '../../Components/AppPage/OverviewPage/RecentTransaction'
import StatisticsChart from '../../Components/AppPage/OverviewPage/StatisticsChart'
import { useEffect } from "react"

const Dashboard = ({ }) => {
    return (
        <>
            <div className="page-heading">
                <h3>Overview</h3>
            </div>

            <div className="page-content" >
                <div className="row">
                    <div className="col-sm-12 col-md-9">
                        <div className="row">
                            <RecentTransactions />
                            <StatisticsChart />
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
