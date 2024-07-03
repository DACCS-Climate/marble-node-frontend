//Node admin sets nodeURL for login
const nodeURL = "https://redoak.cs.toronto.edu/"
function login(){
    const username = document.getElementById("userName");
    const password = document.getElementById("userPassword");

    const nodeSignin = nodeURL + "magpie/signin"

    const request = new XMLHttpRequest();
    request.open("POST", nodeSignin);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(
        JSON.stringify(
            {
                "user_name": username,
                "password": password
            }
        )
    );

}