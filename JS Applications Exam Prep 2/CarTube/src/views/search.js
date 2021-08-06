import { html } from '../../node_modules/lit-html/lit-html.js';

import {searchByYear } from '../api/data.js';

const searchTemplate = (listings, onSearch, year) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year" .value=${year || ''}>
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">
          
       ${listings.length==0 ? html`<p class="no-cars"> No results.</p>` 
                            : listings.map(listingTemplate)}

    </div>
</section>
`;

const listingTemplate = (listing) => html`
<div class="listing">
    <div class="preview">
        <img src=${listing.imageUrl}>
    </div>
    <h2>${listing.brand} ${listing.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${listing.year}</h3>
            <h3>Price: ${listing.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${listing._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>
`;

export async function searchPage(ctx){
    
    const year = Number(ctx.querystring.split('=')[1]);

    const listings = Number.isNaN(year) ? [] : await searchByYear(year)

    ctx.render(searchTemplate(listings,onSearch, year));

     function onSearch(){
        const query = Number(document.getElementById('search-input').value); 
        if(Number.isNaN(query) == false){
            ctx.page.redirect('/search?query=' + query);
        }else{
            alert('Year must be a positive number!');
        }
    }
}
