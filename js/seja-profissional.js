document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('prof-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const data = {
      fullName: form.fullName?.value || '',
      email: form.email?.value || '',
      telefone: form.telefone?.value || '',
      empresa: form.empresa?.value || '',
      cargo: form.cargo?.value || '',
      num_vendedores: form.num_vendedores?.value || '',
      tipo_servico: form.tipo_servico?.value || '',
      descricao: form.descricao?.value || ''
    };

    // Salva no localStorage para ser lido por paginaPrestador
    try {
      localStorage.setItem('conecta_profile', JSON.stringify(data));
      // Salvar o tipo de serviço separadamente para o mapeamento de ícones
      localStorage.setItem('tipo_servico', data.tipo_servico);
    } catch (err) {
      console.error('Erro ao salvar no localStorage', err);
    }

    // Redireciona para a página do prestador para visualizar as alterações
    window.location.href = '/pages/paginaPrestador.html';
  });
});
