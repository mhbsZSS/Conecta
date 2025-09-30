async function carregarLista() {
  let params = new URLSearchParams(window.location.search);
  let profissao = params.get("profissao");

  document.getElementById("titulo").innerText =
    profissao.charAt(0).toUpperCase() + profissao.slice(1) + "s disponíveis";

  let container = document.getElementById("listaProfissionais");

  let snap = await db.collection("profissionais").where("profissao", "==", profissao).get();

  if (snap.empty) {
    container.innerHTML = "<p>Nenhum profissional encontrado nesta categoria.</p>";
    return;
  }

  snap.forEach(doc => {
    let data = doc.data();
    let card = `
      <div class="card">
        <img src="${data.fotoPerfil}" alt="Foto de ${data.nome}">
        <h3>${data.nome}</h3>
        <p>${data.descricao}</p>
        <a href="perfil.html?id=${doc.id}">Ver perfil</a>
      </div>
    `;
    container.innerHTML += card;
  });
}

carregarLista();
