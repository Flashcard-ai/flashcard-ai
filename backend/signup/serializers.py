from rest_framework import serializers
from users.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ "email", "password" ]
        extra_kwargs = { "password": {"write_only": True} }

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data["email"]
        )
        user.set_password(validated_data["password"])
        user.save()
        return user