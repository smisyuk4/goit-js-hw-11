export default function photoCard(photoObj) {
    const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
    } = photoObj

    return `<div class="photo-card">
                <a href="${largeImageURL}">
                    <img src="${webformatURL}" alt="${largeImageURL}" width="208" height="140" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                        <b>Tags: </b>${tags}
                        </p>
                        <p class="info-item">
                        <b>Likes: </b>${likes}
                        </p>
                        <p class="info-item">
                        <b>Views: </b>${views}
                        </p>
                        <p class="info-item">
                        <b>Comments: </b>${comments}
                        </p>
                        <p class="info-item">
                        <b>Downloads: </b>${downloads}
                        </p>
                    </div>
                </a>                
            </div>`
}

