document.getElementById("cadastroForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;
  let profissao = document.getElementById("profissao").value;
  let telefone = document.getElementById("telefone").value;
  let descricao = document.getElementById("descricao").value;
  let fotoPerfil = document.getElementById("fotoPerfil").files[0];
  let fotosTrabalhos = document.getElementById("fotosTrabalhos").files;

  try {
    // Criar usuário no Auth
    let userCred = await firebase.auth().createUserWithEmailAndPassword(email, senha);
    let uid = userCred.user.uid;

    // Upload foto de perfil
    let perfilRef = storage.ref(`perfis/${uid}_${fotoPerfil.name}`);
    await perfilRef.put(fotoPerfil);
    let fotoPerfilURL = await perfilRef.getDownloadURL();

    // Upload fotos de trabalhos
    let trabalhosURLs = [];
    for (let i = 0; i < fotosTrabalhos.length; i++) {
      let fileRef = storage.ref(`trabalhos/${uid}_${fotosTrabalhos[i].name}`);
      await fileRef.put(fotosTrabalhos[i]);
      let url = await fileRef.getDownloadURL();
      trabalhosURLs.push(url);
    }

    // Salvar no Firestore
    await db.collection("profissionais").doc(uid).set({
      nome, email, profissao, telefone, descricao,
      fotoPerfil: fotoPerfilURL,
      trabalhos: trabalhosURLs
    });

    alert("Cadastro realizado com sucesso!");
    window.location.href = "../pages/meu-perfil.html";
  } catch (error) {
    alert("Erro: " + error.message);
  }
});
