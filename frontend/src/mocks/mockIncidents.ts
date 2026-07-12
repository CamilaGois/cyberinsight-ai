export interface Incident {
  id: string;
  timestamp: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  sourceIp: string;
  destinationIp: string;
  port: number;
  protocol: string;
  status: 'active' | 'investigating' | 'resolved';
  description: string;
  category: string;
}

// Gerador dinâmico para criar a massa de 200+ dados simulando SOC Real (Zeek/Splunk)
const generateMockIncidents = (): Incident[] => {
  const incidentTemplates = [
    { 
      title: 'SSH Brute Force Attempt', 
      severity: 'high', 
      protocol: 'TCP', 
      port: 22, 
      category: 'Authentication', 
      desc: 'Splunk logs correlated 45+ failed login attempts within 30 seconds from external IP.' 
    },
    { 
      title: 'Anomalous Data Exfiltration', 
      severity: 'critical', 
      protocol: 'HTTP', 
      port: 443, 
      category: 'Data Theft', 
      desc: 'Zeek connection logs (conn.log) show massive outbound payload spike to unclassified external IP.' 
    },
    { 
      title: 'Nmap Port Scan Detected', 
      severity: 'medium', 
      protocol: 'TCP', 
      port: 0, 
      category: 'Reconnaissance', 
      desc: 'Zeek notice.log identified sequential port probing across local asset subnet.' 
    },
    { 
      title: 'Ransomware Beaconing Activities', 
      severity: 'critical', 
      protocol: 'DNS', 
      port: 53, 
      category: 'Malware C2', 
      desc: 'Splunk query on DNS logs indicates persistent TXT record queries to known malicious domains.' 
    },
    { 
      title: 'SQL Injection Attempt', 
      severity: 'high', 
      protocol: 'HTTP', 
      port: 80, 
      category: 'Web Attack', 
      desc: 'Reverse proxy logs captured signature matching single quotes and UNION SELECT statements.' 
    },
    { 
      title: 'Unauthorized Privilege Escalation', 
      severity: 'critical', 
      protocol: 'TCP', 
      port: 443, 
      category: 'Access Control', 
      desc: 'Splunk correlated successful sudo/root authentication from a non-whitelisted management asset.' 
    },
    { 
      title: 'ICMP Flood (DDoS Simulation)', 
      severity: 'medium', 
      protocol: 'ICMP', 
      port: 0, 
      category: 'Availability', 
      desc: 'Zeek packet analyzer reporting high packet-per-second thresholds from distributed external vectors.' 
    }
  ];

  const statuses: ('active' | 'investigating' | 'resolved')[] = ['active', 'investigating', 'resolved'];
  const list: Incident[] = [];

  // Gerando exatamente 225 incidentes estruturados
  for (let i = 1; i <= 225; i++) {
    const template = incidentTemplates[i % incidentTemplates.length];
    
    // Distribuindo timestamps retroativos para gerar belos gráficos de linha (estilo Grafana)
    const timeOffset = new Date();
    timeOffset.setMinutes(timeOffset.getMinutes() - (i * 8)); 

    const srcOctet = 10 + (i % 45);
    const dstOctet = 100 + (i % 60);
    
    // Forçando uma variação realista de severidade em alguns itens
    let finalSeverity = template.severity;
    if (i % 15 === 0) finalSeverity = 'critical';
    if (i % 11 === 0) finalSeverity = 'high';
    if (i % 25 === 0) finalSeverity = 'low';

    list.push({
      id: `INC-2026-${String(i).padStart(4, '0')}`,
      timestamp: timeOffset.toISOString(),
      title: template.title,
      severity: finalSeverity as 'critical' | 'high' | 'medium' | 'low',
      sourceIp: `192.168.${srcOctet}.${100 + (i % 154)}`,
      destinationIp: `10.0.${dstOctet}.${20 + (i % 210)}`,
      port: template.port === 0 ? Math.floor(Math.random() * 58000) + 1024 : template.port,
      protocol: template.protocol,
      status: statuses[i % statuses.length],
      description: `${template.desc} [Audit Token ID: ZK-SP-${100000 + i}]`,
      category: template.category
    });
  }

  return list;
};

export const mockIncidents = generateMockIncidents();