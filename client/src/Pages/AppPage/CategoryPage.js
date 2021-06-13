import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import API from '../../Utils/API'
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import CreateNewCategory from '../../Components/AppPage/CategoryPage/CreateCategory'
import DetailCategory from '../../Components/AppPage/CategoryPage/DetailCategory'
const CategoryPage = () => {

    const [categories, setCategories] = useState([])
    const [searchText, setSearchText] = useState('')
    const [useSearch, setUseSearch] = useState(false)

    const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(async () => {
        await fetchCategories()
    }, [])

    const fetchCategories = async () => {
        try {
            const response = await API.get('/category', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).catch(err => {
                console.log(err)
            })
            if (response) {
                console.log(response.data)
                setCategories(response.data)
            }

        } catch (error) {
            console.log(error)
        }
    }
    const onSelectCategory = (e, category) => {
        e.preventDefault()
        setSelectedCategory(category)
    }
    const CreateCategory = ({ category }) => {
        if (!category.user_category) {
            return (
                <button class="btn btn-primary me-1 mb-1">
                    {category.category_name}
                </button>
            )
        } else {
            return (
                <button onClick={e => onSelectCategory(e, category)} data-bs-target="#detailCategoryModel" data-bs-toggle="modal" className="btn btn-secondary me-1 mb-1">
                    {category.category_name} <span class="badge"><FontAwesomeIcon icon={faUser} /></span>
                </button>
            )
        }
    }
    const getFilteredCategories = (categories, search) => {
        return categories.filter(cat => cat.category_name.toLowerCase().includes(search.toLowerCase()))
    }
    const getCategoriesByType = (categories, type) => {
        return categories.filter(cat => cat.expense_type_id == type)
    }
    const onSearchChange = (e) => {
        const value = e.target.value
        setSearchText(value)
        setUseSearch(value != '')
    }
    const onSearchClick = (e) => {
        e.preventDefault()
        setSearchText(searchText)
        setUseSearch(searchText != '')
    }
    const onCreateCategory = (category) => {
        setCategories([...categories, category])
    }
    const onUpdateCategory = (category) => {
        const newCategory = [...categories]
        for (let i = 0; i < newCategory.length; i++) {
            if (newCategory[i].id == category.id) {
                const temp = newCategory[i]
                newCategory[i] = {
                    ...temp,
                    category_name: category.category_name,
                    expense_type_id: category.expense_type_id
                }

                break
            }
        }
        console.log(newCategory)
        setCategories(newCategory)
    }

    return (
        <>
            <div className="page-heading">
                <div className="page-title">
                    <div className="row mb-4">
                        <div className="col-12 col-md-8 order-md-1 order-last">
                            <h3>Categories</h3>

                        </div>
                        <div className="col-12 col-md-4 order-md-2 order-first">
                            <nav aria-label="breadcrumb" className="breadcrumb-header float-start float-lg-end">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Category</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
                <section className="section">
                    <div className="row">
                        <div class="input-group mb-3">
                            <input type="text" value={searchText} onChange={e => onSearchChange(e)} class="form-control" placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <button onClick={e => onSearchClick(e)} class="input-group-text btn btn-primary" id="basic-addon2">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                        <div className="w-100 text-end">
                            <a role="button" data-bs-target="#createNewCategory" data-bs-toggle="modal" className="fs-6 text-primary">Create new category</a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {
                                useSearch ? (
                                    <>
                                        <p>Searched: {getFilteredCategories(categories, searchText).length}</p>
                                        {
                                            getFilteredCategories(categories, searchText).map((category, index) => (<CreateCategory key={`category-index-${index}`} category={category} />))
                                        }
                                    </>) : (
                                    <>
                                        <p>Income Categories:</p>
                                        {
                                            getCategoriesByType(categories, 1).map((category, index) => (<CreateCategory key={`category-index-${index}`} category={category} />))
                                        }
                                        <p>Expense Categories:</p>
                                        {
                                            getCategoriesByType(categories, 2).map((category, index) => (<CreateCategory key={`category-index-${index}`} category={category} />))
                                        }
                                    </>
                                )
                            }

                        </div>
                    </div>
                </section>
            </div>
            <CreateNewCategory onCreateCategory={onCreateCategory} selectedCategory={selectedCategory} onUpdateCategory={onUpdateCategory} />
            <DetailCategory category={selectedCategory} onUpdateCategory={onUpdateCategory} />
        </>
    )
}

export default CategoryPage
