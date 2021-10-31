import { Fetching } from "./fetching"
import { Receipts } from "./receipts"


export class Locations {

    constructor(data){
        this.data = data
    }

    /////////////////////////////////////////
    //new function
    toggleLocationAcordion=(element)=>{
        if(element.className === "location_accordion") {
           Locations.hideElements(element)
        } else if(element.className === "location_accordion active"){
           Locations.showElements(element,"location_accordion")
        }
    }
//new function
    locationEventListener=(element)=>{     
        element.addEventListener('click',(e)=> this.toggleLocationAcordion(element))
    }

    //new function
    editEventListener=(element) => {
    
        element.addEventListener('click',(e)=> {
            e.preventDefault()
            this.toggleEditAcordion(element)
        })
    }
   // new function
    toggleEditAcordion=(element)=>{
        if(element.className === "edit"){ 
            Locations.hideElements(element)
            element.textContent = "Save"
        } else if(element.className === "edit active"){
            Locations.showElements(element,"edit")
            element.textContent = "Edit"
            const fetching = new Fetching("locations")
            fetching.editLocation = element.parentNode
        }
    }

    addReceiptEventListener = (element)=>{
        element.addEventListener("keyup",(e)=> {
            e.preventDefault()
            if(e.code === 'Enter'){
              const receipt = new Receipts(this.data)
              receipt.addReceipt = element
            }
        })
    }

    deleteEventListener = (element,locationElement)=>{
        
        element.addEventListener('click',(e)=> {
            const  fetching = new Fetching ('locations')
            fetching.deleteFetch = locationElement.id.split('_')[1]
            locationElement.remove()
        })
    }
     
    
/////////////////////////////////////////////////


    static locationInputEvent(locationInput,fetching){
        locationInput.addEventListener('submit',e => {
           e.preventDefault()
           fetching.createLocation = e
   
        })
    }

    // locationsEvent(locations,fetching){
    //  locations.addEventListener('click',e => {
    //     // Locations.events(e,fetching)
    //  })   
    // }
    
    // addLocationInputEvent(locationInputElement,fetching){
    //     locationInput.addEventListener('submit',e => {
    //         e.preventDefault()
      
    //         fetching.createLocation = e
    // }

// ///////////////////////////////////
    get renderUser(){
        const welcome = document.createElement('h3')
        welcome.textContent = `Welcome ${this.data.name}`
        header.appendChild(welcome)
        header.className = "header"
    }
     
  
      
    get locationRender() {
       
        this.data.locations.forEach((l) => {
          this.location(l)
        })             
    }


      get renderLocationAfterCreate(){
        this.location(this.data)
    }

    //   add = (button,p)=>{
    //      button.addEventListener('click',(e)=>{
    //           p.textContent = parseInt(p.textContent) + 1
    //      })
    //   }


     location(data){
        //  let incrementButton = document.createElement('button')
        //  incrementButton.textContent = 'like'

        //   let p = document.createElement('p')
         
        //  p.textContent = 0
        let locationDiv = document.createElement('div')
        let locationChildren = document.createElement('div')
        let label = document.createElement('label')
        let addReceiptInput = document.createElement('input')
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
        //
        addReceiptInput.id = data.id
        //
        addReceiptInput.className = 'receipt_input'
        locations.appendChild(locationDiv)

        const address = document.createElement('button')
        address.textContent = data.address
        address.className = "location_accordion"

        locationDiv.appendChild(address)
        locationDiv.appendChild(locationChildren)
        //change to normal
        this.editInput(locationChildren)

        locationChildren.appendChild(deleteLabel) 
        ///
        locationChildren.appendChild(deleteL)
        locationChildren.appendChild(br1)
        locationChildren.appendChild(br2)
        locationChildren.appendChild(label)

        // locationDiv.appendChild(incrementButton )
        //
        locationChildren.appendChild(addReceiptInput)
        // locationDiv.appendChild(p)

        // this.add(incrementButton,p)
        // call new  function
         this.locationEventListener(address)
         this.addReceiptEventListener(addReceiptInput)
         this.deleteEventListener(deleteL,locationDiv)
        
 
    }





    static renderEditLocation(data){
        const location = document.getElementById(`location_${data.id}`)
        location.children[0].textContent = data.address
    }


    editInput(locationDiv){
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
        //call new function
        this.editEventListener(editButton)
    }

   
    static hideElements(element){
        element.nextSibling.className = "display_location"
        element.classList.toggle("active")
    }


    static showElements(element,classN){
        element.nextSibling.className = "hide_location"
        element.className = classN

    }
      

}