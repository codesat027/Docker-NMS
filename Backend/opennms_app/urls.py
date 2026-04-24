from django.urls import path
from .views import health_check


urlpatterns = [
    
    path('test/', health_check , name='test_view')
]
