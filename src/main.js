const searchForm = document.querySelector("#searchForm");

const searchInput = document.querySelector("#searchInput");

const searchButton = document.querySelector("#searchButton");

console.log(searchForm);
console.log(searchInput);
console.log(searchButton);

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const city = searchInput.value.trim();

    if(!city) {
      console.log("Please enter a city")
      return;
    }

    console.log(city);
});