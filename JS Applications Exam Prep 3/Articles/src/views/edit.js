import { html } from '../../node_modules/lit-html/lit-html.js';

import { getArticleDetails, updateArticle } from '../api/data.js'


const editTemplate = (article, onSubmit) => html`
<section id="edit-page" class="content">
    <h1>Edit Article</h1>

    <form @submit=${onSubmit} id="edit" action="#" method="">
        <fieldset>
            <p class="field title">
                <label for="title">Title:</label>
                <input type="text" name="title" id="title" placeholder="Enter article title" .value=${article.title}>
            </p>

            <p class="field category">
                <label for="category">Category:</label>
                <input type="text" name="category" id="category" placeholder="Enter article category"
                    .value=${article.category}>
            </p>
            <p class="field">
                <label for="content">Content:</label>
                <textarea name="content" id="content" .value=${article.content}></textarea>
            </p>

            <p class="field submit">
                <input class="btn submit" type="submit" value="Save Changes">
            </p>

        </fieldset>
    </form>
</section>`;


export async function editPage(ctx) {
    const articleId = ctx.params.id;

    const article = await getArticleDetails(articleId);

    ctx.render(editTemplate(article, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const title = formData.get('title');
        const category = formData.get('category');
        const content = formData.get('content');

        if (!title || !category || !content) {
            return alert('All fieds are required!');
        }
        if (category == "Java" || category == "Python" || category == "C#" || category == "JavaScript") {
            const edditedArticle = {
                title,
                category,
                content
            }
            await updateArticle(articleId, edditedArticle);

            ctx.page.redirect('/details/' + articleId);
        } else {
            return alert('Category do not match!')
        }
    }
}