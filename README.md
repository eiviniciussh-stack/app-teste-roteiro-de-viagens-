# Roteiro Inteligente

Fundação mobile de um planejador inteligente de viagens, construída com React Native, Expo e TypeScript para Android e iOS.

## Pré-requisitos

- Node.js LTS
- npm
- Expo Go ou simulador/emulador configurado

## Começando

```bash
npm install
npm start
```

Use `npm run android` ou `npm run ios` para abrir a plataforma desejada. Não há versão web configurada.

## Qualidade

```bash
npm run check
```

Esse comando executa ESLint e a verificação estrita de tipos. Formate arquivos com `npx prettier --write .` quando necessário.

## Escopo atual

A aplicação contém uma tela inicial simples e internacionalizada para validar a fundação. Supabase, autenticação, navegação, mapas e provedores externos ainda não foram integrados. Consulte `AGENTS.md` e a pasta `docs/` antes de implementar novos fluxos.
