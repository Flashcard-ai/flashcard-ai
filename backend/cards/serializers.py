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
    prompt = serializers.CharField()

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

class FlashcardAIFieldsURLAndPromptSerializer(serializers.ModelSerializer):
    url = serializers.URLField()
    prompt = serializers.CharField()

    class Meta:
        model = Card
        fields = [
            "id",
            "category_id",
            "subcategory_id",
            "deck_id",
            "question",
            "answer",
            "url",
            "prompt",
        ]

        extra_kwargs = {
            "id": {"read_only": True},
            "question": {"read_only": True},
            "answer": {"read_only": True},
            "url": {"write_only": True},
            "prompt": {"write_only": True},
        }