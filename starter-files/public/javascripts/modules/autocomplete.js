function autocomplete(input, latInput, lngInput) {
  if (!input) return // skips this fn from running if there is not input
  const dropdown = new google.maps.places.Autocomplete(input)
  dropdown.addListener('place_changed', () => {
    const place = dropdown.getPlace()
    latInput.value = place.geometry.location.lat()
    lngInput.value = place.geometry.location.lng()
  })

  // disable enter submitting form from address field with enter
  input.on('keydown', e => (e.keyCode === 13) && e.preventDefault())
}

export default autocomplete
