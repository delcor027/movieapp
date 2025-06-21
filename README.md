# 🎬 Movie Explorer

Aplicação **SPA** criada em **React + Vite + TypeScript** que consome a API do **The Movie Database (TMDB)** para listar, pesquisar e filtrar filmes em cartaz, populares, melhor avaliados, lançamentos, trending e por gênero.  
O projeto foi desenvolvido como estudo de React moderno, Tailwind CSS e boas práticas de arquitetura front-end.

---

## ✨ Principais recursos

| Funcionalidade | Descrição |
| -------------- | --------- |
| Lista dinâmica | Carrega filmes por página com **infinite scroll / “Ver mais”** |
| Filtro avançado | Por popularidade, avaliação, data de lançamento, trending ou gênero |
| Busca instantânea | Pesquisa por título em **tempo real** |
| Detalhes do filme | Página dedicada com sinopse, gêneros, elenco principal e trailer do YouTube |
| UI responsiva   | Layout mobile-first com **TailwindCSS** e animações sutis |
| Código comentado| Todo o código possui **comentários explicativos** para facilitar manutenção |

---

## 🛠️ Tecnologias & dependências

| Categoria | Stacks |
| --------- | ------ |
| **Core** | React 18, Vite, TypeScript |
| **Estilo** | TailwindCSS, PostCSS |
| **HTTP** | Axios |
| **Roteamento** | React Router DOM v6 |
| **Tipagem** | Interfaces & types de domínio (`Movie`, `Genre`, `Cast`…) |
| **Deploy** | GitHub Pages (ou qualquer provedor estático) |

---

## 📁 Estrutura de pastas resumida

src/
├── App.tsx — Configuração de rotas principais (React Router)
├── main.tsx — Ponto de entrada da aplicação
├── index.css — Estilizações globais utilizando Tailwind CSS
├── App.css — Estilos adicionais e auxiliares

services/
├── api.ts — Configuração do Axios com base na API do TMDb

pages/
├── Home.tsx — Página principal com filtros e exibição de filmes
├── MovieDetails.tsx — Página de detalhes com sinopse, elenco e trailer

styles/
├── home.css — Estilização específica da página Home
├── movieDetails.css — Estilização específica da página de detalhes


---

## 🧠 Funcionalidades

- 📄 Listagem de filmes com filtros:
  - Em cartaz
  - Populares
  - Melhor avaliados
  - Mais recentes
  - Tendência do dia
- 🔍 Busca de filmes por título
- 🎭 Filtro por gênero
- 📽️ Página de detalhes:
  - Informações gerais do filme
  - Elenco principal
  - Trailer (YouTube)

---

## ⚙️ Tecnologias Utilizadas

- **React** com **Vite**
- **TypeScript**
- **React Router DOM**
- **Tailwind CSS** + **@apply** em arquivos `.css`
- **TMDb API** para dados de filmes
- **Axios** para requisições HTTP
- **Poppins** como fonte principal

---

## 📦 Instalação Local

1. Clone o repositório:
   ```bash
   git clone https://github.com/seunome/movie-explorer.git
   cd movie-explorer
   ```

## ⚙️ Como Rodar o Projeto Localmente

1. **Instale as dependências:**

   ```bash
   npm install
   ```

2. **Crie o arquivo `.env` com sua chave da TMDb:**

   ```ini
   VITE_TMDB_API_KEY=sua_chave_aqui
   ```
  
3. **Rode o projeto:**

   ```bash
   npm run dev
   ```

## 🧪 Observações Técnicas

- Os endpoints utilizados da TMDb incluem:
  - `/movie/now_playing`, `/movie/popular`, `/movie/top_rated`, `/trending/movie/day`
  - `/discover/movie` (para filtragem por gênero)
  - `/movie/:id`, `/movie/:id/credits`, `/movie/:id/videos`

- A estrutura do projeto segue boas práticas de componentização e separação de responsabilidades (API, páginas, estilos).

- Tailwind foi utilizado com a diretiva `@apply` para centralizar a estilização em arquivos separados e facilitar a manutenção.

---

## 👨‍💻 Autor

Desenvolvido por **Matheus Delcor**
