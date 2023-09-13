# View to reset the database to a known state for testing
from django.conf import settings
from django.core.management import call_command
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


if not (settings.DEBUG and settings.DJANGO_DEV):
    raise Exception("ResetDatabaseView should only be used in DEBUG mode")


@method_decorator(csrf_exempt, name="dispatch")
class ResetDatabaseView(APIView):
    def delete(self, request, *args, **kwargs):
        if not settings.DEBUG:
            return Response(
                {"detail": "Not allowed in production"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        call_command("flush", interactive=False)

        return Response(
            {"detail": "Database reset successfully"}, status=status.HTTP_200_OK
        )
