from rest_framework import serializers
from decks.models import Deck

class DeckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deck
        fields = [ "id", "category_id", "subcategory_id", "name" ]
        extra_kwargs = { "id": { "read_only": True } }