from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from cards.models import Card
from cards.serializers import CardSerializer
from categories.models import Category
from subcategories.models import Subcategory
from django.shortcuts import get_object_or_404

class CardAPIView(APIView):
    def get(self, request):
        cards = Card.objects.filter(category_id__owner=request.user)
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data)

    def post(self, request):
        category_id = request.data.get("category_id")
        category = get_object_or_404(Category, id=category_id)

        if category.owner != request.user:
            return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)


        subcategory_id = request.data.get("subcategory_id")
        
        if subcategory_id:
            subcategory = get_object_or_404(Subcategory, id=subcategory_id)
            if subcategory.category_id.owner != request.user:
                return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)
        else:
            subcategory = None

        serializer = CardSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(category_id=category, subcategory_id=subcategory)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    

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