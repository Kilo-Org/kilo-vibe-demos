// Fake movie data
const movies = [
    { title: "Action Hero", image: "https://picsum.photos/200/300?random=1", description: "An epic action movie." },
    { title: "Comedy Nights", image: "https://picsum.photos/200/300?random=2", description: "Hilarious comedy." },
    { title: "Horror Tales", image: "https://picsum.photos/200/300?random=3", description: "Scary horror film." },
    { title: "Drama Queen", image: "https://picsum.photos/200/300?random=4", description: "Emotional drama." },
    { title: "Sci-Fi Adventure", image: "https://picsum.photos/200/300?random=5", description: "Futuristic adventure." },
    { title: "Romance Forever", image: "https://picsum.photos/200/300?random=6", description: "Heartwarming romance." },
    { title: "Thriller Chase", image: "https://picsum.photos/200/300?random=7", description: "Suspenseful thriller." },
    { title: "Fantasy World", image: "https://picsum.photos/200/300?random=8", description: "Magical fantasy." },
    { title: "Documentary Life", image: "https://picsum.photos/200/300?random=9", description: "Real-life documentary." },
    { title: "Animation Fun", image: "https://picsum.photos/200/300?random=10", description: "Animated adventure." },
    { title: "Mystery Puzzle", image: "https://picsum.photos/200/300?random=11", description: "Intriguing mystery." },
    { title: "Western Guns", image: "https://picsum.photos/200/300?random=12", description: "Classic western." },
    { title: "Superhero Saga", image: "https://picsum.photos/200/300?random=13", description: "Superhero epic." },
    { title: "Musical Beats", image: "https://picsum.photos/200/300?random=14", description: "Rhythmic musical." },
    { title: "War Stories", image: "https://picsum.photos/200/300?random=15", description: "Historical war drama." },
    { title: "Spy Intrigue", image: "https://picsum.photos/200/300?random=16", description: "Espionage thriller." },
    { title: "Family Bonds", image: "https://picsum.photos/200/300?random=17", description: "Family-oriented film." },
    { title: "Crime Noir", image: "https://picsum.photos/200/300?random=18", description: "Dark crime story." },
    { title: "Adventure Quest", image: "https://picsum.photos/200/300?random=19", description: "Exciting quest." },
    { title: "Biopic Legend", image: "https://picsum.photos/200/300?random=20", description: "Inspirational biography." }
];

// Function to create a poster element
function createPoster(movie, index) {
    const poster = document.createElement('div');
    poster.className = 'poster';
    poster.dataset.movieIndex = index;
    poster.style.position = 'relative';
    poster.style.display = 'inline-block';
    poster.style.margin = '0 10px';
    poster.style.cursor = 'pointer';

    const img = document.createElement('img');
    img.src = movie.image;
    img.alt = movie.title;
    img.style.width = '200px';
    img.style.height = '300px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '8px';

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.textContent = movie.title;
    overlay.style.position = 'absolute';
    overlay.style.bottom = '0';
    overlay.style.left = '0';
    overlay.style.right = '0';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    overlay.style.color = 'white';
    overlay.style.padding = '10px';
    overlay.style.textAlign = 'center';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s';

    poster.appendChild(img);
    poster.appendChild(overlay);

    // Hover effects
    poster.addEventListener('mouseenter', () => {
        overlay.style.opacity = '1';
    });
    poster.addEventListener('mouseleave', () => {
        overlay.style.opacity = '0';
    });

    // Click to open modal
    poster.addEventListener('click', () => {
        openModal(movie);
    });

    return poster;
}

// Function to populate a row
function populateRow(rowElement, movieList) {
    const postersContainer = rowElement.querySelector('.row-posters');
    postersContainer.style.display = 'flex';
    postersContainer.style.overflowX = 'auto';
    postersContainer.style.scrollBehavior = 'smooth';
    postersContainer.style.padding = '10px 0';

    movieList.forEach((movie, index) => {
        const poster = createPoster(movie, index);
        postersContainer.appendChild(poster);
    });

    // Add arrow buttons
    const leftArrow = document.createElement('button');
    leftArrow.textContent = '‹';
    leftArrow.className = 'arrow left';
    leftArrow.style.position = 'absolute';
    leftArrow.style.left = '10px';
    leftArrow.style.top = '50%';
    leftArrow.style.transform = 'translateY(-50%)';
    leftArrow.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    leftArrow.style.color = 'white';
    leftArrow.style.border = 'none';
    leftArrow.style.padding = '10px';
    leftArrow.style.cursor = 'pointer';
    leftArrow.style.zIndex = '10';

    const rightArrow = document.createElement('button');
    rightArrow.textContent = '›';
    rightArrow.className = 'arrow right';
    rightArrow.style.position = 'absolute';
    rightArrow.style.right = '10px';
    rightArrow.style.top = '50%';
    rightArrow.style.transform = 'translateY(-50%)';
    rightArrow.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    rightArrow.style.color = 'white';
    rightArrow.style.border = 'none';
    rightArrow.style.padding = '10px';
    rightArrow.style.cursor = 'pointer';
    rightArrow.style.zIndex = '10';

    rowElement.style.position = 'relative';
    rowElement.appendChild(leftArrow);
    rowElement.appendChild(rightArrow);

    // Scrolling logic
    leftArrow.addEventListener('click', () => {
        postersContainer.scrollLeft -= 300;
    });
    rightArrow.addEventListener('click', () => {
        postersContainer.scrollLeft += 300;
    });
}

// Modal functionality
function openModal(movie) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    modalImage.src = movie.image;
    modalImage.alt = movie.title;
    modalTitle.textContent = movie.title;
    modalDescription.textContent = movie.description;

    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    modal.focus();
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
}

// Populate all rows
document.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('.row');
    rows.forEach((row, index) => {
        // For variety, use different subsets or all
        const start = index * 4;
        const end = start + 10;
        const rowMovies = movies.slice(start, end);
        populateRow(row, rowMovies);
    });

    // Modal event listeners
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
});