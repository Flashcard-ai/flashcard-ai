from rest_framework import serializers
from decks.models import Deck

class DeckSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deck
        fields = [ "category_id", "subcategory_id", "name" ]