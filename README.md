<img 
src="docs/logo/flascard-ai-logo.png"
width="1000px"
/>

![Static Badge](https://img.shields.io/badge/status-finished-green)
![Static Badge](https://img.shields.io/badge/license-MIT-green)
![Static Badge](https://img.shields.io/badge/type-portfolio%20project-purple)
![Static Badge](https://img.shields.io/badge/python-darkblue)
![Static Badge](https://img.shields.io/badge/typescript-blue)
![Static Badge](https://img.shields.io/badge/tailwind-blue)
![Static Badge](https://img.shields.io/badge/djangorestframework-darkgreen)
![Static Badge](https://img.shields.io/badge/react-blue)
![Static Badge](https://img.shields.io/badge/frontend-vercel-black)
![Static Badge](https://img.shields.io/badge/backend-render-purple)
![Static Badge](https://img.shields.io/badge/production-postgreSQL-lightblue)
![Static Badge](https://img.shields.io/badge/local-SQLite3-orange)
![Static Badge](https://img.shields.io/badge/simpleJWT-orange)

## Sumário
[Visão geral](#visão-geral)

[Estrutura das pastas](#estrutura-das-pastas-resumo)

[Endpoints](#endpoints)

[Como rodar o projeto](#como-rodar-o-projeto)

[Autores](#autores)

[Créditos](#créditos)

[Licença](#licença)

## Visão geral

O **Flashcard AI** consiste em um sistema de criação de flashcards inteligentes de uso manual ou com Inteligência Artifical para ajudar a vida dos estudantes. Escolha uma plataforma de estudos que você confie, insira o link no prompt da IA, espere alguns segundos e você terá cards gerados automaticamente para facilitar seus estudos.

## Wireframe do sistema

![Wireframe da tela de login](docs/wireframes/flashcard-ai-wireframe.png)

## Estrutura das pastas (resumo)

### Backend
```
flashcard-ai/
    backend/
        cards/
        categories/
        core/
        decks/
        signup/
        subcategories/
        users/
    
        .dockerignore
        .env.example
        Dockerfile
        manage.py
        pyproject.toml
        uv.lock
        
    .gitignore
    API.md
    docker-compose.yml
    README.md
    
```

### Frontend
```
flashcard-ai/
    frontend/
        src/
            @types/
            api/
            assets/
            components/
            context/
            hooks/
            pages/
            routes/
            utils/
            index.css
            main.tsx
    
        .dockerignore
        .env.example
        .env.production
        Dockerfile
        index.html

        
    .gitignore
    API.md
    docker-compose.yml
    README.md
    
```

## Como rodar o projeto

Você pode acessar o projeto em https://flashcard-ai-roan.vercel.app/, mas, se preferir, siga os passos abaixo para rodá-lo em sua máquina

Você pode (e recomendado) executar essa aplicação com [Docker](https://docs.docker.com/engine/install) e [Docker compose](https://docs.docker.com/compose/install/linux/#install-the-plugin-manually). Instale-os a partir dos links fornecidos.

### Com Docker
#### Com docker-compose
```
docker compose up --build
```
> Acesse [localhost:3000](http://localhost:3000) para frontend e [localhost:8000](http://localhost:8000) para backend


#### A partir do Dockerfile

##### Backend
Acesse a pasta `flashcard-ai/backend` para rodar o backend e execute:
```
docker build -t backend:latest .
docker run -p 8000:8000 backend:latest
```

##### Frontend
Acesse a pasta `flashcard-ai/frontend` para rodar o frontend e execute:
```
docker build -t frontend:latest .
docker run -p 3000:3000 frontend:latest
```

### Clonando o repositório

Clone o repositório:
```
git clone https://github.com/Flashcard-ai/flashcard-ai.git
cd flashcard-ai
```

#### Backend
Entre na pasta do backend

```
cd backend
```

Instale as dependências
```
uv sync
```

> [!WARNING]
> ATENÇÃO: talvez seja necessário instalar o gerenciador de pacotes [uv](https://docs.astral.sh/uv/getting-started/installation/) em seu sistema

Gerar SECRET_KEY do Django
```
python3 -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Configurar variáveis de ambiente
```
cp .env.example .env
# Entre no .env
SECRET_KEY=coloque_aqui_sua_chave_secreta_gerada
GROQ_API_KEY=coloque_aqui_sua_chave_secreta_do_groq_gerada
```
> [!IMPORTANT]
> Acesse https://console.groq.com/keys e gere sua GROQ_API_KEY

Rode as migrações
```
uv run python3 manage.py migrate # Ou apenas python (ou ainda py) no Windows
```
Execute o backend
```
uv run python3 manage.py runserver # Ou apenas python (ou ainda py) no Windows
```
Acesse http://localhost:8000

#### Frontend

Entre na pasta do frontend
```
cd frontend
```

Instale as dependências
```
npm install
```

Configurar variáveis de ambiente
```
cp .env.example .env
# Entre no .env
VITE_API_BASE_URL=http://localhost:8000
VITE_FRONT_DOMAIN=localhost
```

Execute o frontend
```
npm run dev
```
Acesse http://localhost:3000

## Endpoints

### Categorias

`GET /categories/`

`POST /categories/`

`GET /categories/{id}/`

### Subcategorias

`GET /subcategories/`

`POST /subcategories/`

`GET /subcategories/{id}/`

### Decks

`GET /decks/`

`POST /decks/`

`GET /decks/{id}/`

### Cards

`GET /cards/`

`POST /cards/`

`GET /cards/{id}/`

`POST /cards/ai/`

> Para ver todos os endpoints com campos obrigatórios e opcionais, consulte o [API.md](API.md)

## Autores

<div style="display: flex; gap: 10px;">

  <div style="display: flex; flex-direction: column; align-items: center;">
    <a href="https://github.com/williamdev20">
      <img
        src="https://avatars.githubusercontent.com/u/203742942?v=4"
        alt="William Alves"
        width="115"
      />
    </a>
    <a href="https://github.com/williamdev20">William Alves</a>
  </div>

  <div style="display: flex; flex-direction: column; align-items: center;">
    <a href="https://github.com/harisoncleytondev">
      <img
        src="https://avatars.githubusercontent.com/u/207046169?v=4"
        alt="Harison Cleyton"
        width="115"
      />
    </a>
    <a href="https://github.com/harisoncleytondev">Harison Cleyton</a>
  </div>

</div>

## Créditos
O ícone do corvo foi retirada do [Flaticon](https://www.flaticon.com/) pelo criador [Freepik](https://www.flaticon.com/authors/freepik)

## Licença
Este projeto está licenciado sob a licença [MIT](LICENSE).
