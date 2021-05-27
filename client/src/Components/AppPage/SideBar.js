import { Link, useRouteMatch } from 'react-router-dom'
const SideBar = ({ activeSideBar, onActiveSideBar }) => {
    const { path, url } = useRouteMatch()
    return (
        <div id="sidebar" className={activeSideBar ? "active" : ""}>
            <div className="sidebar-wrapper active">
                <div className="sidebar-header">
                    <div className="d-flex justify-content-between">
                        <div className="logo">
                            <a href="index.html"><img src="/assets/images/logo/logo.png" alt="Logo" srcSet="" /></a>
                        </div>
                        <div className="toggler">
                            <a role='button' onClick={e => onActiveSideBar(e)} className="sidebar-hide d-xl-none d-block"><i className="bi bi-x bi-middle"></i></a>
                        </div>
                    </div>
                </div>
                <div className="sidebar-menu">
                    <ul className="menu">
                        <li className="sidebar-title">Menu</li>

                        <li className="sidebar-item active ">
                            <Link to={`${url}/dashboard`} className='sidebar-link'>
                                <i className="bi bi-grid-fill"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className="sidebar-item ">
                            <Link to={`${url}/transactions`} className='sidebar-link'>
                                <i className="bi bi-cash-stack"></i>
                                <span>Transactions</span>
                            </Link>
                        </li>

                        {/* <li className="sidebar-item  has-sub">
                            <a href="#" className='sidebar-link'>
                                <i className="bi bi-stack"></i>
                                <span>Components</span>
                            </a>
                            <ul className="submenu ">
                                <li className="submenu-item ">
                                    <a href="component-alert.html">Alert</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-badge.html">Badge</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-breadcrumb.html">Breadcrumb</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-button.html">Button</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-card.html">Card</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-carousel.html">Carousel</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-dropdown.html">Dropdown</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-list-group.html">List Group</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-modal.html">Modal</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-navs.html">Navs</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-pagination.html">Pagination</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-progress.html">Progress</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-spinner.html">Spinner</a>
                                </li>
                                <li className="submenu-item ">
                                    <a href="component-tooltip.html">Tooltip</a>
                                </li>
                            </ul>
                        </li> */}


                    </ul>
                </div>
                <button className="sidebar-toggler btn x"><i data-feather="x"></i></button>
            </div>
        </div>

    )
}

export default SideBar