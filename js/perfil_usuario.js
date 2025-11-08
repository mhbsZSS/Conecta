// /static/js/dashboard.js

// Espera o HTML carregar antes de rodar o script
document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Pega os elementos que vamos usar
  const searchBar = document.getElementById('search-bar');
  const feed = document.getElementById('professional-feed');
  const cards = feed.querySelectorAll('.professional-card');
  
  // 2. Adiciona um "escutador de eventos" na barra de pesquisa
  // 'input' dispara a cada letra digitada ou apagada
  searchBar.addEventListener('input', function(event) {
    
    // 3. Pega o texto digitado e converte para minúsculas
    const query = event.target.value.toLowerCase();
    
    // 4. Passa por cada card, um por um
    cards.forEach(card => {
      
      // 5. Pega o texto do serviço (ex: "Pedreiro")
      // (Usamos .querySelector para achar o h4 dentro do card)
      const serviceElement = card.querySelector('.professional-service');
      const service = serviceElement.textContent.toLowerCase();
      
      // 6. Compara o serviço do card com o texto digitado
      if (service.includes(query)) {
        // Se o texto BATE (ex: "pedr" está em "pedreiro")
        // Mostra o card
        card.style.display = 'block';
      } else {
        // Se o texto NÃO BATE
        // Esconde o card
        card.style.display = 'none';
      }
    });
  });
});