// Variables ...
const pets = [];
var petSearchEl = document.getElementById("#petSearch");
var inputSearchEl = document.getElementById("#input-search")



// add key as variable for petfinder
const key = "kDth6aBoA1LVzzoiCjQkPR3AVoOOEChNhYGXwylaEOPZcrrVrm";
const secret = "ngiT7tLRiiiyrUQoQNonbSts2XIRDfpOimV377zx";


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
    .catch(function(error){
        alert("Unable to connect");
    });
};




var formSubmitHandler = function(event){
    event.preventDefault();
    var pet = petSearchEl.value.trim();
    if(pet){
        petRead(pet);
    } else{
        alert("wrong zip code");
        // Modal - it needs implementation 
        //var modal = document.createElement("div");
        // modal.classList = "modal-content";

        // closeEl = document.createElement("span");
        // closeEl.classList = "close>&times";
        // closeEl.textContent = "Invalid Zipcode";

        // modal.appendChild(closeEl);
    }
};

inputSearchEl.addEventListener("submit", formSubmitHandler);


// curl -d "grant_type=client_credentials&client_id={kDth6aBoA1LVzzoiCjQkPR3AVoOOEChNhYGXwylaEOPZcrrVrm}&client_secret={ngiT7tLRiiiyrUQoQNonbSts2XIRDfpOimV377zx}" https://api.petfinder.com/v2/oauth2/token
