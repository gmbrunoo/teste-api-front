
window.addEventListener('submit', () => {
  event.preventDefault()
});

function authenticate() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://node-api-weather.herokuapp.com/api/v1/users/auth", true);
  xhttp.withCredentials = true;
  xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhttp.send(JSON.stringify({
    "email": username,
    "senha": password
  }));
  
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if(this.status == 200){
        const data = JSON.parse(this.responseText)
        const city = data.cidade
        const cookie = data.AccessToken
        document.cookie = `access-token=${cookie}`
        login(cookie, city)
      }
    }
  };
  
  return false
}

function login(cookie, city) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://node-api-weather.herokuapp.com/api/v1/users/auth/login", true);
  xhttp.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  xhttp.setRequestHeader("Authorization", cookie)
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
        
      if(this.status == 200) {
        
        const auth = checkCookie()
        if(auth){window.location= `./weather.html#${city}`}
      }
    }
  };
  
  return false
}

function checkCookie(){
  if (document.cookie.match(/^(.*;)?\s*access-token\s*=\s*[^;]+(.*)?$/)) {
    return true
  }
  return false
}


// async function authenticate(){
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;

//   const urlAuth = `http://localhost:3000/api/v1/users/auth`
//   const data = {
//     "email": username,
//     "senha": password
//   }

//   const req = await fetch(urlAuth,{
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: {"Content-Type": "application/json; charset=UTF-8"},
//     credentials: 'same-origin'
//   })
//   .then(req => req.json())
//   .then(res => console.log(res))
//   .catch(err => console.log(err))

//   setCookie("Authorization", json)
// }

