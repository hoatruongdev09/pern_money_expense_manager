import { Fragment, useEffect, useState } from 'react'

import Host from '../../AppURL'

function CreateLog() {
    const [expenseCategories, setExpenseCategories] = useState([])
    const [expenseMethods, setExpenseMethods] = useState([])
    const [expenseTypes, setExpenseTypes] = useState([])

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
                setExpenseTypes(parseRes)
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
    return (
        <Fragment>
            <button className="btn btn-danger rounded-circle" data-toggle="modal" data-target="#modalCreateLog"><i class="fa fa-plus" aria-hidden="true"></i></button>
            <div class="modal fade" id="modalCreateLog" tabindex="-1" role="dialog" aria-labelledby="modalCreateLogTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">Create new note</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default CreateLog