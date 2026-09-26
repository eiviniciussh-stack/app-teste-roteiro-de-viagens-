# Guia para agentes Codex

Este repositório contém o aplicativo mobile **Roteiro Inteligente**. Estas regras valem para toda a árvore do projeto.

## Limites do produto

- Use React Native, Expo e TypeScript para Android e iOS. Não adicione suporte web sem uma decisão explícita do produto.
- O Supabase será o backend (PostgreSQL, autenticação e storage), mas **não está integrado ainda**. Não simule um backend complexo.
- Não inclua segredos, tokens ou chaves. Variáveis públicas devem ser documentadas em `.env.example`; segredos pertencem a um serviço seguro.
- Não invente avaliações, preços, horários, disponibilidade ou dados externos. Identifique claramente mocks e a origem de dados reais.
- Nunca aplique automaticamente mudanças em roteiro aprovado. IA, clima, logística e imprevistos podem gerar propostas; o usuário precisa confirmá-las.
- Eficiência geográfica é regra central: propostas devem considerar proximidade, deslocamento, hospedagem, horário, funcionamento e contexto do grupo.

## Arquitetura

- `src/domain`: entidades, valores e regras puras, sem React ou fornecedores externos.
- `src/application`: casos de uso e portas/interfaces de serviços.
- `src/infrastructure`: adaptadores de persistência e APIs externas.
- `src/presentation`: telas e componentes de UI reutilizáveis.
- `src/services`: serviços transversais, como internacionalização.
- `src/state`: estado compartilhado somente quando necessário.
- `src/theme`: tokens do design system; não espalhe valores visuais recorrentes pelas telas.
- `src/utils`: utilitários puros, sem regras centrais de negócio.

Dependências devem apontar para dentro: apresentação e infraestrutura dependem de aplicação/domínio; o domínio não depende delas. Integrações de mapas, lugares, clima, rotas, avaliações, IA e Supabase devem implementar portas da aplicação e ser substituíveis.

## Padrões de implementação

- Mantenha `strict` ativo e não use `any`. Prefira tipos imutáveis, estados explícitos e funções pequenas.
- Evite arquivos gigantes. Extraia componentes, casos de uso e regras por responsabilidade, sem criar abstrações sem uso.
- Reutilize botões, inputs, cards e headers. Use os tokens em `src/theme` e verifique acessibilidade (papéis, rótulos, contraste e áreas de toque).
- Todo texto visível ao usuário deve passar pela camada de internacionalização. O idioma do dispositivo é o padrão; futuramente, a preferência salva terá precedência.
- Use datas em ISO 8601 e armazene instantes em UTC; formate datas, números e moedas apenas na apresentação conforme locale e fuso da viagem.
- Dados mockados devem ser mínimos, determinísticos, tipados e ficar próximos ao adaptador ou fixture que os consome.
- Não envolva imports em `try/catch`.

## Antes de concluir uma alteração

1. Atualize os documentos quando uma decisão arquitetural ou regra de produto mudar.
2. Execute `npm run check` e testes pertinentes.
3. Não faça alterações oportunistas fora do escopo.
4. Registre limitações reais e próximos passos; não declare uma integração como pronta sem validá-la.

Consulte também `docs/ARQUITETURA.md`, `docs/REGRAS-NEGOCIO.md`, `docs/DESIGN-SYSTEM.md` e `docs/BANCO-DE-DADOS.md`.
