const searchPhone = () => {

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    searchField.value = '';
    if (searchText == '') {
        return alert("Please write something to display");
    }

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(phones => displaySearchResults(phones.data));
};
const displaySearchResults = data => {
    console.log(data);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if (data.length == 0) {
        return alert("No results found");

    }
    data.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.innerHTML = `
            <div  class="card">
                <img src="${phone.image}" class=" img-fluid card-img-top w-75 mx-auto" alt="...">
                <div class="card-body">
                  <h5 class="card-text">${phone.phone_name}</h5>
                  <h6 class="card-title">${phone.brand}</h6>
                    <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-success">Details</button>

                </div>
            </div>
    `;
        searchResult.appendChild(div);
    });

}

const loadPhoneDetail = id => {
    console.log(id);

    const url = `https://openapi.programming-hero.com/api/phone/${id}
    `;
    fetch(url)
        .then(response => response.json())
        .then(phoneDetail => displayPhoneDetail(phoneDetail.data));
};

const displayPhoneDetail = data => {
    console.log(data);

    const phoneDetails = document.getElementById('phone-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${data.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Name</h5>
        <p class="card-text">Details</p>
       
    </div>
    `;
    phoneDetails.appendChild(div);
}
