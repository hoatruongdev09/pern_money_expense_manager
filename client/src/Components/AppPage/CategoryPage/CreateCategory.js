import { useState } from 'react'
import API from '../../../Utils/API'

function CreateCategory({ onCreateCategory }) {
    const [category, setCategory] = useState('')
    const [selectType, setSelectType] = useState(1)
    const onCreateNewCategory = async (e) => {
        e.preventDefault()
        const data = {
            category_name: category, expense_type_id: selectType
        }
        try {
            const response = await API.post('/category', data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).catch(err => {
                console.log(err)
            })
            if (response) {
                onCreateCategory(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div class="modal fade" id="createNewCategory" tabindex="-1" aria-labelledby="createNewCategoryTitle" style={{ display: "none" }} aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="createNewCategoryTitle">Create new category</h5>
                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                <i data-feather="x"></i>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <form className="form form-horizontal">
                                    <div className="form-body">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <label>Category Name</label>
                                            </div>
                                            <div className="col-md-8 form-group">
                                                <input value={category} onChange={e => setCategory(e.target.value)} type="text" id="roundText" class="form-control round" placeholder="Category name" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <div className="buttons text-center">
                                            <a rol='button' onClick={e => setSelectType(1)} className={`btn btn-sm w-25 ${selectType == 1 ? 'btn-info' : 'btn-outline-info'}`}>Income</a>
                                            <a rol='button' onClick={e => setSelectType(2)} className={`btn btn-sm w-25 ${selectType == 2 ? 'btn-danger' : 'btn-outline-danger'}`}>Expense</a>
                                            <a rol='button' onClick={e => setSelectType(3)} className={`btn btn-sm w-25 disabled btn-secondary`}>Transfer</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light-secondary" data-bs-dismiss="modal">
                                <i class="bx bx-x d-block d-sm-none"></i>
                                <span class="d-none d-sm-block">Cancel</span>
                            </button>
                            <button onClick={e => onCreateNewCategory(e)} type="button" class="btn btn-primary ml-1" data-bs-dismiss="modal">
                                <i class="bx bx-check d-block d-sm-none"></i>
                                <span class="d-none d-sm-block">Update</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateCategory
