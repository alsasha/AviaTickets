class FavoriteTickets {
    constructor() {
        this.favorite = FavoriteTickets.getFromLocalStorage('favoriteTickets');
    }

    checkFavoriteByFlight(flight) {
        return this.favorite[flight] ? true : false;
    }

    addToFavorite(lastSearch, flight) {
        const ticket = lastSearch.find(item => item.id == flight);
        this.favorite[flight] = ticket;
        FavoriteTickets.addToLocalStorage('favoriteTickets', this.favorite);
    }

    removeFromFavorite(flight) {
        return delete this.favorite[flight];
    }

    static getFromLocalStorage(name) {
        return JSON.parse(localStorage.getItem(name)) || {};
    }

    static addToLocalStorage(name, tickets) {
        return localStorage.setItem(name, JSON.stringify(tickets));
    }
}

const favoriteTickets = new FavoriteTickets();

export default favoriteTickets;