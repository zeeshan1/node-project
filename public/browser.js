const getForm = document.querySelector("#createForm");
const getfield = document.querySelector("#createField");
const getListContainer = document.querySelector("#ListContainer");
let onLoad = items.map(item => {
    document.getElementById("ListContainer").insertAdjacentHTML("beforeend", createNewList(item))
})
function createNewList(item){
  return ` <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div>
      <button data-id=${item._id} class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
      <button data-id=${item._id} class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`
    
}
getForm.addEventListener('submit', function(event){
    event.preventDefault();
    
    axios.post('/create-item', {text: getfield.value}).then(res => {        
        document.getElementById("ListContainer").insertAdjacentHTML("beforeend", createNewList(res.data))
        getfield.value = ''
    }).catch()
})

document.addEventListener('click', (event)=>{
    if(event.target.classList.contains('edit-me')){
        let labelValue = event.target.parentElement.parentElement.querySelector('.item-text').innerText;
        let insertValue = prompt('Enter New Value', labelValue);
        let id = event.target.dataset.id
        if(insertValue || insertValue!==insertValue){
            axios.post('/update-item', {item: insertValue, id: id})
            .then(res => {
                console.log(res.data)
                event.target.parentElement.parentElement.querySelector('.item-text').innerText = insertValue;
            })
            .catch()
        }
    }
    if(event.target.classList.contains('delete-me')){
       let confirmation = confirm('Are you sure! you want to delete this item')
       let id = event.target.dataset.id;
       console.log(id)
       if(confirmation){
           axios.post('/delete-item', {id: id})
           .then(res => {
            console.log(res);
            event.target.parentElement.parentElement.remove()
           })
           .catch()
       }
    }
})