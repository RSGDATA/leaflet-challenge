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

    layer.bindPopup(`<h3>Depth ${feature.geometry.coordinates[2]} KM</h3><hr>Magnitude: ${feature.properties.mag}`)

  }
  function changeColor(feature) {
    if (feature.geometry.coordinates[2] >= -10 && feature.geometry.coordinates[2]  <= 10 )
    return "rgba(33, 244, 8, 0.8)"
    else if (feature.geometry.coordinates[2] >= 10 && feature.geometry.coordinates[2]<= 30)
    return "rgba(151, 244, 8, 0.8)"
    else if (feature.geometry.coordinates[2] >= 30 && feature.geometry.coordinates[2]<= 50)
    return "rgba(214, 244, 8, 0.8)"
    else if (feature.geometry.coordinates[2] >= 50 && feature.geometry.coordinates[2]<= 70)
    return "rgba(244, 185, 8, 0.8)"
    else if (feature.geometry.coordinates[2] >= 70 && feature.geometry.coordinates[2]<= 90)
    return "rgba(244, 131, 8, 0.8)"
    else if (feature.geometry.coordinates[2] >= 70 && feature.geometry.coordinates[2]<= 90)
    return "rgba(244, 82, 8, 0.8)"
    else
    return "rgba(244, 8, 8, 0.8)"
  }
  function geojsonMarkerOptions(feature) {
     return { 
      radius: feature.properties.mag * 4,
      fillColor: changeColor(feature),
      color: "",
      weight: 1,
      opacity: 2,
      fillOpacity: 0.8,
      ratio: 1000
      
  }
}
  console.log(earthquakeData)
  // YOUR CODE GOES HERE
  // Save the earthquake data in a variable.

  // Pass the earthquake data to a createMap() function.
  var earthquakes = L.geoJSON(earthquakeData, {
    style: geojsonMarkerOptions,

      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions)
        
    
      },
      
      onEachFeature: onEachFeature
      

  })
  
  createMap(earthquakes);
// var legend = L.control({position: 'bottomright'});

// legend.onAdd = function (map) {

//     var div = L.DomUtil.create('div', 'info legend'),
//     grades = [0, 10, 20, 50, 100, 200, 500, 1000],
//     labels = [];

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
//             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
// }

// return div;

// };
// legend.addTo(myMap); 
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
}

