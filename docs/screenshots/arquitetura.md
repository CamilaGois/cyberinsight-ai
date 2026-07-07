# Arquitetura do Sistema

## Visão Geral

O CyberInsight AI foi concebido como uma aplicação web modular para apoiar analistas de um Centro de Operações de Segurança (Security Operations Center – SOC) no gerenciamento de incidentes de segurança cibernética.

A arquitetura foi planejada para separar claramente as responsabilidades entre interface, regras de negócio e persistência de dados, facilitando a manutenção do código, a escalabilidade do sistema e a futura integração com modelos de Inteligência Artificial Generativa.

O desenvolvimento desta versão teve como foco a construção da estrutura da aplicação e da experiência do usuário, utilizando dados simulados (mock), conforme estabelecido nos requisitos da avaliação.

---

# Arquitetura em Camadas

O projeto segue uma arquitetura cliente-servidor dividida em três camadas principais.

```text
                Usuário
                   │
                   ▼
      React + Vite + TypeScript
                   │
              Requisições HTTP
                   │
                   ▼
             FastAPI (Backend)
                   │
                   ▼
               SQLite Database
```

Nesta etapa da avaliação, o frontend concentra a maior parte da lógica da aplicação utilizando dados simulados. A camada de backend foi planejada para ser integrada em versões futuras, mantendo a arquitetura preparada para expansão.

---

# Frontend

O frontend foi desenvolvido utilizando React, Vite e TypeScript.

Essa combinação foi escolhida por oferecer:

* alta produtividade durante o desenvolvimento;
* arquitetura baseada em componentes;
* tipagem estática;
* facilidade de manutenção;
* excelente integração futura com APIs REST.

A interface foi organizada em páginas independentes, permitindo evolução modular da aplicação.

Entre os módulos desenvolvidos destacam-se:

* Landing Page;
* Login;
* Dashboard;
* Upload de Logs;
* Histórico;
* Playbooks;
* Componentes reutilizáveis.

---

# Backend

A arquitetura prevê a utilização do FastAPI como camada responsável pelas regras de negócio da aplicação.

As principais responsabilidades planejadas para o backend incluem:

* gerenciamento dos incidentes;
* persistência dos dados;
* autenticação de usuários;
* disponibilização de APIs REST;
* futura comunicação com modelos de IA Generativa.

---

# Banco de Dados

Foi escolhida a utilização do SQLite como banco de dados da aplicação.

Essa escolha foi baseada em:

* simplicidade de configuração;
* banco embarcado;
* facilidade de distribuição;
* compatibilidade nativa com Python.

Essa solução atende adequadamente aos objetivos desta etapa do projeto.

---

# Organização do Código

O projeto foi organizado visando separar responsabilidades entre páginas, componentes e serviços.

Essa organização facilita:

* manutenção;
* reutilização de componentes;
* testes;
* expansão futura.

---

# Evolução Prevista

A arquitetura foi planejada para permitir futuras integrações com:

* modelos de IA Generativa;
* mecanismos de classificação automática de incidentes;
* geração inteligente de playbooks;
* análise automática de logs;
* autenticação completa;
* persistência definitiva utilizando SQLite.

Essa abordagem permite que a aplicação evolua sem necessidade de grandes alterações estruturais, preservando a modularidade e facilitando futuras implementações.
