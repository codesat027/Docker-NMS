# users/permissions.py
from rest_framework.permissions import BasePermission


class IsSuperAdmin(BasePermission):
    """Only superadmin can access"""
    message = "You must be a superadmin to perform this action"

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role == "superadmin"
        )


class IsAdminOrAbove(BasePermission):
    """Admin and superadmin can access"""
    message = "You must be an admin or above to perform this action"

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role in ["superadmin", "admin"]
        )


class IsViewerOrAbove(BasePermission):
    """All authenticated users can access"""
    message = "You must be logged in to perform this action"

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role in ["superadmin", "admin", "viewer"]
        )