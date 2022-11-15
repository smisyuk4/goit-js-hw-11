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

let searchQuery = ''
let numberPage = null

async function findPhoto(event) {
    event.preventDefault()
    searchQuery = event.currentTarget.elements.searchQuery.value
    searchQuery = searchQuery.trim()
    numberPage = 1

    refs.searchForm.reset()

    if (searchQuery.length === 0) {
        Notify.failure('No value for search');
        console.log('No value for search')
        return
    }
    
    try {
        const data = await photoFetch(searchQuery, numberPage)
        console.log(data.data)

        if (data.data.hits.length === 0) {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            console.log('Sorry, there are no images matching your search query. Please try again.')
        }

        clearPage() 
        drawMarkup(data) 
    } catch (error) {
        Notify.failure(`${error}`);
    }    
}

function drawMarkup(data) {
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
        
        refs.galleryContainer.insertAdjacentHTML('beforeend', markup)
        lightbox.refresh()
}

const lightbox = new SimpleLightbox(".gallery a", { captionDelay: 250});

function onClickPhoto(event) {
    event.preventDefault()    
}

function clearPage() {
    refs.galleryContainer.innerHTML = ''
}

async function onClickButtonLoadMore(event) {
    event.preventDefault() 
    console.log('load more')

    numberPage += 1

    try {
        const data = await photoFetch(searchQuery, numberPage)
        drawMarkup(data) 
    } catch (error) {
        Notify.failure(`${error}`);
    }
}