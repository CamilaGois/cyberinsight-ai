# cyberinsight-ai
Plataforma de apoio a analistas SOC para análise de logs de segurança utilizando IA Generativa, MITRE ATT&CK e Playbooks automatizados.

## Links do Projeto

| Recurso | Link |
|--------|------|
| Endpoint público da aplicação | [Acessar CyberInsight AI](COLE_AQUI_O_LINK_DO_ENDPOINT) |
| Repositório GitHub | [Ver repositório](https://github.com/CamilaGois/cyberinsight-ai) |

# CyberInsight AI

## Visão Geral

O **CyberInsight AI** é um protótipo de uma plataforma para apoio a analistas de um **Centro de Operações de Segurança (SOC - Security Operations Center)**. O sistema foi desenvolvido como parte da **Avaliação Intermediária da disciplina de IA Generativa**.

## Objetivo 

O objetivo do projeto é demonstrar como uma aplicação moderna pode auxiliar profissionais de Segurança da Informação na visualização, organização e gerenciamento de incidentes de segurança, preparando a estrutura para uma futura integração com modelos de Inteligência Artificial Generativa.

Nesta etapa do projeto, conforme solicitado no enunciado da avaliação, **nenhum modelo de IA foi integrado**. Todas as respostas que seriam produzidas por IA são apresentadas por meio de dados simulados (mock/placeholder), permitindo validar a interface, a navegação e o fluxo da aplicação sem depender de um modelo de linguagem.

O sistema foi desenvolvido utilizando um agente de codificação para acelerar o desenvolvimento da interface, da estrutura da aplicação e dos componentes, mantendo intervenção humana para revisão, correção de erros e tomada de decisões arquiteturais.

## Problema

Analistas de Segurança da Informação lidam diariamente com uma grande quantidade de alertas provenientes de diferentes ferramentas de monitoramento. A triagem manual desses incidentes pode ser lenta, repetitiva e suscetível a erros.

O CyberInsight AI foi concebido para centralizar essas informações em uma única interface, permitindo o cadastro, consulta, organização e acompanhamento de incidentes. Em uma etapa futura, a plataforma poderá utilizar IA Generativa para classificar incidentes, resumir eventos, sugerir playbooks de resposta e apoiar a tomada de decisão do analista SOC.

Nesta avaliação intermediária, o foco está exclusivamente na construção da interface, da navegação e da estrutura da aplicação, utilizando respostas simuladas para representar o comportamento esperado da futura integração com IA.
**

## Arquitetura da Aplicação

O projeto foi estruturado utilizando uma arquitetura em camadas, visando facilitar a manutenção, a escalabilidade e a futura integração com modelos de Inteligência Artificial Generativa.

### Frontend

O frontend foi desenvolvido utilizando **React**, **Vite** e **TypeScript**.

A escolha dessa stack foi motivada pelos seguintes fatores:

* Desenvolvimento rápido utilizando Vite;
* Componentização da interface com React;
* Maior segurança e organização do código através do TypeScript;
* Facilidade de integração futura com APIs REST.

O frontend concentra toda a experiência do usuário, incluindo:

* Landing Page;
* Login;
* Dashboard;
* Menu lateral;
* Upload de logs;
* Histórico de incidentes;
* Visualização de KPIs;
* Tabelas de eventos;
* Playbooks simulados;
* Navegação entre telas.

### Backend

Nesta etapa, o backend foi planejado como parte da arquitetura futura, mas o foco da entrega está no frontend funcional com dados simulados.

A escolha do FastAPI foi baseada em:

* Alto desempenho;
* Facilidade para criação de APIs REST;
* Excelente documentação automática;
* Integração simples com aplicações React;
* Facilidade de integração futura com modelos de IA.

Nesta etapa da avaliação, o backend tem como objetivo disponibilizar os dados necessários para a interface e preparar a aplicação para futuras funcionalidades inteligentes.

### Banco de Dados

O banco escolhido foi o **SQLite**, conforme recomendado no enunciado da avaliação.

Sua utilização apresenta diversas vantagens:

* Não necessita instalação de um servidor dedicado;
* Armazena todos os dados em um único arquivo;
* Facilidade de distribuição;
* Excelente desempenho para aplicações locais e protótipos.

### Arquitetura Geral

O fluxo previsto para a aplicação é o seguinte:

```text
Usuário
   │
   ▼
Frontend (React + Vite)
   │
   ▼
Backend (FastAPI)
   │
   ▼
SQLite
```

Em versões futuras, será adicionada uma camada de Inteligência Artificial entre o backend e os serviços responsáveis pela análise dos incidentes.

### Organização do Projeto

O projeto foi organizado para manter frontend e backend desacoplados, permitindo evolução independente de cada camada.

Estrutura prevista:

```text
cyberinsight-ai/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── app/
│   ├── database/
│   ├── routers/
│   └── main.py
│
├── docs/
│
└── README.md
```

Essa organização facilita futuras integrações, testes, manutenção e expansão do sistema, além de seguir boas práticas adotadas em aplicações web modernas.

## Funcionalidades Implementadas

O CyberInsight AI foi desenvolvido como um protótipo funcional de uma plataforma de apoio a analistas de Segurança da Informação (SOC), permitindo simular o fluxo de gerenciamento de incidentes antes da integração de modelos de Inteligência Artificial.

### Landing Page

A aplicação possui uma página inicial responsável por apresentar o sistema e direcionar o usuário para as principais funcionalidades da plataforma.

### Autenticação

Foi implementada uma interface de login para simular o acesso ao sistema. Nesta etapa da avaliação, o processo de autenticação possui finalidade demonstrativa e não realiza validação contra um banco de dados.

### Dashboard

O Dashboard centraliza as principais informações da aplicação por meio de indicadores e cartões de resumo, permitindo ao usuário visualizar rapidamente a situação geral dos incidentes cadastrados.

Entre os indicadores apresentados destacam-se:

* Quantidade total de incidentes;
* Incidentes críticos;
* Incidentes em análise;
* Incidentes resolvidos.

### Gerenciamento de Incidentes

A aplicação permite visualizar incidentes simulados contendo informações como:

* título;
* severidade;
* status;
* detalhes do incidente.

Esses dados são utilizados para demonstrar o fluxo esperado da futura integração com mecanismos inteligentes de análise.

### Pesquisa e Filtros

Foram implementados mecanismos de pesquisa e filtragem para facilitar a localização de incidentes específicos, simulando funcionalidades normalmente encontradas em plataformas SOC.

### Histórico

A aplicação mantém um histórico dos incidentes cadastrados, permitindo acompanhar a evolução das ocorrências durante a utilização do sistema.

### Playbooks (Simulados)

O sistema apresenta playbooks de resposta simulados para diferentes níveis de severidade.

Nesta etapa, esses playbooks são gerados a partir de regras pré-definidas e têm como objetivo representar como a Inteligência Artificial poderá sugerir procedimentos de resposta em versões futuras.

### Respostas Simuladas da IA

Em conformidade com o enunciado da avaliação, nenhuma IA Generativa foi integrada ao sistema.

As funcionalidades que futuramente dependerão de um modelo de linguagem utilizam atualmente respostas simuladas (mock), demonstrando o comportamento esperado da aplicação sem depender de serviços externos.

### Interface Responsiva

Os componentes foram organizados de forma modular visando facilitar manutenção, reutilização de código e futura expansão da plataforma.

## Processo de Desenvolvimento com Agente de Codificação

O desenvolvimento do CyberInsight AI foi realizado utilizando agentes de codificação com o objetivo de acelerar a construção da aplicação e explorar boas práticas de desenvolvimento assistido por Inteligência Artificial. O desenvolvimento foi realizado principalmente com o OpenAI Codex, utilizado para gerar componentes, páginas e estruturas da aplicação. O Visual Studio Code foi utilizado como ambiente de desenvolvimento para edição, testes e depuração. O ChatGPT foi empregado como ferramenta de apoio ao planejamento da arquitetura, revisão técnica, resolução de problemas encontrados durante a implementação e elaboração da documentação do projeto.

Durante o projeto, os agentes foram utilizados principalmente para:

* geração de componentes React;
* estruturação das páginas da aplicação;
* criação de rotas;
* organização da arquitetura do projeto;
* implementação de componentes reutilizáveis;
* revisão e correção de código;
* apoio na documentação do projeto.

O desenvolvimento ocorreu de forma incremental. Em vez de solicitar toda a aplicação em um único prompt, cada funcionalidade foi construída, testada e refinada individualmente.

### Ferramentas Utilizadas 

| Ferramenta | Finalidade no Projeto |
|------------|-----------------------|
| OpenAI Codex | Geração de código, criação de componentes, páginas e apoio no desenvolvimento da aplicação. |
| Visual Studio Code | Ambiente principal de desenvolvimento, edição de código, testes, depuração e organização do projeto. |
| ChatGPT | Planejamento da arquitetura, revisão técnica, resolução de erros, apoio na documentação e elaboração do README. |
| Git | Controle de versão durante o desenvolvimento. |
| GitHub | Hospedagem do repositório, versionamento e compartilhamento do código-fonte. |
| React | Desenvolvimento da interface da aplicação (Frontend). |
| Vite | Ferramenta de build e servidor de desenvolvimento do Frontend. |
| TypeScript | Tipagem estática e maior organização do código. |
| FastAPI | Arquitetura planejada para disponibilizar APIs REST e integrar futuramente os serviços de IA. |
| SQLite | Banco de dados local planejado para armazenamento dos dados da aplicação. |


### Exemplos de Prompts Utilizados

Alguns exemplos de solicitações feitas ao agente de codificação incluem:

* Criar um Dashboard moderno para um sistema SOC utilizando React e TypeScript.
* Desenvolver um componente reutilizável para exibição de incidentes de segurança.
* Criar uma tela de histórico de incidentes com filtros e pesquisa.
* Implementar uma interface de upload de logs com dados simulados.
* Organizar a estrutura do projeto utilizando React + Vite.

Esses prompts foram refinados ao longo do desenvolvimento conforme novas necessidades surgiam e conforme eram identificados pontos de melhoria na interface.

## O que Funcionou Bem

O uso do agente de codificação apresentou resultados positivos principalmente na geração da estrutura inicial da aplicação.

Os principais benefícios observados foram:

* rápida criação da estrutura do projeto;
* geração de componentes React reutilizáveis;
* organização inicial das páginas;
* aceleração da implementação da interface;
* auxílio na escrita e revisão de trechos de código;
* suporte na documentação do projeto.

A utilização do agente reduziu significativamente o tempo necessário para implementar telas e componentes repetitivos, permitindo concentrar mais esforço na organização da arquitetura e na validação das funcionalidades.

## Limitações Encontradas

Durante o desenvolvimento também foram identificadas limitações importantes.

Em algumas situações, o agente gerou alterações que provocaram conflitos entre arquivos ou exigiram intervenção manual para correção.

Entre as principais dificuldades encontradas destacam-se:

* conflitos entre importações e exportações de módulos;
* erros de compilação após alterações simultâneas em múltiplos arquivos;
* necessidade de revisar manualmente componentes antes da integração;
* ajustes manuais para manter consistência entre as rotas da aplicação;
* necessidade de reorganizar parte da arquitetura durante a evolução do projeto.

Essas experiências demonstraram que, embora os agentes de codificação acelerem o desenvolvimento, a supervisão humana continua sendo essencial para validar decisões arquiteturais, testar a aplicação e corrigir inconsistências.

## Lições Aprendidas

Ao longo do desenvolvimento ficou evidente que os melhores resultados foram obtidos quando o projeto foi construído de forma incremental.

Solicitações menores, específicas e acompanhadas de testes frequentes produziram resultados mais consistentes do que grandes alterações realizadas de uma única vez.

Essa experiência reforçou a importância de utilizar agentes de codificação como ferramentas de apoio ao desenvolvimento, mantendo o desenvolvedor responsável pelas decisões técnicas, validação das funcionalidades e integração entre os componentes da aplicação.

### Como Executar o Projeto

### Pré-requisitos

Antes de executar o projeto, é necessário possuir instalado:

* Node.js (versão 20 ou superior)
* npm
* Python 3.11 ou superior (para o backend)
* Git

---

### Clonando o Repositório

```bash
git clone https://github.com/CamilaGois/cyberinsight-ai

cd cyberinsight-ai
```

---

## Executando o Frontend

Acesse a pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute a aplicação:

```bash
npm run dev
```

O frontend ficará disponível em:

```text
http://localhost:5173
```

---

## Executando o Backend

Acesse a pasta do backend:

```bash
cd backend
```

Crie um ambiente virtual:

```bash
python -m venv .venv
```

Ative o ambiente virtual.

Windows:

```bash
.venv\Scripts\activate
```

Linux/macOS:

```bash
source .venv/bin/activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

Execute o servidor:

```bash
uvicorn app.main:app --reload
```

A API ficará disponível em:

```text
http://localhost:8000
```

A documentação automática poderá ser acessada em:

```text
http://localhost:8000/docs
```

---

## Banco de Dados

O projeto foi planejado para utilizar SQLite como banco de dados local.

Toda a persistência da aplicação será realizada por meio de um único arquivo de banco de dados, simplificando a instalação e a distribuição do sistema.

---

## Fluxo da Aplicação

O funcionamento esperado da aplicação é:

1. O usuário acessa a Landing Page.
2. Realiza o login na plataforma.
3. Visualiza o Dashboard com os principais indicadores.
4. Consulta o histórico de incidentes.
5. Realiza upload de arquivos de log.
6. Visualiza incidentes simulados.
7. Solicita uma análise.
8. O sistema apresenta uma resposta simulada (mock), representando a futura integração com Inteligência Artificial.

---

## Tecnologias Utilizadas

### Frontend

* React
* Vite
* TypeScript
* React Router

### Backend

* FastAPI
* Python

### Banco de Dados

* SQLite

### Ferramentas

* Git
* GitHub
* Agente de Codificação (OpenAI Codex)
* ChatGPT (planejamento, revisão e documentação)

## Decisões de Design

Durante o desenvolvimento do CyberInsight AI, foram tomadas decisões de arquitetura e interface visando construir uma aplicação organizada, escalável e preparada para futuras integrações com Inteligência Artificial Generativa.

### Escolha do Problema

O problema escolhido foi o desenvolvimento de uma plataforma de apoio a analistas de um Centro de Operações de Segurança (SOC), permitindo o gerenciamento e acompanhamento de incidentes de segurança.

Essa escolha foi motivada pela relevância da área de Segurança da Informação e pelo potencial de utilização futura de modelos de IA para automatizar tarefas como classificação de incidentes, geração de playbooks, análise de logs e apoio à tomada de decisão.

### Arquitetura

Foi adotada uma arquitetura separando frontend e backend.

Essa organização facilita:

* manutenção da aplicação;
* reutilização de componentes;
* escalabilidade do projeto;
* futura integração com APIs de Inteligência Artificial.

O frontend foi desenvolvido utilizando React + Vite + TypeScript, enquanto o backend foi planejado utilizando FastAPI com persistência em SQLite.

### Componentização

A interface foi organizada em componentes reutilizáveis, reduzindo duplicação de código e facilitando futuras evoluções da aplicação.

Entre os principais componentes destacam-se:

* Sidebar;
* Dashboard;
* Cards de indicadores (KPIs);
* Cartões de incidentes;
* Modal de análise;
* Componentes de navegação.

### Interface do Usuário

O layout foi planejado para proporcionar uma experiência semelhante à encontrada em plataformas profissionais de monitoramento de segurança.

As principais decisões de interface incluem:

* menu lateral para navegação entre módulos;
* dashboard centralizado com indicadores;
* filtros para pesquisa de incidentes;
* organização visual baseada em cartões (cards);
* separação clara entre informações operacionais e analíticas.

### Uso de Dados Simulados

Conforme solicitado no enunciado da avaliação, as funcionalidades que dependeriam de Inteligência Artificial utilizam dados simulados (mock).

Essa abordagem permitiu validar toda a navegação e os fluxos da aplicação sem integrar um modelo de linguagem nesta etapa do projeto.

### Evolução Futura

A arquitetura foi planejada para permitir que futuras versões da aplicação integrem modelos de IA Generativa sem necessidade de reestruturação significativa.

Entre as funcionalidades previstas para versões futuras estão:

* classificação automática de incidentes;
* geração inteligente de playbooks;
* resumo automático de logs;
* análise contextual de eventos de segurança;
* recomendações de resposta baseadas em Inteligência Artificial.

Essa estratégia permitiu manter o foco da avaliação na construção da interface e da estrutura da aplicação, deixando a camada de IA preparada para uma etapa posterior do projeto.


## Dificuldades Encontradas e Lições Aprendidas

O desenvolvimento do CyberInsight AI demonstrou que agentes de codificação podem acelerar significativamente a implementação de uma aplicação, porém também evidenciou a importância da supervisão humana durante todo o processo.

Ao longo do projeto foram identificados desafios técnicos e situações que exigiram análise, testes e correções manuais.

### Principais Dificuldades

Durante a implementação foram observados os seguintes problemas:

* conflitos entre importações (`import`) e exportações (`export`) de módulos TypeScript;
* erros de compilação ocasionados por alterações simultâneas em diferentes arquivos;
* telas em branco causadas por inconsistências entre componentes e rotas da aplicação;
* necessidade de revisar manualmente componentes gerados pelo agente antes de integrá-los ao restante do sistema;
* ajustes na organização das rotas para manter a navegação consistente.

Esses problemas reforçaram a importância de validar continuamente a aplicação após cada alteração realizada.

### Estratégia Adotada

Inicialmente foram realizadas alterações em vários componentes simultaneamente, o que dificultou a identificação da origem de alguns erros.

Após essa experiência, o desenvolvimento passou a seguir uma abordagem incremental:

1. Planejamento da funcionalidade.
2. Geração do código utilizando o agente de codificação.
3. Testes locais da funcionalidade.
4. Correções manuais quando necessário.
5. Registro das alterações no repositório Git.
6. Continuação para a próxima funcionalidade somente após estabilização da etapa anterior.

Essa estratégia reduziu significativamente a ocorrência de novos erros e facilitou a manutenção da aplicação.

### Papel da Supervisão Humana

Embora o agente de codificação tenha acelerado a criação de componentes e estruturas da aplicação, diversas decisões permaneceram sob responsabilidade do desenvolvedor.

Entre elas destacam-se:

* definição da arquitetura do sistema;
* validação da consistência entre os componentes;
* identificação e correção de erros de integração;
* organização da estrutura do projeto;
* elaboração da documentação técnica.

Essa experiência demonstrou que agentes de codificação atuam como ferramentas de apoio ao desenvolvimento, mas não substituem a necessidade de revisão técnica e tomada de decisão por parte do desenvolvedor.

### Lições Aprendidas

Ao final desta etapa foi possível identificar alguns fatores que contribuíram para um desenvolvimento mais eficiente:

* dividir funcionalidades complexas em pequenas etapas;
* utilizar prompts específicos e objetivos;
* testar frequentemente a aplicação durante o desenvolvimento;
* documentar decisões técnicas ao longo do projeto;
* manter o repositório organizado com commits frequentes;
* revisar cuidadosamente o código gerado antes de integrá-lo ao projeto.

Essas práticas contribuíram para melhorar a qualidade do código produzido e reduzir o retrabalho durante a implementação.


## Conclusão e Trabalhos Futuros

O **CyberInsight AI** foi desenvolvido como um protótipo funcional para apoiar analistas de um Centro de Operações de Segurança (SOC), com foco na organização da interface, navegação e estrutura da aplicação.

Durante esta etapa do projeto, foram implementadas as principais telas e componentes necessários para simular o fluxo de gerenciamento de incidentes de segurança. Em conformidade com os requisitos da avaliação, as funcionalidades que futuramente utilizarão Inteligência Artificial foram representadas por dados simulados (mock), permitindo validar a experiência do usuário sem integrar modelos de IA nesta fase.

O desenvolvimento utilizando agentes de codificação demonstrou ganhos significativos de produtividade na criação de componentes, organização da interface e geração da estrutura inicial do projeto. Entretanto, também evidenciou que a revisão humana continua sendo indispensável para validar decisões técnicas, corrigir inconsistências e garantir a qualidade do software.

Como evolução natural do projeto, estão previstas as seguintes funcionalidades:

* integração de um modelo de IA Generativa para análise automática de incidentes;
* geração inteligente de playbooks de resposta;
* classificação automática de alertas por nível de criticidade;
* análise contextual de arquivos de log;
* geração de resumos técnicos para apoio aos analistas SOC;
* autenticação completa de usuários;
* persistência de dados em banco SQLite por meio de uma API desenvolvida com FastAPI;
* implantação da aplicação em ambiente de nuvem para uso colaborativo.

O CyberInsight AI foi concebido para servir como base para essas evoluções, mantendo uma arquitetura modular e preparada para futuras integrações. Dessa forma, o projeto atende ao objetivo desta avaliação ao apresentar uma aplicação funcional, organizada e preparada para incorporar recursos de Inteligência Artificial em etapas posteriores.

---

## Autor

**Camila Gois de Jesus**

Engenheira de Computação, com especialização em Redes de Computadores e formação complementar em Cibersegurança. O desenvolvimento deste projeto fez parte da Avaliação Intermediária da disciplina de IA Generativa, utilizando agentes de codificação para apoiar a implementação da aplicação e documentando, de forma crítica, os resultados obtidos durante o processo.

---

## Agradecimentos

Agradeço aos professores da disciplina pela proposta da atividade, que proporcionou uma experiência prática no uso de agentes de codificação aplicados ao desenvolvimento de software. A avaliação permitiu compreender tanto os benefícios quanto as limitações dessas ferramentas, reforçando a importância da supervisão humana, da validação contínua e da documentação técnica ao longo do ciclo de desenvolvimento.

## Documentação Complementar

Além deste README, o projeto possui uma pasta `docs/prompts/`, separados por dia, com materiais de apoio ao desenvolvimento, evidências do uso de agentes de codificação, registros de decisões técnicas e capturas de tela da aplicação, para evidenciar o uso incremental do agente de codificação.


| Arquivo/Pasta | Descrição |
|--------------|-----------|
| `docs/prompts/` | Registros dos prompts utilizados durante o desenvolvimento com agentes de codificação. |
| `docs/prompts/dia01.md` | Prompts utilizados no primeiro dia de desenvolvimento. |
| `docs/prompts/dia02.md` | Prompts utilizados no segundo dia de desenvolvimento. |
| `docs/prompts/dia03.md` | Prompts utilizados no terceiro dia de desenvolvimento. |
| `docs/prompts/dia04.md` | Prompts utilizados no quarto dia de desenvolvimento. |
| `docs/prompts/dia05.md` | Prompts utilizados no quinto dia de desenvolvimento. |
| `docs/screenshots/` | Capturas de tela das principais telas da aplicação. |
| `docs/arquitetura.md` | Descrição mais detalhada da arquitetura proposta para o projeto. |
| `docs/decisoes.md` | Registro das principais decisões técnicas e de design tomadas durante o desenvolvimento. |
| `docs/problemas-encontrados.md` | Dificuldades, erros e limitações observadas durante a implementação. |
| `docs/roadmap.md` | Planejamento de melhorias futuras e evolução da aplicação. |

## Limitação encontrada no backend

Durante a preparação do backend com FastAPI, foi identificada incompatibilidade do ambiente local com Python 3.14, especialmente na instalação do `pydantic-core`, dependência utilizada pelo FastAPI/Pydantic.

Por esse motivo, a entrega intermediária priorizou o frontend funcional, a estrutura da aplicação, a navegação, as telas e os dados simulados, conforme o foco principal da avaliação. A arquitetura FastAPI + SQLite permanece documentada como evolução planejada.
