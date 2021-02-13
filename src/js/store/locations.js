import api from '../services/apiService';
import { formatDate } from '../helpers/date';
import favoriteTickets from '../store/favoriteTickets';

class Locations {
    constructor(api, helpers) {
        this.api = api;
        this.countries = null;
        this.cities = null;
        this.shortCities = null;
        this.formatDate = helpers.formatDate;
        this.companies = {};
        this.lastSearch ={};
    }

    async init() {
        const response = await Promise.all([
            this.api.countries(), 
            this.api.cities(),
            this.api.airlines()
        ]);
        const [countries, cities, companies] = response;
        this.countries = this.serializeCountries(countries);
        this.cities = this.serializeCities(cities);
        this.shortCities = this.createShortCities(this.cities);
        this.companies = this.serializeCompanies(companies);

        return response;
    }   

    getCitiesByCountryCode(code) {
        return this.cities.filter(city => city.country_code === code);
    }

    serializeCountries(countries) {
        return countries.reduce((acc, country) => {
            acc[country.code] = country;
            return acc;
        }, {});
    }

    serializeCities(cities) {
        return cities.reduce((acc, city) => {
            const countryName = this.countries[city['country_code']]['name'];
            city.name = city.name || city.name_translations.en || '';
            const fullName = `${city.name}, ${countryName}`;
            acc[city.code] = { 
                ...city, 
                countryName,
                fullName
            };
            return acc;
        }, {});
    }

    createShortCities(cities) {
        return Object.entries(cities).reduce((acc, [, city]) => {
            acc[city.fullName] = null;
            return acc;
        }, {});
    }

    getCityCodeByCode(key) {
        const city = Object.values(this.cities).find(item => item.fullName === key);
        return city.code;
    }

    getCompanyName(code) {
        return this.companies[code] ? this.companies[code].name : '';
    }

    getCompanyLogo(code) {
        return this.companies[code] ? this.companies[code].url : '';
    }

    getFavCompanyLogo(code) {
        return this.companies[code] ? this.companies[code].urlForFav : '';
    }

    getCityNameByCode(code) {
        return this.cities[code] ? this.cities[code].name || this.cities[code].name_translations.en : '';
    }

    serializeCompanies(companies) {
        return companies.reduce((acc, company) => {
            company.url = `http://pics.avs.io/al_square/36/36/${company.code}.png`;
            company.urlForFav = `http://pics.avs.io/al_square/36/36/${company.code}.png`;
            company.name = company.name || company.name_translations.en || '';
            acc[company.code] = company;
            return acc;
        }, {});
    }

    serializeTickets(tickets) {
        return Object.entries(tickets).map(([, ticket]) => {

            const origin_name = this.getCityNameByCode(ticket.origin),
                destination_name = this.getCityNameByCode(ticket.destination),
                airline_logo = this.getCompanyLogo(ticket.airline),
                fav_airline_logo = this.getFavCompanyLogo(ticket.airline),
                airline_name = this.getCompanyName(ticket.airline),
                departure_at = this.formatDate(ticket.departure_at, 'dd MMM yyyy hh:mm'),
                return_at = this.formatDate(ticket.return_at, 'dd MMM yyyy hh:mm');
            const id = `${origin_name}${destination_name}${airline_name}${departure_at}${return_at}`.replace(/\s/g, '');
            return {
                ...ticket,
                origin_name,
                destination_name,
                airline_logo,
                fav_airline_logo,
                airline_name,
                departure_at,
                return_at,
                id,
                favorite: favoriteTickets.checkFavoriteByFlight(id)
            };
        });
    }


    async fetchTickets(params) {
        const response = await this.api.prices(params);
        this.lastSearch = this.serializeTickets(response.data);
    }
}

const locations = new Locations(api, { formatDate });

export default locations;