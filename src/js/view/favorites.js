import currencyUI from './currency';

class FavoritesUI {
    constructor(currency) {
        this.dropdownContent = document.querySelector('#dropdown1');
        this.currencySymbol = currency.getCurrencySymbol.bind(currency);
    }

    removeActiveClass(btn) {
        btn.setAttribute('data-fav', false);
        const fav = btn.querySelector('i');
        fav.textContent = 'favorite_border';
        fav.classList.remove('pink-text', 'lighten-3');
        fav.classList.add('black-text');
    }

    addActiveClass(btn) {
        btn.setAttribute('data-fav', true);
        const fav = btn.querySelector('i');
        fav.textContent = 'favorite';
        fav.classList.add('pink-text', 'lighten-3');
        fav.classList.remove('black-text');
    }

    renderFavoriteTickets(tickets) {
        this.clearFavoriteTickets();
        if (Object.values(tickets).length === 0) {
            return this.showFavoriteMessage();
        }
        let fragment = '';
        const currencySymbol = this.currencySymbol();
        Object.values(tickets).forEach(ticket => {
            fragment += FavoritesUI.createFavoriteTicketTemplate(ticket, currencySymbol);
        });
        this.dropdownContent.insertAdjacentHTML('afterbegin', fragment);
    }

    clearFavoriteTickets() {
        this.dropdownContent.innerHTML = '';
    }

    showFavoriteMessage() {
        const message = FavoritesUI.createFavoriteMessage();
        this.dropdownContent.insertAdjacentHTML('afterbegin', message);
    }

    static createFavoriteMessage() {
        return `
            <div class="tickets-empty-res-msg">
                В избранном пусто.
            </div>
        `;
    }

    static createFavoriteTicketTemplate(ticket, currency) {
        return `
                <div class="favorite-item  d-flex align-items-start">
                <img
                src=${ticket.fav_airline_logo || ''}
                class="favorite-item-airline-img circle"
                />
                <div class="favorite-item-info d-flex flex-column">
                <div
                    class="favorite-item-destination d-flex align-items-center"
                >
                    <div class="d-flex align-items-center mr-auto">
                    <span class="favorite-item-city">${ticket.destination_name || ''} </span>
                    <i class="medium material-icons">flight_takeoff</i>
                    </div>
                    <div class="d-flex align-items-center">
                    <i class="medium material-icons">flight_land</i>
                    <span class="favorite-item-city">${ticket.origin_name || ''}</span>
                    </div>
                </div>
                <div class="ticket-time-price d-flex align-items-center">
                    <span class="ticket-time-departure">${ticket.departure_at || ''}</span>
                    <span class="ticket-price ml-auto">${currency}${ticket.price || ''}</span>
                </div>
                <div class="ticket-additional-info">
                    <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
                    <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number || ''}</span>
                </div>
                <a data-id=${ticket.id || ''}
                    class="waves-effect waves-light btn-small pink delete-favorite ml-auto"
                    >Delete</a
                >
                </div>
            </div>
        `;
    }
}

const favoritesUI = new FavoritesUI(currencyUI);

export default favoritesUI;