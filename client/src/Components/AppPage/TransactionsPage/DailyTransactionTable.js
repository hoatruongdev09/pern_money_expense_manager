import formatMoney from '../../../Utils/formatMoney'
import CreateTransaction from './CreateTransaction'
import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react'




const DailyTransactionTable = ({ active, transactions, showDetailTransaction }) => {

    const sortTransactionByTime = () => {
        transactions.sort((a, b) => new Date(b.date_created) - new Date(a.date_created))
        return transactions
    }
    const onShowDetailTransaction = (transaction) => {
        showDetailTransaction(transaction)
    }
    const CreateTransactions = () => {
        const sortedTransactions = sortTransactionByTime()
        if (sortedTransactions.length == 0) {
            return (
                <tr>
                    <td colSpan="2">There is no records on this day</td>
                </tr>)
        } else {
            return (
                sortedTransactions.map(transaction => (
                    <tr onClick={e => onShowDetailTransaction(transaction)} key={`transaction-record-${transaction.id}`} className={`table-${transaction.expense_type_id == 1 ? 'info' : (transaction.expense_type_id == 2 ? 'danger' : 'warning')}`} data-bs-toggle="modal" data-bs-target="#detailTransactionModal">
                        <td>
                            <div className="text-bold-500 float-left">{transaction.note}</div>
                            <span className={`badge bg-${transaction.expense_type_id == 1 ? 'info' : (transaction.expense_type_id == 2 ? 'danger' : 'warning')} text-dark`}>{transaction.type_name}</span>
                            <span className="mx-2 badge bg-primary">{transaction.category_name}</span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                            <div className='text-bold-500'>{formatMoney(transaction.money_amount)}</div>
                            <span className="badge bg-secondary">{transaction.method_name}</span>
                        </td>
                    </tr>
                ))
            )
        }
    }

    return (
        <>
            <div className={`"tab-pane fade table-responsive px-2 ${active ? "active show" : ""}`}>
                <table className="table table-hover ">
                    <thead>
                        <tr>
                            <th>NOTE</th>
                            <th style={{ textAlign: 'right' }}>MONEY AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody>

                        <CreateTransactions />
                    </tbody>
                </table>
            </div>


        </>
    )
}


export default DailyTransactionTable
