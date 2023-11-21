function itemTemplate(item) {
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div>
      <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
      <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`
}

//Initial Page Load Render
let myHTML = items.map(function(item) {
    return itemTemplate(item)
}).join("")

document.getElementById("item-list").insertAdjacentHTML("beforeend", myHTML)


//create item
let createField = document.getElementById("create-field")
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault()
    axios.post("/create-item", {text: createField.value}).then(function(response) {
        //create an HTML template here
        document.getElementById("item-list").insertAdjacentHTML("beforeend", itemTemplate(response.data))
        createField.value = ""
        createField.focus()
    }).catch(function() {
        console.log("Successfully Deleted")
    })
})




document.addEventListener("click", function(e) {
        //Delete section
        if(e.target.classList.contains("delete-me")) {
            if(confirm("Do You Really Want To Delete This Data")) {
                axios.post("/delete-item", {id: e.target.getAttribute("data-id")}).then(function() {
                    e.target.parentElement.parentElement.remove()
                }).catch(function() {
                    console.log("Successfully Deleted")
                })
            }
        }


        //Update section
        if(e.target.classList.contains("edit-me")) {
           let userInput = prompt("Make a new entry", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
           if(userInput) {
            axios.post("/update-me", {text: userInput, id: e.target.getAttribute("data-id")}).then(function() {
                e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
               }).catch(function() {
                    console.log("waiting for update")
               })
           }
        }
})
