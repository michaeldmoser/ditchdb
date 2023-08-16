from django.contrib import admin
from .models import Property, Billing, People, Organizations

# Register your models here.

@admin.register(Property)
class RequestDemoAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Property._meta.get_fields() if field.is_relation is False]

@admin.register(Billing)
class RequestDemoAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Billing._meta.get_fields() if field.is_relation is False]

@admin.register(People)
class RequestDemoAdmin(admin.ModelAdmin):
    list_display = [field.name for field in People._meta.get_fields() if field.is_relation is False]

@admin.register(Organizations)
class RequestDemoAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Organizations._meta.get_fields() if field.is_relation is False]
    
