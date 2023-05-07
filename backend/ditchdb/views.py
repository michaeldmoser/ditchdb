from django.shortcuts import render

# Create rest framework view for OhdcProperties model
from rest_framework import viewsets
from .serializers import PropertySerializer
from .models import Property


class OhdcPropertiesViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all().order_by('addr_street', 'addr_predirectional',
                                               'addr_postdirectional', 'addr_number', 'addr_roadsuffix')
    serializer_class = PropertySerializer
