"""REST API views for ditchdb app."""
from rest_framework import viewsets, generics
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import (
    PropertySerializer,
    PersonSerializer,
    OrganizationSerializer,
    OwnerSerializer,
    MailingAddressSerializer,
    BillingSerializer,
)
from .models import Property, Person, Organization, Billing


class PropertyViewSet(viewsets.ModelViewSet):
    """API endpoint that allows properties to be viewed or edited."""

    queryset = Property.objects.all().order_by(
        "addr_street",
        "addr_predirectional",
        "addr_postdirectional",
        "addr_number",
        "addr_roadsuffix",
    )
    serializer_class = PropertySerializer

    @action(detail=True)
    def owners(self, request, pk=None):
        """Retrieve list of owners"""
        property = self.get_object()
        owners = [
            entity
            for owner in property.owners.select_related("party").prefetch_related(
                "party__names"
            )
            for entity in owner.party.names.all()
        ]

        return Response(OwnerSerializer(owners, many=True).data)

    @action(detail=True)
    def addresses(self, request, pk=None):
        """Retrieve a list of address for this property"""
        property = self.get_object()
        addresses = [
            address
            for owner in property.owners.select_related("party").prefetch_related(
                "party__addresses"
            )
            for address in owner.party.addresses.all()
        ]
        return Response(MailingAddressSerializer(addresses, many=True).data)

    @action(detail=True)
    def billing(self, request, pk=None):
        """Retrieve a list of billing addresses for this property"""
        property = self.get_object()
        billing = property.billing.filter(active=True).first()
        if billing is None:
            return Response({}, status=404)

        return Response(BillingSerializer(billing).data)

    @billing.mapping.post
    def set_billing(self, request, pk=None):
        """Set the billing address for this property"""
        property = self.get_object()
        billing = property.billing.filter(active=True).first()
        if billing is None:
            billing = Billing(property=property)

        serializer = BillingSerializer(billing, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class PersonViewSet(viewsets.ModelViewSet):
    """API endpoint that allows people to be viewed or edited."""

    queryset = Person.objects.all().order_by("last_name", "first_name")
    serializer_class = PersonSerializer


class OrganizationViewSet(viewsets.ModelViewSet):
    """API endpoint that allows organizations to be viewed or edited."""

    queryset = Organization.objects.all().order_by("name")
    serializer_class = OrganizationSerializer


class BillingViewSet(viewsets.ModelViewSet):
    """API endpoint that allows billing addresses to be viewed or edited."""

    queryset = Billing.objects.all().order_by("address_to_line")
    serializer_class = BillingSerializer


class OwnerListView(generics.ListAPIView):
    serializer_class = OwnerSerializer

    def get_queryset(self):
        property_id = self.kwargs["property_id"]
        return PropertyOwner.objects.filter(property_id=property_id)
