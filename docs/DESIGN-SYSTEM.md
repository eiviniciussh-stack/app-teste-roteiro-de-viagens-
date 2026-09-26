# Design system

## Direção

A experiência deve transmitir confiança, tranquilidade e orientação. A interface privilegia hierarquia clara e decisões compreensíveis, especialmente quando logística ou clima geram alertas. A base visual atual é deliberadamente pequena e será validada antes de crescer.

## Tokens

Tokens vivem em `src/theme/tokens.ts` e são a fonte única para valores recorrentes.

### Cores iniciais

| Token | Uso | Valor |
|---|---|---|
| `background` | fundo geral | `#F4F7F5` |
| `surface` | cards e superfícies | `#FFFFFF` |
| `primary` | ação principal | `#176B5B` |
| `text` | texto de alta ênfase | `#17211F` |
| `textMuted` | texto secundário | `#5E6C69` |
| `border` | divisores e contornos | `#D9E2DF` |

Não use somente cor para comunicar erro, confirmação, clima ou conflito. Estados semânticos adicionais exigirão tokens próprios e validação de contraste em temas claro/escuro.

### Espaçamento, raios e tipografia

A escala de espaço é `4, 8, 16, 24, 32, 48`; raios iniciais são `8`, `16` e pílula. Tipografia utiliza a fonte nativa nesta fase para evitar peso e complexidade de carregamento. Tamanhos e pesos reutilizáveis ficam nos tokens, enquanto Dynamic Type deve continuar habilitado.

## Componentes

- **AppButton:** ação reconhecível, estado pressionado/desabilitado, alvo mínimo de 44×44 e rótulo acessível.
- **FeatureCard:** superfície para agrupar título e descrição; não deve virar um componente genérico com dezenas de variantes.
- Futuros `Input`, `Header`, `Alert`, `PlaceCard`, `TimelineItem` e `EmptyState` serão criados quando usados por fluxos reais.

Componentes reutilizáveis não contêm regra de viagem. Telas compõem componentes; regras e efeitos são coordenados por casos de uso/hooks específicos.

## Conteúdo e internacionalização

- Todo texto visível usa chaves de tradução.
- Português brasileiro e inglês são os locales iniciais; inglês é fallback.
- O locale do dispositivo é o padrão. A preferência do usuário, quando criada, prevalece e deve persistir.
- Evite concatenar fragmentos traduzidos. Use interpolação/pluralização na futura biblioteca de i18n.
- Datas, moedas, unidades e duração respeitam locale, moeda escolhida e fuso do destino; esses conceitos não são intercambiáveis.

## Acessibilidade

- Mantenha contraste WCAG AA, foco/ordem de leitura coerentes e alvos mínimos de 44×44 pontos.
- Suporte aumento de fonte, leitor de tela, redução de movimento e orientação quando a tela permitir.
- Botões de ícone precisam de nome acessível. Imagens informativas precisam de descrição; decorativas devem ser ignoradas.
- Mapa nunca será a única forma de entender o roteiro: ofereça lista/linha do tempo equivalente.

## Padrões de interação do produto

Alterações sugeridas usam revisão de diferenças com ações “Manter roteiro” e “Aplicar alterações”; nenhuma caixa ambígua ou contagem regressiva confirma automaticamente. Alertas logísticos explicam causa e impacto sem bloquear a escolha manual. Dados externos mostram fonte/atualização e skeletons não fingem conteúdo.

## Evolução

Novos tokens e variantes devem responder a uma necessidade repetida, incluir estados (loading, empty, error, disabled) e ser verificados nos dois sistemas operacionais. Mudanças perceptíveis exigem inspeção visual e, quando disponível, screenshot/regressão visual.
