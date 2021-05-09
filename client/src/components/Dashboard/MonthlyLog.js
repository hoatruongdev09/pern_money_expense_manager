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
        <div className="row">
            <div className="col-2">
                <div className="w-100 h-100 text-center">
                    <button className="btn btn-outline-primary">{months[record.month]}</button>
                </div>
            </div>
            <div className="col-5">
                <p className="pt-2 text-right text-info" >{formatter.format(incomeAmount)}</p>
            </div>
            <div className="col-5">
                <p className="pt-2 text-right text-danger" >{formatter.format(expenseAmount)}</p>
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
                    <div className="row pt-2">
                        <div className="col-2"><div className="w-100 h-100 text-center">Month</div></div>
                        <div className="col-5"><div className="pt-1 text-right text-info">Income</div></div>
                        <div className="col-5"><div className="pt-1 text-right text-danger">Expense</div></div>
                    </div>
                    <hr />
                    {
                        logMap.map((lg, index) => (
                            <RecordLog key={`month-log-${index}`} record={lg} index={index} />
                        ))
                    }
                </div>
            </div>
        </Fragment >
    )
}

export default MonthlyLog