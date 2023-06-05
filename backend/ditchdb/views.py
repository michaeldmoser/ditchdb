from django.shortcuts import render

# Create rest framework view for OhdcProperties model
from rest_framework import viewsets
from .serializers import PropertySerializer, ContactSerializer, OrganizationSerializer
from .models import Property, Contacts, Organizations


class OhdcPropertiesViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all().order_by('addr_street', 'addr_predirectional',
                                               'addr_postdirectional', 'addr_number', 'addr_roadsuffix')
    serializer_class = PropertySerializer


class ContactsViewSet(viewsets.ModelViewSet):
    queryset = Contacts.objects.all().order_by('last_name', 'first_name')
    serializer_class = ContactSerializer


class OrganizationsViewSet(viewsets.ModelViewSet):
    queryset = Organizations.objects.all().order_by('name')
    serializer_class = OrganizationSerializer
