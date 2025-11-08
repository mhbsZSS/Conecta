// Espera o documento carregar
document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Seleciona o elemento do telefone
  var elementoTelefone = document.getElementById('telefone-profissional');
  
  // 2. Define as opções da máscara
  var mascaraOpcoes = {
    // A máscara que você quer: (99)9 9999-9999
    // O '0' é um coringa para um número
    mask: '(00)0 0000-0000' 
  };
  
  // 3. Inicia a máscara
  var mask = IMask(elementoTelefone, mascaraOpcoes);

});