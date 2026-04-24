from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class CustomUser(AbstractUser):

    class Role(models.TextChoices):
        SUPERADMIN = "superadmin", "Superadmin"
        ADMIN = "admin", "Admin"
        VIEWER = "viewer", "Viewer"
    

    role = models.CharField(max_length=20, choices = Role.choices, default = Role.VIEWER)
    organization = models.CharField(max_length= 100, blank = True, null = True)
    email_alerts = models.BooleanField(default=True)
    created_at   = models.DateTimeField(auto_now_add=True)
    updated_at   = models.DateTimeField(auto_now=True)


    @property
    def is_superadmin(self):
        return self.role == self.Role.SUPERADMIN
    
    @property
    def is_admin_or_above(self):
        return self.role in [self.Role.SUPERADMIN,self.Role.ADMIN]
    
    def __str__(self):
        return f"{self.username}- ({self.role})"
    

    class Meta:
        ordering = ["-created_at"]



    