// Elementos do DOM
const editBtn = document.getElementById('edit-profile-btn');
const fileInput = document.getElementById('profile-pic-input');
const previewImg = document.getElementById('preview-pic');
const contadorSeguidores = document.getElementById('contador-seguidores');

// Mapeamento dos tipos de serviço para seus respectivos ícones
const serviceIconMap = {
    'Pedreiro': 'colher-de-pedreiro.jpg',
    'Marceneiro': 'marceneiro.png',
    'Pintor': 'pintor.png',
    'Carpinteiro': 'carpinteiro.png',
    'Eletricista': 'eletricista.png',
    'Encanador': 'encanador.png'
};

// Função para atualizar o número de seguidores
async function atualizarSeguidores() {
    try {
        // Simula uma chamada à API (substitua pela sua URL real)
        const response = await fetch('https://sua-api.com/seguidores');
        const data = await response.json();
        
        // Atualiza o número com animação
        const numeroAtual = parseInt(contadorSeguidores.textContent) || 0;
        const numeroNovo = data.total || 0;
        
        animarContador(numeroAtual, numeroNovo);
        
    } catch (error) {
        console.error('Erro ao buscar seguidores:', error);
        contadorSeguidores.textContent = 'Erro';
    }
}

// Função para animar a contagem
function animarContador(inicio, fim) {
    const duracao = 1000; // 1 segundo
    const intervalo = 50; // atualiza a cada 50ms
    const passos = duracao / intervalo;
    const incremento = (fim - inicio) / passos;
    let atual = inicio;
    let contador = 0;
    
    const timer = setInterval(() => {
        contador++;
        atual += incremento;
        
        if (contador >= passos) {
            clearInterval(timer);
            atual = fim;
        }
        
        contadorSeguidores.textContent = Math.round(atual).toLocaleString();
    }, intervalo);
}

// Atualiza os seguidores a cada 30 segundos
setInterval(atualizarSeguidores, 30000);

// Primeira atualização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    atualizarSeguidores();
    initializeNameEditor();
    loadProfileFromStorage();
    atualizarIconeServico(); // Adicionando a atualização do ícone de serviço
});

// Carrega dados salvos do formulário de cadastro e atualiza as figuras na página
function loadProfileFromStorage() {
    try {
        const raw = localStorage.getItem('conecta_profile');
        if (!raw) return;
        const data = JSON.parse(raw);

        // Atualiza nome
        if (data.fullName) {
            const nameEl = document.getElementById('display-user-name');
            if (nameEl) nameEl.textContent = data.fullName;
        }

        // Atualiza perfil básico (figuras-container)
        // Ordem esperada: E-mail, Telefone, Nome da empresa, Cargo, Número de vendedores
        const figuras = document.querySelectorAll('.figuras-container .figura');
        if (figuras && figuras.length >= 5) {
            if (data.email) {
                const p = figuras[0].querySelector('p');
                if (p) p.innerHTML = `<strong>${escapeHtml(data.email)}</strong>`;
            }
            if (data.telefone) {
                const p = figuras[1].querySelector('p');
                if (p) p.innerHTML = `<strong>${escapeHtml(data.telefone)}</strong>`;
            }
            if (data.empresa) {
                const p = figuras[2].querySelector('p');
                if (p) p.innerHTML = `<strong>${escapeHtml(data.empresa)}</strong>`;
            }
            if (data.cargo) {
                const p = figuras[3].querySelector('p');
                if (p) p.innerHTML = `<strong>${escapeHtml(data.cargo)}</strong>`;
            }
            if (data.num_vendedores !== undefined) {
                const p = figuras[4].querySelector('p');
                if (p) p.innerHTML = `<strong>${escapeHtml(String(data.num_vendedores))}</strong>`;
            }
        }
    } catch (err) {
        console.error('Erro ao carregar perfil do localStorage', err);
    }
}

// Pequena função de escape para evitar injeção HTML
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Função para inicializar o editor de nome
function initializeNameEditor() {
    const editBtn = document.querySelector('.edit-name-btn');
    const nameDisplay = document.getElementById('display-user-name');
    const nameInput = document.getElementById('edit-name-input');

    editBtn.addEventListener('click', () => {
        // Mostra o input e esconde o texto
        nameInput.style.display = 'block';
        nameDisplay.style.display = 'none';
        
        // Preenche o input com o nome atual
        nameInput.value = nameDisplay.textContent;
        nameInput.focus();
    });

    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const newName = nameInput.value.trim();
            if (newName) {
                // Atualiza o nome
                nameDisplay.textContent = newName;
                
                // Aqui você pode adicionar uma chamada à API para salvar o novo nome
                // saveNameToAPI(newName);
                
                // Volta para o modo de exibição
                nameInput.style.display = 'none';
                nameDisplay.style.display = 'block';
            }
        }
    });

    nameInput.addEventListener('blur', () => {
        // Quando o input perde o foco, volta ao modo de exibição
        nameInput.style.display = 'none';
        nameDisplay.style.display = 'block';
    });
}

// Quando clicar no botão de editar, dispara o input file
editBtn.addEventListener('click', () => {
    fileInput.click();
});

// Quando uma imagem for selecionada
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    
    // Verifica se é uma imagem
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = (event) => {
            // Atualiza a imagem de preview
            previewImg.src = event.target.result;
            
            // Aqui você pode adicionar código para fazer upload da imagem para seu servidor
            // Por exemplo:
            // uploadImageToServer(file);
        };
        
        reader.readAsDataURL(file);
    } else {
        alert('Por favor, selecione uma imagem válida.');
    }
});

// Função para upload (exemplo - implemente conforme sua necessidade)
function uploadImageToServer(file) {
    // Aqui você implementaria o código para enviar a imagem ao servidor
    // Exemplo com FormData:
    /*
    const formData = new FormData();
    formData.append('profile_image', file);
    
    fetch('/api/upload-profile-image', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Upload success:', data);
    })
    .catch(error => {
        console.error('Upload error:', error);
    });
    */
}

// Função para atualizar o ícone baseado no tipo de serviço
function atualizarIconeServico() {
    // Recuperar o tipo de serviço salvo do localStorage
    const tipoServico = localStorage.getItem('tipo_servico');
    
    if (tipoServico) {
        // Elementos do DOM
        const iconeServico = document.getElementById('icone-servico');
        const tipoServicoTexto = document.getElementById('tipo-servico-texto');
        
        // Atualizar o texto do tipo de serviço
        if (tipoServicoTexto) {
            tipoServicoTexto.textContent = tipoServico;
        }
        
        // Atualizar o ícone
        if (iconeServico && serviceIconMap[tipoServico]) {
            iconeServico.src = `../assets/img/${serviceIconMap[tipoServico]}`;
            iconeServico.alt = `Ícone de ${tipoServico}`;
        }
    }
}
