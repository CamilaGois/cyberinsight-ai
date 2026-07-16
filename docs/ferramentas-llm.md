## Ferramentas LLM

# 1. Objetivo

Este documento apresenta as principais ferramentas baseadas em Large Language Models (LLMs) utilizadas durante o desenvolvimento do CyberInsight AI, descrevendo suas funções, aplicações e contribuição para o projeto.

A estratégia adotada consistiu na utilização complementar de diferentes ferramentas de Inteligência Artificial, explorando as características específicas de cada uma para apoiar o desenvolvimento, documentação, revisão de código e implementação da arquitetura baseada em LLM.

# 2. OpenAI

A OpenAI foi escolhida como a plataforma principal de Inteligência Artificial utilizada pelo CyberInsight AI.

Além de auxiliar durante o desenvolvimento do projeto, sua API foi integrada ao backend da aplicação para realizar a análise dos logs de segurança.

A comunicação é realizada por meio do OpenAIService, que encapsula todas as chamadas ao SDK oficial, utilizando autenticação por meio da variável de ambiente OPENAI_API_KEY.

A integração utiliza recursos modernos da plataforma, como:

* Prompt Engineering;
* Tool Calling;
* Structured Outputs;
* validação por modelos Pydantic;
* SDK oficial da OpenAI.

Essa abordagem permitiu que a aplicação utilizasse uma LLM real durante o processamento dos incidentes.

# 3. ChatGPT

O ChatGPT foi utilizado como ferramenta de apoio ao desenvolvimento do projeto.

Entre suas principais aplicações destacam-se:

* elaboração da arquitetura da solução;
* desenvolvimento de componentes React;
* apoio na implementação do backend;
* revisão de código;
* elaboração da documentação técnica;
* organização do README;
* revisão de requisitos do projeto;
* apoio na modelagem da Engenharia LLM.

Todas as sugestões recebidas foram analisadas criticamente antes de sua incorporação ao projeto.

# 4. OpenAI Codex

O OpenAI Codex foi utilizado integrado ao Visual Studio Code como agente de desenvolvimento.

Suas principais contribuições foram:

* implementação de funcionalidades;
* correção de erros de compilação;
* refatoração de código;
* organização estrutural do projeto;
* integração entre frontend e backend;
* geração de arquivos técnicos.

Sua integração ao ambiente de desenvolvimento contribuiu para acelerar a implementação da aplicação.

# 5. Google Gemini

O Google Gemini foi utilizado principalmente como ferramenta de comparação técnica.

Durante o desenvolvimento, suas respostas foram comparadas às produzidas pelo ChatGPT e Codex para avaliar diferentes alternativas de implementação.

Essa estratégia auxiliou na escolha das soluções mais adequadas para cada etapa do projeto.

# 6. Continue

O Continue foi utilizado como extensão integrada ao Visual Studio Code.

Sua utilização concentrou-se no suporte ao desenvolvimento, oferecendo sugestões rápidas de código e pequenas correções diretamente no ambiente de programação.

# 7. Cline

O Cline foi utilizado como agente de desenvolvimento para automatizar tarefas relacionadas à implementação da aplicação.

Entre suas contribuições destacam-se:

* criação de componentes;
* geração de arquivos;
* implementação de funcionalidades;
* organização da arquitetura;
* auxílio em refatorações.

Sua utilização complementou as demais ferramentas empregadas durante o desenvolvimento.

# 8. Ollama

Durante o desenvolvimento também foram realizados estudos utilizando o Ollama, plataforma destinada à execução local de modelos de linguagem.

Entretanto, optou-se por não utilizá-lo na versão final da aplicação devido à necessidade de disponibilizar um endpoint público acessível para avaliação do projeto.

Apesar disso, a arquitetura implementada foi desenvolvida de forma modular, permitindo futura substituição da OpenAI por modelos locais executados via Ollama.

# 9. Estratégia de Utilização

As ferramentas não foram utilizadas de forma isolada.

Sempre que necessário, uma mesma tarefa era analisada por diferentes modelos de linguagem, permitindo comparar alternativas antes da implementação definitiva.

Os principais critérios considerados foram:

* qualidade técnica;
* clareza das respostas;
* aderência ao projeto;
* facilidade de manutenção;
* boas práticas de Engenharia de Software;
* compatibilidade com a arquitetura existente.


# 10. Considerações Finais

A utilização conjunta de diferentes ferramentas baseadas em LLM permitiu aumentar a produtividade, melhorar a qualidade do código e apoiar a implementação da arquitetura do CyberInsight AI. A integração efetiva da API da OpenAI ao backend consolidou a utilização de uma LLM real no projeto, enquanto as demais ferramentas contribuíram como suporte ao desenvolvimento, documentação e validação das decisões técnicas.