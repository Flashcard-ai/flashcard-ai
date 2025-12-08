from django.urls import path
from cards.views import CardAPIView, FlashCardAIAPIView, CardDetailView

app_name = "cards"

urlpatterns = [
    path("", CardAPIView.as_view(), name="card_view"),
    path("ai/", FlashCardAIAPIView.as_view(), name="flashcard_ai_view"),
    path("<int:id>/", CardDetailView.as_view(), name="card_detail")
]
