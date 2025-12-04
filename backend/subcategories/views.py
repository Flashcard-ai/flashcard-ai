from rest_framework.views import APIView
from subcategories.models import Subcategory
from subcategories.serializers import SubcategorySerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import status

class SubcategoryAPIView(APIView):
    def get(self, request):
        subcategories = Subcategory.objects.filter(category_id__owner=request.user)
        serializer = SubcategorySerializer(subcategories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SubcategorySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class SubcategoryDetailView(APIView):
    def get(self, request, id):
        subcategory = get_object_or_404(Subcategory, id=id)
        serializer = SubcategorySerializer(subcategory)
        return Response(serializer.data)

