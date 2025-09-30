async function carregarPerfil() {
  let params = new URLSearchParams(window.location.search);
  let id = params.get("id");

  let doc = await db.collection("profissionais").doc(id).get();
  if (doc.exists) {
    let data = doc.data();
    document.getElementById("perfil").innerHTML = `
      <img src="${data.fotoPerfil}" width="120">
      <h1>${data.nome}</h1>
      <p>${data.descricao}</p>
      <a href="https://wa.me/${data.telefone}" target="_blank">Chamar no WhatsApp</a>
    `;

    let galeria = document.getElementById("galeria");
    data.trabalhos.forEach(foto => {
      galeria.innerHTML += `<img src="${foto}" width="150">`;
    });
  }
}
carregarPerfil();
