import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css'

import photoFetch from "./script/photo-fetch";
import photoCard from "./template/photo-card";

const refs = {
    searchForm: document.querySelector('.search-form'),
    searchBtn: document.querySelector('.search-form button'),
    galleryContainer: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}

refs.searchForm.addEventListener('submit', findPhoto)
refs.galleryContainer.addEventListener('click', onClickPhoto)
refs.loadMoreBtn.addEventListener('click', onClickButtonLoadMore)


async function findPhoto(event) {
    event.preventDefault()
    let searchQuery = event.currentTarget.elements.searchQuery.value
    searchQuery = searchQuery.trim()
    refs.searchForm.reset()

    if (searchQuery.length === 0) {
        Notify.failure('No value for search');
        console.log('No value for search')
        return
    }

    
    try {
        const data = await photoFetch(searchQuery)
        const photoArr = data.data.hits

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

            return photoCard(photoObj)
        }).join('')

        clearPage() 
        refs.galleryContainer.insertAdjacentHTML('beforeend', markup)
        lightbox.refresh()

    } catch (error) {
        Notify.failure(`${error}`);
    }
    
}

const lightbox = new SimpleLightbox(".gallery a", { captionDelay: 250});

function onClickPhoto(event) {
    event.preventDefault()    
}

function clearPage() {
    refs.galleryContainer.innerHTML = ''
}

function onClickButtonLoadMore(event) {
    event.preventDefault() 
    console.log('load more')
}