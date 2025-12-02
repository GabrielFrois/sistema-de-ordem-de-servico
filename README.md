# Sistema de Ordem de Serviço
Projeto desenvolvido para a disciplina de Desenvolvimento Web III.  
O objetivo é criar um sistema para o controle de ordens de serviço, permitindo o gerenciamento de solicitações internas como manutenção e suporte técnico, desde a abertura até a conclusão.

---

## Funcionalidades
O sistema atende aos seguintes requisitos funcionais :
- **Criar (Create):** Registrar uma nova ordem de serviço com Título, Descrição, Setor, Valor, Prazo Estimado e Prioridade.
- **Ler (Read):** Listagem geral das ordens, pesquisa por título e filtros específicos por status, prioridade e setor.
- **Atualizar (Update):** Alteração de dados da ordem, permitindo atualizar o Status (Aberta, Em Andamento, Concluída) e atribuir um Responsável.
- **Excluir (Delete):** Remoção de ordens de serviço do banco de dados.

## Tecnologias Utilizadas
### Backend
- Node.js com TypeScript 
- Express  
- MongoDB 
- Mongoose 

### Frontend
- HTML
- CSS
- JavaScript 
- Bootstrap 5

## Como Executar
### Pré-requisitos:
- Node.js instalado.
- MongoDB rodando localmente na porta padrão (27017).

### Passo a Passo
1. Clone o repositório ou baixe os arquivos:
```Bash
git clone https://github.com/GabrielFrois/sistema-ordem-servico.git
cd sistema-ordem-servico
```

2. Instale as dependências:
```Bash
npm install
```

3. Configure o Banco de Dados: Certifique-se de que o MongoDB está rodando.  
A aplicação tentará conectar automaticamente em: `mongodb://localhost:27017/ordens_servico`

4. Inicie o Servidor:
```Bash
npm run dev
```

**O servidor rodará em http://localhost:3000**