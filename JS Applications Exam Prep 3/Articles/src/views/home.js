import { html } from '../../node_modules/lit-html/lit-html.js';

import { getlastTenArticles } from '../api/data.js';


const homeTemplate = (python, java, c, js) => html` 
<section id="home-page" class="content">
    <h1>Recent Articles</h1>
    <section class="recent js">
        <h2>JavaScript</h2>
        ${js ? articleTemplate(js) : html`<h3 class="no-articles">No articles yet</h3>`}
    </section>
    <section class="recent csharp">
        <h2>C#</h2>
        ${c ? articleTemplate(c) : html`<h3 class="no-articles">No articles yet</h3>`}
    </section>
    <section class="recent java">
        <h2>Java</h2>
        ${java ? articleTemplate(java) : html`<h3 class="no-articles">No articles yet</h3>`}
    </section>
    <section class="recent python">
        <h2>Python</h2>
        ${python ? articleTemplate(python) : html`<h3 class="no-articles">No articles yet</h3>`}
    </section>
</section>`;


export async function homePage(ctx) {
    // const token = sessionStorage.getItem('authToken');
    // if (token != null) {
    //     return ctx.page.redirect('/catalog')
    // }
    const articles = await getlastTenArticles();

    const python = articles.find(a => a.category === 'Python');
    const js = articles.find(a => a.category === 'JavaScript');
    const c = articles.find(a => a.category === 'C#');
    const java = articles.find(a => a.category === 'Java');

    ctx.render(homeTemplate(python, java, c, js));
}

const articleTemplate = (article) => html`
<article>
    <h3>${article.title}</h3>
    <p>${article.content}</p>
    <a href="/details/${article._id}" class="btn details-btn">Details</a>
</article>`;