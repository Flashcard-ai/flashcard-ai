from rest_framework.views import APIView
from decks.models import Deck
from decks.serializers import DeckSerializer
from cards.models import Card
from cards.serializers import CardSerializer
from categories.models import Category
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

class DeckAPIView(APIView):
    def get(self, request):
        decks = Deck.objects.filter(category_id__owner=request.user)
        serializer = DeckSerializer(decks, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        category_id = request.data.get("category_id")

        category = get_object_or_404(Category, id=category_id)

        if category.owner != request.user:
            return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)

        serializer = DeckSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(category_id=category)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

class DeckDetailView(APIView):
    def get(self, request, id):
        deck = get_object_or_404(Deck, id=id)

        if deck.category_id.owner != request.user():
            return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)

        cards = Card.objects.filter(deck_id=deck)
        card_serializer = CardSerializer(cards, many=True)
        return Response({
            "cards": card_serializer.data
        })
    
    def delete(self, request, id):
        deck = get_object_or_404(Deck, id=id)

        if deck.category_id.owner != request.user:
            return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)

        deck.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        