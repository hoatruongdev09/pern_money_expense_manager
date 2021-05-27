import { useState, forwardRef, useEffect } from 'react'
import DailyTransactionTable from '../../Components/AppPage/TransactionsPage/DailyTransactionTable'
import WeeklyTransactionPage from '../../Components/AppPage/TransactionsPage/WeeklyTransactionPage'
import MonthlyTransactionPage from '../../Components/AppPage/TransactionsPage/MonthlyTransactionPage'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TransactionPage = ({ }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [timeTab, setTimeTab] = useState(0)
    const CustomDatePicker = forwardRef(
        ({ value, onClick }, ref) => (
            <button onClick={onClick} ref={ref} className=" btn btn-primary mx-1">{value}</button>
        ),
    );


    const onChangeDate = (direction) => {
        let value = 0
        switch (timeTab) {
            case 0:
                value = new Date(startDate).getDate()
                break
            case 1:
                value = new Date(startDate).getMonth()
                break
            case 2:
                value = new Date(startDate).getFullYear()
                break
        }
        value += direction
        let time = new Date(startDate)
        switch (timeTab) {
            case 0:
                time.setDate(value)
                break;
            case 1:
                time.setMonth(value)
                break;
            case 2:
                time.setFullYear(value)
                break;
        }
        setStartDate(time)
    }
    return (
        <>
            <div className="page-heading">
                <div className="page-title">
                    <div className="row mb-4">
                        <div className="col-12 col-md-8 order-md-1 order-last">
                            <h3>Transactions</h3>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <a role="button" onClick={e => setTimeTab(0)} className={`nav-link ${timeTab == 0 ? 'active' : ''}`}>Daily</a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a role="button" onClick={e => setTimeTab(1)} className={`nav-link ${timeTab == 1 ? 'active' : ''}`}>Monthly</a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a role="button" onClick={e => setTimeTab(2)} className={`nav-link ${timeTab == 2 ? 'active' : ''}`}>Yearly</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-4 order-md-2 order-first">
                            <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="index.html">Dashboard</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Transactions</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
                <section className="section">
                    <div className="row mb-4">
                        <div className="col-12 col-md-8">
                            <div className="float-left d-flex flex-row">
                                <div className="float-left">
                                    <button onClick={e => onChangeDate(-1)} className=" btn btn-light"><i className="bi bi-caret-left-fill"></i></button>
                                </div>
                                <div className="float-left">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={date => setStartDate(date)}
                                        customInput={<CustomDatePicker />}
                                        showMonthYearPicker={timeTab == 1}
                                        showYearPicker={timeTab == 2}
                                        dateFormat={`${timeTab == 1 || timeTab == 0 ? 'MMM' : ''} ${timeTab == 0 ? 'd,' : ''} yyyy`}
                                    />
                                </div>
                                <div className="float-left">
                                    <button onClick={e => onChangeDate(1)} className=" btn btn-light"><i className="bi bi-caret-right-fill"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-8 order-last">
                            <div className="tab-content" id="myTabContent">
                                <div className="card">
                                    <div className="card-header">
                                        {timeTab == 0 ? (<h4 className="card-title">Daily summary</h4>) : (<></>)}
                                        {timeTab == 1 ? (<h4 className="card-title">Weekly summary</h4>) : (<></>)}
                                        {timeTab == 2 ? (<h4 className="card-title">Monthly summary</h4>) : (<></>)}
                                    </div>
                                    <div className="card-content">
                                        {timeTab == 0 ? (<DailyTransactionTable active={timeTab == 0} />) : (<></>)}
                                        {timeTab == 1 ? (<WeeklyTransactionPage active={timeTab == 1} />) : (<></>)}
                                        {timeTab == 2 ? (<MonthlyTransactionPage active={timeTab == 2} />) : (<></>)}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-12 col-md-4 order-first">
                            <div className="card">
                                <div className="card-header">
                                    {timeTab == 0 ? (<h4 className="card-title">Daily summary</h4>) : (<></>)}
                                    {timeTab == 1 ? (<h4 className="card-title">Weekly summary</h4>) : (<></>)}
                                    {timeTab == 2 ? (<h4 className="card-title">Monthly summary</h4>) : (<></>)}
                                </div>
                                <div className="card-content">
                                    <div className="table-responsive px-2">
                                        <table className="table table-hover mb-0">
                                            <tbody>
                                                <tr>
                                                    <td className="text-bold-500">Income</td>
                                                    <td style={{ textAlign: 'right' }}><span className="w-100 float-right">$500</span></td>
                                                </tr>
                                                <tr>
                                                    <td className="text-bold-500">Expense</td>
                                                    <td style={{ textAlign: 'right' }}> <span className="w-100 float-right">$250</span></td>
                                                </tr>
                                                <tr>
                                                    <td className="text-bold-500">Balance</td>
                                                    <td style={{ textAlign: 'right' }}> <span className="w-100 float-right">$250</span></td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>

        </>
    )
}

export default TransactionPage
