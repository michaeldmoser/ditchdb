import pytest
from faker import Faker
from factories import PropertyFactory
from rest_framework.test import APIClient


@pytest.fixture(scope="session", autouse=True)
def faker_seed():
    return 132091


@pytest.fixture(scope="session", autouse=True)
def reseed_random(faker_seed):
    """Reseed random number generator"""
    import factory.random

    factory.random.reseed_random(faker_seed)


@pytest.fixture(scope="function")
def faker():
    """Faker instance for generating fake data"""
    return Faker()


@pytest.fixture(scope="function")
def property(
    db,
):  # Auto use db fixture so we don't have to remember to mark each test with @pytest.mark.django
    """Create a property"""
    return PropertyFactory.create()


@pytest.fixture(scope="function")
def client(
    db,
):  # Auto use db fixture so we don't have to remember to mark each test with @pytest.mark.django
    """Create a test client"""
    return APIClient()
