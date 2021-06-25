/*!
* Start Bootstrap - Grayscale v7.0.1 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 
window.addEventListener('resize', (event) => {
    reactWhenShowNavbar()
})
function reactWhenShowNavbar() {
    var w = window.innerWidth
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav == null) { return }
    const collapser = document.querySelector('#collapser')
    if (w < 1200 && collapser.classList.contains('show')) {
        mainNav.style.height = '220px'
    } else {
        collapser.classList.remove('show')
        mainNav.style.height = '90px'
    }
}
window.addEventListener('DOMContentLoaded', event => {

    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav == null) { return }
    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    if (navbarToggler != null) {
        const responsiveNavItems = [].slice.call(
            document.querySelectorAll('#navbarResponsive .nav-link')
        );
        responsiveNavItems.map(function (responsiveNavItem) {
            responsiveNavItem.addEventListener('click', () => {
                if (window.getComputedStyle(navbarToggler).display !== 'none') {
                    navbarToggler.click();
                }
            });
        });
        navbarToggler.addEventListener('click', () => {
            const collapser = document.querySelector('#collapser')

            if (navbarToggler == null) { return }
            if (collapser.classList.contains('show')) {
                mainNav.style.height = '90px'
                collapser.classList.remove('show')
            } else {
                mainNav.style.height = '220px'
                collapser.classList.add('show')
            }
        })
    }



});