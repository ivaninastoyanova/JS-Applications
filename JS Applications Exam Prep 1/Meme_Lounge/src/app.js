import { render } from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs';

import { logout as apiLogout } from './api/data.js'
import { catalogPage } from './views/catalog.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { profilePage } from './views/profile.js';
import { registerPage } from './views/register.js';


const main = document.querySelector('main');

//Add event listener to logout when you click on the button
document.getElementById('logoutBtn').addEventListener('click', logout)


setUserNavigation();


page('/', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/catalog', decorateContext, catalogPage); 
page('/create', decorateContext, createPage); 
page('/details/:memeId', decorateContext, detailsPage); 
page('/edit/:memeId', decorateContext, editPage); 
page('/profile', decorateContext, profilePage); 

page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNavigation = setUserNavigation;

    next();
}

function setUserNavigation() {
    const token = sessionStorage.getItem('authToken');
    const email = sessionStorage.getItem('email');
    if (token != null) {
        document.querySelector('#container > nav > div.user > div > span').textContent = `Welcome, ${email}`;
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}

async function logout() {
   await apiLogout()
   setUserNavigation();
   page.redirect('/');
}