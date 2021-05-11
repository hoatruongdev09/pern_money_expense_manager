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

    return (
        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary text-center">{months[record.month]}</h6>
                </div>
                <div class="card-body">
                    <div class="alert alert-primary" role="alert">
                        <div className="row">
                            <div className="col-5 text-left"><small>Income:</small></div>
                            <div className="col-7 text-right"><small>{formatter.format(incomeAmount)}</small></div>
                        </div>
                    </div>
                    <div class="alert alert-danger" role="alert">
                        <div className="row">
                            <div className="col-5 text-left"><small>Expense:</small></div>
                            <div className="col-7 text-right"><small>{formatter.format(expenseAmount)}</small></div>
                        </div>
                    </div>
                    <div class="alert alert-light" role="alert">
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
            const logMonth = new Date(log.date_created).getMonth()
            const collection = map.get(logMonth)
            if (!collection) {
                map.set(logMonth, [log])
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