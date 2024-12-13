
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

document.getElementById('search').addEventListener('keyup', function() {
    const searchTerm = this.value.toLowerCase();
    const reviews = document.querySelectorAll('.review');

    reviews.forEach(review => {
        const restaurantName = review.querySelector('h3').textContent.toLowerCase();
        if (restaurantName.includes(searchTerm)) {
            review.style.display = ''; // Vis anmeldelsen
        } else {
            review.style.display = 'none'; // Skjul anmeldelsen
        }
    });
});
