import '../css/style.css';
import './plugins';

import locations from './store/locations';
import formUI from './view/form';
import ticketsUI from './view/tickets';
import currencyUI from './view/currency';
import favoritesUI from './view/favorites';
import favoriteTickets from './store/favoriteTickets';
import preloader from './view/preloader';

document.addEventListener('DOMContentLoaded', e => {
    const form = formUI.form;
    initApp();
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        onFormSubmit();
    });

    const ticketsContainer = document.querySelector('.tickets-sections .row');
    ticketsContainer.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('add-favorite')) {
            e.preventDefault();
            const btn = e.target.closest('a');
            onFavoriteBtnClick(btn);
        }
    });

    const dropdownContent = document.querySelector('#dropdown1');
    dropdownContent.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('delete-favorite')) {
            const id = e.target.dataset.id;
            const ticket = ticketsContainer.querySelector(`[data-id="${id}"]`);
            if (ticket) {
                favoritesUI.removeActiveClass(ticket);
            }
            favoriteTickets.removeFromFavorite(id);
            favoritesUI.renderFavoriteTickets(favoriteTickets.favorite);
        }
    });
    
});

function onFavoriteBtnClick(target) {
    const fav = target.dataset.fav,
        id = target.dataset.id;
    if (fav === 'true') {
        favoritesUI.removeActiveClass(target);
        favoriteTickets.removeFromFavorite(id);
        favoritesUI.renderFavoriteTickets(favoriteTickets.favorite);
    } else {
        favoritesUI.addActiveClass(target);
        favoriteTickets.addToFavorite(locations.lastSearch, id);
        favoritesUI.renderFavoriteTickets(favoriteTickets.favorite); 
    }
}

async function initApp() {
    preloader.showPreloader();
    favoritesUI.renderFavoriteTickets(favoriteTickets.favorite);
    await locations.init();
    formUI.setAutocomplete(locations.shortCities);
    preloader.hidePreloader();
}

async function onFormSubmit() {
    if (preloader.checkPreloader()) {
        return alert('Дождитесь загрузки данных с сервера!');
    }
    preloader.showPreloader();
    const origin = locations.getCityCodeByCode(formUI.originValue),
    destination = locations.getCityCodeByCode(formUI.destinationValue),
    depart_date = formUI.departValue,
    return_date = formUI.returnValue,
    currency = currencyUI.currencyValue;

    const params = {
        origin,
        destination,
        depart_date,
        return_date,
        currency
    };

    for (let prop in params) {
        if (!params[prop]) {
            delete params[prop];
        }
    }

    await locations.fetchTickets(params);

    ticketsUI.renderTickets(locations.lastSearch);
    preloader.hidePreloader();
}