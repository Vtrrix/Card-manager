//cookie functions ========================================
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

let cardsDisplayArea = document.getElementById("cards");
let navName = document.querySelector("#nav h2");

navName.innerText = `Welcome, ${localStorage.getItem("userName")}`;

let logoutUser = () => {
  location.replace("index.html");
  localStorage.removeItem("userToken");
  localStorage.removeItem("userName");
  localStorage.removeItem("csrfToken");
  localStorage.removeItem("refreshToken");
};
document.getElementById("logout").addEventListener("click", logoutUser);

//get cards request methods------------------------------------------

let GetCards = async () => {
  var myHeaders = new Headers();
  //==================================== secure ==============================================
  myHeaders.append(
    "Authorization",
    `Bearer ${localStorage.getItem("userToken")}`
  );
  //============================================================================================

  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    //==================================== secure ==============================================
    `https://secure-restapi.herokuapp.com/card/${localStorage.getItem(
      "userName"
    )}`,
    //==================================================================================
    //==================================== not secure ==============================================
    // `https://sql-injection-restapi.herokuapp.com/card/${getCookie("userName")}`,
    //==================================================================================

    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      result.cards.map((card) => {
        let expdate = new Date(parseInt(card.expiry_date));
        cardsDisplayArea.innerHTML += `
        <div class="card">
          <div class="card__front card__part">
            <p class="card_numer">${
              //======================== secure XSS==============================================
              CheckInput(card.card_no)
                ? " "
                : //=================================================================================================
                  card.card_no
            }</p>
            <div class="card__space-75">
              <span class="card__label">Card holder</span>
              <p class="card__info">${
                //======================== secure XSS==============================================

                CheckInput(card.account_holder)
                  ? " "
                  : //=================================================================================================
                    card.account_holder
              }</p>
            </div>
            <div class="card__space-25">
              <span class="card__label">Expires</span>
              <p class="card__info">${("0" + (expdate.getMonth() + 1)).slice(
                -2
              )}/${expdate.getFullYear().toString().substr(-2)}</p>
            </div>
          </div>

          <div class="card__back card__part">
            <div class="card__black-line"></div>
            <div class="card__back-content">
              <div class="card__secret">
                <p class="card__secret--last">${
                  //======================== secure XSS==============================================
                  CheckInput(card.cvv)
                    ? " "
                    : //====================================================================================================
                      card.cvv
                }</p>
              </div>
            </div>
          </div>
        </div>
        `;
      });
    })
    .catch((error) => console.log("error", error));
};

GetCards();

// add card--------------------------------------------------------------

let formVisible = false;
let toggleAddCard = document.getElementById("showAddCard");
let addCardFormDiv = document.getElementById("addCard");
let closeForm = document.getElementById("closeForm");
let AddCardAlertPrompt = document.querySelector(".AddCardAlert");

function toggleForm() {
  if (formVisible) {
    addCardFormDiv.style.display = "none";
  } else {
    addCardFormDiv.style.display = "flex";
  }
  formVisible = !formVisible;
}
closeForm.addEventListener("click", toggleForm);
showAddCard.addEventListener("click", toggleForm);

let AddCard = async (cardType, cardNum, cvvNum, accHolder, expDate) => {
  // console.log(localStorage.getItem("userToken"));
  //==================================== secure XSS==============================================
  if (!CheckInput(cardType) && !CheckInput(accHolder)) {
    //==============================================================================
    var myHeaders = new Headers();
    //==================================== secure ==============================================
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("userToken")}`
    );
    myHeaders.append("X-CSRFToken", localStorage.getItem("csrfToken"));
    myHeaders.append("Referer", "https://secure-restapi.herokuapp.com");
    //=========================================================================================
    myHeaders.append("Content-Type", "application/json");

    // setCookie(
    //   "session",
    //   "eyJjc3JmX3Rva2VuIjoiNGE5MDliYjhjY2I4YWY1ZjgzYmY0OGVkNzYyYzNlZjc2Njk4Yzk0ZCJ9.YPADSg.RznKVvl1y6oeESqkFMDs0-SYbTM",
    //   1
    // );
    // setCookie("token", localStorage.getItem("userToken"), 1);
    // alert(document.cookie);
    myHeaders.append(
      "Cookie",
      document.cookie
      // `session=
      // ; token=${localStorage.getItem("userToken")}`
    );

    var raw = JSON.stringify({
      card_type: cardType,
      card_no: parseInt(cardNum),
      cvv: parseInt(cvvNum),
      account_holder: accHolder,
      phone_number: 0,
      expiry_date: expDate,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      //==================================== secure ==============================================
      `https://secure-restapi.herokuapp.com/card/${localStorage.getItem(
        "userName"
      )}`,
      //==================================================================================
      //==================================== not secure ==============================================
      // `https://sql-injection-restapi.herokuapp.com/card/${getCookie("userName")}`,
      //==================================================================================

      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        // location.reload();
      })
      .catch((error) => console.log("error", error));
    //==================================== secure XSS==============================================
  } else {
    AddCardAlertPrompt.style.display = "initial";
  }
  //============================================================================================
};
let cardHolder = document.getElementById("cardHolder");
let cardNum = document.getElementById("cardNum");
let expDate = document.getElementById("expDate");
let cardType = document.getElementById("cardType");
let cvv = document.getElementById("cvv");
let addCardButton = document.getElementById("addCardButton");

function CheckInput(str) {
  var pattern = /<(.*)>/;
  return pattern.test(str);
}

addCardButton.addEventListener("click", () => {
  event.preventDefault();

  expDate = Date.parse(expDate.value);
  AddCard(cardType.value, cardNum.value, cvv.value, cardHolder.value, expDate);
});
