# users/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

from .models import CustomUser
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer
from .permissions import IsSuperAdmin


def get_tokens_for_user(user):
    """Generate JWT access + refresh tokens for a user"""
    refresh = RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access":  str(refresh.access_token),
    }


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user   = serializer.save()
            tokens = get_tokens_for_user(user)
            return Response({
                "message": "User registered successfully",
                "user":    UserSerializer(user).data,
                "tokens":  tokens
            }, status=201)
        return Response(serializer.errors, status=400)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user   = serializer.validated_data['user']
            tokens = get_tokens_for_user(user)
            return Response({
                "message": "Login successful",
                "user":    UserSerializer(user).data,
                "tokens":  tokens
            })
        return Response(serializer.errors, status=400)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response({"error": "Refresh token required"}, status=400)
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out successfully"})
        except TokenError:
            return Response({"error": "Invalid or expired token"}, status=400)


class TokenRefreshView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response({"error": "Refresh token required"}, status=400)
            token  = RefreshToken(refresh_token)
            return Response({
                "access": str(token.access_token)
            })
        except TokenError:
            return Response({"error": "Invalid or expired token"}, status=400)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Get own profile"""
        return Response(UserSerializer(request.user).data)

    def patch(self, request):
        """Update own profile"""
        serializer = UserSerializer(
            request.user,
            data=request.data,
            partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Profile updated",
                "user":    serializer.data
            })
        return Response(serializer.errors, status=400)


class UserListView(APIView):
    permission_classes = [IsSuperAdmin]

    def get(self, request):
        """List all users — superadmin only"""
        users = CustomUser.objects.all().order_by("-created_at")
        return Response(UserSerializer(users, many=True).data)

    def post(self, request):
        """Create user — superadmin only"""
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "User created successfully",
                "user":    UserSerializer(user).data
            }, status=201)
        return Response(serializer.errors, status=400)


class UserDetailView(APIView):
    permission_classes = [IsSuperAdmin]

    def patch(self, request, user_id):
        """Update any user — superadmin only"""
        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "User updated",
                "user":    serializer.data
            })
        return Response(serializer.errors, status=400)

    def delete(self, request, user_id):
        """Delete any user — superadmin only"""
        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        # prevent superadmin from deleting themselves
        if user == request.user:
            return Response(
                {"error": "You cannot delete your own account"},
                status=400
            )

        user.delete()
        return Response({"message": "User deleted"}, status=204)