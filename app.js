//For login====================================================================
let userlabel = document.getElementById("userlabel");
let passlabel = document.getElementById("passlabel");
let loginUserName = document.getElementById("username");
let loginPassword = document.getElementById("user_pass");
let logInButton = document.querySelector(".logInButton");
let loginAlertPrompt = document.querySelector(".loginAlert");

function loginShowAlert() {
  loginAlertPrompt.style.display = "initial";
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

// ======================================secure================================================

// let headersList = {
//   Accept: "*/*",
//   "User-Agent": "Thunder Client (https://www.thunderclient.io)",
//   "Content-Type": "application/json",
// };

// fetch("https://secure-restapi.herokuapp.com/auth", {
//   method: "POST",
//   body: '{\n    "username": "tushar",\n    "password": "R@m@_f0rtu9e$"\n}',
//   headers: headersList,
//   credentials: "same-origin",
// })
//   .then(function (response) {
//     return response.text();
//   })
//   .then(function (data) {
//     console.log(data);
//   });

let LogIn = async () => {
  event.preventDefault();
  if (validateCreds(signupUserName.value)) {
    var data = JSON.stringify({
      username: loginUserName.value,
      password: loginPassword.value,
    });

    var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var result = JSON.parse(this.responseText);
        console.log(this.getAllResponseHeaders());
        if (result.message === "username not found") {
          throw new Error("Invalid creds");
        }

        if (result["access_token"]) {
          localStorage.setItem("userToken", result["access_token"]);
          localStorage.setItem("csrfToken", result["csrf_token"]);
          localStorage.setItem("refreshToken", result["refresh_token"]);
          localStorage.setItem("userName", loginUserName.value);
          tempo();
          // location.replace("profile.html");
        } else {
          loginShowAlert();
        }
      }
    });
    xhr.open("POST", "https://secure-restapi.herokuapp.com/auth");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.withCredentials = true;
    xhr.send(data);
  } else {
    loginShowAlert();
  }
};

function tempo() {
  var data = JSON.stringify({
    card_type: "debit",
    card_no: "8645546469",
    cvv: "324",
    account_holder: "Tambi",
    phone_number: "8426988382",
    expiry_date: "1626250105758",
  });

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
    }
  });

  xhr.open("POST", "https://secure-restapi.herokuapp.com/card/tushar");
  xhr.setRequestHeader(
    "Authorization",
    `Bearer ${localStorage.getItem("userToken")}`
  );
  xhr.setRequestHeader("X-CSRFToken", localStorage.getItem("csrfToken"));
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.send(data);
}

// let LogIn = async () => {
//   event.preventDefault();
//   if (validateCreds(signupUserName.value)) {
//     var myHeaders = new Headers();

//     myHeaders.append("Content-Type", "application/json");

//     var raw = JSON.stringify({
//       username: loginUserName.value,
//       password: loginPassword.value,
//     });

//     var requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//       credentials: "same-origin",
//     };

//     fetch("https://secure-restapi.herokuapp.com/auth", requestOptions)
//       .then((response) =>response.json())
//       .then((result) => {
//         console.log(result);
//         if (result.message === "username not found") {
//           throw new Error("Invalid creds");
//         }

//         if (result["access_token"]) {
//           localStorage.setItem("userToken", result["access_token"]);
//           localStorage.setItem("csrfToken", result["csrf_token"]);
//           localStorage.setItem("refreshToken", result["refresh_token"]);
//           localStorage.setItem("userName", loginUserName.value);

//           // location.replace("profile.html");
//         } else {
//           loginShowAlert();
//         }
//       })
//       .catch((error) => {
//         if (error.message === "Invalid creds") {
//           loginShowAlert();
//         }

//         console.log("error", error);
//       });
//   } else {
//     loginShowAlert();
//   }
// };
// ==================================================================================

// ======================================not secure===================================

// let LogIn = async () => {
//   event.preventDefault();

//   var myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   // for secure--------------------------------------------------------------
//   // var raw = JSON.stringify({
//   // username: loginUserName.value,
//   // password: loginPassword.value,
//   // });
//   // ---------------------------------------------------------------------

//   var requestOptions = {
//     method: "GET",
//     // method: "POST",
//     // headers: myHeaders,
//     // body: raw,
//     redirect: "follow",
//   };

//   // fetch("https://sql-injection-restapi.herokuapp.com/auth", requestOptions)

//   fetch(
//     `https://sql-injection-restapi.herokuapp.com/login?username=${loginUserName.value}&password=${loginPassword.value}`,
//     requestOptions
//   )
//     .then((response) => response.json())
//     .then((result) => {
//       if (result.message === "username not found") {
//         throw new Error("Invalid creds");
//       }

//       clearCookie();
//       // if (result["access_token"]) {
//       // setCookie("userToken", result["access_token"], 1);
//       setCookie("userName", loginUserName.value, 1);
//       location.replace("profile.html");
//       // } else {
//       // loginShowAlert();
//       // }
//     })
//     .catch((error) => {
//       if (error.message === "Invalid creds") {
//         loginShowAlert();
//       }
//       console.log("error", error);
//     });
// };
// ==================================================================================

logInButton.addEventListener("click", LogIn);

//For signup===========================================================

let passlabelSignup = document.getElementById("passlabelSignup");
let handlelabel = document.getElementById("handlelabel");
let signupUserName = document.getElementById("userhandle");
let signupPassword = document.getElementById("user_passSignup");
let signupButton = document.querySelector(".SignUpButton");
let signupAlertPrompt = document.querySelector(".signupAlert");
let signupPrompt = document.querySelector(".signupPrompt");

function CheckPassword(inputTxt) {
  console.log(typeof inputTxt);
  var pass =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
  if (inputTxt.match(pass)) {
    return true;
  } else {
    return false;
  }
}

function signUpShowAlert(message) {
  signupAlertPrompt.children[0].innerText = message;
  signupAlertPrompt.style.display = "flex";
}

function signUpShowPrompt() {
  signupPrompt.style.display = "initial";
}

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
  //===================================== secure broken auth================================
  if (
    CheckPassword(signupPassword.value) &&
    validateCreds(signupUserName.value)
  ) {
    //=============================================================================================
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

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
      // ==================================secure===================================
      "https://secure-restapi.herokuapp.com/user/register",
      // =====================================================================

      // ==================================not secure===================================
      // "https://sql-injection-restapi.herokuapp.com/user/register",
      // =========================================================================
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.message === "username is in use") {
          throw new Error("username already taken");
        }
        if (result.message === "password too weak") {
          throw new Error("weak password");
        } else {
          signUpShowPrompt();
        }
      })
      .catch((error) => {
        if (error.message === "username already taken") {
          signUpShowAlert("Username already exists");
        }
        if (error.message === "weak password") {
          signUpShowAlert(
            "Password must be atleast 8 characters, contain at least one numeric digit and a special character"
          );
        }
        console.log("error", error);
      });

    //==========================================secure broken auth=============================================
  } else {
    signUpShowAlert(
      "Password must be atleast 8 characters, contain at least one numeric digit and a special character"
    );
  }
  //======================================================================================================
};
signupButton.addEventListener("click", SignUp);

//To make signup appear-------------------------------------------------------------

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

//credential validation ==================================================

function validateCreds(str) {
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  if (format.test(str)) {
    return false;
  } else {
    return true;
  }
}
