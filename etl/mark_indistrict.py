from qgis.core import *
import os
from qgis import processing
import psycopg
from psycopg.rows import dict_row
from pprint import pprint
import datetime
import json
from decimal import Decimal
from dotenv import dotenv_values
import os
import django
from django.db import transaction

config = dotenv_values('../.env')

os.environ.setdefault('DJANGO_SETTINGS_MODULE', config.get('DJANGO_SETTINGS_MODULE', 'backend.settings'))
django.setup()

from etl.processes import DistrictMarker  # noqa E402
from ditchdb.models import OrionProperty, Property, OrionOwner  # noqa E402

district = DistrictMarker('Boundaries.shp', 'current/Missoula_Parcels.gdb')
district.mark()
