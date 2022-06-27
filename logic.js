// // Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Perform a GET request to the query URL.
d3.json(queryUrl).then(function (data) {
  //console.log(data);
  // Using the features array sent back in the API data, create a GeoJSON layer, and add it to the map.

  // 1.
  // Pass the features to a createFeatures() function:
  createFeatures(data.features);

});

// 2. 
function createFeatures(earthquakeData) {

  function onEachFeature(feature, layer) {

    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>Magnitude: $`)


    


  }
  var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
  console.log(earthquakeData)
  // YOUR CODE GOES HERE
  // Save the earthquake data in a variable.

  // Pass the earthquake data to a createMap() function.
  var earthquakes = L.geoJSON(earthquakeData, {
     pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions)
        
    
      },
      
      onEachFeature: onEachFeature
      // 

  })


  
  createMap(earthquakes);

 
}


// // 3.
// // createMap() takes the earthquake data and incorporates it into the visualization:

function createMap(earthquakes) {
  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Creat an overlays object.
  var overlayMaps = {
    Earthquakes: earthquakes
  }
//   // YOUR CODE GOES HERE

  // Create a new map.
  // Edit the code to add the earthquake data to the layers.
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control that contains our baseMaps.
  // Be sure to add an overlay Layer that contains the earthquake GeoJSON.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // for (var i = 0; i < cities.length; i++) {
  
  //   L.circle(cities[i].geometry, {
  //     fillOpacity: 0.75,
  //     color: "white",
  //     fillColor: "purple",
  //     // Setting our circle's radius to equal the output of our markerSize() function:
  //     // This will make our marker's size proportionate to its population.
  //     radius: markerSize(cities[i].population)
    
    
  //   }).bindPopup(`<h1>${cities[i].name}</h1> <hr> <h3>Population: ${cities[i].population.toLocaleString()}</h3>`).addTo(myMap);
  // }
  

}

// {"generated":1656344184000,
// "url":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson",
// "title":"USGS All Earthquakes, Past Week",
// "status":200,
// "api":"1.10.3",
// "count":2130},
// "features":[{"type":"Feature","properties":{"mag":1.67,"place":"3km E of The Geysers, CA",
// "time":1656342942120,
// "updated":1656343933419,
// "tz":null,
// "url":"https://earthquake.usgs.gov/earthquakes/eventpage/nc73751661",
// "detail":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/nc73751661.geojson",
// "felt":null,
// "cdi":null,
// "mmi":null,
// "alert":null,
// "status":"automatic",
// "tsunami":0,"sig":43,
// "net":"nc","code":"73751661",
// "ids":",nc73751661,",
// "sources":",nc,",
// "types":",nearby-cities,origin,phase-data,scitech-link,",
// "nst":29,"dmin":0.007542,"rms":0.04,"gap":78,"magType":"md",
// "type":"earthquake","title":"M 1.7 - 3km E of The Geysers, CA"},
// "geometry":{"type":"Point",
// "coordinates":[-122.7273331,38.7815018,1.31]},
// "id":"nc73751661"},