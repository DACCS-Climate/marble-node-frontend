//Remove when done
const nodeURL = "https://redoak.cs.toronto.edu/";

document.addEventListener("DOMContentLoaded", function () {
    var signInButton =  document.getElementById("buttonSignIn");
    signInButton.addEventListener('click', (event) => {
        login();
    })

    //Set contact email for node admin on the error message when login is incorrect.  Allows user to contact node
    //admin to create account
    setNodeAdminEmail();


    // Get the modal
var modal = document.getElementById("myModalCustom");

// Get the button that opens the modal
var btn = document.getElementById("buttonSelectProvider");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



})

function login(){
    const usernameInput = document.getElementById("userName").value;
    const passwordInput = document.getElementById("userPassword").value;

    const nodeSignIn = nodeURL + "magpie/signin";
    const magpieHome = nodeURL + "magpie";
    let loginErrorMessage = document.getElementById("loginError");

    //Replace nodeSignIn in fetch with endpoint when done
    //"/magpie/signin"
    fetch(nodeSignIn, {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json",
            },
        body: JSON.stringify({
            user_name: usernameInput,
            password: passwordInput
            })
        }).then(response => response.json()).then(json  => {

        try{
            if(json.code == 200){
            //Replace magpieHome with /magpie when done
            window.location.href = magpieHome;
        }

        }catch (error){
             throw new Error(error)
            loginErrorMessage.classList.toggle("login-error-visible");
        }



    })
}

function setNodeAdminEmail(){
    const githubURL = "{{ node_registry_url }}";
    let currentURL = window.location.href;
    let contactEmail = document.getElementById("nodeAdminEmail");


    fetch(githubURL).then(resp => resp.json()).then(json => {
        var node_keys = Object.keys(json);

        node_keys.forEach((key, index) => {
            if(key.links){
                key.links.forEach((link) =>{
                if(link.rel && link.rel === "service"){
                    if(link.href in currentURL){
                        console.log(link.href);
                        contactEmail.setAttribute("href", "mailto:" + link.href);
                    }

                }
            })
            }



        })

    })
}