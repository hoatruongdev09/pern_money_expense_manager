import { Fragment, useState } from "react";

const formatter = new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' })

function OverViewLogs({ logs }) {
    let inCome = 0
    let expense = 0;

    logs.forEach(rec => {
        if (rec.expense_type_id == 1) {
            inCome += parseInt(rec.money_amount)
        } else if (rec.expense_type_id == 2) {
            expense += parseInt(rec.money_amount)
        }
    })

    return (
        <Fragment>
            <div className="row">
                <div className="col-4 text-center text-primary">
                    <p className="mb-0">Income: {formatter.format(inCome)}</p>
                </div>
                <div className="col-4 text-center text-danger">
                    <p className="mb-0">Expense: {formatter.format(expense)}</p>
                </div>
                <div className="col-4 text-center text-secondary">
                    <p className="mb-0">Balance: {formatter.format(inCome - expense)}</p>
                </div>
            </div>
        </Fragment>
    )
}

export default OverViewLogs