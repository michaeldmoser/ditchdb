"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include

from django.shortcuts import render
from django.conf import settings

from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework import routers
from ditchdb.views import (
    PropertyViewSet,
    PersonViewSet,
    OrganizationViewSet,
    BillToView,
)


@ensure_csrf_cookie
def render_react(request):
    """Render react index.html"""
    return render(request, "index.html")


class OptionalTrailingSlash(routers.DefaultRouter):
    """Make trailing slash optional for all routes"""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.trailing_slash = "/?"


router = OptionalTrailingSlash()
router.register(r"properties", PropertyViewSet, basename="property")
router.register(r"people", PersonViewSet)
router.register(r"organizations", OrganizationViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/billto/<int:person_id>/", BillToView.as_view(), name="billto"),
    path("api/", include(router.urls)),
    # re_path(r"^$", render_react),
    re_path(r"^app/(?:.*)/?$", render_react),
]

if settings.DEBUG and settings.DJANGO_DEV:
    from ditchdb.dev_views import ResetDatabaseView

    urlpatterns = [
        path("dev/reset-database", ResetDatabaseView.as_view(), name="reset-database")
    ] + urlpatterns
