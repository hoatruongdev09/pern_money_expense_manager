import { Fragment, useState } from "react";
const formatter = new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' })

function RecordLog({ record, index }) {
    record.records.sort((a, b) => b.date_created - a.date_created)
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
            <div className="col-12">
                <div className={`alert bg-gray-${index % 2 == 0 ? "200" : "400"} mb-0 text-secondary`}>
                    <div className="row">
                        <div className="col-3 py-1 text-center border border-dark rounded">
                            {`${record.dateInfo.startDate}.${record.month + 1} ~ ${record.dateInfo.endDate}.${record.month + 1}`}
                        </div>
                        <div className="col-3 pt-1 text-right text-primary">{formatter.format(incomeAmount)}</div>
                        <div className="col-3 pt-1 text-right text-danger">{formatter.format(expenseAmount)}</div>
                        <div className="col-3 pt-1 text-right">{formatter.format(incomeAmount - expenseAmount)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function WeeklyLog({ logs }) {
    const createWeekMap = (date) => {
        date.setDate(1)
        const endMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)

        const startDate = date.getDate()
        const endDate = endMonth.getDate()

        const tempDate = new Date(date.getFullYear(), date.getMonth())

        const weekMap = []
        for (let i = startDate; i <= endDate; i++) {
            tempDate.setDate(i)
            if (tempDate.getDay() == 0) {
                console.log('wow this is sunday: ', tempDate)
                weekMap.push(tempDate.getDate())
            }
        }
        if (weekMap[weekMap.length - 1] != endDate) {
            weekMap.push(endDate)
        }
        return weekMap
    }
    const findStartEndDateOfWeek = (sunday, date) => {
        date.setDate(sunday)
        console.log('init date: ', date)
        if (date.getDay() == 0) {
            for (let i = sunday - 1; i >= 1; i--) {
                date.setDate(i)
                if (date.getDay() == 0) {
                    console.log('start date: i==0', date.getDate())
                    return {
                        startDate: i + 1,
                        endDate: sunday
                    }
                }
                if (i == 1) {
                    console.log('start date: i==1', date.getDate())
                    return {
                        startDate: i,
                        endDate: sunday
                    }
                }
            }
        } else {
            for (let i = sunday - 1; i >= 1; i--) {
                date.setDate(i)
                if (date.getDay() == 0) {
                    console.log('start date: i', date.getDate())
                    return {
                        startDate: i + 1,
                        endDate: sunday
                    }
                }
            }
        }
    }
    const findLogWeek = (log, weekMap) => {
        const logDate = new Date(log.date_created).getDate()
        for (let i = weekMap.length - 1; i >= 0; i--) {
            if (logDate >= weekMap[i]) { return i }
        }
        return 0
    }
    const groupByMonth = (logs) => {
        if (logs.length == 0) { return [] }
        const monthDate = new Date(logs[0].date_created)
        const weekMap = createWeekMap(monthDate)
        console.log('week map: ', weekMap)
        const map = new Map()

        weekMap.forEach((week) => {
            if (!map.has(week)) {
                map.set(week, [])
            }
        })

        logs.forEach((log) => {
            const logWeek = findLogWeek(log, weekMap)
            const collection = map.get(weekMap[logWeek])
            if (!collection) {
                map.set(weekMap[logWeek], [log])
            } else {
                collection.push(log)
            }
        })
        const records = []
        console.log('map: ', map)
        for (let [key, value] of map) {
            const dateInfo = findStartEndDateOfWeek(key, monthDate)
            records.push({ week: key, dateInfo: dateInfo, month: monthDate.getMonth(), records: value })
        }
        records.sort((a, b) => { return b.week - a.week })

        return records
    }
    const recordMap = groupByMonth(logs)
    return (
        <Fragment>
            <hr />
            <div className="row">
                <div className="col-12">
                    <div className={`alert border`}>
                        <div className="row">
                            <div className="col-3 text-center">Week</div>
                            <div className="col-3 text-right">Income</div>
                            <div className="col-3 text-right">Expense</div>
                            <div className="col-3 text-right">Balance</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {
                        recordMap.map((lg, index) => (
                            <RecordLog key={`weekly-log-${index}`} record={lg} index={index} />
                        ))
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default WeeklyLog