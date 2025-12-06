from django.contrib import admin
from django.urls import path, include
from users.views import LoginAPIView, RefreshTokenAPIView


urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/login/", LoginAPIView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", RefreshTokenAPIView.as_view(), name="token_refresh"),
    path("accounts/signup/", include("signup.urls")),
    path("categories/", include("categories.urls")),
    path("subcategories/", include("subcategories.urls")),
    path("decks/", include("decks.urls")),
    path("cards/", include("cards.urls")),
]
