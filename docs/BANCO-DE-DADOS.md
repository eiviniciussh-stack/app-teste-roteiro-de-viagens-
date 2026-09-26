# Banco de dados

## Status

Supabase será adotado futuramente para PostgreSQL, autenticação e storage. **Não há cliente, projeto, migrations ou credenciais Supabase nesta etapa.** Este documento é um desenho inicial; nomes e cardinalidades serão validados por migrations revisadas antes da integração.

## Princípios de modelagem

- UUIDs como identificadores opacos; `created_at`/`updated_at` em `timestamptz`.
- Instantes em UTC e fuso IANA (`America/Sao_Paulo`) separado na viagem.
- Integridade por foreign keys, checks, unicidade e transações; não apenas pelo cliente.
- RLS habilitada em todas as tabelas expostas. Service role nunca no aplicativo.
- Soft delete somente quando houver requisito de recuperação/auditoria; não como padrão automático.
- Dados externos guardam provedor, identificador externo, URL/fonte e `fetched_at`; conteúdo volátil tem validade.
- Minimização e retenção explícita para localização, crianças, restrições e demais dados pessoais.

## Modelo conceitual proposto

| Entidade | Responsabilidade e campos principais |
|---|---|
| `profiles` | extensão mínima de `auth.users`: nome, locale e preferências |
| `trips` | dono, destino, início/fim, fuso, ritmo, orçamento/moeda e estado |
| `trip_members` | associação usuário–viagem e papel `organizer/participant` |
| `trip_preferences` | interesses, refeições, necessidades e composição do grupo |
| `accommodations` | hospedagem e coordenadas opcionais por período |
| `itinerary_versions` | versões imutáveis, autoria, motivo e versão-base |
| `itinerary_days` | data local e ordenação dentro de uma versão |
| `itinerary_items` | lugar/atividade, janela, duração, posição e observações |
| `travel_legs` | origem/destino, modal, duração/distância e dados do provedor |
| `places` | snapshot normalizado de lugar e coordenadas |
| `external_place_facts` | fatos por fonte: horário, avaliação, contagem e atualização |
| `change_proposals` | diferenças propostas, estado, contexto e confirmação/rejeição |
| `saved_places` | lugares salvos pelo usuário |
| `user_place_reviews` | avaliação privada/do produto, distinta da pública |
| `sync_operations` | suporte futuro a mutações offline idempotentes, se necessário |

Listas de interesses/restrições podem começar em `jsonb` validado enquanto o vocabulário evolui, mas campos consultados ou relacionados devem ser normalizados. Avaliações públicas são snapshots atribuídos, não uma verdade permanente.

## Versionamento e confirmação

Uma versão aprovada é imutável. Edições e sugestões criam `change_proposals` apontando para uma `base_version_id`. Confirmar, dentro de uma transação, verifica se a base ainda é atual, cria uma nova versão e registra ator/instante. Propostas com base antiga expiram ou exigem reconciliação; jamais sobrescrevem silenciosamente edições recentes.

## Autorização/RLS pretendida

- Usuários leem viagens em que possuem associação ativa.
- Apenas organizadores inserem/alteram conteúdo, membros e propostas confirmadas.
- Participantes têm leitura, conforme escopo compartilhado.
- Perfil é lido/editado pelo próprio usuário, salvo campos explicitamente públicos.
- Storage usa caminhos vinculados à viagem/usuário e políticas equivalentes.

Toda policy será testada com casos positivos e negativos. Convites, transferência de organização e revogação ainda precisam de especificação.

## Offline e conflitos

O banco local futuro é cache, não um segundo backend. Cada agregado sincronizável carrega versão/`updated_at`; comandos têm chave de idempotência. Em conflito, o cliente preserva ambas as intenções e solicita decisão do organizador. Dados essenciais armazenados localmente devem respeitar logout, revogação de acesso e proteção oferecida pelo dispositivo.

## Storage

Avatares e anexos futuros devem usar buckets privados por padrão, validação de MIME/tamanho e URLs assinadas curtas. Imagens de lugares de provedores externos não serão copiadas sem direito/licença e manterão atribuição exigida.

## Migrations e ambientes

Quando Supabase for iniciado, schema e policies existirão como migrations versionadas, com dados seed exclusivamente fictícios. Desenvolvimento, staging e produção terão projetos e chaves separados. Backups, restauração, índices e plano de retenção serão definidos antes de dados reais.

## Pendências de decisão

- requisitos legais/retention e visibilidade de necessidades do grupo;
- modelo de convites e múltiplos organizadores;
- granularidade do histórico e restauração;
- esquema do cache local e estratégia de merge;
- provedores externos, termos de armazenamento e atribuição;
- se avaliações do usuário serão privadas, compartilhadas na viagem ou públicas.
