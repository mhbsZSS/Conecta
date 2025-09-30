firebase.auth().onAuthStateChanged(async user => {
  if (!user) {
    window.location.href = "entrar.html";
    return;
  }

  let uid = user.uid;
  let doc = await db.collection("profissionais").doc(uid).get();
  let data = doc.data();

  document.getElementById("perfil").innerHTML = `
    <img src="${data.fotoPerfil}" width="120">
    <h1>${data.nome}</h1>
    <p>${data.descricao}</p>
    <h3>Trabalhos</h3>
    <div id="galeria"></div>
  `;

  let galeria = document.getElementById("galeria");
  data.trabalhos.forEach(foto => {
    galeria.innerHTML += `<img src="${foto}" width="150">`;
  });

  // Atualizar dados
  document.getElementById("updateForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    let descricao = document.getElementById("descricao").value;
    let novaFoto = document.getElementById("novaFoto").files[0];

    let novasFotos = data.trabalhos;

    if (novaFoto) {
      let fileRef = storage.ref(`trabalhos/${uid}_${novaFoto.name}`);
      await fileRef.put(novaFoto);
      let url = await fileRef.getDownloadURL();
      novasFotos.push(url);
    }

    await db.collection("profissionais").doc(uid).update({
      descricao: descricao || data.descricao,
      trabalhos: novasFotos
    });

    alert("Perfil atualizado!");
    window.location.reload();
  });

  document.getElementById("logout").addEventListener("click", () => {
    firebase.auth().signOut();
  });
});
