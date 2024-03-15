const form = document.getElementById("form");
const submitbtn = document.getElementById("submit");
const email = document.getElementById("email");
const URL='http://localhost:4000'


form.addEventListener("submit", async function (e) {
  if (!form.checkValidity()) {
    e.preventDefault();
  } else {
    e.preventDefault();

    let obj = {
      email: email.value,
    };

    try {
      const res = await axios.post(
        `${URL}/password/forgotpassword`,
        obj
      );
    } catch (error) {
      if (error.response.status === 404 || error.response.status === 401) {
        document.body.innerHTML += `<div style='color:red;'>${error.response.data.message}</div>`;
      } else {
        document.body.innerHTML += `<div style='color:red;'>${error}</div>`;
      }
    }

    email.value = "";
  }
  form.classList.add("was-validated");
});
