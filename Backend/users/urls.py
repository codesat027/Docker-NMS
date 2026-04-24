# users/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("register/",        views.RegisterView.as_view()),
    path("login/",           views.LoginView.as_view()),
    path("logout/",          views.LogoutView.as_view()),
    path("refresh/",         views.TokenRefreshView.as_view()),
    path("profile/",         views.UserProfileView.as_view()),
    path("users/",           views.UserListView.as_view()),
    path("users/<int:user_id>/", views.UserDetailView.as_view()),
]