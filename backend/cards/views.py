from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from cards.models import Card
from cards.serializers import CardSerializer
from django.shortcuts import get_object_or_404

class CardAPIView(APIView):
    def get(self, request):
        cards = Card.objects.filter(category_id__owner=request.user)
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CardSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

class CardDetailView(APIView):
    def get(self, request, id):
        card = get_object_or_404(Card, id=id)
        serializer = CardSerializer(card)
        return Response(serializer.data)