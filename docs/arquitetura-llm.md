## Arquitetura LLM

# Introdução

O CyberInsight AI implementa uma arquitetura baseada em Large Language Models (LLMs) para apoiar a análise de incidentes de segurança da informação. A solução integra a API da OpenAI ao backend desenvolvido em FastAPI, utilizando um SOC Agent responsável por orquestrar todo o fluxo de processamento das análises.

A arquitetura foi projetada seguindo princípios de modularidade, separação de responsabilidades e baixo acoplamento. A comunicação com a OpenAI é encapsulada em um serviço dedicado (OpenAIService), permitindo que a lógica de negócio permaneça independente do provedor de Inteligência Artificial. Essa abordagem facilita futuras integrações com outros modelos, como Gemini ou Ollama, sem necessidade de alterações significativas na arquitetura da aplicação.

Durante o processamento de um log de segurança, o SOC Agent constrói o contexto da análise por meio de um System Prompt, envia a requisição para a OpenAI utilizando o SDK oficial, executa Tool Calling quando necessário e recebe uma resposta estruturada validada por Structured Outputs e modelos Pydantic. Após a validação, o resultado é disponibilizado ao frontend e pode ser armazenado no histórico de incidentes da aplicação.

A arquitetura implementada também adota boas práticas relacionadas à segurança da informação, como armazenamento da chave da API em variáveis de ambiente, validação de entradas, tratamento de exceções e isolamento da comunicação com o provedor de IA. Dessa forma, a aplicação mantém uma estrutura preparada para evolução futura, preservando a confiabilidade das análises e a facilidade de manutenção do código.

# O que já está implementado

A versão atual do CyberInsight AI possui os seguintes componentes implementados:

* Frontend desenvolvido em React e TypeScript;
* Backend desenvolvido em FastAPI;
* Banco de dados SQLite para persistência dos incidentes;
* OpenAIService para encapsular toda a comunicação com a API da OpenAI;
* SOC Agent responsável pela orquestração da análise dos logs;
* Prompt Engineering utilizando System Prompt externo;
* Tool Calling para execução controlada de ferramentas durante o processo de análise;
* Structured Outputs para garantir respostas estruturadas;
* Validação das respostas utilizando modelos Pydantic;
* Endpoint POST /api/ai/analyze para processamento dos logs de segurança;
* Arquitetura preparada para substituição do provedor de LLM sem impacto na lógica de negócio.
* Evoluções futuras

# Embora a arquitetura principal esteja implementada, algumas evoluções podem ampliar as capacidades do CyberInsight AI:

* integração com SIEMs reais;
* utilização de bancos vetoriais para implementação de RAG (Retrieval-Augmented Generation);
* suporte a múltiplos provedores de LLM;
* integração com modelos locais por meio do Ollama;
* processamento assíncrono de grandes volumes de logs;
* agentes especializados para diferentes categorias de incidentes.
* Limitações atuais

# A versão atual apresenta algumas limitações inerentes ao escopo acadêmico do projeto:

* dependência da API da OpenAI para realização das análises;
* utilização do SQLite como banco de dados local;
* ausência de integração direta com plataformas SIEM em ambiente de produção;
* necessidade de conexão com a Internet para utilização da LLM;
* ausência de mecanismos de cache para respostas da IA.


# Conclusão

A arquitetura implementada no CyberInsight AI demonstra uma aplicação prática de Large Language Models no contexto da Segurança da Informação. A integração entre FastAPI, OpenAI, SOC Agent, Tool Calling, Structured Outputs e Pydantic permite que a análise de logs seja realizada de forma estruturada, validada e preparada para futuras evoluções.

A separação entre a camada de apresentação, a lógica de negócio, o agente responsável pela orquestração e o serviço de comunicação com a OpenAI torna a solução mais modular, reutilizável e de fácil manutenção. Além disso, a abstração do provedor de IA possibilita a adoção de outros modelos de linguagem no futuro, preservando a arquitetura principal da aplicação.

Esse conjunto de decisões demonstra a aplicação de boas práticas de Engenharia de Software e Engenharia de LLM, atendendo ao objetivo do projeto de utilizar uma LLM real para apoiar a análise de incidentes de segurança da informação.