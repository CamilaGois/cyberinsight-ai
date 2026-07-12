from fastapi import APIRouter

router = APIRouter(
    prefix="/api/playbooks",
    tags=["Playbooks"]
)


@router.get("/")
def list_playbooks():
    return [
        {
            "id": 1,
            "tática_mitre": "Acesso Inicial",
            "técnica_mapeada": "T1110 - Brute Force",
            "confiança": 94,
            "severidade": "Crítica",
            "tempo_estimado_min": 8,
            "passos_de_mitigação": [
                "1. Isolar host afetado da rede corporativa",
                "2. Ativar MFA para todas as contas de serviço",
                "3. Resetar senhas de contas administrativas",
                "4. Analisar logs de autenticação (últimas 48h)",
                "5. Verificar IAM para permissões anômalas",
                "6. Implementar rate limiting no RDP"
            ],
            "isolamento_recomendado": True,
            "prioridade": "CRÍTICA"
        },
        {
            "id": 2,
            "tática_mitre": "Execução",
            "técnica_mapeada": "T1055 - Process Injection",
            "confiança": 91,
            "severidade": "Alta",
            "tempo_estimado_min": 12,
            "passos_de_mitigação": [
                "1. Quarentena do arquivo suspeito",
                "2. Terminar processos maliciosos",
                "3. Executar scan completo com antivírus",
                "4. Analisar processos filhos e conexões de rede",
                "5. Verificar persistência (registry, startup)",
                "6. Restaurar máquina a snapshot anterior se disponível"
            ],
            "isolamento_recomendado": True,
            "prioridade": "ALTA"
        },
        {
            "id": 3,
            "tática_mitre": "Entrega de Engenharia Social",
            "técnica_mapeada": "T1566 - Phishing",
            "confiança": 96,
            "severidade": "Alta",
            "tempo_estimado_min": 10,
            "passos_de_mitigação": [
                "1. Bloquear remetente no gateway de email",
                "2. Remover email do servidor SMTP",
                "3. Avisar usuários de possível comprometimento",
                "4. Forçar reset de senha para destinatários",
                "5. Analisar links e anexos com sandbox",
                "6. Implementar DMARC/SPF/DKIM policies"
            ],
            "isolamento_recomendado": False,
            "prioridade": "ALTA"
        },
        {
            "id": 4,
            "tática_mitre": "Reconhecimento",
            "técnica_mapeada": "T1046 - Network Service Discovery",
            "confiança": 88,
            "severidade": "Média",
            "tempo_estimado_min": 6,
            "passos_de_mitigação": [
                "1. Bloquear IP na firewall",
                "2. Revisar portas abertas desnecessariamente",
                "3. Implementar port filtering rules",
                "4. Ativar IDS/IPS para detecção de varredura",
                "5. Monitorar atividades suspeitas da origem",
                "6. Considerar honeypots para rastreamento"
            ],
            "isolamento_recomendado": False,
            "prioridade": "MÉDIA"
        },
        {
            "id": 5,
            "tática_mitre": "Exploração de Segurança da Aplicação",
            "técnica_mapeada": "T1190 - Exploit Public-Facing Application",
            "confiança": 92,
            "severidade": "Alta",
            "tempo_estimado_min": 15,
            "passos_de_mitigação": [
                "1. Bloquear IP atacante na WAF",
                "2. Revisar aplicação para vulnerabilidades SQL Injection",
                "3. Implementar prepared statements",
                "4. Auditar logs de aplicação (últimas 72h)",
                "5. Verificar integridade do banco de dados",
                "6. Ativar CORS mais restritivo e rate limiting"
            ],
            "isolamento_recomendado": False,
            "prioridade": "ALTA"
        }
    ]