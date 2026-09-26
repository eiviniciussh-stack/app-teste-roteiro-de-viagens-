# Arquitetura

## Contexto e escopo inicial

O Roteiro Inteligente é um aplicativo Expo/React Native em TypeScript, direcionado exclusivamente a Android e iOS. A primeira entrega estabelece limites arquiteturais, qualidade e uma tela de validação; autenticação, navegação, mapas, persistência, geração de roteiro e fornecedores externos não fazem parte dela.

## Princípios

1. **Domínio independente:** decisões de viagem não dependem de UI, Expo, Supabase ou SDKs externos.
2. **Dependências invertidas:** casos de uso conhecem contratos; adaptadores de terceiros os implementam.
3. **Mudanças confirmáveis:** sugestões e um roteiro efetivamente aprovado são estados distintos e auditáveis.
4. **Offline por projeto:** informações essenciais de viagens carregadas terão leitura local, estado de sincronização e resolução explícita de conflitos.
5. **Internacionalização desde o início:** textos não são escritos diretamente em telas; locale, moeda e fuso são dados diferentes.
6. **Entrega incremental:** só se adiciona infraestrutura quando houver um caso de uso concreto.

## Camadas e pastas

```text
src/
├── domain/          # Entidades, value objects e regras puras
├── application/     # Casos de uso, DTOs e portas
├── infrastructure/  # Supabase, cache e provedores externos (futuro)
├── presentation/    # Telas e componentes reutilizáveis
├── services/        # i18n e serviços transversais
├── state/           # Estado compartilhado, quando justificado
├── theme/           # Tokens visuais
└── utils/           # Funções genéricas e puras
```

Fluxo esperado: `presentation → application → domain`. A infraestrutura também depende das portas de `application`; ela nunca será importada pelo domínio. O ponto de composição cria implementações e as injeta nos casos de uso.

## Estado e dados

- Estado efêmero de UI permanece local.
- Estado remoto deve possuir cache e representar `idle/loading/success/error`, atualização e origem do dado.
- Estado de viagem aprovado não é sobrescrito por sugestão. Uma proposta contém base/versionamento, diferenças, justificativa logística e aguarda confirmação.
- Datas persistidas usam ISO 8601/UTC. A viagem mantém seu fuso IANA para apresentação e regras locais.
- Identificadores são opacos; componentes não inferem semântica a partir deles.

Uma biblioteca de navegação e uma solução de estado/cache serão escolhidas somente com os primeiros fluxos, por ADR, evitando dependências prematuras.

## Integrações futuras

Mapas, lugares/avaliações, clima, rotas/transporte e IA entram por portas como as de `src/application/ports`. Cada resposta deverá registrar provedor, instante de consulta e, quando aplicável, validade/fonte. Falhas devem degradar a experiência sem fabricar informação.

Supabase será responsável por autenticação, PostgreSQL e storage. Políticas Row Level Security serão obrigatórias antes de dados reais. O cliente mobile nunca receberá uma service role key.

## Offline e sincronização

O cache local futuro deve conter viagem, participantes, dias, itens e dados essenciais já carregados. Conteúdo volátil (clima, funcionamento e disponibilidade) exibirá quando foi atualizado. Edições offline entram em uma fila idempotente; conflitos com versões remotas são mostrados ao organizador, nunca silenciosamente resolvidos alterando um roteiro aprovado.

## Segurança e observabilidade

- Nenhum segredo no bundle ou Git; chaves públicas com restrições por aplicativo ainda devem ser configuradas por ambiente.
- Minimize dados de localização, peça permissão no contexto e defina retenção.
- Logs não contêm localização precisa, tokens nem dados pessoais.
- Erros técnicos e eventos de produto terão adaptadores próprios; o domínio não importa SDK de telemetria.

## Qualidade

TypeScript estrito, ESLint e Prettier compõem a base. Regras puras e casos de uso terão testes unitários; adaptadores terão testes de contrato; fluxos críticos ganharão testes de integração/E2E quando existirem. `npm run check` é a verificação mínima local e de CI.

## Decisões adiadas

- Navegação e estratégia de deep links;
- biblioteca de estado/cache e persistência offline;
- fornecedores de mapas, lugares, clima, transporte, IA e avaliações;
- analytics, crash reporting e notificações;
- detalhes do algoritmo de otimização.

Essas decisões exigem requisitos, custos e políticas de privacidade concretos e devem ser registradas antes da implementação.
