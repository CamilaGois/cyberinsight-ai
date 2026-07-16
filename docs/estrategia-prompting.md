

O CyberInsight AI foi projetado para utilizar uma arquitetura de prompts especializados, permitindo separar responsabilidades entre instruções permanentes do sistema e solicitações específicas enviadas pelo usuário.

Estrutura adotada

A solução foi organizada em três níveis de prompting:

# 1. Prompt de Sistema

Define o comportamento permanente do modelo.

Responsabilidades:

atuar como Analista SOC Nível 2;
limitar inferências;
impedir alucinações;
definir regras obrigatórias;
restringir severidades;
garantir conformidade com o schema JSON.

# 2. Prompt de Análise

Recebe o log enviado pelo usuário.

Responsável por:

interpretar o log;
identificar o incidente;
produzir resumo executivo;
identificar IoCs;
relacionar MITRE ATT&CK;
sugerir recomendações;
indicar playbook.

# 3. Prompt de Classificação

Executado para determinar:

categoria do incidente;
severidade;
justificativa técnica.

Categorias suportadas:

força bruta;
malware;
comunicação maliciosa;
varredura de portas;
tentativa de acesso não autorizado;
exfiltração de dados;
comportamento suspeito;
evento informativo;
outro incidente.


# Estratégias Utilizadas

Foram adotadas técnicas de Prompt Engineering para aumentar a consistência das respostas.

Entre elas:

Role Prompting
Constraint Prompting
Structured Output
Grounded Prompting
Zero Hallucination Rules
Evidence-Based Analysis
JSON Constrained Output

# Princípios adotados

Durante a análise:

nenhuma informação é inventada;
somente evidências do log são utilizadas;
recomendações são exclusivamente defensivas;
ações nunca são executadas automaticamente;
a decisão permanece sob responsabilidade do analista humano.

# Fluxo de funcionamento

Log recebido
      │
      ▼
Prompt de Sistema
      │
      ▼
Prompt de Análise
      │
      ▼
Prompt de Classificação
      │
      ▼
Resposta JSON
      │
      ▼
Dashboard / API

# Benefícios

A separação dos prompts proporciona:

maior consistência das respostas;
redução de alucinações;
facilidade de manutenção;
reutilização em diferentes endpoints;
melhor rastreabilidade das decisões produzidas pela IA.