import { Doughnut } from 'react-chartjs-2'
function StatisticsChart() {
    const data = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
            },
        ]
    };
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
                        <h6 className="float-start">Statistics</h6>
                    </div>
                    <div class="card-content">
                        <div className="card-body pt-1">
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
