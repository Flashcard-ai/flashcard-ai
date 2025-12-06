from rest_framework import serializers
from subcategories.models import Subcategory

class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = [ "id", "category_id", "name" ]
        extra_kwargs = { "id": { "read_only": True } }
