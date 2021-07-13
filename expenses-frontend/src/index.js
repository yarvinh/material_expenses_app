

   import {Fetching} from './fetching'
   import {Events} from './event'
   import {Render} from './render'

document.addEventListener("DOMContentLoaded", () => {

const BASE_URL = "http://localhost:3000"
const locations = document.getElementById("locations")
const locationInput = document.getElementById("location_form")



let fetching = new Fetching(BASE_URL)
Events.locationInputEvent(locationInput,fetching)
Events.locationsEvent(locations,fetching)
fetching.userFetch
})
 

