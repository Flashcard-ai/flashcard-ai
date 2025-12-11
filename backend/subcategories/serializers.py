from rest_framework import serializers
from subcategories.models import Subcategory
from decks.models import Deck
from decks.serializers import DeckSerializer

class SubcategorySerializer(serializers.ModelSerializer):
    decks = serializers.SerializerMethodField()

    class Meta:
        model = Subcategory
        fields = [ "id", "category_id", "name", "decks" ]
        extra_kwargs = { "id": { "read_only": True } }

    def get_decks(self, obj):
        decks = Deck.objects.filter(subcategory_id=obj.id)
        return DeckSerializer(decks, many=True).data
