"""
Template tag to create the react refresh required by vite.
"""
from django import template
from django.utils.safestring import mark_safe
from django_vite.templatetags.django_vite import DjangoViteAssetLoader, DJANGO_VITE_DEV_MODE

DJANGO_VITE_REACT_REFRESH_URL = '@react-refresh'

register = template.Library()
INSTANCE = DjangoViteAssetLoader.instance()


@register.simple_tag
@mark_safe
def vite_react_refresh() -> str:
    """
    Generates the script for the Vite React Refresh for HMR.
    Only used in development, in production this method returns
    an empty string.
    Returns:
        str -- The script or an empty string.
    """

    if not DJANGO_VITE_DEV_MODE:
        return ""

    return f"""<script type="module">
      import RefreshRuntime from \
      '{INSTANCE.generate_vite_asset_url(DJANGO_VITE_REACT_REFRESH_URL)}'
      RefreshRuntime.injectIntoGlobalHook(window)
      window.$RefreshReg$ = () => {{}}
      window.$RefreshSig$ = () => (type) => type
      window.__vite_plugin_react_preamble_installed__ = true
    </script>"""
