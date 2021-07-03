//For login
let userlabel = document.getElementById("userlabel");
let passlabel = document.getElementById("passlabel");
let loginUserName = document.getElementById("username");
let loginPassword = document.getElementById("user_pass");
let logInButton = document.querySelector(".logInButton");
let alertPrompt = document.querySelector(".alert");

function showAlert() {
  alertPrompt.style.display = "initial";
}

loginUserName.addEventListener("focus", () => {
  userlabel.style.top = 0;
  userlabel.style.opacity = 1;
});
loginUserName.addEventListener("focusout", () => {
  userlabel.style.top = "40px";
  userlabel.style.opacity = 0;
});
loginPassword.addEventListener("focus", () => {
  passlabel.style.top = 0;
  passlabel.style.opacity = 1;
});
loginPassword.addEventListener("focusout", () => {
  passlabel.style.top = "40px";
  passlabel.style.opacity = 0;
});

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function checkCookie(cname) {
  let username = getCookie(cname);
  if (username != "") {
    return true;
  } else {
    return false;
  }
}

function clearCookie() {
  var allCookies = document.cookie.split(";");
  for (var i = 0; i < allCookies.length; i++)
    document.cookie = allCookies[i] + "=;expires=" + new Date(0).toUTCString();
  console.log("cookie cleared", document.cookie);
}

let LogIn = async () => {
  event.preventDefault();

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    username: loginUserName.value,
    password: loginPassword.value,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://sql-injection-restapi.herokuapp.com/auth", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      clearCookie();
      if (result["access_token"]) {
        setCookie("userToken", result["access_token"], 1);
        setCookie("userName", loginUserName.value, 1);

        location.replace("profile.html");
      } else {
        showAlert();
      }
    })
    .catch((error) => console.log("error", error));
};
logInButton.addEventListener("click", LogIn);

//For signup

let passlabelSignup = document.getElementById("passlabelSignup");
let handlelabel = document.getElementById("handlelabel");
let signupUserName = document.getElementById("userhandle");
let signupPassword = document.getElementById("user_passSignup");
let signupButton = document.querySelector(".SignUpButton");

signupUserName.addEventListener("focus", () => {
  handlelabel.style.top = 0;
  handlelabel.style.opacity = 1;
});
signupUserName.addEventListener("focusout", () => {
  handlelabel.style.top = "40px";
  handlelabel.style.opacity = 0;
});

signupPassword.addEventListener("focus", () => {
  passlabelSignup.style.top = 0;
  passlabelSignup.style.opacity = 1;
});
signupPassword.addEventListener("focusout", () => {
  passlabelSignup.style.top = "40px";
  passlabelSignup.style.opacity = 0;
});

let SignUp = async () => {
  event.preventDefault();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Access-Control-Allow-Origin", "*");

  var raw = JSON.stringify({
    username: signupUserName.value,
    password: signupPassword.value,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://sql-injection-restapi.herokuapp.com/user/register",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
signupButton.addEventListener("click", SignUp);

//To make signup appear

let createAccLink = document.getElementById("createAccLink");
let signup = document.querySelector(".signup");

if (window.innerWidth >= 1050) {
  createAccLink.addEventListener("click", () => {
    signup.style.width = "35vw";
    signup.style.margin = "5vw";
  });
} else {
  createAccLink.addEventListener("click", () => {
    signup.style.height = "100%";
    signup.style.margin = "5vw";
    signup.style.width = "95vw";
  });
}

// https://sql-injection-api.herokuapp.com/user/register
