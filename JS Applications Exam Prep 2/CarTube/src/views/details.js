import { html } from '../../node_modules/lit-html/lit-html.js';

import { deleteListing, getListingById } from '../api/data.js';

const datailsTemplate = (listing, isOwner, onDelete) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${listing.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${listing.brand}</li>
            <li><span>Model:</span>${listing.model}</li>
            <li><span>Year:</span>${listing.year}</li>
            <li><span>Price:</span>${listing.price}$</li>
        </ul>

        <p class="description-para">${listing.description}</p>

        ${isOwner ? html`<div class="listings-buttons">
            <a href="/edit/${listing._id}" class="button-list">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
        </div>`   : ''}
        
    </div>
</section>
`;

export async function detailsPage(ctx) {
    const userId = sessionStorage.getItem('userId');

    const listingId = ctx.params.listingId;
    const listing = await getListingById(listingId);

    const isOwner = userId === listing._ownerId;


    ctx.render(datailsTemplate(listing, isOwner, onDelete));

    async function onDelete() {
        const confirmed = confirm('Are you sure?')
        if (confirmed) {
            await deleteListing(listingId);
            ctx.page.redirect('/all-listings');
        }
    }
}