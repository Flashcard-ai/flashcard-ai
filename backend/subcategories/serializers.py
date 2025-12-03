from rest_framework import serializers
from subcategories.models import Subcategory

class SubcategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategory
        fields = [ "category_id", "name" ]
