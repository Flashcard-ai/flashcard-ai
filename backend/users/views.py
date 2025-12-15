from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(username=email, password=password)

        if not user:
            return Response({"detail": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Gerar o token

        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        response = Response({"access": str(access)}, status=status.HTTP_200_OK)

        # Enviar o refresh como HttpOnly Cookie

        response.set_cookie(
            key="refresh",
            value=str(refresh),
            httponly=True,
            secure=not settings.DEBUG,
            max_age=1296000, # 15 dias
            samesite="None" if not settings.DEBUG else "Lax",
            path="/"
        )

        return response
    

class RefreshTokenAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh")

        if not refresh_token:
            return Response({"detail": "Refresh token not provided"}, status=status.HTTP_401_UNAUTHORIZED)
        

        try:
            refresh = RefreshToken(refresh_token)
            new_access = str(refresh.access_token)

            new_refresh = str(refresh)

            response = Response({"access": new_access})

            response.set_cookie(
                key="refresh",
                value=new_refresh,
                httponly=True,
                secure=not settings.DEBUG,
                max_age=1296000, # 15 dias
                samesite="None" if not settings.DEBUG else "Lax",
                path="/"
            )

            return response
        
        except TokenError:
            return Response({"detail": "Invalid refresh token"}, status=status.HTTP_401_UNAUTHORIZED)