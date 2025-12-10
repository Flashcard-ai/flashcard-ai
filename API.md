# Documentação dos Endpoints

## Autenticação

Todos os endpoints (exceto `POST /accounts/signup/` e `POST /accounts/login/`) necessitam colocar o Header da autenticação por token JWT

Headers:
```
Authorization: Bearer <access_token>
Content-Type: application/json
```

## Cadastro

`POST /accounts/signup/`

request:

```
{
    "email": string, # Obrigatório
    "password": string # Obrigatório
}
```

reponse (201):
```
{
    "email": string
}
```

## Login

`POST /accounts/login/`

request:
```
{
    "email": string, # Obrigatório
    "password": string # Obrigatório
}
```

response (200):
```
{
    "access": string
}
```

## Categorias

`GET /categories/`

response (200):
```
[
    {
        "id": int,
        "name": string
    }
]
```

`POST /categories/`

request:

```
{
    "name": string // Obrigatório
}
```

response (201):
```
{
    "id": int,
    "name": string
}
```

`GET /categories/{id}/`

response (200):

```
{
    "subcategories": [
        {
            "id": int,
            "category_id": int,
            "name": string
        }
    ],
    "decks": [
        {
            "id": int,
            "category_id": int,
            "subcategory_id": int,
            "name": string
        }
    ]
}
```

## Subcategorias

`GET /subcategories/`

response (200):
```
[
    {
        "id": int,
        "category_id": int,
        "name": string
    }
]
```

`POST /subcategories/`

request:

```
{
    "category_id": int, // Obrigatório
    "name": string // Obrigatório
}
```

response (201):
```
{
    "id": int,
    "category_id": int,
    "name": string
}
```

`GET /subcategories/{id}/`

response (200):
```
{
    "decks": [
        {
            "id": int,
            "category_id": int,
            "subcategory_id": int,
            "name": string
        }
    ]
}
```

## Decks

`GET /decks/`

response (200):
```
[
    {
        "id": int,
        "category_id": int,
        "subcategory_id": int | null,
        "name": string
    }
]
```

`POST /decks/`

request:

```
{
    "category_id": int, // Obrigatório
    "subcategory_id": int // Opcional
    "name": string // Obrigatório
}
```

response (201):
```
{
    "id": int,
    "category_id": int,
    "subcategory_id": int | null,
    "name": string
}
```

`GET /decks/{id}/`

response (200):
```
{
    "cards": [
        {
            "id": int,
            "category_id": int,
            "subcategory_id": int,
            "deck_id": int,
            "question": string,
            "answer": string
        }
    ]
}
```

## Cards

`GET /cards/`

response (200):

```
[
    {
        "id": int,
        "category_id": int,
        "subcategory_id": int | null,
        "deck_id": int,
        "question": string,
        "answer": string
    }
]
```

`POST /cards/`

request:

```
{
    "category_id": int, // Obrigatório
    "subcategory_id": int // Opcional
    "deck_id": int, // Obrigatório
    "question": string, // Obrigatório
    "answer": string // Obrigatório
}
```

response (201):

```
{
    "id": int,
    "category_id": int,
    "subcategory_id": int | null,
    "deck_id": int,
    "question": string,
    "answer": string
}
```

`GET /cards/{id}/`

response (200):
```
{
    "id": int,
    "category_id": int,
    "subcategory_id": int | null,
    "deck_id": int,
    "question": string,
    "answer": string
}
```

`POST /cards/ai/`

request:

```
{
    "category_id": int, // Obrigatório
    "subcategory_id": int, // Opcional
    "deck_id": int, // Obrigatório
    "url": str, // Obrigatório
    "prompt": str // Obrigatório
}
```

response (201):
```
[
    {
        "id": int,
        "category_id": int,
        "subcategory_id": int | null,
        "deck_id": int,
        "question": string,
        "answer": string
    }
]
```