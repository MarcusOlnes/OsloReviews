function sortReviewsByRating() {
    // Hent containeren for anmeldelser
    const reviewsContainer = document.getElementById('reviews-container');

    // Hent alle anmeldelser som en liste
    const reviews = Array.from(reviewsContainer.getElementsByClassName('review'));

    // Sorter anmeldelsene basert på data-rating attributtet
    reviews.sort((a, b) => {
        const ratingA = parseFloat(a.getAttribute('data-rating'));
        const ratingB = parseFloat(b.getAttribute('data-rating'));
        return ratingB - ratingA; // Sorterer synkende
    });

    // Fjern de gamle anmeldelsene og legg til de sorterte
    reviewsContainer.innerHTML = ''; // Tøm containeren
    reviews.forEach(review => reviewsContainer.appendChild(review)); // Legg til sorterte anmeldelser
}

function sortReviewsByDate() {
    // Hent containeren for anmeldelser
    const reviewsContainer = document.getElementById('reviews-container');

    // Hent alle anmeldelser som en liste
    const reviews = Array.from(reviewsContainer.getElementsByClassName('review'));

    // Sorter anmeldelsene basert på data-dato attributtet
    reviews.sort((a, b) => {
        const dateA = new Date(a.getAttribute('data-dato'));
        const dateB = new Date(b.getAttribute('data-dato'));
        return dateB - dateA; // Sorterer fra nyeste til eldste
    });

    // Fjern de gamle anmeldelsene og legg til de sorterte
    reviewsContainer.innerHTML = ''; // Tøm containeren
    reviews.forEach(review => reviewsContainer.appendChild(review)); // Legg til sorterte anmeldelser
}

function updateReviewCount() {
    Promise.all([
        fetch('reviews.html').then(response => response.text()),
        fetch('gatekjokken_reviews.html').then(response => response.text())
    ])
    .then(([reviewsHtml, gatekjokkenHtml]) => {
        const parser = new DOMParser();
        const reviewsDoc = parser.parseFromString(reviewsHtml, 'text/html');
        const gatekjokkenDoc = parser.parseFromString(gatekjokkenHtml, 'text/html');
        
        const reviewsCount = reviewsDoc.querySelectorAll('#reviews-container .review').length;
        const gatekjokkenCount = gatekjokkenDoc.querySelectorAll('#reviews-container .review').length;
        const totalCount = reviewsCount + gatekjokkenCount;
        
        // Oppdater restaurant counter
        const restaurantEl = document.getElementById('restaurant-count');
        if (restaurantEl) {
            restaurantEl.textContent = reviewsCount;
        }
        
        // Oppdater gatekjøkken counter
        const gatekjokkenEl = document.getElementById('gatekjokken-count');
        if (gatekjokkenEl) {
            gatekjokkenEl.textContent = gatekjokkenCount;
        }
        
        // Oppdater total counter
        const el = document.getElementById('review-count');
        if (el) {
            el.textContent = totalCount;
        }
    })
    .catch(err => console.error('Kunne ikke hente anmeldelser:', err));
}

function updateExtrasCount() {
    const extrasContainer = document.getElementById('reviews-container');
    if (extrasContainer) {
        const extrasCount = extrasContainer.querySelectorAll('.review').length;
        const el = document.getElementById('extras-count');
        if (el) {
            el.textContent = extrasCount;
        }
    }
}

function triggerConfettiBurst() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 140,
            spread: 90,
            origin: { y: 0.7 }
        });
    }
}

function updateExtrasCountFromFile() {
    fetch('extras.html').then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const extrasCount = doc.querySelectorAll('#reviews-container .review').length;
        const el = document.getElementById('extras-count');
        if (el) {
            el.textContent = extrasCount;
        }
    })
    .catch(err => console.error('Kunne ikke hente extras:', err));
}

document.addEventListener('DOMContentLoaded', function() {
    // Oppdater antall anmeldelser hvis elementet finnes på siden
    updateReviewCount();
    
    // Oppdater antall extras fra file
    updateExtrasCountFromFile();
    
    // Oppdater antall extras hvis vi er på extras siden (lokal telling)
    updateExtrasCount();

    const confettiButton = document.getElementById('confetti-button');
    if (confettiButton) {
        confettiButton.addEventListener('click', triggerConfettiBurst);
    }

    // Legg til søkelytter bare på sider som har søkefeltet
    const searchEl = document.getElementById('search');
    if (searchEl) {
        searchEl.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const reviews = document.querySelectorAll('.review');

            reviews.forEach(review => {
                const h3 = review.querySelector('h3');
                const restaurantName = h3 ? h3.textContent.toLowerCase() : '';
                if (restaurantName.includes(searchTerm)) {
                    review.style.display = ''; // Vis anmeldelsen
                } else {
                    review.style.display = 'none'; // Skjul anmeldelsen
                }
            });
        });
    }
});
