import { useLocation, useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState, forwardRef, useEffect, useCallback } from 'react'
import DailyTransactionTable from '../../Components/AppPage/TransactionsPage/DailyTransactionTable'
import MonthlyTransactionPage from '../../Components/AppPage/TransactionsPage/MonthlyTransactionPage'
import YearlyTransactionPage from '../../Components/AppPage/TransactionsPage/YearlyTransactionPage'
import TransactionDetail from '../../Components/AppPage/TransactionsPage/TransactionDetail';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import API from '../../Utils/API'
import CreateTransaction from '../../Components/AppPage/TransactionsPage/CreateTransaction'
import formatMoney from '../../Utils/formatMoney'

const TransactionPage = ({ }) => {

    const [listCategory, setListCategory] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [timeTab, setTimeTab] = useState(0)
    const [transactions, setTransactions] = useState([])
    const [selectTransaction, setSelectTransaction] = useState(null)

    let query = new URLSearchParams(useLocation().search)
    // const history = useHistory()

    useEffect(() => {
        fetchAllCategory()
        const tabShow = query.get('tab')
        const timeShow = query.get('time')
        let time = new Date()
        if (timeShow != null) {
            time = new Date(timeShow)
            setStartDate(time)
        }
        switch (tabShow) {
            case 'daily':
                setTimeTab(0)
                fetchDateTransactionByTime(time)
                break
            case 'monthly':
                setTimeTab(1)
                fetchMonthTransactionByTime(time)
                break
            case 'yearly':
                setTimeTab(2)
                fetchYearTransactionByTime(time)
                break
            default:
                setTimeTab(0)
                fetchDateTransactionByTime(time)
                break
        }

    }, [])
    const fetchAllCategory = async () => {
        try {
            const response = await API.get('category', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).catch((err) => {
                console.log(err)
            })
            if (response) {
                setListCategory(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const CustomDatePicker = forwardRef(
        ({ value, onClick }, ref) => (
            <button onClick={onClick} ref={ref} className=" btn btn-primary mx-1">{value}</button>
        ),
    );
    const onSetTimeTab = async (value) => {
        setTimeTab(value);
        if (value == 0) {
            await fetchTransactionByDate()
        } else if (value == 1) {
            await fetchTransactionByMonth()
        } else if (value == 2) {
            await fetchTransactionByYear()
        }
    }
    const onAddTransaction = (transaction) => {
        const tranDate = transaction.date_created
        const { fromDate, toDate } = getStartAndEndDate(startDate)
        if (new Date(tranDate) - new Date(fromDate) >= 0 && new Date(tranDate) - new Date(toDate) <= 0) {
            setTransactions([...transactions, transaction])
        }
    }
    const onSetSelectDate = async (time) => {
        setStartDate(time)
        if (timeTab == 0) {
            await fetchDateTransactionByTime(time)
            return
        }
        if (timeTab == 1) {
            fetchMonthTransactionByTime(time)
            return
        }
        if (timeTab == 2) {
            fetchYearTransactionByTime(time)
            return
        }
    }
    const fetchDateTransactionByTime = async (time) => {
        const { fromDate, toDate } = getStartAndEndDate(time)
        const data = await fetchTransactionByTime(Math.floor(fromDate / 1000), Math.floor(toDate / 1000))
        setTransactions(data)
    }
    const fetchMonthTransactionByTime = async (time) => {
        const { fromDate, toDate } = getStartAndEndMonth(time)
        const data = await fetchTransactionByTime(Math.floor(fromDate / 1000), Math.floor(toDate / 1000))
        setTransactions(data)
    }
    const fetchYearTransactionByTime = async (time) => {
        const { fromDate, toDate } = getStartAndEndYear(time)
        const data = await fetchTransactionByTime(Math.floor(fromDate / 1000), Math.floor(toDate / 1000))
        setTransactions(data)
    }
    const onChangeDate = async (direction) => {
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
            default: value = new Date(startDate).getDate()
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
            default: time.setDate(value)
        }
        await onSetSelectDate(time)

    }
    const calculateTotalExpense = (transactions) => {
        let total = 0
        transactions.forEach(trans => {
            if (trans.expense_type_id == 2) { total += parseInt(trans.money_amount) }
        })
        return total
    }
    const calculateTotalIncome = (transactions) => {
        let total = 0
        transactions.forEach(trans => {
            if (trans.expense_type_id == 1) { total += parseInt(trans.money_amount) }
        })
        return total
    }
    const fetchTransactionByDate = async () => {
        const { fromDate, toDate } = getStartAndEndDate(startDate)
        const data = await fetchTransactionByTime(Math.floor(fromDate / 1000), Math.floor(toDate / 1000))
        setTransactions(data)
    }
    const fetchTransactionByMonth = async () => {
        const { fromDate, toDate } = getStartAndEndMonth(startDate)
        const data = await fetchTransactionByTime(Math.floor(fromDate / 1000), Math.floor(toDate / 1000))
        setTransactions(data)
    }
    const fetchTransactionByYear = async () => {
        const { fromDate, toDate } = getStartAndEndYear(startDate)
        const data = await fetchTransactionByTime(Math.floor(fromDate / 1000), Math.floor(toDate / 1000))
        setTransactions(data)
    }
    const getStartAndEndDate = (currentTime) => {
        const fromDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 0, 0, 0, 0)
        const toDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 23, 59, 59, 99)
        return { fromDate, toDate }
    }
    const getStartAndEndMonth = (currentTime) => {
        const fromDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), 1)
        const toDate = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 0)
        return { fromDate, toDate }
    }
    const getStartAndEndYear = (currentTime) => {
        const fromDate = new Date(currentTime.getFullYear(), 1, 1)
        const toDate = new Date(currentTime.getFullYear(), 12, 31)
        return { fromDate, toDate }
    }
    const fetchTransactionByTime = async (from, to) => {
        try {

            const response = await API.get(`/money_expense/?startDate=${from}&endDate=${to}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).catch(err => {
                return []
            })
            if (response && response.status == 200) {
                return response.data
            }
        } catch (error) {
            return []
        }
    }
    const showTransactionDetail = (transaction) => {
        setSelectTransaction(transaction)
        console.log('show transaction: ', transaction)
    }
    const onUpdateTransaction = (transaction) => {
        const trans = [...transactions]
        for (let i in trans) {
            if (trans[i].id == transaction.id) {
                transaction[i] = transaction
                break
            }
        }
        setTransactions(trans)
    }
    const onDeleteTransaction = (transaction_id) => {
        const newTransactions = transactions.filter(trans => trans.id != transaction_id)
        setTransactions(newTransactions)
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
                                    <a role="button" onClick={e => onSetTimeTab(0)} className={`nav-link ${timeTab == 0 ? 'active' : ''}`}>Daily</a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a role="button" onClick={e => onSetTimeTab(1)} className={`nav-link ${timeTab == 1 ? 'active' : ''}`}>Monthly</a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a role="button" onClick={e => onSetTimeTab(2)} className={`nav-link ${timeTab == 2 ? 'active' : ''}`}>Yearly</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-4 order-md-2 order-first">
                            <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
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
                                        onChange={date => onSetSelectDate(date)}
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
                                        {timeTab == 1 ? (<h4 className="card-title">Monthly summary</h4>) : (<></>)}
                                        {timeTab == 2 ? (<h4 className="card-title">Yearly summary</h4>) : (<></>)}
                                    </div>
                                    <div className="card-content">
                                        {timeTab == 0 ? (<DailyTransactionTable active={timeTab == 0} transactions={transactions} showDetailTransaction={showTransactionDetail} />) : (<></>)}
                                        {timeTab == 1 ? (<MonthlyTransactionPage active={timeTab == 1} transactions={transactions} selectDate={startDate} />) : (<></>)}
                                        {timeTab == 2 ? (<YearlyTransactionPage active={timeTab == 2} transactions={transactions} selectDate={startDate} />) : (<></>)}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-12 col-md-4 order-first">
                            <div className="card">
                                <div className="card-header">
                                    {timeTab == 0 ? (<h4 className="card-title">Daily summary</h4>) : (<></>)}
                                    {timeTab == 1 ? (<h4 className="card-title">Monthly summary</h4>) : (<></>)}
                                    {timeTab == 2 ? (<h4 className="card-title">Yearly summary</h4>) : (<></>)}
                                </div>
                                <div className="card-content">
                                    <div className="table-responsive px-2">
                                        <table className="table table-hover">
                                            <tbody>
                                                <tr>
                                                    <td className="text-bold-500">Income</td>
                                                    <td style={{ textAlign: 'right' }}><span className="w-100 float-right">{formatMoney(calculateTotalIncome(transactions))}</span></td>
                                                </tr>
                                                <tr>
                                                    <td className="text-bold-500">Expense</td>
                                                    <td style={{ textAlign: 'right' }}> <span className="w-100 float-right">{formatMoney(calculateTotalExpense(transactions))}</span></td>
                                                </tr>
                                                <tr>
                                                    <td className="text-bold-500">Balance</td>
                                                    <td style={{ textAlign: 'right' }}> <span className="w-100 float-right">{formatMoney(calculateTotalIncome(transactions) - calculateTotalExpense(transactions))}</span></td>
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

            <CreateTransaction onAddTransaction={onAddTransaction} allCategory={listCategory} />
            <TransactionDetail transaction={selectTransaction} allCategory={listCategory} onUpdateTransaction={onUpdateTransaction} onDeleteTransaction={onDeleteTransaction} />
        </>
    )
}

export default TransactionPage
