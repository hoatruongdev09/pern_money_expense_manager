import { Fragment, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'

import Host from '../../AppURL'
import './log.css'

import 'react-datepicker/dist/react-datepicker.css'

function LogDetail({ record, onRemoveRecord, onUpdateRecord }) {
    const [lastRecord, setLastRecord] = useState(null)

    const [expenseCategories, setExpenseCategories] = useState([])
    const [expenseMethods, setExpenseMethods] = useState([])
    const [expenseTypes, setExpenseTypes] = useState([])


    const [selectedDate, setSelectedDate] = useState(lastRecord == null ? new Date() : lastRecord.date_created)
    const [selectedType, setSelectedType] = useState(lastRecord == null ? 0 : lastRecord.expense_type_id)
    const [selectedMethod, setSelectMethod] = useState(lastRecord == null ? 0 : lastRecord.method)
    const [selectedCategory, setSelectedCategory] = useState(lastRecord == null ? 0 : lastRecord.category_id)

    const [note, setNote] = useState(lastRecord == null ? '' : lastRecord.note)
    const [description, setDescription] = useState(lastRecord == null ? '' : lastRecord.description)
    const [amount, setAmount] = useState(lastRecord == null ? 0 : lastRecord.money_amount)

    const [isEdited, setIsEdited] = useState(false)

    if (record !== lastRecord) {
        setLastRecord(record)
        setSelectedDate(record.date_created)
        setSelectedType(record.expense_type_id)
        setSelectMethod(record.method)
        setSelectedCategory(record.category_id)
        setNote(record.note)
        setDescription(record.description)
        setAmount(record.money_amount)

        setIsEdited(false)
    }


    useEffect(async () => {
        await fetchCategories()
        await fetchMethod()
        await fetchType()
    }, [])

    const onSaveChange = (e) => {
        e.preventDefault()
        const newRecord = {
            ...record,
            date_created: selectedDate,
            expense_type_id: selectedType,
            method: selectedMethod,
            money_amount: amount,
            category_id: selectedCategory,
            detail: description ? description : "",
            note: note ? note : "",
            category_name: expenseCategories.find(category => category.id == selectedCategory).category_name,
            type_name: expenseTypes.find(type => type.id == selectedType).type_name,
            method_name: expenseMethods.find(method => method.id == selectedMethod).method_name
        }
        onUpdateRecord(newRecord)
    }
    const onDeleteRecord = (e) => {
        e.preventDefault()
        onRemoveRecord(record)
    }

    const fetchMethod = async () => {
        try {
            const response = await fetch(`${Host}/money_expense/methods`, {
                method: "GET",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            const parseRes = await response.json()
            if (response.status === 200) {
                setExpenseMethods(parseRes)
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
            } else {
                console.error(parseRes)
            }
        } catch (error) {
            console.error(error.message)
        }

    }


    const onChangeExpenseType = (e, id) => {
        if (id == selectedType) { return }
        if (id != record.expense_type_id) {
            setIsEdited(true)
        }
        e.preventDefault()
        setSelectedType(id)
    }
    const onChangeExpenseMethod = (e, id) => {
        if (id == selectedMethod) { return }
        if (id != record.method) {
            setIsEdited(true)
        }
        e.preventDefault()
        setSelectMethod(id)
    }
    const onChangeDate = (date) => {
        if (selectedDate == date) { return }
        if (date != record.date_created) {
            setIsEdited(true)
        }
        setSelectedDate(date)
    }
    const onChangeCategory = (e) => {
        if (e.target.value == selectedCategory) { return }
        if (e.target.value != record.category_id) {
            setIsEdited(true)
        }
        e.preventDefault()
        setSelectedCategory(e.target.value)
    }
    const onChangeAmount = (e) => {
        if (e.target.value == amount) { return }
        if (e.target.value != record.money_amount) {
            setIsEdited(true)
        }
        e.preventDefault()
        setAmount(e.target.value)
    }
    const onChangeNote = (e) => {
        if (note == e.target.value) { return }
        if (note != record.note) {
            setIsEdited(true)
        }
        e.preventDefault()
        setNote(e.target.value)
    }
    const onChangeDescription = (e) => {
        if (description == e.target.value) { return }
        if (description != record.description) {
            setIsEdited(true)
        }
        e.preventDefault()
        setDescription(e.target.value)
    }
    return (
        lastRecord == null ? (<Fragment></Fragment>) : (
            <Fragment>
                <div className="modal fade" id="modalLogDetail" tabIndex="-1" role="dialog" aria-labelledby="modalLogDetail" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="idModalLogDetailTitle">Expense</h5>
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
                                            <DatePicker dateFormat="MMMM d, yyyy h:mm aa" showTimeSelect className="form-control" selected={new Date(selectedDate)} onChange={date => onChangeDate(date)} />
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
                                                <option defaultValue={selectedCategory}>{lastRecord.category_name}</option>
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
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={e => onDeleteRecord(e)}>Delete</button>
                                {isEdited ? <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={e => onSaveChange(e)}>Save</button> : <Fragment></Fragment>}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    )

}
export default LogDetail