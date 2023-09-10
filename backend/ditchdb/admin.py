from django.contrib import admin
from .models import Property, Billing, Person, Organization

# Register your models here.


@admin.register(Property)
class RequestDemoAdmin(admin.ModelAdmin):
    list_display = [
        field.name
        for field in Property._meta.get_fields()
        if field.is_relation is False
    ]


@admin.register(Billing)
class RequestDemoAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in Billing._meta.get_fields() if field.is_relation is False
    ]


@admin.register(Person)
class RequestDemoAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in Person._meta.get_fields() if field.is_relation is False
    ]


@admin.register(Organization)
class RequestDemoAdmin(admin.ModelAdmin):
    list_display = [
        field.name
        for field in Organization._meta.get_fields()
        if field.is_relation is False
    ]
