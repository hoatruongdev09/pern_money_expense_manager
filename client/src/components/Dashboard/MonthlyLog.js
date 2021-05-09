import { Fragment, useState } from "react";

function RecordLog({ record, index }) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return (
        <div className="row">
            <div className="col-4">

            </div>
            <div className="col-4"></div>
            <div className="col-4"></div>
        </div>
    )
}

function MonthlyLog({ logs }) {

    const groupByMonth = (logs) => {
        const map = new Map()
        logs.forEach((log) => {
            const logMonth = new Date(log.date_created).getFullYear()
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
    return (
        <Fragment>
            <div className="row">
                <div className="col-lg-12">
                    {
                        logMap.map((lg, index) => {
                            <RecordLog key={`month-log-${index}`} record={log} index={index} />
                        })
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default MonthlyLog