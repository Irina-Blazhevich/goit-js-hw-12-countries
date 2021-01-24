import fetchCountries from './js/fetchCountries';
import templateCountriesList from './templates/countries-list.hbs';
import templateCountryInfo from './templates/country-info.hbs';
import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import './styles.css';

const debounce = require('lodash.debounce');
const refs = {
  searchInput: document.querySelector('#input'),
  countryInfoBox: document.querySelector('#country__info'),
  searchList: document.querySelector('#country__list'),
};

refs.searchInput.addEventListener('input', debounce(searchQuery, 500));

function searchQuery(e) {
  const value = e.target.value;
  fetchCountries(value).then(data => {
    if (data.length === 1) {
      removeInfo();
      refs.countryInfoBox.insertAdjacentHTML(
        'afterbegin',
        templateCountryInfo(data[0]),
      );
    } else if (data.length > 1 && data.length < 11) {
      removeInfo();
      refs.searchList.insertAdjacentHTML(
        'afterbegin',
        templateCountriesList(data),
      );
    } else if (data.length > 11) {
      error({
        text: 'Too many matches found, enter more specific query',
        delay: 1000,
      });
    }
  });
}
function removeInfo() {
  refs.countryInfoBox.innerHTML = '';
  refs.searchList.innerHTML = '';
}
