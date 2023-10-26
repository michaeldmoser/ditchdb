"""REST API views for ditchdb app."""
import logging
from rest_framework import viewsets, generics, views
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

logger = logging.getLogger(__name__)


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
        owners = property.owners.all()

        return Response(OwnerSerializer(owners, many=True).data)

    @action(detail=True)
    def addresses(self, request, pk=None):
        """Retrieve a list of address for this property"""
        property = self.get_object()
        addresses = property.addresses.all()

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
        person = self.get_bill_to_person(request)

        billing = property.billing.filter(active=True).first()
        if billing is None:
            billing = Billing(property=property, person=person)

        serializer = BillingSerializer(billing, data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        serializer.save()
        return Response(serializer.data)

    @action(detail=True)
    def billto(self, request, pk=None):
        """Retrieve the list of contact details usable for billing"""
        property = self.get_object()
        billto = property.people.all()

        return Response(PersonSerializer(billto, many=True).data)

    def get_bill_to_person(self, request):
        """Retrieve the person from the bill_to"""
        bill_to_id = request.data.get("bill_to")
        if bill_to_id is not None and bill_to_id != "":
            person = Person.objects.get(id=bill_to_id)
        else:
            person = None

        return person


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


class BillToView(generics.RetrieveAPIView):
    """Collects the bill to data that can be inserted into the Setup Billing form when creating a billing record"""

    def get(self, request, person_id):
        person = Person.objects.get(id=person_id)
        address = person.owner.addresses.filter(defaultaddress=True).first()

        data = {
            "address_to_line": person.name,
            "attention_to_line": "",
            "street_address": address.street_address,
            "city": address.city,
            "state": address.state,
            "zip": address.zip,
        }

        return Response(data)
