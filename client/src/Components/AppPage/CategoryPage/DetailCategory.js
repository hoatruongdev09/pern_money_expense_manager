import { useEffect, useState } from "react"
import API from '../../../Utils/API'


const DetailCategory = ({ category, onUpdateCategory }) => {
    const [categoryName, setCategoryName] = useState('')
    const [categoryType, setCategoryType] = useState(1)

    useEffect(() => {
        if (category != null) {
            setCategoryName(category.category_name)
            setCategoryType(category.expense_type_id)
        }
    }, [category])
    const onSubmitUpdateCategory = async (e) => {
        e.preventDefault()
        try {
            const data = {
                category_name: categoryName,
                user_category: category.user_category,
                expense_type_id: categoryType
            }
            const response = await API.put(`/category/${category.id}`, data, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).catch(err => {
                console.log(err)
            })
            if (response) {
                onUpdateCategory({
                    id: category.id,
                    category_name: categoryName,
                    expense_type_id: categoryType
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div class="modal fade" id="detailCategoryModel" tabindex="-1" aria-labelledby="detailCategoryModelTitle" style={{ display: 'none' }} aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-centered modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="detailCategoryModelTitle">Category Detail</h5>
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
                                            <input value={categoryName} onChange={e => setCategoryName(e.target.value)} type="text" id="roundText" class="form-control round" placeholder="Category name" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 form-group">
                                    <div className="buttons text-center">
                                        <a rol='button' onClick={e => setCategoryType(1)} className={`btn btn-sm w-25 ${categoryType == 1 ? 'btn-info' : 'btn-outline-info'}`}>Income</a>
                                        <a rol='button' onClick={e => setCategoryType(2)} className={`btn btn-sm w-25 ${categoryType == 2 ? 'btn-danger' : 'btn-outline-danger'}`}>Expense</a>
                                        <a rol='button' onClick={e => setCategoryType(3)} className={`btn btn-sm w-25 disabled btn-secondary`}>Transfer</a>
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
                        <button type="button" onClick={e => onSubmitUpdateCategory(e)} class={`btn ${(categoryName != (category != null ? category.category_name : '') || categoryType != (category != null ? category.expense_type_id : 1)) ? '' : 'disabled'} btn-primary ml-1`} data-bs-dismiss="modal">
                            <i class="bx bx-check d-block d-sm-none"></i>
                            <span class="d-none d-sm-block">Update</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailCategory
