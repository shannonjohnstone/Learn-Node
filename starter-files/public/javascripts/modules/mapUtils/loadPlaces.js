import apiCaller from '../apiCaller'

/** createMarkers - creates markers location array
 * @param {element} map - map element on the application we are applying this logic to
 * @param {array} places - location markers
 * @param {object} bounds - this google item with api methods
 * @return {array} - marker locations
 */
const createMarkers = (map, places, bounds) => {
  // create array of location pins and set the pin position on the map
  return places.map(place => {
    const [placeLng, placeLat] = place.location.coordinates
    const position = { lat: placeLat, lng: placeLng }
    bounds.extend(position)
    const marker = new google.maps.Marker({ map, position })
    marker.place = place;
    return marker
  })
}

/** createInfoBox - creates the markup used for the info box when pin is clicked
 * @param {element} map - map element on the application we are applying this logic to
 * @param {array} markers - location markers
 * @param {infoWindow} object - this google item with api methods
 */
function createInfoBox(map, markers, infoWindow) {
  markers.forEach(marker => marker.addListener('click', function() {
    const html = `
      <div class="popup">
          <a href="/store/${this.place.slug}">
            <img src="/uploads/${this.place.photo || 'store.png'}" alt="${this.place.name}" />
            <p>${this.place.name} - ${this.place.location.address}</p>
          </a>
      </div>
    `
    infoWindow.setContent(html)
    infoWindow.open(map, marker)
  }))
}


/** loadPlaces - load map is used to call search api, crreateMarkers and info boxes
 * @param {element} map - map element on the application we are applying this logic to
 * @param {number} lat - latidute value
 * @param {number} lng - longidute value
 */
const loadPlaces = async function(map, lat = 43.2, lng = -79.8) {
  const { data: places } = await apiCaller('get', `/api/v1/stores/near?lat=${lat}&lng=${lng}`) // call serach api with new location
  if (!places.length) return // no results

  const bounds = new google.maps.LatLngBounds() // bounds are for find locations near other and calculating a good zoom level
  const infoWindow = new google.maps.InfoWindow() // InfoWindow is for creating an instance maps the popup window

  // create markers and info boxes
  const markers = createMarkers(map, places, bounds)
  createInfoBox(map, markers, infoWindow)

  // both setCenter/fitBounds are used to center the map on search, it find location markers in ths new location then center and zooms
  map.setCenter(bounds.getCenter())
  map.fitBounds(bounds)
}

export default loadPlaces
