/**
 * Author: Wilson Pilco Nuñez
 * Email: wilsonaux1@gmail.com
 * Created at: 2022-12-15 23:24
 */


// Initialize and add the map
function initMap() {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.031 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: uluru,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });

    console.log("shot de emiciones");
}

window.initMap = initMap;
