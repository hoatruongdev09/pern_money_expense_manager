import { Fragment, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'

import Host from '../../AppURL'
import './log.css'

import 'react-datepicker/dist/react-datepicker.css'



function CreateLog({ onCreateLog }) {
    const [expenseCategories, setExpenseCategories] = useState([])
    const [expenseMethods, setExpenseMethods] = useState([])
    const [expenseTypes, setExpenseTypes] = useState([])

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [selectedType, setSelectedType] = useState(0)
    const [selectedMethod, setSelectMethod] = useState(0)
    const [selectedCategory, setSelectedCategory] = useState(0)

    const [note, setNote] = useState('')
    const [description, setDescription] = useState('')

    const [amount, setAmount] = useState(0)

    useEffect(async () => {
        await fetchCategories()
        await fetchMethod()
        await fetchType()
    }, [])

    const fetchMethod = async () => {
        try {
            const response = await fetch(`${Host}/money_expense/methods`, {
                method: "GET",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            const parseRes = await response.json()
            if (response.status === 200) {
                setExpenseMethods(parseRes)
                setSelectMethod(parseRes[0].id)
                console.log(`method: `, parseRes)
            } else {
                console.error(parseRes)
            }
        } catch (error) {
            console.error(error.message)
        }
    }
    const fetchType = async () => {
        try {
            const response = await fetch(`${Host}/money_expense/types`, {
                method: "GET",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            const parseRes = await response.json()
            if (response.status === 200) {
                setExpenseTypes(parseRes)
                setSelectedType(parseRes[0].id)
                console.log(`type: `, parseRes)
            } else {
                console.error(parseRes)
            }
        } catch (error) {
            console.error(error.message)
        }
    }
    const fetchCategories = async () => {
        try {
            const response = await fetch(`${Host}/category`, {
                method: "GET",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            const parseRes = await response.json()
            if (response.status === 200) {
                setExpenseCategories(parseRes)
                console.log(`categories: `, parseRes)
            } else {
                console.error(parseRes)
            }
        } catch (error) {
            console.error(error.message)
        }

    }

    const onChangeExpenseType = (e, id) => {
        if (id == selectedType) { return }
        e.preventDefault()
        setSelectedType(id)
    }
    const onChangeExpenseMethod = (e, id) => {
        if (id == selectedMethod) { return }
        e.preventDefault()
        setSelectMethod(id)
    }
    const onChangeDate = (date) => {
        setSelectedDate(date)
    }
    const onChangeCategory = (e) => {
        e.preventDefault()
        setSelectedCategory(e.target.value)
    }
    const onChangeAmount = (e) => {
        e.preventDefault()
        setAmount(e.target.value)
    }
    const onChangeNote = (e) => {
        e.preventDefault()
        setNote(e.target.value)
    }
    const onChangeDescription = (e) => {
        e.preventDefault()
        setDescription(e.target.value)
    }
    const submitFormAndClose = async (e) => {
        e.preventDefault()
        await submitFormAndClear(e)
    }
    const submitFormAndClear = async (e) => {
        e.preventDefault()
        const body = {
            expense_type_id: selectedType,
            category_id: selectedCategory,
            money_amount: amount,
            note: note,
            detail: description,
            method: selectedMethod,
            date_created: Math.floor(selectedDate / 1000)
        }
        console.log(JSON.stringify(body))
        try {
            const response = await fetch(`${Host}/money_expense`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })
            const parsedRes = await response.json()
            if (response.status === 200) {
                const typeName = expenseTypes.find(type => type.id == selectedType).type_name
                const categoryName = expenseCategories.find(category => category.id == selectedCategory).category_name
                const methodName = expenseMethods.find(method => method.id == selectedMethod).method_name
                onCreateLog({
                    ...parsedRes,
                    type_name: typeName,
                    category_name: categoryName,
                    method_name: methodName
                })
                setSelectedDate(new Date())
                setSelectedType(1)
                setSelectedCategory(1)
                setSelectMethod(1)
                setAmount(0)
                setNote('')
                setDescription('')
                setSelectedCategory(0)
                return true
            } else {
                return false
            }
        } catch (error) {
            console.error(error.message)
            return false
        }
    }
    return (
        <Fragment>
            <button className="btn btn-danger rounded-circle" data-toggle="modal" data-target="#modalCreateLog"><i className="fa fa-plus" aria-hidden="true"></i></button>
            <div className="modal fade" id="modalCreateLog" tabIndex="-1" role="dialog" aria-labelledby="modalCreateLogTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">{selectedType == 0 ? "Expense" : expenseTypes.find(type => type.id == selectedType).type_name}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group row">
                                    <div className="btn-group w-100 mx-3" role="group" aria-label="Expense Type">
                                        {
                                            expenseTypes.map((type) => (
                                                <button key={`button-type-${type.id}`} onClick={e => onChangeExpenseType(e, type.id)} type="button" className={`btn btn-${type.id == selectedType ? "outline-primary" : "secondary"} mx-1 rounded`}>{type.type_name}</button>
                                            ))
                                        }
                                    </div>
                                </div>
                                <hr />
                                <div className="form-group row">
                                    <label htmlFor="staticEmail" className="col-sm-3 col-form-label">Date</label>
                                    <div className="col-sm-9">
                                        <DatePicker className="form-control" dateFormat="MMMM d, yyyy h:mm aa" showTimeSelect selected={selectedDate} onChange={date => onChangeDate(date)} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Account</label>
                                    <div className="col-sm-9">
                                        <div className="btn-group btn-group-sm w-100" role="group" aria-label="Expense Methods">
                                            {
                                                expenseMethods.map((method) => (
                                                    <button key={`button-method-${method.id}`} onClick={e => onChangeExpenseMethod(e, method.id)} type="button" className={`btn btn-${method.id == selectedMethod ? "outline-primary" : "secondary"} mx-1 rounded`}>{method.method_name}</button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Category</label>
                                    <div className="col-sm-9">
                                        <select className="form-control" id="exampleFormControlSelect1" onChange={e => onChangeCategory(e)}>
                                            <option defaultValue={selectedCategory == 0}>Choose...</option>
                                            {
                                                expenseCategories.map(category => (
                                                    <option defaultValue={category.id == selectedCategory} key={`category-option-${category.id}`} value={category.id}>{category.category_name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="expense-amount" className="col-sm-3 col-form-label">Amount</label>
                                    <div className="col-sm-9">
                                        <input type='number' id="expense-amount" onChange={e => onChangeAmount(e)} value={amount} className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="expense-note" className="col-sm-3 col-form-label">Note</label>
                                    <div className="col-sm-9">
                                        <textarea id="expense-note" onChange={e => onChangeNote(e)} value={note} className="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
                                    </div>
                                </div>
                                <hr />
                                <div className="form-group row">
                                    <label htmlFor="expense-description" className="col-sm-3 col-form-label">Description</label>
                                    <div className="col-sm-9">
                                        <textarea id="expense-description" onChange={e => onChangeDescription(e)} value={description} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={e => submitFormAndClose(e)}>Save</button>
                            <button type="button" className="btn btn-warning" onClick={e => submitFormAndClear(e)}>Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CreateLog