`use strict`


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
function render()//function renders the array of contacts 
{
let f ="";
users.forEach((elem,index)=>{
 f +=`<container class="TableRow">
        <div><p class="photo"><img class="photo" src="icons/user.png" alt="photo"></p></div>
        <div><p class="name">${elem.name}</p></div>
        <div><p class="phone">${elem.phone}</p></div>
        <div><p class="elem">
            <button class="buttonTrash" onclick="OnClickTrash(${index})"><img class="trash" src="icons/trash.png" alt="delete"></button>
            <button class="buttonEdit" onclick="OnClickEdit(${index})"><img class="edit" src="icons/editing.png" alt="edit"></button>
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

function OpenPopup()//function opens popup 
 {
   let popup = document.getElementById("popup");
   popup.style.display = "flex";

}
function add() //function adds contact to array using popup
{
let user = 
{
    name:popup.querySelector("#name").value,
    phone:popup.querySelector("#phone").value.trim(),
    email:popup.querySelector("#email").value.trim(),
    adress:popup.querySelector("#address").value
}
if(user.name != "" && user.phone != "" && user.email != "" && user.adress != "")
{
   let flag = true;
   if(!(user.phone.length == 10))//checks if the phone number is valid
      {alert("please enter a valid phone number"); flag = false;}
   if(!(user.email.includes("@"&&".com")))//checks if the email is valid
      {alert("please enter a valid email"); flag = false;}
   for(let i = 0; i < users.length; i++)//checks if the email or phone number already exists
   {
      if(users[i].email == user.email)
        { alert("this email already exists"); flag = false; }
      
      if(users[i].phone == user.phone)
        { alert("this phone number already exists"); flag = false; }
   }

   if(flag == true)//if all parameters are met only then may we add contact
      users.push(user);
}
else// if fields are empty pops a message
alert("please fill all the fields");

closePopup();//closes popup after adding contact
}

function closePopup() //function closes popup 
{
   popup.style.display = "none";
   render();
}

function OnClickInfo(users,index) {
   const div = document.getElementsByClassName("info");
   let info ="";
   
      info+=`<p>${users.user}</p>`;
   
   div[index].innerHTML = info;
   div[index].style.display = "flex";
   
     console.log(index);    
   
}

function OnClickEdit() {
    alert("no edit yet");
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
