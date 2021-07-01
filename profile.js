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

let clearCookie = () => {
  var allCookies = document.cookie.split(";");
  for (var i = 0; i < allCookies.length; i++)
    document.cookie = allCookies[i] + "=;expires=" + new Date(0).toUTCString();
  console.log("cookie cleared", document.cookie);
};
document.getElementById("clearCookie").addEventListener("click", clearCookie);
document.getElementById("cookie").innerText = document.cookie;

//Add and get cards request methods

let AddCard = async () => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "jwt eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjQ4Nzg4MTksImlhdCI6MTYyNDg3ODUxOSwibmJmIjoxNjI0ODc4NTE5LCJpZGVudGl0eSI6M30.iMJ_gWR_JJgEI2C1d8dZXkkC2RvP85X-on1AIqq8aT8"
  );
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    card_type: "debit",
    card_no: 1111755,
    cvv: 444,
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
  myHeaders.append(
    "Authorization",
    "jwt eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjQ4Nzg4MTksImlhdCI6MTYyNDg3ODUxOSwibmJmIjoxNjI0ODc4NTE5LCJpZGVudGl0eSI6M30.iMJ_gWR_JJgEI2C1d8dZXkkC2RvP85X-on1AIqq8aT8"
  );
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("https://sql-injection-restapi.herokuapp.com/card/vtx", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
