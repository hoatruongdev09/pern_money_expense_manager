import { Doughnut } from 'react-chartjs-2'
function StatisticsChart({ chartName, data }) {

    const displayOption = {
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    boxWidth: 10,
                },
            },
            maintainAspectRatio: true,
        }
    }
    return (
        <>
            <div class="col-12 col-sm-4 col-md-4 col-lg-4">
                <div class="card">
                    <div className="card-header pb-1">
                        <h6 className="float-start">{chartName}</h6>
                    </div>
                    <div class="card-content">
                        <div className="card-body pt-1 pb-1">
                            <div className="chart-container">
                                <Doughnut data={data} options={displayOption} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StatisticsChart
