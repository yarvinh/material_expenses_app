import {Render} from './render'
 
 export class Events {
    static locationInputEvent(locationInput,fetching){
            locationInput.addEventListener('submit',e => {
            e.preventDefault()
            fetching.createLocation = e
         })
    }
    static locationsEvent(locations,fetching){
        locations.addEventListener('click',e => {
           Events.events(e,fetching)
         })   
    }

    static events(e,fetching){
      e.preventDefault()
      const input = e.target 
      if(e.target.className === 'receipt_input'){
           input.addEventListener("keyup",(e)=>{fetching.createProject = e})
      } else if (e.target.className === 'receipt_button' ){
        Render.itemInputs(e.path[1]) 
      } else if(e.target.textContent === "Remove"){
         fetching.deleteLocation = e.path[2]
      } else if (e.target.textContent === "X"){
         Render.substract(e.target)
         fetching.deleteItem = e.target
      } else if (e.target.className === 'item_button'){ 
         let itemForm =  e.target.parentNode
         fetching.createItem = itemForm
      } else if (e.target.textContent === "Delete"){
         const receipt = e.target.parentNode.parentNode
         fetching.deleteReceipt = receipt
      } else if(input.className === "location_accordion") {
         Render.hideElements(input)
      } else if(input.className === "location_accordion active"){
         Render.showElements(input,"location_accordion")
      }else if(input.className === "edit"){ 
         Render.hideElements(input)
         input.textContent = "Save"
      } else if(input.className === "edit active"){
         Render.showElements(input,"edit")
         input.textContent = "Edit"
         fetching.editLocation = input.parentNode
      }

    }

}