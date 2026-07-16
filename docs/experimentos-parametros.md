## Experimentos e Parâmetros


# 1. Objetivo

Este documento descreve os principais experimentos realizados durante o desenvolvimento do CyberInsight AI, bem como os parâmetros adotados para utilização da LLM integrada ao projeto.

Os experimentos tiveram como finalidade avaliar diferentes abordagens de implementação, comparar ferramentas de Inteligência Artificial e selecionar a configuração mais adequada para o contexto de análise de incidentes de segurança.

# 2. Comparação entre Ferramentas

Durante o desenvolvimento foram avaliadas diferentes ferramentas baseadas em LLM.

Entre elas:

ChatGPT;
OpenAI Codex;
Google Gemini;
Continue;
Cline;
Ollama (estudos para execução local).

As respostas produzidas foram comparadas considerando qualidade técnica, clareza, aderência ao projeto e facilidade de integração.

# 3. Escolha da OpenAI

Após os experimentos realizados, optou-se pela utilização da API da OpenAI como modelo principal do projeto.

Os principais fatores considerados foram:

* facilidade de integração com FastAPI;
* suporte oficial ao SDK Python;
* suporte a Structured Outputs;
* suporte a Tool Calling;
* documentação oficial completa;
* confiabilidade da plataforma.


# 4. Parâmetros Utilizados

A configuração da integração foi realizada por meio de variáveis de ambiente.

Principais parâmetros utilizados:

OPENAI_API_KEY;
OPENAI_MODEL;
OPENAI_TEMPERATURE;
OPENAI_TIMEOUT.

Essa abordagem permite alterar a configuração da LLM sem necessidade de modificar o código-fonte.

# 5. Estratégia de Prompt

Os experimentos também envolveram diferentes versões do System Prompt utilizado pelo SOC Agent.

Os testes permitiram identificar uma estrutura que produzia respostas mais consistentes para análise de incidentes, reduzindo ambiguidades e aumentando a padronização dos resultados.

# 6. Structured Outputs

Foi adotada a utilização de Structured Outputs para garantir que as respostas da LLM seguissem um formato estruturado previamente definido.

As respostas são posteriormente validadas por modelos Pydantic antes de serem utilizadas pelo restante da aplicação.

Essa estratégia reduz inconsistências e facilita o processamento automático das análises.

# 7. Tool Calling

Também foram realizados experimentos utilizando Tool Calling.

Essa funcionalidade permite que a LLM solicite a execução de funções previamente registradas pelo backend, ampliando as capacidades do agente e preparando a arquitetura para futuras integrações com fontes externas de informação.

# 8. Resultados Obtidos

Os experimentos realizados demonstraram que a utilização da API da OpenAI integrada ao SOC Agent produziu resultados consistentes para o contexto do projeto.

A arquitetura implementada apresentou:

* maior organização da lógica de negócio;
* respostas estruturadas;
* facilidade de manutenção;
* flexibilidade para futuras evoluções;
* compatibilidade com diferentes provedores de LLM.

# 9. Considerações Finais

Os experimentos realizados contribuíram para definir a arquitetura final do CyberInsight AI. A comparação entre diferentes ferramentas, aliada à escolha dos parâmetros adequados, permitiu integrar uma LLM real da OpenAI ao projeto de forma segura, modular e preparada para futuras evoluções, mantendo o foco na análise estruturada de incidentes de segurança da informação.