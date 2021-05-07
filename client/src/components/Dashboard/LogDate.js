import { Fragment } from 'react'
const formatter = new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' })
const formatMonthDay = (value) => {
    if (value < 10) {
        return `0${value}`
    } else {
        return value
    }
}

function LogDate({ log }) {
    const dateName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(log.records[0].date_created);

    let totalExpense = 0
    let totalIncome = 0

    log.records.forEach(record => {
        totalExpense += record.expense_type_id == 2 ? parseInt(record.money_amount) : 0
        totalIncome += record.expense_type_id == 1 ? parseInt(record.money_amount) : 0
    })

    return (
        <div
            className="card-header bg-new-secondary text-white"
            style={{ padding: "0.1rem 0.5rem 0.1rem 0.5rem" }}
        >
            <div className="row">
                <div className="col-4">
                    <div className="float-left px-2">
                        <h4
                            style={{ marginBottom: 0, height: "100%" }}
                            className="text-center pt-2 text-white font-weight-bold"
                        >
                            <u>{formatMonthDay(date.getDate())}</u>
                        </h4>
                    </div>
                    <div className="float-left pl-2 pb-2">
                        <p style={{ marginBottom: 0 }}>
                            {formatMonthDay(date.getMonth())}.{date.getFullYear()}
                        </p>
                        <span className="badge badge-light">{dateName[date.getDay()]}</span>
                    </div>

                </div>
                <div className="col-6">
                    <div className="row">
                        <p className="text-right text-info my-0 w-100">
                            {formatter.format(totalIncome)}
                        </p>
                    </div>
                    <div className="row">
                        <p className="text-right text-new-danger my-0 w-100">
                            {formatter.format(totalExpense)}
                        </p>
                    </div>
                </div>
                <div className="col-2 text-center">
                    <button className="btn px-0 mx-0"><i className="fa fa-info-circle text-info" aria-hidden="true"></i></button>
                </div>
            </div>
        </div>
    );
}
export default LogDate