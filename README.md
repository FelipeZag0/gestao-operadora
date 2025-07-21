# Sistema de Controle de Planos de Operadora 📡

Sistema de gerenciamento de clientes, planos e assinaturas para operadoras. Projeto desenvolvido seguindo os princípios da Arquitetura Limpa e SOLID.

---

## 🛠 Tecnologias Utilizadas

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![PostgreSQL](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![Dotenv](https://img.shields.io/badge/dotenv-8A9A5B?style=for-the-badge&logo=dotenv&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

---

## 📋 Visão Geral do Projeto

O sistema permite:
- Cadastro e gestão de clientes e planos
- Criação e acompanhamento de assinaturas
- Atualização de custos de planos
- Registro de pagamentos
- Filtros avançados de assinaturas (ativas, canceladas, por cliente/plano)

---

## ▶️ Como Executar o Projeto

### Pré-requisitos
- Node.js e npm instalados
- PostgreSQL instalado e em execução

### Passos para instalação

1. Clone o repositório:
```bash
[git clone https://github.com/FelipeZag0/fase-1.git](https://github.com/FelipeZag0/gestao-operadora.git)
cd subscription-management-system
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o arquivo `.env` (baseado no `.env.example`):
```env
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
```

4. Inicie a aplicação:
```bash
npm start
```

O servidor estará disponível em: `http://localhost:3000`

---

## 📡 Endpoints da API

**Base URL:** `http://localhost:3000/gerenciaplanos`

| Método | Endpoint                     | Descrição                          |
|--------|------------------------------|------------------------------------|
| GET    | `/clientes`                  | Lista todos os clientes            |
| POST   | `/cliente`                   | Cria um novo cliente               |
| GET    | `/planos`                    | Lista todos os planos              |
| POST   | `/planos`                    | Cria um novo plano                 |
| PATCH  | `/planos/:idPlano`           | Atualiza custo de um plano         |
| POST   | `/assinaturas`               | Cria uma nova assinatura           |
| GET    | `/assinaturascliente/:codCli`| Lista assinaturas de um cliente    |
| GET    | `/assinaturaplano/:codPlano` | Lista assinaturas de um plano      |
| GET    | `/assinaturas/{tipo}`        | Filtra assinaturas (TODOS/ATIVOS/CANCELADOS) |
| POST   | `/registrarpagamento`        | Registra um pagamento              |

---

## 🧪 Testes

O projeto possui testes automatizados com Jest:

```bash
npm test
```

---

## 🏗️ Arquitetura

O sistema segue a **Arquitetura Limpa** com as seguintes camadas:

1. **Domain**: Entidades e regras de negócio
2. **Application**: Casos de uso
3. **Infrastructure**: Implementações concretas (repositórios, ORM)
4. **Presentation**: Ponto de entrada (Express)

Princípios SOLID aplicados:
- Single Responsibility
- Open/Closed
- Liskov Substitution
- Interface Segregation
- Dependency Inversion

---

## 📌 Considerações Finais

Este projeto demonstra:
- Arquitetura Limpa na prática
- Princípios SOLID
- ORM com Sequelize
- API REST bem estruturada
- Testes automatizados

Para dúvidas ou contribuições, sinta-se à vontade para abrir issues ou pull requests!
