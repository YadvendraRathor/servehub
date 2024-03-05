const zip_url="https://api.openweathermap.org/geo/1.0/zip?zip=";//226010,IN&appid=8d976e41263a64c2a13588e93d1de7f9
const btn=document.querySelector("#btn");
const btn2=document.querySelector("#detect_btn");
const input=document.querySelector("#zip_input");

function gotlocation(position){
    console.log(position.coords.latitude,position.coords.longitude);
}

function failedToGet(){}

//get user location
btn2.addEventListener("click",()=>{
   navigator.geolocation.getCurrentPosition(gotlocation,failedToGet); 
});






var map = L.map('map').setView([
    20.5937, 78.9629], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom:7,
    minZoom:5,
}).addTo(map);



var popup = L.popup();

function onMapClick(e) {    //opens a popup with coordinates where user clicked
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);



const search=(lat,lon)=>{
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom:17,
        minZoom:5,
    }).addTo(map);
    map.setView([lat,lon],13);
    var marker = L.marker([lat, lon]).addTo(map);
    marker.bindPopup("This is<br><b>Your Location</b>").openPopup();

   
}



 

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();//removes all by default work which happens when button is clicked for e.g. page refresh, adding something in url, etc
    const URL=`${zip_url}${input.value},IN&appid=8d976e41263a64c2a13588e93d1de7f9`;
    let response=await fetch(URL);
    let data=await response.json();
    let lat=data["lat"];
    let lon=data["lon"];
    search(lat,lon);
   
    
  
 
});