# Desafio Civitas - Painel de Monitoramento da Qualidade do Ar

Este projeto é uma aplicação web desenvolvida como parte do **Desafio Técnico da Civitas**. O objetivo é fornecer um painel interativo e em tempo real para o monitoramento da qualidade do ar em diferentes bairros do Rio de Janeiro.

A aplicação foi construída sobre um template robusto de Next.js, focado em performance, qualidade de código e experiência do usuário.

## 🚀 Motivação e Contexto

O "Teste da Civitas" visa avaliar a capacidade de desenvolvimento de uma solução front-end moderna, que consuma dados de uma API, apresente-os de forma clara e interativa (mapas e gráficos) e siga boas práticas de engenharia de software (testes, tipagem, componentização).

Este projeto vai além do básico, implementando:

- **Visualização Geográfica**: Mapa interativo com marcadores dos bairros.
- **Dados Detalhados**: Modais com informações aprofundadas, incluindo histórico e gráficos.
- **Performance**: Lazy loading de componentes pesados (como o mapa) e skeletons para feedback visual durante o carregamento.
- **Arquitetura Limpa**: Separação clara entre camadas de domínio, repositórios e componentes visuais.
- **Implementaçõa de testes**: Implementação de testes unitários para garantir a qualidade do código.

## ✨ Principais Características

- **Monitoramento em Tempo Real**: Exibição dos índices de qualidade do ar (AQI) e poluentes (PM10, CO).
- **Mapa Interativo**: Navegação geográfica pelos bairros monitorados, utilizando `react-leaflet`.
- **Gráficos Históricos**: Visualização da evolução da qualidade do ar nos últimos dias com `recharts`.
- **Filtros Avançados**: Capacidade de filtrar bairros por nome ou nível de qualidade do ar.
- **Design Responsivo e Moderno**: Interface construída com **Tailwind CSS** e componentes do **Radix UI** (via shadcn/ui), garantindo acessibilidade e beleza.
- **Lazy Loading**: Otimização do carregamento inicial, carregando o mapa apenas quando necessário.
- **Feedback Visual**: Uso de Skeletons para indicar estados de carregamento na lista e no mapa.

## 🛠️ Tecnologias Utilizadas

### Core

- **[Next.js 15+](https://nextjs.org/)**: Framework React para produção, utilizando App Router.
- **[React 19](https://react.dev/)**: Biblioteca para construção de interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset JavaScript para tipagem estática e segurança.

### Estilização e UI

- **[Tailwind CSS v4](https://tailwindcss.com/)**: Framework de utilitários CSS.
- **[Shadcn/ui](https://ui.shadcn.com/)**: Coleção de componentes reutilizáveis baseados no Radix UI.
- **[Lucide React](https://lucide.dev/)**: Biblioteca de ícones.

### Visualização de Dados e Mapas

- **[React Leaflet](https://react-leaflet.js.org/)**: Componentes React para mapas Leaflet.
- **[Recharts](https://recharts.org/)**: Biblioteca de gráficos composta e declarativa.

### Qualidade e Testes

- **[Vitest](https://vitest.dev/)**: Framework de testes unitários rápido.
- **[React Testing Library](https://testing-library.com/)**: Testes focados no comportamento do usuário.
- **[ESLint](https://eslint.org/)** & **[Prettier](https://prettier.io/)**: Padronização e formatação de código.
- **[Husky](https://typicode.github.io/husky/)** & **[Lint Staged](https://github.com/okonet/lint-staged)**: Hooks de git para garantir qualidade antes do commit.

## 📂 Estrutura do Projeto

A estrutura segue os princípios de Clean Architecture adaptados para o front-end:

```
src/
├── app/                    # Rotas e páginas do Next.js (App Router)
├── components/
│   ├── customs/            # Componentes específicos do domínio (Mapas, Gráficos, Listas)
│   │   └── skeleton/       # Componentes de loading (Skeletons)
│   └── ui/                 # Componentes de UI do shadcn
├── core/
│   ├── domain/             # Entidades e Tipos do domínio (Neighborhood, AirQuality)
│   └── ports/              # Interfaces para repositórios (Portas de entrada/saída)
├── hooks/                  # Custom Hooks (Lógica de estado e efeitos)
├── lib/                    # Funções utilitárias e helpers
└── repository/             # Implementações concretas dos repositórios (Chamadas à API)
```

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior recomendada)
- npm, yarn ou pnpm

### Passo a Passo

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/thuansilva/desafio-civitas.git
    cd desafio-civitas
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

4.  **Acesse a aplicação:**
    Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📜 Scripts Disponíveis

- `npm run dev`: Inicia o ambiente de desenvolvimento.
- `npm run build`: Cria a build de produção.
- `npm run start`: Inicia o servidor de produção.
- `npm run lint`: Executa a verificação de linting.
- `npm run test`: Executa os testes unitários com Vitest.

---

Desenvolvido por Thuan Silva para o Desafio Civitas.
