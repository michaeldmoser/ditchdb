import os
import pytest

os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"


@pytest.fixture(autouse=True)
def enable_live_server(db, live_server):
    """Enable live_server fixture for all tests."""
    pass


@pytest.fixture(scope="session", autouse=True)
def faker_seed():
    return 132091


@pytest.fixture(scope="session", autouse=True)
def reseed_random(faker_seed):
    """Reseed random number generator"""
    import factory.random

    factory.random.reseed_random(faker_seed)
