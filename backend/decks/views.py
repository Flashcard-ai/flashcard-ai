from rest_framework.views import APIView
from decks.models import Deck
from decks.serializers import DeckSerializer
from cards.models import Card
from cards.serializers import CardSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

class DeckAPIView(APIView):
    def get(self, request):
        decks = Deck.objects.filter(category_id__owner=request.user)
        serializer = DeckSerializer(decks, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = DeckSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
class DeckDetailView(APIView):
    def get(self, request, id):
        deck = get_object_or_404(Deck, id=id)
        cards = Card.objects.filter(deck_id=deck)
        card_serializer = CardSerializer(cards, many=True)
        return Response({
            "cards": card_serializer.data
        })
        