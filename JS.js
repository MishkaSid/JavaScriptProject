`use strict`

document.getElementById("search").addEventListener("input", search);

const users=
[{
   name: "yosi",
   phone: "0521648784",
   email: "yosiyoshi@gmail.com",
   address: "Nahariya"
   },
   {
   name: "misha",
   phone: "0587539512",
   email: "mishasider@gmail.com",
   address: "Nahariya"
   },
   {
   name: "nikita",
   phone: "0521598753",
   email: "nikitamohammad@gmail.com",
   address: "Krayot"
   }
];
render();
function render(usersList)//function renders the array of contacts 
{

   console.log("rendered")
   if (usersList == undefined){
      usersList = users
   }

   usersList.sort((a, b) => a.name.localeCompare(b.name));

let f ="";
usersList.forEach((elem,index)=>{
 f += `<container class="TableRow">
        <div><p class="photo"><img class="photo" src="icons/user.png" alt="photo"></p></div>
        <div><p class="name">${elem.name}</p></div>
        <div><p class="phone">${elem.phone}</p></div>
        <div><p class="elem">
            <button class="buttonTrash" onclick="OnClickTrash(${index})"><img class="trash" src="icons/trash.png" alt="delete"></button>
            <button class="buttonEdit" onclick=OpenPopupEdit(${index})><img class="edit" src="icons/editing.png" alt="edit"></button>
            <button class="buttonInfo" onclick="OnClickInfo(${index})"><img class="info" src="icons/info.png" alt="info"></button>
        </p></div>
    </container>`;
   })
   
const container = document.getElementsByClassName("TableContainer")[0];
container.innerHTML="";
   // Create a temporary element to hold the HTML string
   const tempDiv = document.createElement('div');
   tempDiv.innerHTML = f;
   // Append each child of the temporary element to the target container
   while (tempDiv.firstChild) {
       container.appendChild(tempDiv.firstChild);
   }
}

let userEditI;

function OpenPopupEdit(index)//function opens popup 
 {
   let popup = document.getElementById('popupEdit');
   popup.style.display = "block";

   userEditI =index;

   const existsUser = users[index]

   if (!existsUser){
      alert('bug')
      return
   }

   popup.querySelector("#name").value = existsUser.name
   popup.querySelector("#phone").value = existsUser.phone
   popup.querySelector("#email").value = existsUser.email
   popup.querySelector("#address").value = existsUser.address
   
}

function OpenPopup()//function opens popup 
 {
   let popup = document.getElementById('popupAdd');
   popup.style.display = "block";

}

function add() //function adds contact to array using popup
{
   closePopupEdit();
   const popup = document.getElementById("popupAdd");
let user = 
{
    name:popup.querySelector("#name").value,
    phone:popup.querySelector("#phone").value.trim(),
    email:popup.querySelector("#email").value.trim(),
    address:popup.querySelector("#address").value
}


if(checkUser(user)){ //if all parameters are met only then may we add contact
   users.push(user);
   //closes popup after adding contact
   render();
   closePopup();
   
   name:popup.querySelector("#name").value = "";
   phone:popup.querySelector("#phone").value = "";
   email:popup.querySelector("#email").value = "";
   address:popup.querySelector("#address").value = "";
 
   }

}

function OnClickInfo(index) {
   const div = document.getElementById("popupInfo");
   const user = users[index]; // Gets user data from "users" array

   // Construct the information HTML
   let info = `<button class="closeBtn" onclick="closePopupInfo()">×</button>
               <p>Name: ${user.name}</p>
               <p>Phone: ${user.phone}</p>
               <p>Email: ${user.email}</p>
               <p>Address: ${user.address}</p>`;

              
   div.innerHTML = info; // Update the innerHTML of the div with the info
   div.style.display = "block"; // Display the div as flex
   
   console.log("Displayed info for user: ", user);
}

function OnClickEdit() {
   closePopupInfo();
   closePopup();
   if (userEditI == undefined){

      alert('bug')
      return
   }

   let popup = document.getElementById('popupEdit');

   let user = 
   {
       name: popup.querySelector("#name").value,
       phone:popup.querySelector("#phone").value.trim(),
       email:popup.querySelector("#email").value.trim(),
       address:popup.querySelector("#address").value
   }
       
   users[userEditI] = user
    

    closePopupEdit();
   render();

}

function OnClickTrash(index) //function deletes contact from array
{
   let result = confirm("are you sure you want to delete?");
   if(result == true)
   {
      users.splice(index, 1);
      render();//render is used to refresh the array after deleting contact
   }
}

function closePopupEdit(){
   let popup = document.getElementById('popupEdit');
   popup.style.display = "none";
}

function closePopupInfo(){
   let div = document.getElementById("popupInfo");
   div.style.display = "none";
}
function closePopup(){
   let popup = document.getElementById('popupAdd');
   popup.style.display = "none";
}

function deleteAll(){
   let result = confirm("are you sure you want to delete all?");
   if(result == true)
   {
      users.splice(0, users.length);
      render();
   }
}
function checkUser(user) {
   
   if (!user.name){
      alert('enter name')
      return false;
   }
   if (users.find((elem) => elem.name == user.name)){
      alert('this name already exists')
      return
   }
   
   if (!user.phone||user.phone.length != 10){
      alert('enter valid phone number')
      return false;
   }
   if (users.find((elem) => elem.phone == user.phone)){

      alert('this phone number already exists')
      return
   }

   if (!user.email||user.email.includes("@") == false||user.email.includes(".com") == false){
      alert('enter valid email')
      return false;
   }
   if (users.find((elem) => elem.email == user.email)){

      alert('this email already exists')
      return
   }

   if (user.address==""){
      alert('enter address')
      return false;
   }

   return true;

}
function search(){
   let search = document.getElementById("search").value
   let result = users.filter((elem)=>elem.name.includes(search))
  
   render(result);
}
function darkMode() {
   console.log("dark mode");

   // Get the computed(the computer number for color) background color of the body
   const currentBgColor = window.getComputedStyle(document.body).backgroundColor;

   if (currentBgColor === 'rgb(255, 255, 255)') { //if white background turn black
       document.body.style.backgroundColor = '#586674';
       console.log('Background changed to black');
   } else if (currentBgColor === 'rgb(88, 102, 116)') { //if dark background turn white
       document.body.style.backgroundColor = 'white';
       console.log('Background changed to white');
   } else {
       console.log('Background is neither white nor black');
   }

}

