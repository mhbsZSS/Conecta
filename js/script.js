// FAQ Interativo
// --- LÓGICA DO ACORDEÃO (FAQ) ---
document.addEventListener('DOMContentLoaded', function() {
  
  // Seleciona todas as "perguntas" clicáveis
  const questions = document.querySelectorAll('.faq-question');

  questions.forEach(question => {
    // Adiciona um evento de clique em cada pergunta
    question.addEventListener('click', () => {
      
      // Encontra o "pai" (o .faq-item) da pergunta clicada
      const item = question.parentElement;

      item.classList.toggle('is-open');
      
      questions.forEach(otherQuestion => {
        if (otherQuestion !== question) {
          otherQuestion.parentElement.classList.remove('is-open');
        }
      });      
    });
  });

});

// Formulário (simulação)
document.getElementById("form-profissional").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Obrigado por se cadastrar! Em breve entraremos em contato.");
});

// Inicializar Firebase
const firebaseConfig = {
  apiKey: "SUA-API-KEY",
  authDomain: "SEU-PROJETO.firebaseapp.com",
  projectId: "SEU-PROJETO",
  storageBucket: "SEU-PROJETO.appspot.com",
  messagingSenderId: "XXXXX",
  appId: "XXXXX"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

document.getElementById("cadastroForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  let nome = document.getElementById("nome").value;
  let profissao = document.getElementById("profissao").value;
  let telefone = document.getElementById("telefone").value;
  let descricao = document.getElementById("descricao").value;
  let fotoPerfil = document.getElementById("fotoPerfil").files[0];
  let fotosTrabalhos = document.getElementById("fotosTrabalhos").files;

  // Upload foto de perfil
  let perfilRef = storage.ref(`perfis/${Date.now()}_${fotoPerfil.name}`);
  await perfilRef.put(fotoPerfil);
  let fotoPerfilURL = await perfilRef.getDownloadURL();

  // Upload fotos de trabalhos
  let trabalhosURLs = [];
  for (let i = 0; i < fotosTrabalhos.length; i++) {
    let file = fotosTrabalhos[i];
    let fileRef = storage.ref(`trabalhos/${Date.now()}_${file.name}`);
    await fileRef.put(file);
    let url = await fileRef.getDownloadURL();
    trabalhosURLs.push(url);
  }

  // Salvar no Firestore
  await db.collection("profissionais").add({
    nome, profissao, telefone, descricao,
    fotoPerfil: fotoPerfilURL,
    trabalhos: trabalhosURLs
  });

  alert("Cadastro realizado com sucesso!");
});
