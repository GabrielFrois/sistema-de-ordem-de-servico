const API_URL = 'http://localhost:3000/api/ordens';

// Carregar Ordens ao iniciar
document.addEventListener('DOMContentLoaded', carregarOrdens);

// Função de Listagem
async function carregarOrdens() {
    // Coleta valores dos filtros
    const busca = document.getElementById('buscaTitulo').value;
    const setor = document.getElementById('buscaSetor').value;
    const prioridade = document.getElementById('filtroPrioridade').value;
    const status = document.getElementById('filtroStatus').value;
    
    // Monta URL com query params
    let url = `${API_URL}?`;
    if (busca) url += `busca=${busca}&`;
    if (setor) url += `setor=${setor}&`;
    if (prioridade) url += `prioridade=${prioridade}&`;
    if (status) url += `status=${status}`;

    try {
        const res = await fetch(url);
        const ordens = await res.json();
        
        const lista = document.getElementById('listaOrdens');
        lista.innerHTML = '';

        ordens.forEach(os => {
            const corStatus = os.status === 'aberta' ? 'text-primary' : 
                              os.status === 'em andamento' ? 'text-warning' : 'text-success';
            
            const statusClass = os.status
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, '-');

            // Formata data do prazo para exibição (DD/MM/YYYY), se existir
            const prazoFormatado = os.prazo ? new Date(os.prazo).toLocaleDateString('pt-BR') : 'Não definido';

            // Prepara JSON seguro para o botão editar
            const osJson = JSON.stringify(os).replace(/'/g, "&#39;");

            const card = `
                <div class="col-md-4 mb-3">
                    <div class="card p-3 card-os status-${statusClass}">
                        <h5 class="card-title d-flex justify-content-between">
                            ${os.titulo}
                            <small class="${corStatus} fs-6">${os.status.toUpperCase()}</small>
                        </h5>
                        <p class="card-text text-muted mb-1">${os.descricao}</p>
                        <hr class="my-2">
                        <p class="mb-1"><strong>Setor:</strong> ${os.setor}</p>
                        <p class="mb-1"><strong>Prioridade:</strong> ${os.prioridade}</p>
                        <p class="mb-1"><strong>Prazo:</strong> ${prazoFormatado}</p>
                        <p class="mb-1"><strong>Valor:</strong> R$ ${os.valor}</p>
                        <div class="mt-2 text-end">
                            <button class="btn btn-sm btn-outline-primary" onclick='editarOrdem(${osJson})'>Editar</button>
                            <button class="btn btn-sm btn-outline-danger" onclick="excluirOrdem('${os._id}')">Excluir</button>
                        </div>
                    </div>
                </div>
            `;
            lista.innerHTML += card;
        });
    } catch (error) {
        console.error("Erro ao carregar ordens:", error);
    }
}

// Manipular envio do formulário
document.getElementById('osForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('osId').value;
    
    const dados = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        setor: document.getElementById('setor').value,
        valor: document.getElementById('valor').value,
        prazo: document.getElementById('prazo').value || null,
        prioridade: document.getElementById('prioridade').value,
        status: document.getElementById('status').value,
        responsavel: document.getElementById('responsavel').value
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    try {
        await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        limparFormulario();
        carregarOrdens();
    } catch (error) {
        console.error("Erro ao salvar:", error);
        alert("Erro ao salvar a ordem.");
    }
});

// Preencher formulário para edição
function editarOrdem(os) {
    document.getElementById('osId').value = os._id;
    document.getElementById('titulo').value = os.titulo;
    document.getElementById('descricao').value = os.descricao;
    document.getElementById('setor').value = os.setor;
    document.getElementById('valor').value = os.valor;
    document.getElementById('prioridade').value = os.prioridade;
    document.getElementById('status').value = os.status;
    document.getElementById('responsavel').value = os.responsavel || '';
    
    // Formata a data para o input type="date" (yyyy-mm-dd)
    if(os.prazo) {
        document.getElementById('prazo').value = os.prazo.split('T')[0];
    } else {
        document.getElementById('prazo').value = '';
    }
    
    document.getElementById('formTitle').innerText = 'Editar Ordem de Serviço';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Excluir
async function excluirOrdem(id) {
    if (confirm('Tem certeza que deseja excluir esta ordem?')) {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            carregarOrdens();
        } catch (error) {
            console.error("Erro ao excluir:", error);
            alert("Erro ao excluir a ordem.");
        }
    }
}

// Limpar form
function limparFormulario() {
    document.getElementById('osForm').reset();
    document.getElementById('osId').value = '';
    document.getElementById('formTitle').innerText = 'Nova Ordem de Serviço';
}