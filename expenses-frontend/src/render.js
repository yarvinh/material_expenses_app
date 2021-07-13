 export class Render {
    constructor(data){
        this.data = data
    }

    get renderUser(){
        const welcome = document.createElement('h3')
        welcome.textContent = `Welcome ${this.data.name}`
        header.appendChild(welcome)
        header.className = "header"
    }
     
    get renderLocationAfterCreate(){
        Render.location(this.data)
    }
      
    get locationRender() {
        this.data.locations.forEach((l) => {
          Render.location(l)
        })             
    }
    
    static location(data){

        let locationDiv = document.createElement('div')
        let locationChildren = document.createElement('div')
        let label = document.createElement('label')
        let addInput = document.createElement('input')
        let deleteLabel = document.createElement('label')
        let deleteL = document.createElement('button')
        let br1 = document.createElement("br")
        let br2 = document.createElement("br")

        locationChildren.className = "hide_location"
        locationDiv.className = "location"
        locationDiv.id = `location_${data.id}`
        label.textContent = "Add Receipt:"
        deleteLabel.textContent = "Delete this location:"
        deleteL.textContent = 'Remove'
        deleteL.className = "delete"
        addInput.id = data.id
        addInput.className = 'receipt_input'
        locations.appendChild(locationDiv)

        const address = document.createElement('button')
        address.textContent = data.address
        address.className = "location_accordion"

        locationDiv.appendChild(address)
        locationDiv.appendChild(locationChildren)
        Render.editInput(locationChildren)

        locationChildren.appendChild(deleteLabel) 
        locationChildren.appendChild(deleteL)
        locationChildren.appendChild(br1)
        locationChildren.appendChild(br2)
        locationChildren.appendChild(label)
        locationChildren.appendChild(addInput)
        
      
    }


      // set renderLocationAfterCreate(data){
      //   location(data)
      // }

      get receiptRender(){
        let locations = this.data.locations
        let receipts = this.data.receipts
        locations.forEach(function (location){
            receipts.forEach(function(receipt){ 
            if (location.id === receipt.location_id){
                Render.renderProjectAfterCreated(receipt)
            }
          })
         
         })      
      }

    static renderProjectAfterCreated(data){
        let location = document.getElementById(`location_${data.location_id}`)
        
        let receiptDiv = document.createElement('div')
        let receipt = document.createElement('p')
        let itemsForm = document.createElement('form')
        receiptDiv.id = `receipt_${data.id}`
        receiptDiv.className = "receipt"
        receipt.innerHTML = `${data.project_name} <button>Delete</button`
        receipt.children[0].className = "delete"
        receiptDiv.appendChild(receipt)
         itemsForm.id = `form_${data.id}`
        location.children[1].appendChild(receiptDiv)
        let button = document.createElement('button')
        button.textContent = "Add Item"
        button.id = `button_${data.id}`
        button.className = 'receipt_button'
        receiptDiv.appendChild(button)
        receiptDiv.appendChild(itemsForm)
   }
   
   static itemInputs(receiptDiv){
    let itemForm =  receiptDiv.children[2]
    if (itemForm.children.length <= 4){
      let itemNameLabel = document.createElement('label')
      itemNameLabel.textContent = "Item Name:"
      itemNameLabel.className = "item_input"
      let itemName = document.createElement('input')
      itemName.className = "item_input"
      itemForm.appendChild(itemNameLabel)
      itemForm.appendChild(itemName)

      let itemPriceLabel = document.createElement('label')
      itemPriceLabel.textContent = 'Price:'
      itemPriceLabel.className = "item_input"
      let itemPrice = document.createElement('input')
      itemPrice.className = "item_input"
      itemForm.appendChild(itemPriceLabel)
      itemForm.appendChild(itemPrice)
      let button = document.createElement('button')
      button.textContent = "Submit"
      button.className = 'item_button'
      itemForm.appendChild(button)
    }
   
    

}

static renderItemList(id){
    let receiptDiv = document.getElementById(`receipt_${id}`)
    let itemsList = document.createElement('ol')
    itemsList.id = `list_${id}`
    receiptDiv.appendChild(itemsList)
  }

  static renderItemAfterCreated(data){
    Render.items(data.receipt,data)
    const totalPh = document.getElementById(`totalp_${data.receipt_id}`)
    const receipt = document.getElementById(`receipt_${data.receipt_id}`)
    let itemPrice = parseInt(data.price)
    if (totalPh){
      let total = parseInt(totalPh.textContent.split(" ")[2])
      totalPh.textContent = `Total = ${total + itemPrice}`
    }else{
      const totalP = document.createElement('p')
      totalP.id = `totalp_${data.receipt_id}`
      totalP.textContent = `Total = ${itemPrice}`
      receipt.appendChild(totalP)
    }
  }
  
  static items(receipt,item){
      let receiptList = document.getElementById(`list_${receipt.id}`)
      let itemL= document.createElement('li')
      itemL.id = `item_${item.id}`
      itemL.innerHTML = `${item.item_name} = ${item.price}  <button>X</button>`
      itemL.children[0].className = "delete"
      receiptList.appendChild(itemL)
      
  }
  
  get itemsRender(){
      let receipts = this.data.receipts
      let items = this.data.items
      receipts.forEach(function (receipt){
      let receiptDiv = document.getElementById(`receipt_${receipt.id}`)
      let totalP = document.createElement('p')
      totalP.id = `totalp_${receipt.id}`
      Render.renderItemList(receipt.id)
      let total = 0
      items.forEach(function(item){ 
        if (receipt.id === item.receipt_id){  
          total += parseInt(item.price)
          Render.items(receipt,item)
        }
  
      })
      totalP.textContent = `Total = ${total}`
      receiptDiv.appendChild(totalP)  
     })      
  }

   static substract(data){
      const li = data.parentNode
      let itemPrice = data.parentNode.innerHTML.split(" ")
      itemPrice = itemPrice[itemPrice.length - 4]
      let totalP = li.parentNode.nextSibling
      let total = parseInt(li.parentNode.nextSibling.textContent.split(" ")[2])
      
      if (total){
         totalP.textContent = `total = ${total - itemPrice}`
      } else {
        totalP.textContent = `total = 0`
      }
     

   }

   static hideElements(element){
    element.nextSibling.className = "display_location"
    element.classList.toggle("active")
   }
   static showElements(element,classN){
     element.nextSibling.className = "hide_location"
     element.className = classN
  }

static editInput(locationDiv){
  let id = locationDiv.parentNode.id.split("_")
  id = id[id.length - 1]
  let editButton = document.createElement("button")
  let editLabel = document.createElement('label')

  editLabel.textContent = "Edit location:"
  editButton.className = "edit"
  editButton.textContent = "Edit"
  const editForm = document.createElement('form')
  editForm.id = `edit_form_${id}`
  const input = document.createElement("input")
  input.className = "hide_location"
  locationDiv.appendChild(editForm)
  editForm.appendChild(editLabel)
  editForm.appendChild(editButton)
  editForm.appendChild(input) 
}

static renderEditLocation(data){
  const location = document.getElementById(`location_${data.id}`)
  location.children[0].textContent = data.address
}



}
