from rest_framework.views import APIView
from decks.models import Deck
from decks.serializers import DeckSerializer, DeckSerializerById
from cards.models import Card
from cards.serializers import CardSerializer
from categories.models import Category
from subcategories.models import Subcategory
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

class DeckAPIView(APIView):
    def get(self, request):
        decks = Deck.objects.filter(category_id__owner=request.user).order_by("id")
        serializer = DeckSerializer(decks, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        category_id = request.data.get("category_id")
        if not category_id:
            serializer = DeckSerializer(data=request.data)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

        category = get_object_or_404(Category, id=category_id)

        if category.owner != request.user:
            return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)


        subcategory_id = request.data.get("subcategory_id")
        subcategory = None

        if subcategory_id:
            subcategory = get_object_or_404(Subcategory, id=subcategory_id)
            if subcategory.category_id.owner != request.user:
                return Response({"error": "Forbidden"}, status=status.HTTP_400_BAD_REQUEST)
            
        else:
            serializer = DeckSerializer(data=request.data)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        serializer = DeckSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(category_id=category, subcategory_id=subcategory)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

class DeckDetailView(APIView):
    def get(self, request, id):
        deck = get_object_or_404(Deck, id=id)

        if deck.category_id.owner != request.user:
            return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)

        deck_serializer = DeckSerializerById(deck)

        cards = Card.objects.filter(deck_id=deck)
        card_serializer = CardSerializer(cards, many=True)
        return Response({
            "deck": deck_serializer.data,
            "cards": card_serializer.data
        })
    
    def delete(self, request, id):
        deck = get_object_or_404(Deck, id=id)

        if deck.category_id.owner != request.user:
            return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)

        deck.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        