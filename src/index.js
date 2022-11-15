import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css'

import photoFetch from "./script/photo-fetch";
import photoCard from "./template/photo-card";

// const axios = require('axios').default;

const refs = {
    searchForm: document.querySelector('.search-form'),
    searchInput: document.querySelector('.search-form input'),
    searchBtn: document.querySelector('.search-form button'),
    galleryContainer: document.querySelector('.gallery'),
}

refs.searchForm.addEventListener('submit', findPhoto)


async function findPhoto(event) {
    event.preventDefault()
    const name = refs.searchInput.value.trim()
    refs.searchForm.reset()

    if (name.length === 0) {
        Notify.failure('No value for search');
        console.log('No value for search')
        return
    }
    
    try {
        const data = await photoFetch(name)
        const photoArr = data.data.hits
        console.log(photoArr)

        const markup = photoArr.map(item => {
            const photoObj = {
                webformatURL: item.webformatURL,
                largeImageURL: item.largeImageURL,
                tags: item.tags,
                likes: item.likes,
                views: item.views,
                comments: item.comments,
                downloads: item.downloads, 
            }

            console.log(photoObj)
            return photoCard(photoObj)
        }).join('')

        clearPage() 
        refs.galleryContainer.insertAdjacentHTML('beforeend', markup)
        lightbox.refresh()


    } catch (error) {
        Notify.failure(`${error}`);
    }
    
}



refs.galleryContainer.addEventListener('click', onClickPhoto)

const lightbox = new SimpleLightbox(".gallery a", { captionDelay: 250});

function onClickPhoto(event) {
    event.preventDefault()    
}

function clearPage() {
    refs.galleryContainer.innerHTML = ''
}