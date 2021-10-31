
import {Locations} from './locations'
import {Receipts}  from './receipts'
import {Items} from './items'
const BASE_URL = "http://localhost:3000"
const locationInput = document.getElementById("location_form")

   export class Fetching {
      constructor(path){
         this.path = path
      }

   get userFetch(){
      return fetch(`${BASE_URL}/${this.path}`)
         .then(response => {
          return response.json()
         })
         .then(data => {      
            const locations = new Locations(data)          
            const items = new Items(data)
            locations.renderUser
            locationInput.children[1].id = data.id
            locations.locationRender
            const receipt = new Receipts(data)
            receipt.receiptRender= data
            items.itemsRender = data
         }).catch(e =>{
            console.log(e)
      })
   }

      set createLocation(e){

         const address = e.target.children[1].value
         const user_id = e.target.children[1].id
             const locationParams = {address: address, user_id: user_id}
            fetch(`${BASE_URL}/locations`, 
            { 
               method: "post", 
               headers: { "Content-type": "application/json"  , "Accept": "application/json"
              }, 
              body: JSON.stringify(locationParams)
            }
           )
          .then(function(response) {
     
             return response.json()
           })
          .then(function(data) {
          
             if (data.id){
               const location = new Locations(data)  
               location.renderLocationAfterCreate 
             }
           })
           .catch(error =>{console.log(error)})
          
           e.target.children[1].value = ""
      }

      set createProject(element){
            const projectParams = {project_name: element.value ,location_id: element.id}
            fetch(`${BASE_URL}/${this.path}`, 
            { 
               method: "post", 
               headers: { "Content-type": "application/json"  , "Accept": "application/json"
              }, 
              body: JSON.stringify(projectParams)
            }
           )
          .then(function(response) {
             return response.json()
           })
          .then(function(data) {
    
            if (data.id){
               const receipt = new Receipts(data)
               receipt.renderProjectAfterCreated = data
            } 
           })
           .catch(error =>{console.log(error)})
      }

   set createItem(params){
        fetch(`${BASE_URL}/${this.path}`, 
        { 
           method: "post", 
           headers: { "Content-type": "application/json"  , "Accept": "application/json"
          }, 
          body: JSON.stringify(params)
        }
       )
      .then(function(response) {
         return response.json()
       })
      .then(function(data) {
         if(data.id){
    
            Items.renderItemList(data.receipt_id)
            Items.renderItemAfterCreated(data)
         }
       })
      .catch(error =>{console.log(error)})
 }

  set deleteFetch(id){   
    fetch(`${BASE_URL}/${this.path}/${id}`, 
    { 
       method: "DELETE", 
    }) 
}



  set editLocation(locationForm){  
     let id = locationForm.id.split("_")
     id = id[id.length - 1]
     const locationParams = { address: locationForm.children[2].value}
     fetch(`${BASE_URL}/${this.path}/${id}`, 
     { 
        method: "PATCH", 
        headers: { "Content-type": "application/json"  , "Accept": "application/json"
       }, 
       body: JSON.stringify(locationParams)
     }
    )
   .then(function(response) {
      return response.json()
    })
   .then(function(data) {
      Locations.renderEditLocation(data)
      locationForm.children[2].value = ''
    })
   .catch(error =>{console.log(error)})

   }
           
}


