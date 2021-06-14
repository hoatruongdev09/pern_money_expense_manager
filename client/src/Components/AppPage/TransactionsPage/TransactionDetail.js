import { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'

import API from '../../../Utils/API'

const TransactionDetail = ({ transaction, allCategory, onUpdateTransaction, onDeleteTransaction }) => {
    console.log(transaction != null)
    const [transactionType, setTransactionType] = useState(1)
    const [note, setNote] = useState('')
    const [money, setMoney] = useState(0)
    const [category, setCategory] = useState(0)
    const [method, setMethod] = useState(1)
    const [detail, setDetail] = useState('')
    const [attachment, setAttachment] = useState()
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        if (transaction == null) { return }
        setTransactionType(transaction.expense_type_id)
        setNote(transaction.note)
        setMoney(transaction.money_amount)
        setMethod(transaction.method)
        setDetail(transaction.detail)
        setDate(new Date(transaction.date_created))

        const categories = getListCategoryByExpenseType(allCategory, transaction.expense_type_id)
        for (let i in categories) {
            if (categories[i].id == transaction.category_id) {
                setCategory(i)
                break;
            }
        }
    }, [transaction])


    const onSetTransactionType = (type) => {
        setTransactionType(type)
        setCategory(0)
    }
    const onChangeMethod = (e, method) => {
        e.preventDefault()
        setCategory(0)
        setMethod(method)
    }
    const getListCategoryByExpenseType = (categories, expense_type_id) => {
        if (categories == null || categories.length == 0) { return [] }
        return categories.filter(cat => cat.expense_type_id == expense_type_id)
    }
    const getGetListCategoryToShow = (categories) => {
        if (categories == null || categories.length == 0) { return [] }
        return categories.filter(cat => cat.expense_type_id == transactionType)
    }

    const onSubmitChange = async (e) => {
        e.preventDefault()
        var selectedCategory = getGetListCategoryToShow(allCategory)[category]
        try {
            var data = {
                expense_type_id: transactionType,
                category_id: selectedCategory.id,
                money_amount: money,
                note: note,
                detail: detail,
                method: method,
                date_created: Math.floor(new Date(date) / 1000)
            }
            const response = await API.put(`/money_expense/${transaction.id}`, data, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).catch(err => {
                console.log('err: ', err)
            })
            if (response) {
                transaction.expense_type_id = data.expense_type_id
                transaction.category_id = data.category_id
                transaction.money_amount = data.money_amount
                transaction.note = data.note
                transaction.detail = data.detail
                transaction.method = data.method
                transaction.date_created = data.date_created
                onUpdateTransaction(transaction)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const onSubmitDeleteTransaction = async (e) => {
        e.preventDefault()
        try {
            const response = await API.delete(`/money_expense/${transaction.id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).catch(err => {
                console.log(err)
            })
            if (response) {
                onDeleteTransaction(transaction.id)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="modal fade" id="detailTransactionModal" tabIndex="-1" aria-labelledby="detailTransactionModalTitle" style={{ display: 'none' }} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="detailTransactionModalTitle">Transaction Detail</h5>
                            <button onClick={e => onSubmitDeleteTransaction(e)} type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                <FontAwesomeIcon className="d-block d-sm-none" icon={faTrash} size='xs' />
                                <span className="d-none d-sm-block">Delete</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="buttons text-center">
                                <button onClick={e => onSetTransactionType(1)} className={`btn btn-sm w-25 ${transactionType == 1 ? 'btn-info' : 'btn-outline-info'}`}>Income</button>
                                <button onClick={e => onSetTransactionType(2)} className={`btn btn-sm w-25 ${transactionType == 2 ? 'btn-danger' : 'btn-outline-danger'}`}>Expense</button>
                                <button onClick={e => onSetTransactionType(3)} className={`btn btn-sm w-25 disabled btn-secondary`}>Transfer</button>
                            </div>
                            <form className="form form-horizontal">
                                <div className="form-body">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label>Date</label>
                                        </div>
                                        <div className="col-md-8 form-group">
                                            <div className="customDatePickerWidth">
                                                <DatePicker
                                                    selected={date}
                                                    onChange={dateChange => setDate(dateChange)}
                                                    className="form-control w-100"
                                                    showTimeSelect={true}
                                                    dateFormat={`dd MMM, yyyy hh:mm a`}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <label>Note</label>
                                        </div>
                                        <div className="col-md-8 form-group">
                                            <input type="text" onChange={e => setNote(e.target.value)} className="form-control" value={note} placeholder="Enter you note here..." />
                                        </div>
                                        <div className="col-md-4">
                                            <label>Money Amount</label>
                                        </div>
                                        <div className="col-md-8 form-group">
                                            <input type="number" min="0" onChange={e => setMoney(e.target.value)} value={money} className="form-control" placeholder="Enter money amount..." />
                                        </div>
                                        <div className="col-md-4">
                                            <label>Category</label>
                                        </div>
                                        <div className="col-md-8 form-group">
                                            <select className="form-select" onChange={e => setCategory(e.target.value)} value={category}>
                                                {
                                                    getGetListCategoryToShow(allCategory).map((cat, index) => (
                                                        <option key={`category-${cat.id}`} defaultValue={category == index} value={index}>{cat.category_name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-12 form-group">
                                            <div className="buttons text-center">
                                                <a role='button' onClick={e => onChangeMethod(e, 1)} className={`btn-sm w-25 btn ${method == 1 ? 'btn-primary' : 'btn-outline-secondary'}`}>Cash</a>
                                                <a role='button' onClick={e => onChangeMethod(e, 2)} className={`btn-sm w-25 btn ${method == 2 ? 'btn-primary' : 'btn-outline-secondary'}`}>Account</a>
                                                <a role='button' onClick={e => onChangeMethod(e, 3)} className={`btn-sm w-25 btn ${method == 3 ? 'btn-primary' : 'btn-outline-secondary'}`}>Card</a>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <label>Detail</label>
                                        </div>
                                        <div className="col-md-8 form-group">
                                            <textarea className="form-control" onChange={e => setDetail(e.target.value)} placeholder="Detail" value={detail} rows="3"></textarea>
                                        </div>
                                        <div className="col-md-4">
                                            <label>Attachment</label>
                                        </div>
                                        <div className="col-md-8 form-group">
                                            <input className="form-control" type="file" id="formFile" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light-secondary" data-bs-dismiss="modal">
                                <FontAwesomeIcon className="d-block d-sm-none" icon={faTimes} size='xs' />
                                <span className="d-none d-sm-block">Cancel</span>
                            </button>
                            <button onClick={(e) => { onSubmitChange(e) }} type="button" className="btn btn-primary ml-1" data-bs-dismiss="modal">
                                <FontAwesomeIcon className="d-block d-sm-none" icon={faCheck} size='xs' />
                                <span className="d-none d-sm-block">Submit</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TransactionDetail
