const btnSign = document.getElementById("btn-sign");


document.getElementById("btn-sign").addEventListener("click" , () => {
    //get the admin
    const adminInput = document.getElementById("input-admin");
    const adminNumber = adminInput.value;
    console.log(adminNumber);
    // get the password
    const passwordInput = document.getElementById("input-password");
    const passwordNumber= passwordInput.value;
    console.log(passwordNumber);
    
    // match the admin & password
    if(adminNumber === "admin" && passwordNumber === "admin123"){
        window.location.assign("./home.html")
    }else{
        alert("SignIn Failed")
    }

});