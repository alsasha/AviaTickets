import currencyUI from './currency';

class TicketsUI {
    constructor(currency) {
        this.container = document.querySelector('.tickets-sections .row');
        this.currencySymbol = currency.getCurrencySymbol.bind(currency);
    }

    renderTickets(tickets) {
        this.clearTickets();
        if (tickets.length === 0) {
            return this.showMessage('По вашему запросу билетов не найдено.');
        }
        let fragment = '';
        const currencySymbol = this.currencySymbol();
        tickets.forEach(ticket => {
            fragment += TicketsUI.createTicketTemplate(ticket, currencySymbol);
        });
        
        this.container.insertAdjacentHTML('afterbegin', fragment);
    }

    clearTickets() {
        this.container.innerHTML = '';
    }

    showMessage(msg) {
        const message = TicketsUI.createMessage(msg);
        this.container.insertAdjacentHTML('afterbegin', message);
    }

    static createTicketTemplate(ticket, currency) {
        return `
            <div class="col s12 m6">
              <div class="card ticket-card">
                <div class="ticket-airline d-flex align-items-center">
                  <img
                    src=${ticket.airline_logo || ''}
                    class="ticket-airline-img circle"
                  />
                  <span class="ticket-airline-name"
                    >${ticket.airline_name || ''}</span
                  >
                  ${TicketsUI.checkFavoriteBtn(ticket.id, ticket.favorite)}
                </div>
                <div class="ticket-destination d-flex align-items-center">
                  <div class="d-flex align-items-center mr-auto">
                    <span class="ticket-city">${ticket.origin_name || ''} </span>
                    <i class="medium material-icons ">flight_takeoff</i>
                  </div>
                  <div class="d-flex align-items-center">
                    <i class="medium material-icons">flight_land</i>
                    <span class="ticket-city">${ticket.destination_name || ''}</span>
                  </div>
                </div>
                <div class="ticket-time-price d-flex align-items-center justify-content-between">
                  <span class="ticket-time-departure">${ticket.departure_at || ''}</span>
                  <span class="ticket-time-departure">${ticket.return_at || ''}</span>
                </div>
                <div class="ticket-additional-info d-flex ">
                  <span class="ticket-transfers">Пересадок: ${ticket.transfers} <br> Номер рейса: ${ticket.flight_number || ''}</span>
                  <span class="ticket-price ml-auto">${currency}${ticket.price || ''}</span>
                </div>
              </div>
            </div>
        `;
    }

    static createMessage(msg) {
        return `
            <div class="tickets-empty-res-msg">
                ${msg}
            </div>
        `;
    }

    static checkFavoriteBtn(id, favorite) {
      let classes = 'black-text',
        text = 'favorite_border';
      if (favorite) {
          classes = 'pink-text lighten-3';
          text = 'favorite';
      }
      return `
        <a href="#" data-id=${id || ''} data-fav=${favorite} class="ml-auto align-self-flex-start">
        <i class="${classes} add-favorite small material-icons">${text}</i></a>
      `;
  }

}

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;