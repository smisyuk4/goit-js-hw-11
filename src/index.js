import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css'

const debounce = require('lodash.debounce'); 

import photoFetch from "./script/photo-fetch";
import photoCard from "./template/photo-card";

const refs = {
    searchForm: document.querySelector('.search-form'),
    searchBtn: document.querySelector('.search-form button'),
    galleryContainer: document.querySelector('.gallery')
}

const DEBOUNCE_DELAY = 300;

refs.searchForm.addEventListener('input', debounce(findPhoto, DEBOUNCE_DELAY))

function findPhoto(event) {
    let name = event.target.value
    name = name.trim()
    console.log(name)

    photoFetch(name).then(response => {
        return response;
    })
    .then(result => {
        // clearPage()

        // if (result.length === 1) {
        //     const country = {
        //         name: result[0].name.official,
        //         flag: result[0].flags.svg,
        //         capital: result[0].capital,
        //         population: result[0].population,
        //         languages: Object.values(result[0].languages).join(', '),
        //     }

        //     refs.info.insertAdjacentHTML('beforeend', countryCard(country))
        // }
    })
    .catch(error => {
        Notify.failure('Oops, there is no country with that name.');
        Notify.failure(`${error}`);
    })
}

function clearPage() {
    refs.galleryContainer.innerHTML = ''
}