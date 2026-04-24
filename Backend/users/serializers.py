# users/serializers.py
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser


class RegisterSerializer(serializers.ModelSerializer):
    password  = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model  = CustomUser
        fields = [
            'username', 'password', 'password2',
            'email', 'role','organization'
        ]

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        user     = CustomUser(**validated_data)
        user.set_password(password)  # hashes the password
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(
            username=data['username'],
            password=data['password']
        )
        if not user:
            raise serializers.ValidationError("Invalid username or password")
        if not user.is_active:
            raise serializers.ValidationError("This account has been disabled")
        data['user'] = user
        return data


class UserSerializer(serializers.ModelSerializer):
    """Used for profile view and user list — never exposes password"""

    class Meta:
        model  = CustomUser
        fields = [
            'id', 'username', 'email', 'role',
        'organization', 'email_alerts',
            'is_active', 'created_at', 'last_login'
        ]
        read_only_fields = ['id', 'created_at', 'last_login']