import {Render} from './render'
const BASE_URL = "http://localhost:3000"
const locationInput = document.getElementById("location_form")

   export class Fetching {
      constructor(baseUrl){
         this.baseUrl = baseUrl
      }

   get userFetch(){
      return fetch(`${this.baseUrl}/users/1`)
         .then(response => {
          return response.json()
         })
         .then(data => {
            const render = new Render(data)  
            render.renderUser
            locationInput.children[1].id = data.id
            render.locationRender
            render.receiptRender
            render.itemsRender
         }).catch(e =>{
            console.log(e)
      })
   }

      set createLocation(e){
         const address = e.target.children[1].value
         const user_id = e.target.children[1].id
             const locationParams = {address: address, user_id: user_id}
            fetch(`${this.baseUrl}/locations`, 
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
               const render = new Render(data)  
               render.renderLocationAfterCreate
             }
           })
           .catch(error =>{console.log(error)})
           e.target.children[1].value = ""
      }

      set createProject(e){
        if (e.code === 'Enter'){
            const projectParams = {project_name: e.target.value,location_id: e.target.id}
            fetch(`${this.baseUrl}/receipts`, 
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
             console.log(data.id)
            if (data.id){
              Render.renderProjectAfterCreated(data) 
            } 
           })
           .catch(error =>{console.log(error)})
          e.target.value = ""
        } else {
         }
      }

      set createItem(e){
        let itemName = e.children[1].value
        let itemPrice = e.children[3].value
        let  receiptId = e.id.split("_")[1]
 
        const itemParams = {item_name: itemName, price: itemPrice, receipt_id: receiptId }
        fetch(`${this.baseUrl}/items`, 
        { 
           method: "post", 
           headers: { "Content-type": "application/json"  , "Accept": "application/json"
          }, 
          body: JSON.stringify(itemParams)
        }
       )
      .then(function(response) {
         return response.json()
       })
      .then(function(data) {
         if(data.id){
            Render.renderItemList(data.receipt_id)
            Render.renderItemAfterCreated(data)
         }
       })
      .catch(error =>{console.log(error)})
      e.children[1].value = ""
      e.children[3].value = ""
      e.id.split("_")[1] = ""
 }

  set deleteLocation(location){
    let location_id = location.id.split('_')[1]
    
    fetch(`${BASE_URL}/locations/${location_id}`, 
    { 
       method: "DELETE", 
    }
 ) 
  location.remove()
}


 set deleteItem(DeleteButton){
   let parent = DeleteButton.parentElement
   let item_id = parent.id.split('_')[1]
   fetch(`${BASE_URL}/items/${item_id}`, 
   { 
      method: "DELETE", 
   }
) 
  parent.remove()
 }

 set deleteReceipt(receipt){
      let receiptId = receipt.id.split('_')[1]
      fetch(`${BASE_URL}/receipts/${receiptId}`, 
   { 
      method: "DELETE", 
   }
) 
    receipt.remove()
  }

  set editLocation(locationForm){
     
     let id = locationForm.id.split("_")
     id = id[id.length - 1]
     console.log(id)

     const locationParams = { address: locationForm.children[2].value}

     fetch(`${this.baseUrl}/locations/${id}`, 
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
      Render.renderEditLocation(data)
      locationForm.children[2].value = ''
    })
   .catch(error =>{console.log(error)})

   }
           
}


