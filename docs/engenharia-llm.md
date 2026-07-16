## Engenharia LLM


# 1. Objetivo

A Engenharia de Large Language Models (LLMs) compreende o conjunto de práticas, decisões arquiteturais e técnicas empregadas para integrar modelos de linguagem de forma segura, modular e eficiente em aplicações de software. No CyberInsight AI, essa engenharia foi aplicada com o objetivo de incorporar uma LLM ao processo de análise de incidentes de segurança, permitindo que a Inteligência Artificial atue como apoio à tomada de decisão do analista sem substituir sua responsabilidade operacional.

A solução foi desenvolvida utilizando a API da OpenAI integrada ao backend em FastAPI. Toda a comunicação com o modelo é realizada por componentes específicos da aplicação, preservando a separação entre a lógica de negócio, a camada de integração com a LLM e a interface do usuário.

# 2. Arquitetura da Engenharia LLM

A integração da LLM foi organizada em camadas independentes, cada uma responsável por uma etapa específica do processamento.

O frontend, desenvolvido em React, envia o log de segurança ao backend por meio de uma API REST. O backend recebe a solicitação e encaminha o processamento ao SOC Agent, responsável por preparar o contexto da análise.

O agente utiliza um System Prompt especializado, registra as ferramentas disponíveis para Tool Calling e encaminha a requisição ao OpenAIService, que encapsula toda a comunicação com a API oficial da OpenAI. Após o processamento pelo modelo de linguagem, a resposta estruturada é validada por modelos Pydantic, garantindo que todos os campos estejam de acordo com o esquema definido pela aplicação antes de serem retornados ao frontend.

Essa organização reduz o acoplamento entre os componentes e facilita futuras substituições do provedor de Inteligência Artificial.

# 3. OpenAIService

Toda a comunicação com a OpenAI é centralizada na classe OpenAIService, responsável exclusivamente pela interação com o SDK oficial da OpenAI.

Entre suas responsabilidades destacam-se:

* leitura das variáveis de ambiente;
* autenticação utilizando OPENAI_API_KEY;
* configuração do modelo de linguagem;
* gerenciamento de timeout e tentativas de reconexão;
* encapsulamento das chamadas ao SDK oficial;
* tratamento centralizado de exceções.

Essa abordagem segue o princípio da responsabilidade única (Single Responsibility Principle), permitindo que alterações relacionadas ao provedor de IA sejam realizadas sem impacto na lógica de negócio da aplicação.

# 4. SOC Agent

O SOC Agent representa o núcleo da Engenharia LLM implementada no CyberInsight AI.

Sua principal responsabilidade é coordenar todas as etapas da interação entre a aplicação e a LLM.

# Entre suas funções destacam-se:

* construção do contexto da análise;
* preparação das mensagens enviadas ao modelo;
* aplicação do System Prompt;
* gerenciamento do Tool Calling;
* envio da requisição ao OpenAIService;
* validação da resposta recebida;
* retorno da análise estruturada para o restante da aplicação.

Ao concentrar essas responsabilidades em um único componente, a arquitetura torna-se mais organizada, reutilizável e de fácil manutenção.

# 5. Prompt Engineering

O comportamento da LLM é controlado por um System Prompt desenvolvido especificamente para o contexto de Segurança da Informação.

Esse prompt orienta o modelo para atuar como um analista SOC Nível 2, estabelecendo regras como:

* analisar exclusivamente as evidências presentes no log;
* não inventar indicadores de comprometimento;
* utilizar técnicas MITRE ATT&CK quando aplicáveis;
* gerar recomendações defensivas;
* respeitar o formato estruturado esperado pela aplicação.

A separação entre prompt e código facilita futuras revisões e ajustes sem necessidade de alterar a lógica do sistema.

# 6. Tool Calling

A solução implementa suporte ao recurso Tool Calling, permitindo que o modelo de linguagem solicite a execução de funções previamente registradas pelo backend.

Esse mecanismo amplia as capacidades da LLM, mantendo o controle da aplicação sobre quais ferramentas podem ser utilizadas durante o processo de análise.

A utilização de Tool Calling contribui para uma arquitetura mais flexível, preparada para futuras integrações com serviços externos e bases de conhecimento.

# 7. Structured Outputs

Para garantir consistência e previsibilidade nas respostas geradas pela LLM, foi adotado o recurso de Structured Outputs.

As respostas produzidas pela OpenAI são validadas utilizando modelos Pydantic, assegurando que todos os campos obrigatórios estejam presentes, com tipos compatíveis e estrutura adequada para processamento pelo backend e exibição no frontend.

Essa abordagem reduz inconsistências, facilita a integração entre os componentes e aumenta a confiabilidade da aplicação.

# 8. Segurança da Integração

A integração da LLM foi desenvolvida considerando boas práticas de segurança.

Entre as medidas adotadas destacam-se:

* armazenamento da chave da API em variáveis de ambiente;
* ausência de exposição da chave ao frontend;
* isolamento da comunicação com a OpenAI no backend;
* validação das entradas recebidas;
* tratamento centralizado de exceções;
* validação das respostas geradas pela LLM.

Essas práticas contribuem para preservar a confidencialidade das credenciais e aumentar a confiabilidade da solução.

# 9. Escalabilidade

A arquitetura foi projetada para permitir futuras evoluções com impacto mínimo sobre os componentes existentes.

Entre as possibilidades previstas destacam-se:

* integração com modelos locais por meio do Ollama;
* suporte a múltiplos provedores de LLM;
* implementação de Retrieval-Augmented Generation (RAG);
* integração com plataformas SIEM;
* utilização de agentes especializados para diferentes categorias de incidentes.

Como a comunicação com o modelo encontra-se encapsulada no OpenAIService, a substituição do provedor de Inteligência Artificial poderá ser realizada preservando a lógica de negócio da aplicação.

# 10. Considerações Finais

A Engenharia LLM do CyberInsight AI demonstra a aplicação prática de conceitos modernos de integração de modelos de linguagem em um contexto de Segurança da Informação. A utilização de um SOC Agent, associado ao OpenAIService, permite incorporar uma LLM da OpenAI ao fluxo de análise de incidentes, utilizando recursos como Prompt Engineering, Tool Calling e Structured Outputs.

A separação entre a camada de apresentação, a lógica de negócio, o agente responsável pela orquestração e o serviço de comunicação com a OpenAI torna a solução mais modular, reutilizável e preparada para futuras evoluções. Essa abordagem evidencia a aplicação de boas práticas de Engenharia de Software e Engenharia de LLM, atendendo aos objetivos técnicos do CyberInsight AI.