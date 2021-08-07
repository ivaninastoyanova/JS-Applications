import { html } from '../../node_modules/lit-html/lit-html.js';
import { searchByTitle } from '../api/data.js';

const searchTemplate = (articles , onSearch , titleSearch) => html`
<section id="search-page" class="content">
    <h1>Search</h1>
    <form id="search-form">
        <p class="field search">
            <input id="search-input" type="text" placeholder="Search by article title" name="search" .value=${titleSearch || ''}>
        </p>
        <p class="field submit">
            <input @click=${onSearch} class="btn submit" type="submit" value="Search">
        </p>
    </form>
    <div class="search-container">
        
          ${articles.length==0 ? html`<h3 class="no-articles">No matching articles</h3>`
                            : articles.map(articleTemplate)}
        
    </div>
</section>`;



const articleTemplate = (article) => html`
<a class="article-preview" href="/details/${article._id}">
    <article>
        <h3>Topic: <span>${article.title}</span></h3>
        <p>Category: <span>${article.category}</span></p>
    </article>
</a>
`;


export async function searchPage(ctx) {
    const titleSearch = ctx.querystring.split('=')[1];

    const articles = await searchByTitle(titleSearch);

    
    ctx.render(searchTemplate(articles, onSearch, titleSearch));

    function onSearch(){
        const query = document.getElementById('search-input').value; 

        ctx.page.redirect('/search?query=' + query);
    }

}