"""REST API views for ditchdb app."""
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import PropertySerializer, PeopleSerializer, OrganizationSerializer, PartynameSerializer, PartyaddressSerializer
from .models import Property, People, Organizations

class OhdcPropertiesViewSet(viewsets.ModelViewSet):
    """API endpoint that allows properties to be viewed or edited."""
    queryset = Property.objects.all().order_by(
        'addr_street', 'addr_predirectional', 'addr_postdirectional',
        'addr_number', 'addr_roadsuffix')
    serializer_class = PropertySerializer

    @action(detail=True)
    def owners(self, request, pk=None):
        """Retrieve list of owners"""
        property = self.get_object()
        owners = [
            entity
              for owner in property.owners.select_related('party').prefetch_related('party__names')
              for entity in owner.party.names.all()
        ]

        return Response([PartynameSerializer(owner).data for owner in owners])

    @action(detail=True)
    def addresses(self, request, pk=None):
        """Retrieve a list of address for this property"""
        property = self.get_object()
        addresses = [
                address
                for owner in property.owners.select_related('party').prefetch_related('party__addresses')
                for address in owner.party.addresses.all()
                ]
        return Response([PartyaddressSerializer(address).data for address in addresses])

class PeopleViewSet(viewsets.ModelViewSet):
    """API endpoint that allows people to be viewed or edited."""
    queryset = People.objects.all().order_by('last_name', 'first_name')
    serializer_class = PeopleSerializer


class OrganizationsViewSet(viewsets.ModelViewSet):
    """API endpoint that allows organizations to be viewed or edited."""
    queryset = Organizations.objects.all().order_by('name')
    serializer_class = OrganizationSerializer
