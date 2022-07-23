const pets = [];
var petSearchEl = document.getElementById("#petSearch");
var inputSearchEl = document.getElementById("#input-search")

//Test to see if JS is being read
console.log("Test verified");

//key and secret key
const key = "Q4ngIfrwedxSvUsSwlO4rmtzSJJdltVFxiqllg9ZM57pn4rt3o";
const secret = "GK42fyprvcmaWP7TtS2Kic1KlrSJ7Mi1CZaMBfZg";

var pf = new petfinder.Client({apiKey: "Q4ngIfrwedxSvUsSwlO4rmtzSJJdltVFxiqllg9ZM57pn4rt3o", secret: "GK42fyprvcmaWP7TtS2Kic1KlrSJ7Mi1CZaMBfZg"});


//testgit
var saveSearch = function(){
    localStorage.setItem("pets", JSON.stringify(pets));
};


var petRead = function(pet){
    var apiUrl = `https://api.petfinder.com/v2/pet.getRandom?key=${key}&animal=cat&location=${pet}`;

    fetch(apiUrl).then(function(response){
        if(response.ok){
            console.log(response);
            response.json().then(function(data){
                console.log(data,pet);
            });
        }else{
            alert("Error");
        }   
    })
    .catch(function (error) {
        // Handle the error
    });

//asyncronous function provided by SDK
async function showAnimals(animalType, searchBreed, location) {
    //Show first page of pets
    let page = 1;
    
    //So far this will show results based on type, breed, and location
    apiResult = await pf.animal.search({
        type: animalType,
        breed: searchBreed,
        location,
        page,
        limit: 100,
    });
    let Idx = (page - 1) * 100;
    apiResult.data.animals.forEach(function(animal) {
        console.log(` -- ${++Idx}: ${animal.name} id: ${animal.id} url: ${animal.url}`);
    });
    
    }

    //currently this function only shows dogs in the 32219 florida zip code
(async function() {
    await showAnimals("Dog",undefined,"32219");
})();S}
