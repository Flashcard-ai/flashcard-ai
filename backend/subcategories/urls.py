from django.urls import path
from subcategories.views import SubcategoryAPIView

app_namee = "subcategories"

urlpatterns = [
    path("", SubcategoryAPIView.as_view(), name="subcategory_view")
]
