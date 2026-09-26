# Regras de negócio

## Princípio inviolável

O aplicativo **nunca altera sozinho um roteiro aprovado**. Toda sugestão — inclusive de IA, clima, imprevisto ou otimização — deve ser apresentada como proposta e aplicada somente após ação inequívoca do usuário autorizado. Alertas podem ser proativos; alterações não.

## Viagens e acesso

- Autenticação será obrigatória por Google, Apple ou e-mail.
- Um usuário pode ter várias viagens e consultar seu histórico.
- Cada viagem possui um organizador e pode ser compartilhada.
- **Organizador:** cria, edita, reorganiza, confirma propostas e administra compartilhamento.
- **Participante:** acompanha a versão compartilhada, sem editar.
- A autorização deve ser validada no servidor/RLS; esconder controles na UI não é autorização.

## Entrada para planejamento

O planejamento poderá receber destino, datas, horários aproximados de chegada/saída, hospedagem, ritmo, interesses, orçamento, viajantes, crianças e idades, necessidades/restrições e preferência por refeições. Campos desconhecidos permanecem desconhecidos: o sistema não presume restrições, orçamento ou presença de crianças.

Antes de gerar uma proposta, dados essenciais ausentes devem ser solicitados ou explicitamente marcados como flexíveis. Idades e necessidades são dados sensíveis e devem ser coletados apenas quando úteis.

## Construção e otimização do roteiro

A função objetivo prioriza uma experiência viável, não apenas a menor distância. Deve considerar:

1. hospedagem e, durante a viagem e com permissão, localização atual;
2. agrupamento geográfico e sequência lógica;
3. distância, duração e meios de deslocamento disponíveis;
4. abertura, janela de visita, tempo adequado de permanência e reservas/ingressos;
5. clima e adequação da atividade;
6. ritmo, interesses, orçamento, grupo e necessidades especiais;
7. qualidade de fontes públicas, avaliações e quantidade de avaliações.

Itens não devem caber no dia apenas matematicamente: deslocamentos, pausas, filas e margens precisam ser representados. A origem, atualidade e confiança de informações externas devem ser preservadas.

## Edição manual

O organizador pode arrastar, adicionar ou remover lugares. Se uma edição aumentar significativamente deslocamento, causar incompatibilidade de horário, ultrapassar orçamento conhecido ou conflitar com uma restrição, o app explica o impacto. O usuário ainda pode manter a alteração. Limiares de “significativo” serão definidos e testados antes desse alerta ser implementado.

Itens salvos e avaliações feitas pelo usuário são diferentes de avaliações públicas e nunca devem ser misturados visualmente ou na origem dos dados.

## Imprevisto

“Tive um imprevisto” cria uma simulação para o restante do dia com horário, localização autorizada e situação informada. O fluxo é:

1. preservar uma fotografia/versionamento do roteiro atual;
2. coletar contexto e consentimento de localização;
3. gerar uma alternativa e explicar remoções, mudanças e impactos;
4. permitir revisar, ajustar, rejeitar ou confirmar;
5. aplicar atomicamente somente após confirmação do organizador.

## Assistente de viagem

A IA poderá responder com o contexto autorizado da viagem, roteiro, horário, clima, localização e preferências. Respostas são sugestões, devem distinguir fatos de inferências e citar fontes externas quando houver. A IA não é fonte para preço, abertura, avaliação ou disponibilidade e não executa mutações diretamente.

## Clima, navegação, reservas e notificações

- Alertas climáticos informam o item afetado, previsão e momento da última atualização; reorganização exige confirmação.
- “Como chegar” abre uma opção de navegação instalada com origem/destino, sem assumir disponibilidade.
- Necessidade ou recomendação de reserva/ingresso só é exibida com fonte confiável, preferencialmente oficial. Disponibilidade nunca é inventada.
- Notificações devem ser relevantes, configuráveis, respeitar fuso/quiet hours e levar ao contexto correto.

## Offline e confiança

Viagens previamente carregadas devem manter offline os dados essenciais e indicar o que pode estar desatualizado. Funcionamento, clima, rotas, preço e disponibilidade voláteis mostram origem/data. Na falta de dado confiável, a interface declara a indisponibilidade em vez de estimar como fato.

## Estados importantes

Uma viagem diferencia ao menos `rascunho`, `aprovada` e `concluída`. Propostas diferenciam `pendente`, `confirmada`, `rejeitada` e `expirada`. Confirmar uma proposta gera nova versão do roteiro e preserva histórico suficiente para auditoria/restauração futura.
