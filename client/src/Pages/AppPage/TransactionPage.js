import { useState, forwardRef } from 'react'
import DailyTransactionTable from '../../Components/AppPage/TransactionsPage/DailyTransactionTable'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TransactionPage = () => {
    const [startDate, setStartDate] = useState(new Date());

    const CustomDatePicker = forwardRef(
        ({ value, onClick }, ref) => (
            <button onClick={onClick} ref={ref} className=" btn btn-primary mx-1">{value}</button>
        ),
    );

    return (
        <>
            <div className="page-heading">
                <div className="page-title">
                    <div className="row mb-4">
                        <div className="col-12 col-md-8 order-md-1 order-last">
                            <h3>Transactions</h3>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link active" id="daily-tab" data-bs-toggle="tab" href="#daily" role="tab" aria-controls="daily" aria-selected="true">Daily</a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="monthly-tab" data-bs-toggle="tab" href="#monthly" role="tab" aria-controls="monthly" aria-selected="false">Monthly</a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="yearly-tab" data-bs-toggle="tab" href="#yearly" role="tab" aria-controls="yearly" aria-selected="false">Yearly</a>
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
                                    <button className=" btn btn-light"><i className="bi bi-caret-left-fill"></i></button>
                                </div>
                                <div className="float-left">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={date => setStartDate(date)}
                                        customInput={<CustomDatePicker />}
                                    />
                                </div>
                                <div className="float-left">
                                    <button className=" btn btn-light"><i className="bi bi-caret-right-fill"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-8 order-last">
                            <div className="tab-content" id="myTabContent">
                                <div class="card">
                                    <div class="card-header">
                                        <h4 class="card-title">Daily activities</h4>
                                    </div>
                                    <div class="card-content">
                                        <DailyTransactionTable />
                                        <div className="tab-pane fade active show" id="monthly" role="tabpanel" aria-labelledby="monthly-tab">
                                            <p>Monthly transactions</p>
                                        </div>
                                        <div className="tab-pane fade" id="yearly" role="tabpanel" aria-labelledby="yearly-tab">
                                            <p>Yearly transations</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-12 col-md-4 order-first">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">Daily summary</h4>
                                </div>
                                <div class="card-content">
                                    <div class="table-responsive px-2">
                                        <table class="table table-hover mb-0">
                                            <tbody>
                                                <tr>
                                                    <td class="text-bold-500">Income</td>
                                                    <td><span className="w-100 float-right">$500</span></td>
                                                </tr>
                                                <tr>
                                                    <td class="text-bold-500">Expense</td>
                                                    <td><span className="w-100 float-right">$250</span></td>
                                                </tr>
                                                <tr>
                                                    <td class="text-bold-500">Balance</td>
                                                    <td><span className="w-100 float-right">$250</span></td>
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
