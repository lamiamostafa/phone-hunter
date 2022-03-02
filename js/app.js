// searchPhoneResult
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
                <img src="${phone.image}" class=" pt-3 img-fluid card-img-top w-50 mx-auto" alt="...">
                <div class="card-body">
                  <h5 class="card-text">${phone.phone_name}</h5>
                  <h6 class="card-title">${phone.brand}</h6>
                  <a href="#card"><button onclick="loadPhoneDetail('${phone.slug}') "class="btn btn-success">Details </button>
                    </a>
                    
                </div>
               
            </div>
           
            
    `;
        searchResult.appendChild(div);

    });

}

// single phone details
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

    if (data.releaseDate == "") {
        document.getElementById('release').style.display = 'none';

    }

    div.innerHTML = `
       
    <div class="col-lg-12 ">
        <div id="card" class="  card-body">
         <div class=" text-center">
            <img src="${data.image}" class="card-img-top  w-50 img-fluid " alt="...">
            <p id="release" class="card-text">${data.releaseDate ? data.releaseDate : 'Releasing Soon'}</p>
         </div>   
            <h6 class="card-title">${data.name}</h6>
            <p class="card-text"><b>Brand:</b> ${data.brand}</p>
            <p class="card-text"><b>Storage:</b> ${data.mainFeatures.storage}</p>
            <p class="card-text"><b>DisplaySize:</b> ${data.mainFeatures.displaySize}</p>
            <p class="card-text"><b>Memory:</b> ${data.mainFeatures.memory}</p>
            <p class="card-text"><b>Sensors:</b> ${data.mainFeatures.sensors.join()}</p>
        </div>
    </div>
                       
    <div  class="col-lg-12 ">
    <div id="others" class="  card-body ">
       <hr class="w-100">      
       <h6 id="others"class="card-title"></h6>
       <p></p>
       <p class="card-text"><b>WLAN: </b> ${data.others && data.others.WLAN ? data.others.WLAN : 'Not Available'}</p>
       <p class="card-text"><b>Bluetooth:</b> ${data.others && data.others.Bluetooth ? data.others.Bluetooth : 'Not Available'}</p>
       <p class="card-text"><b>GPS:</b> ${data.others && data.others.GPS ? data.others.GPS : 'Not Available'}</p>
       <p class="card-text"><b>NFC:</b> ${data.others && data.others.NFC ? data.others.NFC : 'Not Available'}</p>
       <p class="card-text"><b>USB:</b> ${data.others && data.others.USB ? data.others.USB : 'Not Available'}</p>
       <p class="card-text"><b>Radio:</b> ${data.others && data.others.Radio ? data.others.Radio : 'Not Available'}</p>
    </div>
   </div>
            
    
    `;
    phoneDetails.appendChild(div);

}



