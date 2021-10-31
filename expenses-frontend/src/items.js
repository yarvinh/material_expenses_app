import { Fetching } from "./fetching"
export class Items {


    itemFormEventListener(form){
      form.addEventListener('submit',e => {
        e.preventDefault()
          console.log(e.target.id.split("_")[1])      
          let itemName = e.target.children[1].value
          let itemPrice = e.target.children[3].value
          let  receiptId = e.target.id.split("_")[1]

          const itemParams = {item_name: itemName, price: itemPrice, receipt_id: receiptId }
          const fetching = new Fetching('items')
          fetching.createItem = itemParams

          e.target.children[1].value = ''
          e.target.children[3].value = ''
          e.target.id.split("_")[1] = ''
      })
    }



    static deleteEventListener(button,itemListTag){
       button.addEventListener('click',e =>{
        const fetching = new Fetching('items')
        fetching.deleteFetch = itemListTag.id.split('_')[1]
        Items.substract(itemListTag)
        console.log(itemListTag)
        itemListTag.remove()
        
       })
    }


    set itemInputs(receiptDiv){
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

          this.itemFormEventListener(itemForm)
        }    
    
    }


    static items(receipt,item){
        let receiptList = document.getElementById(`list_${receipt.id}`)
        let itemL= document.createElement('li')
        itemL.id = `item_${item.id}`
        itemL.innerHTML = `${item.item_name} = ${item.price}  <button>X</button>`
        itemL.children[0].className = "delete"
        receiptList.appendChild(itemL)
        Items.deleteEventListener(itemL.children[0],itemL)
        
    }

    static renderItemList(id){
        let receiptDiv = document.getElementById(`receipt_${id}`)
        let itemsList = document.createElement('ol')
        itemsList.id = `list_${id}`
        receiptDiv.appendChild(itemsList)
    }
    



    set itemsRender(data){
        let receipts = data.receipts
        let items = data.items
        receipts.forEach(function (receipt){
        let receiptDiv = document.getElementById(`receipt_${receipt.id}`)
        let totalP = document.createElement('p')
        totalP.id = `totalp_${receipt.id}`
        Items.renderItemList(receipt.id)
        let total = 0
        items.forEach(function(item){ 
          if (receipt.id === item.receipt_id){  
            total += parseInt(item.price)
            Items.items(receipt,item)
          }
    
        })
        totalP.textContent = `Total = ${total}`
        receiptDiv.appendChild(totalP)  
       })      
    }

    static renderItemAfterCreated(data){
        Items.items(data.receipt,data)
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



    static substract(data){
        const li = data
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


}