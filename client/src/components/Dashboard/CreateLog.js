import { Fragment, useEffect, useState } from 'react'

import Host from '../../AppURL'

function CreateLog() {
    const [expenseCategories, setExpenseCategories] = useState([])
    const [expenseMethods, setExpenseMethods] = useState([])
    const [expenseTypes, setExpenseTypes] = useState([])

    const [selectedType, setSelectedType] = useState(0)
    const [selectedMethod, setSelectMethod] = useState(0)

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
    return (
        <Fragment>
            <button className="btn btn-danger rounded-circle" data-toggle="modal" data-target="#modalCreateLog"><i className="fa fa-plus" aria-hidden="true"></i></button>
            <div className="modal fade" id="modalCreateLog" tabIndex="-1" role="dialog" aria-labelledby="modalCreateLogTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Expense</h5>
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
                                        <input type="text" readOnly className="form-control-plaintext" id="staticEmail" value={new Date(Date.now()).toDateString()} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Account</label>
                                    <div className="col-sm-9">
                                        <div className="btn-group btn-group-sm w-100" role="group" aria-label="Expense Methods">
                                            {
                                                expenseMethods.map((method) => (
                                                    <button key={`button-method-${method.id}`} onClick={e => onChangeExpenseMethod(e, method.id)} type="button" class={`btn btn-${method.id == selectedMethod ? "outline-primary" : "secondary"} mx-1 rounded`}>{method.method_name}</button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-3 col-form-label">Category</label>
                                    <div className="col-sm-9">
                                        <select className="form-control" id="exampleFormControlSelect1">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="expense-note" className="col-sm-3 col-form-label">Note</label>
                                    <div className="col-sm-9">
                                        <textarea id="expense-note" className="form-control" id="exampleFormControlTextarea1" rows="1"></textarea>
                                    </div>
                                </div>
                                <hr />
                                <div className="form-group row">
                                    <label htmlFor="expense-description" className="col-sm-3 col-form-label">Description</label>
                                    <div className="col-sm-9">
                                        <textarea id="expense-description" className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CreateLog