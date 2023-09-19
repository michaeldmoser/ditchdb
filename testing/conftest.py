import os
import pytest

os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"


@pytest.fixture(autouse=True)
def enable_live_server(db, live_server):
    """Enable live_server fixture for all tests."""
    pass


@pytest.fixture(autouse=True)
def faker_seed():
    return 132091
