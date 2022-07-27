// Variables (currently unused)
const pets = [];
const submitButton = document.getElementById('submit-button');


//Test to see if JS is being read
console.log("Test verified");

//key and secret key
const key = "yU3oem5LTLC04KuehXub1betrxaHobbODTgGpASsVR3IGZ0mXt";
const secret = "Kt7V8JuOoh8711iAGIWlMRPbeBoVXQCcnVr5c6Dp";


var pf = new petfinder.Client({ apiKey: "yU3oem5LTLC04KuehXub1betrxaHobbODTgGpASsVR3IGZ0mXt", secret: "Kt7V8JuOoh8711iAGIWlMRPbeBoVXQCcnVr5c6Dp" });

//Created function for selecting the radio value
var radioValue = undefined;

function getRadioValue() {
    //select the radio name
    var radio = document.getElementsByName('question');
    //go through a for loop of the radio inputs and determine which is checked
    for (i = 0; i < radio.length; i++) {
        //store the index value of the checked (selected) radio
        if (radio[i].checked) {
            //console logs the value of either cats, dogs, birds, or "" if unselected. "" is necessary for the api function to work.
            console.log("Type selected: " + radio[i].value + "!");
            //radio value becomes the index value for use outside of this function, for the api function below.
            radioValue = radio[i].value;
        }
    }
}


//asyncronous function provided by SDK
async function showAnimals(animalType, sexType, sizeType, ageType, house_trainedType, special_needsType, location) {
    //Show first page of pets
    let page = 1;

    //So far this will show results based on type, breed, and location
    apiResult = await pf.animal.search({
        type: animalType,
        sex: sexType,
        size: sizeType,
        age: ageType,
        house_trained: house_trainedType,
        special_needs: special_needsType,
        location,
        page,
        //THIS IS WHAT LIMITS THE 429 ERROR, the limit shows how many animals are in your zip code
        limit: 2,
    });
    let Idx = (page - 1) * 2; //This # must match the limit above
    apiResult.data.animals.forEach(function (animal) {
        console.log(` -- ${++Idx}: ${animal.name} id: ${animal.id} url: ${animal.url}`);
    });
    return apiResult.data.animals
}


async function pullpets() {
    //currently this function only shows dogs in the 32219 florida zip code

    const animals = await showAnimals(radioValue, $("#dropdownGender").val(), $("#dropdownSize").val(), $("#dropdownAge").val(), $("#dropdownHT").val(), $("#dropdownSN").val(), $("#zipCode").val(),);
    console.log("Showing results for:" + radioValue);
    console.log($("#dropdownGender").val());
    console.log($("#dropdownSize").val());
    console.log($("#dropdownAge").val());
    console.log("Housetrained: " + $("#dropdownHT").val());
    console.log("Special needs: " + $("#dropdownSN").val());
    console.log($("#zipCode").val());

    //reveal each pet card's hidden Bulma styling
    $(".pet-card").each(function (index) {
        this.classList.remove("is-hidden");
    });

    //for each pet indexed in the network tab, show the 0th medium sized photo for the pet provided on the page
    $(".pet-image").each(function (index) {
        this.src = animals[index].photos[0].medium
    });
    //for each pet indexed, show the name for the class of the pet-name in the pet-name's card
    $(".pet-name").each(function (index) {
        this.textContent = animals[index].name
    });
    //for each indexed pet, show the description ID from the network tab, or "No description available" if none is provided on the petfinder page
    $(".pet-description").each(function (index) {
        this.textContent = animals[index].description || "No description available"
    });
    //for each indexed pet in the network tab, show the URL in the <div> with the .pet-url class
    $(".pet-url").each(function (index) {
        this.href = animals[index].url
    });

    //for each indexed pet on the network tab,
    $(".get-direction").each(function (index) {
        //on clicking the <button> element
        this.onclick = function (event) {
            //create a constant address for each indexed animal, pulling the address 
            const address = animals[index].contact.address
            //because the network shows the address in different lines on the petfinder website, we have to combine the addresses
            let search = address.address1
            if (address.address2)
                search += ", " + address.address2;
            search += " " + address.city + ", " + address.state + " " + address.postcode
            document.getElementById("destination").value = search;
            //submit the map function
            submitForm(event);
        }
    });
}

submitButton.addEventListener('click', pullpets);



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

            marker = L.marker(location.latLng, { icon: custom_icon }).addTo(map);

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

            marker = L.marker(location.latLng, { icon: custom_icon }).addTo(map);

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

