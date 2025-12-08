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


class FlashcardAISerializer(serializers.Serializer):
    url = serializers.URLField()
    prompt = serializers.CharField(max_length=200)

class FlashcardAIFieldsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = [
            "id",
            "category_id",
            "subcategory_id",
            "deck_id",
            "question",
            "answer",
        ]

        extra_kwargs = {
            "id": {"read_only": True},
            "question": {"read_only": True},
            "answer": {"read_only": True},
        }