"""REST API views for ditchdb app."""
from rest_framework import viewsets
from .serializers import PropertySerializer, ContactSerializer, OrganizationSerializer
from .models import Property, Contacts, Organizations


class OhdcPropertiesViewSet(viewsets.ModelViewSet):
    """API endpoint that allows properties to be viewed or edited."""
    queryset = Property.objects.all().order_by(
        'addr_street', 'addr_predirectional', 'addr_postdirectional',
        'addr_number', 'addr_roadsuffix')
    serializer_class = PropertySerializer


class ContactsViewSet(viewsets.ModelViewSet):
    """API endpoint that allows contacts to be viewed or edited."""
    queryset = Contacts.objects.all().order_by('last_name', 'first_name')
    serializer_class = ContactSerializer


class OrganizationsViewSet(viewsets.ModelViewSet):
    """API endpoint that allows organizations to be viewed or edited."""
    queryset = Organizations.objects.all().order_by('name')
    serializer_class = OrganizationSerializer
