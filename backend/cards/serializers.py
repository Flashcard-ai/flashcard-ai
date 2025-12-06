from rest_framework import serializers
from cards.models import Card

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = [
            "id",
            "category_id",
            "subcategory_id",
            "deck_id",
            "question",
            "answer" 
        ]
        extra_kwargs = { "id": { "read_only": True } }