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
        .then(phones => displaySearchResults(phones.data.slice(0, 20)));


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
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    // div.innerHTML = `

    // <img src="${data.image}" class="card-img-top" alt="...">
    // <div class="card-body">
    //     <h5 class="card-title">Name</h5>
    //     <p class="card-text">Details</p>

    // </div>
    // `;
    if (data.releaseDate == "") {
        document.getElementById('release').style.display = 'none';

    }
    div.innerHTML = `
    
    
    <div class="col-lg-12 ">
        <div class="  card-body">
        <img src="${data.image}" class="card-img-top" alt="...">
        <p id="release" class="card-text">${data.releaseDate ? data.releaseDate : ''}</p>
            <h6 class="card-title">${data.name}</h6>
            <p class="card-text">Brand:${data.brand}</p>
            <p class="card-text">Storage:${data.mainFeatures.storage}</p>
            <p class="card-text">DisplaySize:${data.mainFeatures.displaySize}</p>
            <p class="card-text">Memory:${data.mainFeatures.memory}</p>
            <p class="card-text">Sensors:${data.mainFeatures.sensors.join()}</p>
            
            <hr class="w-100">
            <p class="card-text">WLAN:${data.others.WLAN ? data.others.WLAN : ''}</p>
            <p class="card-text">Bluetooth:${data.others.Bluetooth ? data.others.Bluetooth : ''}</p>
            <p class="card-text">GPS:${data.others.GPS ? data.others.GPS : ''}</p>
            <p class="card-text">NFC:${data.others.NFC ? data.others.NFC : ''}</p>
            <p class="card-text">USB:${data.others.USB ? data.others.USB : ''}</p>
            <p class="card-text">Radio:${data.others.Radio ? data.others.Radio : ''}</p>


        
   

</div>
    `;
    phoneDetails.appendChild(div);
}
