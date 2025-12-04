from django.urls import path
from cards.views import CardAPIView, CardDetailView

app_name = "cards"

urlpatterns = [
    path("", CardAPIView.as_view(), name="card_view"),
    path("<int:id>/", CardDetailView.as_view(), name="card_detail")
]
