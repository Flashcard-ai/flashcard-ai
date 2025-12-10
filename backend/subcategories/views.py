from rest_framework.views import APIView
from subcategories.models import Subcategory
from subcategories.serializers import SubcategorySerializer
from decks.models import Deck
from decks.serializers import DeckSerializer
from categories.models import Category
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status

class SubcategoryAPIView(APIView):
    def get(self, request):
        subcategories = Subcategory.objects.filter(category_id__owner=request.user).order_by("id")
        serializer = SubcategorySerializer(subcategories, many=True)
        return Response(serializer.data)

    def post(self, request):
        category_id = request.data.get("category_id")
        if not category_id:
            serializer = SubcategorySerializer(data=request.data)
            if not serializer.is_valid():
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        category = get_object_or_404(Category, id=category_id)

        if category.owner != request.user:
            return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)

        serializer = SubcategorySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(category_id=category)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

        

class SubcategoryDetailView(APIView):
    def get(self, request, id):
        subcategory = get_object_or_404(Subcategory, id=id)

        if subcategory.category_id.owner != request.user:
            return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)

        decks = Deck.objects.filter(subcategory_id=subcategory)
        deck_serializer = DeckSerializer(decks, many=True)

        return Response({
            "decks": deck_serializer.data
        })
        
    def delete(self,request, id):
        subcategory = get_object_or_404(Subcategory, id=id)

        if subcategory.category_id.owner != request.user:
            return Response({"error": "Forbidden"}, status=status.HTTP_403_FORBIDDEN)

        subcategory.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

