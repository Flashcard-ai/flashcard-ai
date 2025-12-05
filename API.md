# Documentação dos Endpoints

## Cadastro

`POST /accounts/signup/`

body:

```
{
    "email": string, # Obrigatório
    "password": string # Obrigatório
}
```

## Login

`POST /accounts/login/`

```
{
    "email": string, # Obrigatório
    "password": string # Obrigatório
}
```

## Categorias

`GET /categories/`

`POST /categories/`

body:

```
{
    "owner": int, // Obrigatório
    "name": string // Obrigatório
}
```

`GET /categories/{id}/`

body: 

```
{
    "subcategories": [
        {
            "category_id": int, // Obrigatório
            "name": string // Obrigatório
        }
    ],
    "decks": [
        {
            "category_id": int, // Obrigatório
            "subcategory_id": int, // Opcional
            "name": string // Obrigatório
        }
    ]
}
```

## Subcategorias

`GET /subcategories/`

`POST /subcategories/`

body:

```
{
    "category_id": int, // Obrigatório
    "name": string // Obrigatório
}
```

`GET /subcategories/{id}/`

body:
```
{
    "decks": [
        {
            "category_id": int, // Obrigatório
            "subcategory_id": int, // Opcional
            "name": string // Obrigatório
        }
    ]
}
```

## Decks

`GET /decks/`

`POST /decks/`

body:

```
{
    "category_id": int, // Obrigatório
    "subcategory_id": int // Opcional
    "name": string // Obrigatório
}
```

`GET /decks/{id}/`

body:
```
{
    "cards": [
        {
            "category_id": int, // Obrigatório
            "subcategory_id": int // Opcional
            "deck_id": int, // Obrigatório
            "question": string, // Obrigatório
            "answer": string // Obrigatório
        }
    ]
}
```

## Cards

`GET /cards/`

`POST /cards/`

body:

```
{
    "category_id": int, // Obrigatório
    "subcategory_id": int // Opcional
    "deck_id": int, // Obrigatório
    "question": string, // Obrigatório
    "answer": string // Obrigatório
}
```

`GET /cards/{id}/`