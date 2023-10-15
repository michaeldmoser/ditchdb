from django.contrib import admin
from .models import Property, Billing, Person, Organization, Owner, MailingAddress

# Register your models here.


class PersonInline(admin.StackedInline):
    model = Person
    extra = 0


class OrganizationInline(admin.StackedInline):
    model = Organization
    extra = 0


class BillingInline(admin.StackedInline):
    model = Billing
    extra = 0


class PersonThroughInline(admin.StackedInline):
    model = Person.properties.through
    extra = 0


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = [
        field.name
        for field in Property._meta.get_fields()
        if field.is_relation is False
    ]

    search_fields = ["id", "address", "addr_number", "addr_street", "addr_roadsuffix"]

    inlines = [BillingInline, PersonThroughInline]


@admin.register(Billing)
class BillingAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in Billing._meta.get_fields() if field.is_relation is False
    ]


@admin.register(Person)
class PersonAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in Person._meta.get_fields() if field.is_relation is False
    ]


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = [
        field.name
        for field in Organization._meta.get_fields()
        if field.is_relation is False
    ]


@admin.register(Owner)
class OwnerAdmin(admin.ModelAdmin):
    list_display = [
        field.name for field in Owner._meta.get_fields() if field.is_relation is False
    ]

    inlines = [PersonInline, OrganizationInline]


@admin.register(MailingAddress)
class MailingAddressAdmin(admin.ModelAdmin):
    list_display = [
        field.name
        for field in MailingAddress._meta.get_fields()
        if field.is_relation is False
    ]
