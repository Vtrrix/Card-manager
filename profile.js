let cardsDisplayArea = document.getElementById("cards");
let navName = document.querySelector("#nav h2");

navName.innerText = `Welcome, ${getCookie("userName")}`;
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
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
console.log(getCookie("userToken"));

let logoutUser = () => {
  location.replace("index.html");
  var allCookies = document.cookie.split(";");
  for (var i = 0; i < allCookies.length; i++)
    document.cookie = allCookies[i] + "=;expires=" + new Date(0).toUTCString();
  console.log("cookie cleared", document.cookie);
};
document.getElementById("logout").addEventListener("click", logoutUser);

//get cards request methods------------------------------------------

let GetCards = async () => {
  var myHeaders = new Headers();
  // myHeaders.append("Authorization", `jwt ${getCookie("userToken")}`);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://sql-injection-restapi.herokuapp.com/card/${getCookie("userName")}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      result.cards.map((card) => {
        cardsDisplayArea.innerHTML += `
        <div class="card">
          <div class="card__front card__part">
            <p class="card_numer">${card.card_no}</p>
            <div class="card__space-75">
              <span class="card__label">Card holder</span>
              <p class="card__info">${card.account_holder}</p>
            </div>
            <div class="card__space-25">
              <span class="card__label">Expires</span>
              <p class="card__info">10/25</p>
            </div>
          </div>

          <div class="card__back card__part">
            <div class="card__black-line"></div>
            <div class="card__back-content">
              <div class="card__secret">
                <p class="card__secret--last">${card.cvv}</p>
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

let AddCard = async (cardType, cardNum, cvvNum, accHolder, phoneNum) => {
  var myHeaders = new Headers();
  // myHeaders.append("Authorization", `jwt ${getCookie("userToken")}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    card_type: cardType,
    card_no: parseInt(cardNum),
    cvv: parseInt(cvvNum),
    account_holder: accHolder,
    phone_number: phoneNum,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    `https://sql-injection-restapi.herokuapp.com/card/${getCookie("userName")}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      location.reload();
    })
    .catch((error) => console.log("error", error));
};
let cardHolder = document.getElementById("cardHolder");
let cardNum = document.getElementById("cardNum");
let phoneNum = document.getElementById("phoneNum");
let cardType = document.getElementById("cardType");
let cvv = document.getElementById("cvv");
let addCardButton = document.getElementById("addCardButton");

addCardButton.addEventListener("click", () => {
  event.preventDefault();
  AddCard(
    cardType.value,
    cardNum.value,
    cvv.value,
    cardHolder.value,
    phoneNum.value
  );
});
