"""REST API views for ditchdb app."""
from rest_framework import viewsets
from .serializers import PropertySerializer, PeopleSerializer, OrganizationSerializer
from .models import Property, People, Organizations


class OhdcPropertiesViewSet(viewsets.ModelViewSet):
    """API endpoint that allows properties to be viewed or edited."""
    queryset = Property.objects.all().order_by(
        'addr_street', 'addr_predirectional', 'addr_postdirectional',
        'addr_number', 'addr_roadsuffix')
    serializer_class = PropertySerializer


class PeopleViewSet(viewsets.ModelViewSet):
    """API endpoint that allows people to be viewed or edited."""
    queryset = People.objects.all().order_by('last_name', 'first_name')
    serializer_class = PeopleSerializer


class OrganizationsViewSet(viewsets.ModelViewSet):
    """API endpoint that allows organizations to be viewed or edited."""
    queryset = Organizations.objects.all().order_by('name')
    serializer_class = OrganizationSerializer
