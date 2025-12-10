from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from cards.models import Card
from cards.serializers import CardSerializer, FlashcardAISerializer, FlashcardAIFieldsSerializer, FlashcardAIFieldsURLAndPromptSerializer
from cards.services import scraping, flashcard_ai
from categories.models import Category
from subcategories.models import Subcategory
from decks.models import Deck
from django.shortcuts import get_object_or_404

class CardAPIView(APIView):
    def get(self, request):
        cards = Card.objects.filter(category_id__owner=request.user).order_by("id")
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Verificar se categoria é válida

        category_id = request.data.get("category_id")
        if not category_id:
            serializer = CardSerializer(data=request.data)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        category = get_object_or_404(Category, id=category_id)

        if category.owner != request.user:
            return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)


        # verificar se há subcategoria e se ele é válido
        subcategory_id = request.data.get("subcategory_id")
        subcategory = None

        if subcategory_id:
            subcategory = get_object_or_404(Subcategory, id=subcategory_id)
            if subcategory.category_id.owner != request.user:
                return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)
        else:
            serializer = CardSerializer(data=request.data)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        # Verificar se deck é válido
        deck_id = request.data.get("deck_id")
        if not deck_id:
            serializer = CardSerializer(data=request.data)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        deck = get_object_or_404(Deck, id=deck_id)

        if deck.category_id.owner != request.user:
            return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)


        serializer = CardSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(category_id=category, subcategory_id=subcategory, deck_id=deck)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

class FlashCardAIAPIView(APIView):
    def post(self, request):
        # Verificar se categoria é válida
        category_id = request.data.get("category_id")
        if not category_id:
            serializer = FlashcardAIFieldsURLAndPromptSerializer(data=request.data)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        category = get_object_or_404(Category, id=category_id)

        if category.owner != request.user:
            return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)


        # Verificar se há subcategoria e se é válido
        subcategory_id = request.data.get("subcategory_id")
        subcategory = None

        if subcategory_id:
            subcategory = get_object_or_404(Subcategory, id=subcategory_id)
            if subcategory.category_id.owner != request.user:
                return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)
        else:
            serializer = FlashcardAIFieldsURLAndPromptSerializer(data=request.data)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
        # Verificar se deck é válido
        deck_id = request.data.get("deck_id")
        if not deck_id:
            serializer = FlashcardAIFieldsURLAndPromptSerializer(data=request.data)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        deck = get_object_or_404(Deck, id=deck_id)

        if deck.category_id.owner != request.user:
            return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)


        serializer_flashcard = FlashcardAISerializer(data=request.data)
        serializer_flashcard.is_valid(raise_exception=True)

        url_request = serializer_flashcard.validated_data["url"] # type: ignore # Configuração para evitar reclamação de erro do Pylance
        prompt_request = serializer_flashcard.validated_data["prompt"] # type: ignore # Configuração para evitar reclamação de erro do Pylance

        extract_url = scraping(url_request)
        flashcard = flashcard_ai(prompt_request, extract_url)

        if "error" in flashcard:
            return Response({"error": flashcard}, status=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE)

        created_cards = []

        for fc in flashcard:
            card = Card.objects.create(
                category_id=category,
                subcategory_id=subcategory if subcategory else None,
                deck_id=deck,
                question=fc["question"],
                answer=fc["answer"]
            )

            created_cards.append(FlashcardAIFieldsSerializer(card).data)

        return Response(created_cards, status=status.HTTP_201_CREATED)



class CardDetailView(APIView):
    def get(self, request, id):
        card = get_object_or_404(Card, id=id)

        if card.category_id.owner != request.user:
            return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)

        serializer = CardSerializer(card)
        return Response(serializer.data)
    
    def delete(self, request, id):
        card = get_object_or_404(Card, id=id)

        if card.category_id.owner != request.user:
            return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)

        card.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)