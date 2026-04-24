from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def health_check(response):
    return HttpResponse("System is working fine , welcome to backend of openNMS")