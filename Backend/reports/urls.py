from django.urls import path
from . import views

urlpatterns = [
    path("csv/",  views.DownloadCSVView.as_view()),
    path("pdf/",  views.DownloadPDFView.as_view()),
    
]