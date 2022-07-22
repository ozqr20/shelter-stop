const pets = [];
// add key as variable for petfinder
var key = "kDth6aBoA1LVzzoiCjQkPR3AVoOOEChNhYGXwylaEOPZcrrVrm";

//test
var saveSearch = function(){
    localStorage.setItem("pets", JSON.stringify(cities));
};


var petRead = function(city){
    var apiUrl = ``  // https goes here 

    fetch(apiUrl).then(function(response){
        if(response.ok){
            console.log(response);
            response.json().then(function(data){
                console.log(data);
            });
        }else{
            alert("Error");
        }   
    })
    .catch(function(error){
        alert("Unable to connect");
    });
};