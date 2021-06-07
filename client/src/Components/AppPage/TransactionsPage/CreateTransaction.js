import { useState, useEffect, forwardRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import API from '../../../Utils/API'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateTransaction = ({ onAddTransaction }) => {
    const [transactionType, setTransactionType] = useState(1)
    const [note, setNote] = useState('')
    const [money, setMoney] = useState(0)
    const [category, setCategory] = useState(0)
    const [method, setMethod] = useState(1)
    const [detail, setDetail] = useState('')
    const [attachment, setAttachment] = useState(null)
    const [date, setDate] = useState(new Date())
    const [listCategory, setListCategory] = useState([])
    const [listMethod, setListMethod] = useState([])

    useEffect(async () => {
        await fetchAllCategory()
    }, [])

    const onSetTransactionType = (type) => {
        setTransactionType(type)
        setCategory(0)
    }
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
    const getGetListCategoryToShow = (categories) => {
        if (categories == null || categories.length == 0) { return [] }
        return categories.filter(cat => cat.expense_type_id == transactionType)
    }
    const onSubmitTransaction = async (e) => {
        e.preventDefault()
        // console.log('type: ', transactionType);
        // console.log('note: ', note);
        // console.log('money: ', money);
        // console.log('category: ', getGetListCategoryToShow(listCategory)[category]);
        // console.log('cat index: ', category)
        // console.log('detail: ', detail);
        var selectedCategory = getGetListCategoryToShow(listCategory)[category]
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
            const response = await API.post('/money_expense', data, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).catch(err => {
                console.log('err: ', err)
            })
            if (response) {
                console.log(response)
                onAddTransaction({
                    ...response.data,
                    category_name: selectedCategory.category_name,
                    type_name: transactionType == 1 ? "Income" : (transactionType == 2 ? "Expense" : "Transfer"),
                    method_name: method == 1 ? "Cash" : (method == 2 ? "Account" : "Card")
                })
            }
        } catch (error) {

        }

    }
    const onChangeMethod = (e, method) => {
        e.preventDefault()
        setCategory(0)
        setMethod(method)
    }
    return (
        <>
            <button className="rounded btn btn-primary fixed-button" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
                <FontAwesomeIcon icon={faPlus} size='1x' />
            </button>
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" aria-labelledby="exampleModalCenterTitle" style={{ display: 'none' }} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Create New Transaction</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <i data-feather="x"></i>
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
                                                    getGetListCategoryToShow(listCategory).map((cat, index) => (
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
                            <button onClick={e => onSubmitTransaction(e)} type="button" className="btn btn-primary ml-1" data-bs-dismiss="modal">
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

export default CreateTransaction
