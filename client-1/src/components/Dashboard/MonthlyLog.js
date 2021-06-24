import { Fragment, useState } from "react";
const formatter = new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' })

function RecordLog({ record, index }) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let expenseAmount = 0
    let incomeAmount = 0

    record.records.forEach(rec => {
        if (rec.expense_type_id == 1) {
            incomeAmount += parseInt(rec.money_amount)
        } else if (rec.expense_type_id == 2) {
            expenseAmount += parseInt(rec.money_amount)
        }
    })
    const splitDates = record.month.split('/')
    return (
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-center">{months[parseInt(splitDates[0])]} - {splitDates[1]}</h6>
                </div>
                <div className="card-body">
                    <div className="alert alert-primary" role="alert">
                        <div className="row">
                            <div className="col-5 text-left"><small>Income:</small></div>
                            <div className="col-7 text-right"><small>{formatter.format(incomeAmount)}</small></div>
                        </div>
                    </div>
                    <div className="alert alert-danger" role="alert">
                        <div className="row">
                            <div className="col-5 text-left"><small>Expense:</small></div>
                            <div className="col-7 text-right"><small>{formatter.format(expenseAmount)}</small></div>
                        </div>
                    </div>
                    <div className="alert alert-light" role="alert">
                        <div className="row">
                            <div className="col-5 text-left"><small>Balance:</small></div>
                            <div className="col-7 text-right"><small>{formatter.format(incomeAmount - expenseAmount)}</small></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function MonthlyLog({ logs }) {

    const groupByMonth = (logs) => {
        const map = new Map()
        logs.forEach((log) => {
            const logDateCreated = new Date(log.date_created)
            const logMonth = logDateCreated.getMonth()
            const logYear = logDateCreated.getFullYear()
            const collection = map.get(`${logMonth}/${logYear}`)
            if (!collection) {
                map.set(`${logMonth}/${logYear}`, [log])
            } else {
                collection.push(log)
            }
        })
        const records = []
        for (let [key, value] of map) {
            records.push({ month: key, records: value })
        }
        records.sort((a, b) => { return b.month - a.month })
        return records
    }
    const logMap = groupByMonth(logs)
    console.log('map monthly: ', logMap)
    return (
        <Fragment>
            <div className="row">
                <div className="col-lg-12">
                    <hr />
                    <div className="row">
                        {
                            logMap.map((lg, index) => (
                                <RecordLog key={`month-log-${index}`} record={lg} index={index} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default MonthlyLog