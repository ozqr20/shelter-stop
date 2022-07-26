// Variables (currently unused)
const pets = [];
var petSearchEl = document.getElementById("#petSearch");
var inputSearchEl = document.getElementById("#input-search");
var dropDownEl = document.getElementById("#dropdown");
const submitButton = document.getElementById('submit-button');


//Test to see if JS is being read
console.log("Test verified");


//key and secret key
const key = "yU3oem5LTLC04KuehXub1betrxaHobbODTgGpASsVR3IGZ0mXt";
const secret = "Kt7V8JuOoh8711iAGIWlMRPbeBoVXQCcnVr5c6Dp";


var pf = new petfinder.Client({apiKey: "yU3oem5LTLC04KuehXub1betrxaHobbODTgGpASsVR3IGZ0mXt", secret: "Kt7V8JuOoh8711iAGIWlMRPbeBoVXQCcnVr5c6Dp"});

//Select radio button value for animal type value:

var radioValue = undefined;

function getRadioValue() {
    var radio = document.getElementsByName('question');
    for(i=0; i < radio.length; i++) {
        if(radio[i].checked) {
        console.log("Type selected: " + radio[i].value + "!");
        radioValue = radio[i].value;
        }
    }
}



// let radioBtns = document.querySelectorAll("input[name='question']");
// let result = document.getElementById("result");

// let findSelected = () => {
//     let selected = document.querySelectorAll("input[name='question']:checked.value");
//     result.textContent = `Type: ${selected}`;
//     console.log(`${selected}`);
// }

// radioBtns.forEach(radioBtn => {
//     radioBtn.addEventListener("change",findSelected);
// });

// findSelected();


//asyncronous function provided by SDK
async function showAnimals(animalType, sexType, sizeType, ageType, location) {
    //Show first page of pets
    let page = 1;
    
    //So far this will show results based on type, breed, and location
    apiResult = await pf.animal.search({
        type: animalType,
        sex: sexType,
        size: sizeType,
        age: ageType,
        location,
        page,
        limit: 1,
    });
    let Idx = (page - 1) * 1;
    apiResult.data.animals.forEach(function(animal) {
        console.log(` -- ${++Idx}: ${animal.name} id: ${animal.id} url: ${animal.url}`);
    });
    }
    
    async function pullpets() {
    //currently this function only shows dogs in the 32219 florida zip code

    await showAnimals(radioValue,$("#dropdownGender").val(),$("#dropdownSize").val(),$("#dropdownAge").val(),$("#zipCode").val(),);
    console.log("Showing results for:")
    console.log($("#dropdownGender").val());
    console.log($("#dropdownSize").val());
    console.log($("#dropdownAge").val());
    console.log("Spayed/Neutered: "+$("#dropdownNeutered").val());
    console.log($("#zipCode").val());
    }

submitButton.addEventListener('click',pullpets);

//!//

//CODE FOR THE SECOND API BELOW:

//!//

//Default map layer
let map = L.map('map', {
    layers: MQ.mapLayer(),
    //Random lattitude, longitude (Orlando, FL)
    center: [28.5384, -81.3789],
    zoom: 12
});
    function runDirection(start, end) {
        
        //recreating new map layer after removal
        map = L.map('map', {
            layers: MQ.mapLayer(),
            center: [28.5384, -81.3789],
            zoom: 12
        });
        
        var dir = MQ.routing.directions();

        dir.route({
            locations: [
                start,
                end
            ]
        });
    

        CustomRouteLayer = MQ.Routing.RouteLayer.extend({
            createStartMarker: (location) => {
                var custom_icon;
                var marker;

                custom_icon = L.icon({
                    iconUrl: './assets/images/red.png',
                    iconSize: [20, 29],
                    iconAnchor: [10, 29],
                    popupAnchor: [0, -29]
                });

                marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

                return marker;
            },

            createEndMarker: (location) => {
                var custom_icon;
                var marker;
                //Use blue marker image for destination
                custom_icon = L.icon({
                    iconUrl: './assets/images/blue.png',
                    iconSize: [20, 29],
                    iconAnchor: [10, 29],
                    popupAnchor: [0, -29]
                });

                marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

                return marker;
            }
        });
        
        map.addLayer(new CustomRouteLayer({
            directions: dir,
            fitBounds: true
        })); 
    }

//Function that runs when form is submitted
function submitForm(event) {
    event.preventDefault();

    //Deletes map layers
    map.remove();

    //Gets data for the map, currently hardcoded to zip code 32219 and a destination value for the form, below is the appropriate start commented out:
    //start = document.getElementById("zipCode");
    start = $("#zipCode").val();
    end = document.getElementById("destination").value;

    // run directions function
    runDirection(start, end);

    // reset form
    document.getElementById("form").reset();
}

//Assigns the form to form variable
const form = document.getElementById('form');

//Call the submitForm() function when submitting the form - WILL NEED TO CHANGE THIS TO MATCH THE PETFINDER API UPON CLICKING A PET
form.addEventListener('submit', submitForm);