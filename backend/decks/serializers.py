from rest_framework import serializers
from decks.models import Deck
from cards.models import Card
from cards.serializers import CardSerializer

class DeckSerializer(serializers.ModelSerializer):
    cards = serializers.SerializerMethodField()

    class Meta:
        model = Deck
        fields = [ "id", "category_id", "subcategory_id", "name", "cards" ]
        extra_kwargs = { "id": { "read_only": True } }
    
    def get_cards(self, obj):
        cards = Card.objects.filter(deck_id=obj.id)
        return CardSerializer(cards, many=True).data