document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  let email = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;

  try {
    let userCred = await firebase.auth().signInWithEmailAndPassword(email, senha);
    window.location.href = "../pages/meu-perfil.html";
  } catch (error) {
    alert("Erro ao entrar: " + error.message);
  }
});
