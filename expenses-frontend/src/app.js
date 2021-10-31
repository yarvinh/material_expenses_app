import {Fetching} from './fetching'
import {Locations} from './locations'

const locationInput = document.getElementById("location_form")

    export class App {
    static render(){
       let fetching = new Fetching('users/1')
        Locations.locationInputEvent(locationInput,fetching)
        fetching.userFetch
    }
 }