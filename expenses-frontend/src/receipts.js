import {Fetching} from './fetching'
import {Items}  from './items'

export class Receipts {
    constructor(data){
        this.data = data
    }


  

   static deleteReceiptEventListener = (button,receiptElement) => {
        button.addEventListener('click',e => {
                e.preventDefault()
                const  fetching = new Fetching ('receipts')
                 fetching.deleteFetch = receiptElement.id.split('_')[1] 
                 receiptElement.remove()
            })
    }

    static itemsInputEventListener(element,receiptElement,data){
        element.addEventListener('click', e =>{
            const item = new Items(data)
            item.itemInputs = receiptElement
            
        })
    }


    renderProjectAfterCreated(){
        receipt(this.data)
    }

    set receiptRender(data){
       
        let locations = data.locations
        let receipts = data.receipts   
        locations.forEach(function (location){
            receipts.forEach(function(receipt){ 
            if (location.id === receipt.location_id){
               Receipts.receipt(receipt)
            }
          })
         
        })      
    }

    set addReceipt(element){
      const fetching = new Fetching('receipts')
      fetching.createProject = element
      element.value = ''

    }


//no como yo lo pense
    //  receiptHelper(data){
    //     let location = document.getElementById(`location_${data.location_id}`)  
    //     let receiptDiv = document.createElement('div')
    //     let receipt = document.createElement('p')
    //     let itemsForm = document.createElement('form')
    //     receiptDiv.id = `receipt_${data.id}`
    //     receiptDiv.className = "receipt"
    //     receipt.innerHTML = `${data.project_name} <button>Delete</button`
    //     receipt.children[0].className = "delete"
    //     receiptDiv.appendChild(receipt)
    //     itemsForm.id = `form_${data.id}`
    //     location.children[1].appendChild(receiptDiv)
    //     let button = document.createElement('button')
    //     button.textContent = "Add Item"
    //     button.id = `button_${data.id}`
    //     button.className = 'receipt_button'
    //     receiptDiv.appendChild(button)
    //     receiptDiv.appendChild(itemsForm)
    //    }

    static receipt(data){
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

        Receipts.itemsInputEventListener(button,receiptDiv,data)

        Receipts.deleteReceiptEventListener(receipt.children[0],receiptDiv)
    }


    set renderProjectAfterCreated(data){
        Receipts.receipt(data)
    }


   

  

}