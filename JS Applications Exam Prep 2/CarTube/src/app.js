import { render } from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs';

import { logout as apiLogout } from './api/data.js'

import { allListingPage } from './views/allListings.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { profilePage } from './views/profile.js';
import { registerPage } from './views/register.js';
import { searchPage } from './views/search.js';

const main = document.getElementById('site-content');

//Add event listener to logout when you click on the button
document.getElementById('logoutBtn').addEventListener('click', logout)


setUserNavigation();

page('/', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/all-listings', decorateContext, allListingPage);
page('/create', decorateContext, createPage);
page('/details/:listingId', decorateContext, detailsPage); 
page('/edit/:listingId', decorateContext, editPage); 
page('/my-listings', decorateContext, profilePage); 
page('/search', decorateContext, searchPage); 




page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNavigation = setUserNavigation;

    next();
}

function setUserNavigation() {
    const token = sessionStorage.getItem('authToken');
    const username = sessionStorage.getItem('username');

    if (token != null) {
        document.querySelector('#profile > a:nth-child(1)').textContent = `Welcome, ${username}`;
        document.querySelector('#profile').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
    } else {
        document.querySelector('#profile').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
    }
}

async function logout() {
   await apiLogout()
   setUserNavigation();
   page.redirect('/');
}