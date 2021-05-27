import { Fragment, useState, useEffect, forwardRef } from "react";
import { Modal, Button } from 'react-bootstrap'
import Host from "../AppURL";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

function CategoryRecord({ category, onDelete, onSelect }) {
    const onClick = (e) => {
        e.preventDefault()
        onSelect(category)
    }
    const onRemove = (e) => {
        e.preventDefault()
        onDelete(category)
    }
    return (
        <div className="d-inline-flex px-2 pt-1 mx-1 mt-2 bg-gray-400 rounded">
            <a role="button" onClick={(e) => onClick(e)} className="ml-2 pt-0 pb-2 pr-2">{category.category_name}</a>
            {
                category.canDelete ? (<button onClick={e => onRemove(e)} className="btn h-25 pt-0 ml-2 px-0">
                    <i className="fa fa-times fa-xs" aria-hidden="true"></i>
                </button>) : (<Fragment></Fragment>)
            }

        </div>
    )
}
function CreateCategory({ selectedExpenseType, onCreateCategory }) {
    const [selectedType, setSelectedType] = useState(selectedExpenseType)
    const [categoryName, setCategoryName] = useState('')

    const onChangeType = (e) => {
        e.preventDefault()
        setSelectedType(e.target.value)
    }
    const onChangeCategoryName = (e) => {
        e.preventDefault()
        setCategoryName(e.target.value)
    }
    const onHideView = (e) => {
        e.preventDefault()
        setSelectedType(selectedExpenseType)
    }
    const onCreateNewCategory = (e) => {
        e.preventDefault()
        if (categoryName) {
            onCreateCategory(selectedType, categoryName)
            setCategoryName('')
        }
    }
    return (
        <Fragment>
            <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" data-toggle="modal" data-target="#exampleModalCenter">
                <i className="fa fa-plus text-white" aria-hidden="true"></i>
            </button>
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Create category</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-4 pr-1">
                                        <select className="form-control" id="exampleFormControlSelect1" onChange={e => onChangeType(e)}>
                                            <option value="1" defaultValue={selectedType == 1}>Income</option>
                                            <option value="2" defaultValue={selectedType == 2}>Expense</option>
                                            <option value="3" defaultValue={selectedType == 3}>Transfer</option>
                                        </select>
                                    </div>
                                    <div className="col-8 pl-1">
                                        <input type="text" value={categoryName} onChange={e => onChangeCategoryName(e)} className="form-control" placeholder="Category name" />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={e => onHideView(e)} className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" onClick={e => onCreateNewCategory(e)} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

function CategoryManagerPage({ setAuth, user }) {
    const [selectedType, setSelectedType] = useState(1);
    const [toggleSideBar, setToggleSideBar] = useState(false);
    const [searchValue, setSearchValue] = useState('')
    const [categories, setCategories] = useState([])
    const [isSearch, setIsSearch] = useState(false)
    const [searchedCategories, setSearchedCategories] = useState([])

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deletingCategory, setDeletingCategory] = useState(null)

    const activeToggleSideBar = (e) => {
        e.preventDefault();
        setToggleSideBar(!toggleSideBar);
    };
    useEffect(async () => {
        await fetchCategory()
    }, [])
    const fetchCategory = async () => {
        const response = await fetch(`${Host}/category`, {
            method: "GET",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        const parseRes = await response.json()
        console.log(parseRes)
        if (response.status != 200) {
            console.error(parseRes)
        } else {
            setCategories(parseRes)
        }
    }
    const onSelectType = (e, id) => {
        e.preventDefault()
        setSelectedType(id)
    }
    const selectCategory = (category) => {
        console.log("select: ", category)
    }
    const deleteCategory = (category) => {
        setShowDeleteConfirm(true)
        setDeletingCategory(category)
    }
    const onChangeSearchText = (e) => {
        setSearchValue(e.target.value)
        if (e.target.value) {
            setIsSearch(true)
        } else {
            setIsSearch(false)
        }
        setSearchedCategories(categories.filter(cat => cat.category_name.toLowerCase().includes(e.target.value)))
    }
    const onClearSearchText = (e) => {
        e.preventDefault()
        setSearchValue('')
        setIsSearch(false)
    }
    const onSearchCategory = (e) => {
        console.log(searchValue)
        e.preventDefault()
        setIsSearch(true)
        setSearchedCategories(categories.filter(cat => cat.category_name.toLowerCase().includes(searchValue)))
    }
    const onCreateCategory = async (expense_type_id, category_name) => {
        const body = { expense_type_id, category_name }
        const response = await fetch(`${Host}/category`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        const parseRes = await response.json()
        if (response.status == 200) {
            categories.push(parseRes)
            setCategories(categories)
            setSearchedCategories(categories.filter(cat => cat.category_name.toLowerCase().includes(searchValue)))
        } else {
            console.error(parseRes)
        }
    }
    const handleClose = () => {
        setShowDeleteConfirm(false)
    }
    const handleConfirmDelete = async () => {
        const response = await fetch(`${Host}/category/${deletingCategory.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        const parseRes = await response.json()
        if (response.status == 200) {
            const filteredCat = categories.filter(cat => cat.id != deletingCategory.id)
            setCategories(filteredCat)
            setSearchedCategories(filteredCat.filter(cat => cat.category_name.toLowerCase().includes(searchValue)))
        } else {
            console.error(parseRes)
        }
        setShowDeleteConfirm(false)
        setDeletingCategory(null)
    }
    return (
        <Fragment>
            <div id="page-top" className={`big-body ${toggleSideBar ? "sidebar-toggled" : ""}`} >
                <div id="wrapper">
                    <SideBar
                        showSideBar={toggleSideBar}
                        toggleSidebar={activeToggleSideBar}
                        selectedTab={1}
                    />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <TopBar toggleSidebar={activeToggleSideBar} user={user} />
                            <div className="container-fluid">
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Category</h1>
                                    <CreateCategory selectedExpenseType={selectedType} onCreateCategory={onCreateCategory} />
                                </div>
                                <div className="card shadow mb-4">
                                    <div className="card-header py-2">
                                        <div className="row">
                                            <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12 col-xl-6">
                                                <div className="float-left">
                                                    <h6 className="m-0 pt-2 text-secondary"><small>Categories:</small></h6>
                                                </div>
                                                <div className="float-right">
                                                    <div className="btn-group btn-group-sm mb-1 pt-1" role="group" aria-label="Basic example">
                                                        <button type="button" onClick={(e) => onSelectType(e, 1)} className={`pt-0 btn btn-${selectedType == 1 ? "primary" : "secondary"}`}><small>Income</small></button>
                                                        <button type="button" onClick={(e) => onSelectType(e, 2)} className={`pt-0 btn btn-${selectedType == 2 ? "primary" : "secondary"}`}><small>Expense</small></button>
                                                        <button type="button" onClick={(e) => onSelectType(e, 3)} className={`pt-0 btn btn-${selectedType == 3 ? "primary" : "secondary"}`}><small>Transfer</small></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-xs-12 col-sm-12 col-md-12 col-xl-6">
                                                <div className="input-group ">
                                                    <input type="text" className="form-control" placeholder="Search" aria-label="Search" onChange={e => onChangeSearchText(e)} value={searchValue} />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-secondary" onClick={e => onClearSearchText(e)} type="button"><i className="fa fa-times" aria-hidden="true"></i></button>
                                                        {/* <button className="btn btn-secondary" onClick={e => onSearchCategory(e)} type="button"><i className="fas fa-search fa-sm" aria-hidden="true"></i></button> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        {
                                            (isSearch ? searchedCategories : categories).filter(cat => cat.expense_type_id == selectedType).map(category => (
                                                <CategoryRecord key={`category-${category.id}`} category={category} onDelete={category => deleteCategory(category)} onSelect={category => selectCategory(category)} />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showDeleteConfirm} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>{deletingCategory == null ? "" : `Are you sure to delete this category "${deletingCategory.category_name}"`}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleConfirmDelete}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default CategoryManagerPage