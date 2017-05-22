import axios from 'axios'
import loadPlaces from './loadPlaces'
import { $ } from '../bling'

const mapOptions = { center: { lat: 43.2, lng: -79.8 }, zoom: 8 }

// init makeMap function, makeMap is the page element to apply the map to
function makeMap(mapDiv) {
  if (!mapDiv) return // no element exists

  const map = new google.maps.Map(mapDiv, mapOptions) // create map
  loadPlaces(map) // load initial locations

  const input = $('[name=geolocate]')
  const autocomplete = new google.maps.places.Autocomplete(input) // google api method for Autocomplete

  // invoked when place_changed, takes new location and envokes loadPlaces
  autocomplete.addListener('place_changed', () => {
    const { geometry: { location: { lat, lng } } } = autocomplete.getPlace()
    loadPlaces(map, lat(), lng())
  })
}

export default makeMap
