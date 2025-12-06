from rest_framework import serializers
from categories.models import Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [ "id", "owner", "name" ]
        extra_kwargs = {
            "id": { "read_only": True },
            "owner": { "read_only": True }
        }
