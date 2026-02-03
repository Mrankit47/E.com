let mens = document.getElementById("mens");
let womens = document.getElementById("womens");
let blogs = document.getElementById("blogs");
let reviews = document.getElementById("reviews");
let contacts = document.getElementById("contacts");

mens.addEventListener("click" ,function(){
    mens.style.color="blueviolet"
    womens.style.color="black"
    blogs.style.color="black"
    reviews.style.color="black"
    contacts.style.color="black"
})
womens.addEventListener("click" ,function(){
    mens.style.color="black"
    womens.style.color="blueviolet"
    blogs.style.color="black"
    reviews.style.color="black"
    contacts.style.color="black"
})
blogs.addEventListener("click" ,function(){
    mens.style.color="black"
    womens.style.color="black"
    blogs.style.color="blueviolet"
    reviews.style.color="black"
    contacts.style.color="black"
})
reviews.addEventListener("click" ,function(){
    mens.style.color="black"
    womens.style.color="black"
    blogs.style.color="black"
    reviews.style.color="blueviolet"
    contacts.style.color="black"
})
contacts.addEventListener("click" ,function(){
    mens.style.color="black"
    womens.style.color="black"
    blogs.style.color="black"
    reviews.style.color="black"
    contacts.style.color="blueviolet"
})
let login = document.getElementById("login");
login.addEventListener("click",function(){
    document.querySelector(".loginpage").style.display="block"
})
let loged = document.getElementById("loged");

loged.addEventListener("click",function(){
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    if(email.value == "" || password.value ==""){
        alert("Please Enter your Email or Password")
    }else{
        alert("You are loged In")
        document.querySelector(".loginpage").style.display="none"
    }
})

let submit = document.getElementById("submit");
submit.addEventListener("click" , function(){
    let name = document.getElementById("name");
    let password = document.getElementById("pass");
    if(name.value == "" || password == ""){
        alert("Please Enter Your Name and Password");
    }
    else{
        alert(name.value + "  Thanks for Connecting Us");
    }
})
