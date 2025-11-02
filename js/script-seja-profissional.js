// Script para a página de cadastro (seja-profissional)
// Coleta os valores do formulário, salva em localStorage e redireciona para a página do prestador

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('seja-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const profile = {
      fullName: document.getElementById('sp-fullName')?.value.trim() || '',
      telefone: document.getElementById('sp-telefone')?.value.trim() || '',
      empresa: document.getElementById('sp-empresa')?.value.trim() || '',
      cargo: document.getElementById('sp-cargo')?.value.trim() || '',
      num_vendedores: Number(document.getElementById('sp-num-vendedores')?.value) || 0,
      email: document.getElementById('sp-email')?.value.trim() || '',
      senha: document.getElementById('sp-senha')?.value || '',
      descricao: document.getElementById('sp-descricao')?.value.trim() || ''
    };

    const tipo = document.getElementById('sp-tipo-servico')?.value || '';

    try {
      localStorage.setItem('conecta_profile', JSON.stringify(profile));
      // Também armazenamos o tipo de serviço separadamente (usado para trocar ícone)
      if (tipo) localStorage.setItem('tipo_servico', tipo);
    } catch (err) {
      console.error('Erro ao salvar dados no localStorage', err);
    }

    // Redireciona para a página do prestador para visualizar os dados salvos
    // Usa caminho absoluto dentro do site para manter consistência com outros links
    window.location.href = '/pages/paginaPrestador.html';
  });
});
