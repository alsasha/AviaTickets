import { getAutocompleteInstanse, getSelectedDate } from '../plugins/materialize';

class FormUI {
    constructor(autocompleteInstance, datePickerInstance) {
        this.$form = document.forms['locationControls'];
        this.origin = document.querySelector('#autocomplete-origin');
        this.destination = document.querySelector('#autocomplete-destination');
        this.depart = datePickerInstance(document.querySelector('#datepicker-depart'));
        this.return = datePickerInstance(document.querySelector('#datepicker-return'));
        this.originAutocomplete = autocompleteInstance(this.origin);
        this.destinationAutocomplete = autocompleteInstance(this.destination);
    }

    get form() {
        return this.$form;
    }

    get originValue() {
        return this.origin.value;
    }

    get destinationValue() {
        return this.destination.value;
    }

    get departValue() {
        return this.depart.toString();
    }

    get returnValue() {
        return this.return.toString();
    }

    setAutocomplete(range) {
        this.originAutocomplete.updateData(range);
        this.destinationAutocomplete.updateData(range);
    }

    showWarningMes(elem) {
        elem.style.borderBottomColor = '#f48fb1';
        elem.parentElement.querySelector('label').style.color = 'rgba(244, 143, 177, 0.8)';
    }

}

const formUI = new FormUI(getAutocompleteInstanse, getSelectedDate);

export default formUI;