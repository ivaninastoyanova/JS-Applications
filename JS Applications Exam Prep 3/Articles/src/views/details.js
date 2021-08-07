import { html } from '../../node_modules/lit-html/lit-html.js';

import { getArticleDetails, deleteArticle } from '../api/data.js'


const detailsTemlate = (article, isOwner, onDelete) => html`
<section id="details-page" class="content details">
    <h1>${article.title}</h1>

    <div class="details-content">
        <strong>Published in ${article.category}</strong>
        <p>${article.content}</p>

        <div class="buttons">
            ${isOwner ? html`<a @click=${onDelete} href="#" class="btn delete">Delete</a>
            <a href="/edit/${article._id}" class="btn edit">Edit</a>` : ''}

            <a @click=${goBack} href="#" class="btn edit">Back</a>
        </div>
    </div>
</section>
`;


export async function detailsPage(ctx) {
    const userId = sessionStorage.getItem('userId');

    const articleId = ctx.params.id;
    const article = await getArticleDetails(articleId);

    const isOwner = userId === article._ownerId;

    ctx.render(detailsTemlate(article, isOwner, onDelete));

    async function onDelete() {
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            await deleteArticle(articleId);
            ctx.page.redirect('/catalog');
        }
    }
}

function goBack(event) {
    event.preventDefault();
    window.history.back();
}