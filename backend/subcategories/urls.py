from django.urls import path
from subcategories.views import SubcategoryAPIView, SubcategoryDetailView

app_name = "subcategories"

urlpatterns = [
    path("", SubcategoryAPIView.as_view(), name="subcategory_view"),
    path("<int:id>/", SubcategoryDetailView.as_view(), name="subcategory_detail")
]
