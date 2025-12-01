# Flashcard AI

## Visão geral

O **Flashcard AI** consiste em um sistema de criação de flashcards inteligentes de uso manual ou com Inteligência Artifical para ajudar a vida dos estudantes. Escolha uma plataforma de estudos que você confie, insira o link no promp da IA, espere alguns segundos e você terá cards gerados automáticamente por para facilitar seus estudos.

## Wireframe do sistema
![Wireframe da tela de login](docs/wireframes/flashcard-ai-wireframe.png)

## Estrutura das pastas

### Backend

```
flascard-ai
|
├── backend/
|   ├── core/
|   |   ├── asgi.py
|   |   └── settings.py
|   |   └── urls.py
|   |   └── wsgi.py
|   |   
|   ├── users/
|   |     └── models.py
|   | 
|   ├── register/
|   |       ├── views.py
|   |         ├── urls.py
|   |         ├── models.py
|   |         ├── admin.py
|   |         ├── apps.py
|   |         └── tests.py
|   |
|   ├── login/
|   |       ├── views.py
|   |         ├── urls.py
|   |         ├── models.py
|   |         ├── admin.py
|   |         ├── apps.py
|   |         └── tests.py
|   |
|   ├── cards/
|   |   ├── views/
|   |           ├── category.py
|   |           ├── subcategory.py
|   |           ├── deck.py
|   |           └── card.py
|   |        
|   |    ├── serializers/
|   |           ├── category.py
|   |           ├── subcategory.py
|   |           ├── deck.py
|   |           └── card.py
|   |         
|   |    ├── urls/
|   |           ├── category.py
|   |           ├── subcategory.py
|   |           ├── deck.py
|   |           └── card.py
|   |
|   |     ├── models/
|   |           ├── category.py
|   |           ├── subcategory.py
|   |           ├── deck.py
|   |           └── card.py
|   | 
|   ├── requirements.txt
|   └── manage.py
|        
|   docker-compose.yml
|   .gitignore
└── README.md
    
```

## Endpoints
`POST /register/`

`POST /login/`

`GET /users/<usuario>/` -> listar todas as categorias

`POST /users/<usuario>/category/create/`

`GET /users/<usuario>/<category>/` -> listar as subcategorias e/ou decks de uma categoria

`POST /users/<usuario>/<category>/subcategory/create/`

`POST /users/<usuario>/<category>/deck/create` -> Criar um deck **PERTENCENDO a uma categoria**, mas a **NENHUMA subcategoria**

`GET /users/<usuario>/<category>/<subcategory>/` -> listar todos os decks de uma categoria

`POST /users/<usuario>/<category>/<subcategory>/deck/create/` -> Criando um deck que **PERTENCE a uma categoria e a uma subcategoria**

`POST /users/<usuario>/<category>/<deck>/create-card/` -> Criando um card que **PERTENCE APENAS a uma categoria**

`POST /users/<usuario>/<category>/<subcategory>/<deck>/create-card/` -> Criando um card que pertence **PERTENCE a uma categoria e subcategoria

`POST /users/<usuario>/<category>/<deck>/create-card-with-ai/` -> Criando um **card com IA** que **PERTENCE APENAS a uma categoria**

`POST /users/<usuario>/<category>/<subcategory>/<deck>/create-card-with-ai/` -> Criando um **card com IA** que pertence **PERTENCE a uma categoria e subcategoria**

`GET /users/<usuario>/<category>/<deck>/` -> Visualizar os **card de um deck** que **PERTENCEM APENAS a uma categoria**

`GET /users/<usuario>/<category>/<subcategoria>/<deck>/` -> Visualizar os **card de um deck** que **PERTENCEM a uma categoria e subcategoria**