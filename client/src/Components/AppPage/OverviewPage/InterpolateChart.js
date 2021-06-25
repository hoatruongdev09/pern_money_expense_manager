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
                    display: true,
                    text: 'Day in month'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Money amount'
                },
                suggestedMin: 0,
                suggestedMax: 2000
            }
        }
    }
    return (
        <>
            <div className="col-12 col-sm-12 col-md-8 col-lg-8">
                <div className="card">
                    <div className="card-header pb-1">
                        <h6 className="float-start">{chartName}</h6>
                    </div>
                    <div className="card-content">
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
