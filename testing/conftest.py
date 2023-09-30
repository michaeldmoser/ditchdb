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


@pytest.fixture(scope="function", autouse=True)
def set_default_playwright_timeout(context):
    return context.set_default_timeout(5000)


@pytest.fixture(scope="session")
def browser_context_args(browser_context_args):
    return {
        **browser_context_args,
        "viewport": {
            "width": 1920,
            "height": 1080,
        },
    }
