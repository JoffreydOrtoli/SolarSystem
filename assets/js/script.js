const title = document.querySelector("#title");

title.addEventListener('click', function() {
    title.style.animation = "rotate(180deg)";
    console.log("hey");
});