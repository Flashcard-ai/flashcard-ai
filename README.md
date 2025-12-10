# Flashcard AI

## Visão geral

O **Flashcard AI** consiste em um sistema de criação de flashcards inteligentes de uso manual ou com Inteligência Artifical para ajudar a vida dos estudantes. Escolha uma plataforma de estudos que você confie, insira o link no prompt da IA, espere alguns segundos e você terá cards gerados automaticamente para facilitar seus estudos.

## Wireframe do sistema

![Wireframe da tela de login](docs/wireframes/flashcard-ai-wireframe.png)

## Estrutura das pastas (resumo)

### Backend
```
flascard-ai/
    backend/
        cards/
        categories/
        core/
        decks/
        signup/
        subcategories/
        users/
    
        .env
        .env.example
        Dockerfile
        manage.py
        pyproject.toml
        uv.lock
        
    .gitignore
    API.md
    README.md
    
```

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
