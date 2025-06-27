# Sistema de Controle de Planos de Operadora - Fase 1: Serviço de Gestão

Este projeto implementa a **Fase 1** do Sistema de Controle de Planos de Operadora, focando no **Serviço de Gestão** (`ServicoGestao`). Ele é o módulo central, responsável pelo gerenciamento de clientes, planos e assinaturas. A arquitetura segue a **Arquitetura Limpa**, aplicando princípios **SOLID** e padrões de projeto para robustez e manutenção.

-----

## Sumário

1.  [Objetivos do Projeto (Fase 1)](https://www.google.com/search?q=%231-objetivos-do-projeto-fase-1)
2.  [Design Arquitetural](https://www.google.com/search?q=%232-design-arquitetural)
      * [Arquitetura Limpa](https://www.google.com/search?q=%23arquitetura-limpa)
      * [Princípios SOLID & Padrões de Projeto](https://www.google.com/search?q=%23princ%C3%ADpios-solid--padr%C3%B5es-de-projeto)
3.  [Tecnologias Utilizadas](https://www.google.com/search?q=%233-tecnologias-utilizadas)
4.  [Configuração e Execução](https://www.google.com/search?q=%234-configura%C3%A7%C3%A3o-e-execu%C3%A7%C3%A3o)
5.  [Endpoints da API](https://www.google.com/search?q=%235-endpoints-da-api)
6.  [Conclusão e Desafios](https://www.google.com/search?q=%236-conclus%C3%A3o-e-desafios)

-----

## 1\. Objetivos do Projeto (Fase 1)

Os principais objetivos desta fase são:

  * **Modelar o sistema completo**, implementando o `ServicoGestao`.
  * **Gerenciar clientes, planos e assinaturas**:
      * Cadastro e listagem de clientes e planos.
      * Criação de assinaturas.
      * Atualização de custo de planos.
      * Listagem de assinaturas por cliente e plano, além de por tipo (ativos, cancelados).
      * *Endpoint* para registro de pagamentos (preparação para eventos futuros).
  * Aplicar **Arquitetura Limpa**, **Princípios SOLID** e **Padrões de Projeto**.
  * Utilizar **ORM** (Sequelize) para persistência de dados.
  * Fornecer **documentação** clara e coleção Postman para testes.

-----

## 2\. Design Arquitetural

### Arquitetura Limpa

O projeto adota a **Arquitetura Limpa**, organizando o código em camadas concêntricas com a **Regra de Dependência** (dependências apontam para dentro).

  * **Entidades (Domínio):** Regras de negócio de alto nível (ex: `Client`, `Plan`). Define interfaces de repositório.
  * **Casos de Uso (Aplicação):** Regras de negócio específicas da aplicação (ex: `RegisterClientUseCase`). Orquestra o fluxo de dados.
  * **Adaptadores (Infraestrutura):** Implementações concretas de repositórios, modelos ORM, controladores web (ex: `ClientRepositoryPg`, `ClientController`).
  * **Frameworks & Drivers (Apresentação):** Ponto de entrada e configuração (ex: `main.js`, Express.js).

### Princípios SOLID & Padrões de Projeto

O código é estruturado seguindo os princípios **SOLID** para garantir modularidade, flexibilidade e testabilidade.

  * **SRP:** Classes com uma única responsabilidade (ex: `Client` para dados, `RegisterClientUseCase` para lógica).
  * **OCP:** Aberto para extensão, fechado para modificação (novas funcionalidades sem alterar existentes).
  * **LSP:** Subtipos substituem supertipos sem quebrar o sistema (ex: `ClientRepositoryPg` substitui `IClientRepository`).
  * **ISP:** Interfaces específicas para clientes (ex: `IClientRepository` em vez de uma genérica).
  * **DIP:** Módulos dependem de abstrações (ex: `RegisterClientUseCase` depende de `IClientRepository`).

**Padrões de Projeto Utilizados:**

  * **Repository Pattern:** Desacopla lógica de negócio do acesso a dados.
  * **Use Case / Interactor Pattern:** Encapsula funcionalidades da aplicação.
  * **Dependency Injection (DI):** Gerencia dependências para baixo acoplamento e testabilidade.
  * **Observer Pattern (Conceitual para Fase 2):** Preparação para eventos assíncronos (pagamentos).

-----

## 3\. Tecnologias Utilizadas

  * **Node.js**
  * **Express.js**
  * **PostgreSQL**
  * **Sequelize ORM**
  * **Dotenv**

-----

## 4\. Configuração e Execução

### Pré-requisitos

  * Node.js e npm.
  * PostgreSQL instalado e em execução.

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/FelipeZag0/fase-1.git
    cd subscription-management-system
    ```
2.  **Instale dependências:**
    ```bash
    npm install
    ```
3.  **Configure `.env`:** Crie `/.env` (baseado em `.env.example`) com suas credenciais do PostgreSQL e a porta (`PORT=3000`).
4.  **Inicie a aplicação:** As tabelas do banco de dados serão criadas automaticamente.
    ```bash
    npm start
    ```
    O servidor estará rodando em `http://localhost:3000`.

-----

## 5\. Endpoints da API

**Base URL:** `http://localhost:3000/gerenciaplanos`

  * **`GET /clientes`**: Lista clientes.
  * **`POST /cliente`**: Cria cliente.
  * **`GET /planos`**: Lista planos.
  * **`POST /planos`**: Cria plano.
  * **`PATCH /planos/:idPlano`**: Atualiza custo do plano.
  * **`POST /assinaturas`**: Cria assinatura.
  * **`GET /assinaturascliente/:codCli`**: Lista assinaturas de um cliente.
  * **`GET /assinaturaplano/:codPlano`**: Lista assinaturas de um plano.
  * **`GET /assinaturas/{tipo}`**: Lista assinaturas por tipo (`TODOS`, `ATIVOS`, `CANCELADOS`).

**Endpoint de Pagamento (via `ServicoGestao`):**

  * **`POST /registrarpagamento`** (`http://localhost:3000/registrarpagamento`)
      * Registra pagamento para assinatura (corpo JSON com `dia`, `mes`, `ano`, `codAss`, `valorPago`).

Use o arquivo `FASE1 - template.postman_collection.json` para testar.

-----

## 6\. Conclusão e Desafios

*(Esta seção deve ser preenchida pelo aluno, descrevendo o processo de desenvolvimento, desafios, soluções e referências. Se for uma refatoração, mencione os pontos ajustados e pendentes.)*

-----

Agora, para o `uml_description.md` de forma enxuta:

-----

# Descrição Conceitual do Diagrama UML

Este documento descreve a estrutura de pacotes e classes do Sistema de Gerenciamento de Assinaturas, com foco no `ServicoGestao` e na aplicação da Arquitetura Limpa.

-----

## 1\. Diagrama de Pacotes

Organização do sistema em camadas de Arquitetura Limpa:

  * **`Domain`**:

      * **Propósito:** Lógica de negócio central, entidades puras (`Client`, `Plan`, `Subscription`, `Payment`) e interfaces de repositório (`IClientRepository`, etc.) e serviços de domínio (`ISubscriptionDomainService`).
      * **Independência:** Não depende de *frameworks* ou tecnologias externas.

  * **`Application`**:

      * **Propósito:** Regras de negócio específicas da aplicação e **Casos de Uso** (`RegisterClientUseCase`, etc.).
      * **Dependência:** Apenas do pacote `Domain`.

  * **`Infrastructure`**:

      * **Propósito:** Detalhes de implementação: modelos ORM (`ClientModel`), repositórios concretos (`ClientRepositoryPg`), serviços de domínio concretos (`SubscriptionDomainService`) e componentes web (`ClientController`, `AppRouter`).
      * **Dependência:** De `Application` e `Domain`.

  * **`Presentation` (Implícito):**

      * **Propósito:** Ponto de entrada da aplicação, configurando e iniciando os componentes (ex: `main.js`).

**Fluxo de Dependência (para dentro):** `Presentation` -\> `Infrastructure` -\> `Application` -\> `Domain`

-----

## 2\. Diagrama de Classes (Chave)

Classes primárias e seus relacionamentos dentro de cada pacote:

### Pacote `Domain`

  * **Entidades:**
      * `Client`: `id`, `name`, `email`.
      * `Plan`: `id`, `name`, `description`, `monthlyCost`.
      * `Subscription`: `id`, `clientId`, `planId`, `startDate`, `endDate`, `status`, `lastPaymentDate`, `nextPaymentDate`.
      * `Payment`: `id`, `subscriptionId`, `amount`, `paymentDate`.
  * **Interfaces de Repositório (`IClientRepository`, `IPlanRepository`, `ISubscriptionRepository`, `IPaymentRepository`):** Definem contratos para operações de persistência (ex: `save`, `findById`, `findAll`).
  * **Interfaces de Serviços de Domínio (`ISubscriptionDomainService`):** Encapsulam regras de negócio complexas (ex: `calculateNextPaymentDate`).

### Pacote `Application`

  * **Casos de Uso (`RegisterClientUseCase`, `CreateSubscriptionUseCase`, `RegisterPaymentUseCase`, etc.):** Coordenam a interação entre entidades e repositórios para funcionalidades específicas. Dependem das interfaces de repositório do `Domain`.

### Pacote `Infrastructure`

  * **Database (`ClientModel`, `PlanModel`, `SubscriptionModel`, `PaymentModel`):** Modelos Sequelize para mapeamento ORM.
  * **Repositórios (`ClientRepositoryPg`, etc.):** Implementam as interfaces de repositório do `Domain`, lidando com a interação real com o banco de dados.
  * **Serviços (`SubscriptionDomainService`):** Implementam as interfaces de serviço de domínio do `Domain`.
  * **Web (`ClientController`, `AppRouter`, etc.):** Recebem requisições HTTP, chamam casos de uso e formatam respostas.

-----

## 3\. Sumário dos Relacionamentos

  * **Implementações:** Repositórios e serviços em `Infrastructure` implementam interfaces do `Domain`.
  * **Dependências:**
      * Casos de Uso dependem de Interfaces (Domínio).
      * Controladores dependem de Casos de Uso (Aplicação).
      * Implementações de Repositório dependem de Modelos ORM (Infraestrutura).
      * O ponto de entrada (`main.js`) conecta todas as dependências.

-----
