const title = document.querySelector("#headerTitle");
const planets = document.querySelector(".planets_liens");

title.addEventListener('click', function(event) {
    event.target.classList.toggle('show');
});