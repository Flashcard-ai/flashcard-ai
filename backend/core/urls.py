from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("accounts/signup/", include("signup.urls")),
    path("categories/", include("categories.urls")),
    path("subcategories/", include("subcategories.urls")),
    path("decks/", include("decks.urls")),
    path("cards/", include("cards.urls")),
]
