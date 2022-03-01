const searchPhone = () => {

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(phones => displaySearchResults(phones.data));
};
const displaySearchResults = data => {
    console.log(data);
    const searchResult = document.getElementById('search-result');
    data.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.innerHTML = `
            <div  class="card">
                <img src="${phone.image}" class=" img-fluid card-img-top w-75 mx-auto" alt="...">
                <div class="card-body">
                  <h5 class="card-text">${phone.phone_name}</h5>
                  <h6 class="card-title">${phone.brand}</h6>
                    <button class="btn btn-success">Details</button>

                </div>
            </div>
    `;
        searchResult.appendChild(div);
    });

}