import { Line } from 'react-chartjs-2'

const InterpolateChart = ({ chartName, data }) => {
    const displayOption = {
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    usePointStyle: true,
                    boxWidth: 10,
                },
            },
            maintainAspectRatio: true,
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Value'
                },
                suggestedMin: -10,
                suggestedMax: 200
            }
        }
    }
    return (
        <>
            <div class="col-12 col-sm-8 col-md-8 col-lg-8">
                <div class="card">
                    <div className="card-header pb-1">
                        <h6 className="float-start">{chartName}</h6>
                    </div>
                    <div class="card-content">
                        <div className="card-body pt-1 pb-1">
                            <div className="chart-container">
                                <Line data={data} options={displayOption} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InterpolateChart
