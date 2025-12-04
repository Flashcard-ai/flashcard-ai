from django.urls import path
from decks.views import DeckAPIView, DeckDetailView

app_name = "decks"

urlpatterns = [
    path("", DeckAPIView.as_view(), name="deck_view"),
    path("<int:id>/", DeckDetailView.as_view(), name="deck_detail")
]
