from django.urls import path
from categories.views import CategoryAPIView, CategoryDetailView

app_name = "categories"

urlpatterns = [
    path("", CategoryAPIView.as_view(), name="category_view"),
    path("<int:id>/", CategoryDetailView.as_view(), name="category_detail")
]
