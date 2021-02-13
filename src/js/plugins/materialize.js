import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

// Init dropdown
const dropdowns = document.querySelectorAll('.dropdown-trigger');
M.Dropdown.init(dropdowns, {
    closeOnClick: false,
    alignment: 'right'
});

export function getDropdownInstance(elem) {
    return M.Dropdown.getInstance(elem);
}

//Init Selects
const selects = document.querySelectorAll('select');
M.FormSelect.init(selects);  

export function getSelectInstance(elem) {
    return M.FormSelect.getInstance(elem);
}

//Init Autocomplete
const autocomplete = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplete);

export function getAutocompleteInstanse(elem) {
    return M.Autocomplete.getInstance(elem);
}

//Init Datepicker
const datepicker = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepicker, {
    showClearBtn: true,
    format: 'yyyy-mm-dd',
    autoClose: true
});

export function getSelectedDate(elem) {
    return M.Datepicker.getInstance(elem);
}