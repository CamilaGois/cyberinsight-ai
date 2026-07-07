# Roadmap do Projeto

## Objetivo

Este documento apresenta o planejamento de evolução do CyberInsight AI. O objetivo é demonstrar como a arquitetura proposta permite incorporar novas funcionalidades de forma incremental, especialmente recursos baseados em Inteligência Artificial Generativa.

---

# Versão 1.0 — Protótipo Funcional (Avaliação Intermediária)

**Status:** Concluída

Objetivos desta versão:

* Interface completa da aplicação.
* Landing Page.
* Tela de Login.
* Dashboard.
* Menu lateral.
* Navegação entre páginas.
* Upload de logs (simulado).
* Histórico de incidentes.
* Playbooks simulados.
* Indicadores (KPIs).
* Dados simulados (mock).
* Estrutura preparada para futuras integrações.

Nesta versão, nenhuma IA foi integrada, conforme exigido na avaliação.

---

# Versão 2.0 — Integração com Backend

**Status:** Planejada

Objetivos:

* Implementação completa da API utilizando FastAPI.
* Persistência de dados em SQLite.
* Cadastro e gerenciamento de usuários.
* Autenticação e autorização.
* CRUD completo de incidentes.
* API REST documentada.
* Integração entre frontend e backend.

---

# Versão 3.0 — Inteligência Artificial Generativa

**Status:** Planejada

Objetivos:

* Integração com um modelo de IA Generativa.
* Geração automática de playbooks.
* Classificação inteligente de incidentes.
* Resumo técnico de eventos de segurança.
* Apoio à tomada de decisão para analistas SOC.
* Sugestões automáticas de resposta a incidentes.

Nesta fase, o sistema deixará de utilizar respostas simuladas (mock) e passará a gerar análises baseadas em IA.

---

# Versão 4.0 — Plataforma SOC Avançada

**Status:** Planejada

Funcionalidades previstas:

* Dashboard em tempo real.
* Integração com SIEM.
* Upload e análise de arquivos PCAP.
* Integração com feeds de Threat Intelligence.
* Correlação automática de eventos.
* Visualização de linha do tempo dos incidentes.
* Gestão colaborativa entre analistas.

---

# Versão 5.0 — Plataforma Corporativa

**Status:** Visão de Longo Prazo

Objetivos:

* Controle de acesso baseado em perfis (RBAC).
* Auditoria completa das ações dos usuários.
* Relatórios gerenciais.
* Multiusuário.
* Notificações em tempo real.
* Integração com serviços em nuvem.
* Alta disponibilidade.
* Monitoramento de desempenho.

---

# Visão de Evolução

```text
Versão 1.0
Protótipo Funcional
        │
        ▼
Versão 2.0
Backend + Banco de Dados
        │
        ▼
Versão 3.0
IA Generativa
        │
        ▼
Versão 4.0
SOC Inteligente
        │
        ▼
Versão 5.0
Plataforma Corporativa
```

---

# Considerações Finais

O CyberInsight AI foi concebido com uma arquitetura modular para permitir evolução contínua sem necessidade de reestruturações significativas.

A separação entre frontend, backend e futura camada de Inteligência Artificial facilita a expansão da aplicação e possibilita incorporar novas funcionalidades de forma incremental, preservando a organização e a manutenibilidade do projeto.
