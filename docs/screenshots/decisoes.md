# Decisões de Arquitetura e Design

## Objetivo

Este documento registra as principais decisões tomadas durante o desenvolvimento do CyberInsight AI, bem como as justificativas técnicas que motivaram cada escolha.

O objetivo é documentar o processo de construção da aplicação, permitindo compreender como as decisões influenciaram a arquitetura e preparando o projeto para futuras evoluções.

---

# Escolha do Problema

Foi escolhido o desenvolvimento de uma plataforma de apoio a analistas de um Centro de Operações de Segurança (SOC).

A escolha foi motivada por três fatores principais:

* alinhamento com a área de Segurança da Informação;
* potencial de aplicação prática após a conclusão da disciplina;
* possibilidade de futura integração com modelos de Inteligência Artificial Generativa.

O domínio de segurança cibernética apresenta um cenário adequado para utilização de IA em tarefas como classificação de incidentes, análise de logs e geração de recomendações de resposta.

---

# Escolha da Stack Tecnológica

## React

Foi escolhido React devido à sua arquitetura baseada em componentes, ampla adoção pela comunidade e facilidade de manutenção.

Principais vantagens:

* reutilização de componentes;
* escalabilidade;
* facilidade de integração com APIs;
* grande ecossistema.

---

## Vite

O Vite foi utilizado por oferecer inicialização rápida do projeto, recarga instantânea durante o desenvolvimento (Hot Module Replacement) e configuração simplificada.

---

## TypeScript

A utilização do TypeScript teve como objetivo reduzir erros de desenvolvimento por meio da tipagem estática e melhorar a organização do código.

---

## FastAPI

O backend foi planejado utilizando FastAPI devido ao seu alto desempenho, documentação automática e excelente integração com aplicações React.

Embora a integração completa não faça parte desta etapa da avaliação, a arquitetura foi preparada para suportar essa evolução.

---

## SQLite

O SQLite foi escolhido por ser um banco de dados leve, embarcado e compatível com os objetivos de um protótipo funcional.

Sua utilização elimina a necessidade de configurar servidores externos durante o desenvolvimento.

---

# Organização em Componentes

Optou-se por dividir a interface em componentes reutilizáveis.

Essa decisão reduz duplicação de código e facilita futuras manutenções.

Entre os componentes implementados destacam-se:

* Sidebar;
* Dashboard;
* Cards de indicadores;
* Cartões de incidentes;
* Modais;
* Componentes de navegação.

---

# Utilização de Dados Simulados

O edital da avaliação determina que não haja integração com modelos de Inteligência Artificial nesta etapa.

Por esse motivo, todas as funcionalidades inteligentes utilizam dados simulados (mock), permitindo demonstrar o fluxo esperado da aplicação sem depender de serviços externos.

Essa decisão permitiu concentrar o desenvolvimento na interface, navegação e experiência do usuário.

---

# Uso de Agentes de Codificação

O desenvolvimento foi realizado utilizando ferramentas de apoio baseadas em Inteligência Artificial.

As principais ferramentas utilizadas foram:

* OpenAI Codex para geração e edição de código;
* Visual Studio Code como ambiente principal de desenvolvimento;
* ChatGPT para planejamento da arquitetura, revisão técnica, depuração de erros e elaboração da documentação.

O uso combinado dessas ferramentas acelerou o desenvolvimento da aplicação, mantendo a supervisão humana para validação das decisões técnicas.

---

# Considerações Finais

As decisões adotadas buscaram equilibrar simplicidade, organização e possibilidade de evolução futura.

A arquitetura escolhida permite que novas funcionalidades sejam adicionadas sem necessidade de reestruturação significativa da aplicação, tornando o CyberInsight AI uma base adequada para futuras integrações com Inteligência Artificial Generativa.
