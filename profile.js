let cardsDisplayArea = document.getElementById("cards");

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

//Add and get cards request methods

let AddCard = async () => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `jwt ${getCookie("userToken")}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    card_type: "debit",
    card_no: 1121555,
    cvv: 424,
    account_holder: "vtrix sony",
    phone_number: "9856471425",
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://sql-injection-restapi.herokuapp.com/card/vtx", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

let GetCards = async () => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `jwt ${getCookie("userToken")}`);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("https://sql-injection-restapi.herokuapp.com/card/vtx", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      result.cards.map((card) => {
        cardsDisplayArea.innerHTML += `
         <div> a</div>
        `;
      });
    })
    .catch((error) => console.log("error", error));
};

GetCards();
