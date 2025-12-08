from rest_framework.views import APIView
from categories.serializers import CategorySerializer
from categories.models import Category
from subcategories.models import Subcategory
from subcategories.serializers import SubcategorySerializer
from decks.models import Deck
from decks.serializers import DeckSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status

class CategoryAPIView(APIView):
    def get(self, request):
        categories = Category.objects.filter(owner=request.user).order_by("id")
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(owner=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CategoryDetailView(APIView):
    def get(self, request, id):
        category = get_object_or_404(Category, id=id)

        if category.owner != request.user:
            return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)

        subcategories = Subcategory.objects.filter(category_id=category)
        decks = Deck.objects.filter(category_id=category)
        
        subcategory_serializer = SubcategorySerializer(subcategories, many=True)
        deck_serializer = DeckSerializer(decks, many=True)

        return Response({
            "subcategories": subcategory_serializer.data,
            "decks": deck_serializer.data
        })

    def delete(self, request, id):
        category = get_object_or_404(Category, id=id)

        if category.owner != request.user:
            return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)

        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)