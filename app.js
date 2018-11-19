const stores = [{
  position: {
    lat: -25.363,
    lng: 131.044
  },
  title: 'Marker A',
  id: 1,
  zipcode: 01001001,
  city: 'São Paulo',
  country: 'Brasil',
  address: 'Av. Paulista, 100'
},
{
  position: {
    lat: 3.19125,
    lng: 101.710052
  },
  title: 'Marker B',
  id: 2,
  zipcode: 01001001,
  city: 'São Paulo',
  country: 'Brasil',
  address: 'Av. Paulista, 102'
},
{
  position: {
    lat: 3.147372,
    lng: 101.597443
  },
  title: 'Marker C',
  id: 3,
  zipcode: 01001001,
  city: 'São Paulo',
  country: 'Brasil',
  address: 'Av. Paulista, 103'
},
{
  position: {
    lat: 3.200848,
    lng: 101.616669
  },
  title: 'Marker D',
  id: 4,
  zipcode: 01001001,
  city: 'São Paulo',
  country: 'Brasil',
  address: 'Av. Paulista, 104'
},
{
  position: {
    lat: 3.180967,
    lng: 101.715546
  },
  title: 'Marker E',
  id: 5,
  zipcode: 01001001,
  city: 'São Paulo',
  country: 'Brasil',
  address: 'Av. Paulista, 105'
}];
const mapId = document.getElementById('map');
const storeSearchId = document.getElementById('store-search');
const storeList = document.getElementById('store-list');

function initMap() {
  let markersInMap = [];
  
  // Init map
  const map = new google.maps.Map(mapId, {
    center: { lat: 3.180967, lng: 101.715546 },
    zoom: 13
  });
  
  // Init search box
  const searchBox = new google.maps.places.SearchBox(storeSearchId);

  // Mapping all stores and putting on map
  stores.map((store) => {
    marker = new google.maps.Marker({
      title: store.title,
      position: {
        lat: store.position.lat,
        lng: store.position.lng
      },
      zipcode: store.zipcode,
      city: store.city,
      country: store.country,
      address: store.address,
      map
    });
    markersInMap.push(marker);
  });

  // After interact with map
  map.addListener('idle', function () {
    let mapHaveMarker = false;
    // Clear store list
    storeList.innerHTML = '';
    // Map all stores
    stores.map((store) => {
      // If store are in map
      if (map.getBounds().contains(store.position)) {
        // Include in store list
        storeList.insertAdjacentHTML('beforeend', `<li>${store.title}</li>`);  
        // Set control flag as true
        mapHaveMarker = true;
      }
    })
    // If control flag is false, show message
    if(!mapHaveMarker){
      storeList.innerHTML = '<li>No stores founded on this place.</li>';
    }
  });

  // When click in a marker
  marker.addListener('click', function () {
  });

  // When input something on search box
  searchBox.addListener('places_changed', () => {
    const places = searchBox.getPlaces();
    const bounds = new google.maps.LatLngBounds();
    places.forEach(function (place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      bounds.union(place.geometry.viewport);
    });
    map.fitBounds(bounds);
  });
}