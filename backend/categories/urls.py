from django.urls import path
from categories.views import CategoryAPIView

app_name = "categories"

urlpatterns = [
    path("", CategoryAPIView.as_view(), name="category")
]
