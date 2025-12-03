from django.urls import path
from signup.views import UserAPIView

urlpatterns = [
    path("", UserAPIView.as_view(), name="signup_view")
]
