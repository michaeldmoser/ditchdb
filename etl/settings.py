"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 4.1.7.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""

from pathlib import Path
import os
import environ

BASE_DIR = Path(__file__).resolve().parent

# Initialize environment
env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, '../.env'))

DJANGO_DEV = env.bool('DJANGO_DEV', default=False)

CI = env.bool('CI', default=False)

# Build paths inside the project like this: BASE_DIR / 'subdir'.


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
}
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env.str(
    'SECRET_KEY', default='k!6c3%m3babnqhcej(&xvy1r*du#5!t&d5xvjwal682u37*p&b')  # noqa E501

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = DJANGO_DEV or CI or env.bool('DEBUG', default=False)

ALLOWED_HOSTS = ['127.0.0.1', 'localhost', 'e2e', 'app']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'ditchdb',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['../frontend'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# DATABASE
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DB_ENGINE = env.str('DB_ENGINE', default='postgresql')
DB_NAME = env.str('DB_NAME', default='postgres')
DB_USER = env.str('DB_USER', default='postgres')
DB_PASSWORD = env.str('DB_PASSWORD', default='postgres')
DB_HOST = env.str('DB_HOST', default='localhost')
DB_PORT = env.str('DB_PORT', default='5432')

database_default = f"{DB_ENGINE}://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

DATABASES = {
    'default': env.db_url(
        "DATABASE_URL", default=database_default)
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',  # noqa: E501
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',  # noqa: E501

    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',  # noqa: E501

    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',  # noqa: E501

    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = '/static/'

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "../frontend/dist"),
    os.path.join(BASE_DIR, '../frontend/public')
)

DJANGO_VITE_ASSETS_PATH = os.path.join(BASE_DIR, "../frontend/dist")
STATIC_ROOT = 'static'
DJANGO_VITE_DEV_MODE = DJANGO_DEV
DJANGO_VITE_DEV_SERVER_PORT = env.int('VITE_DEV_PORT', default=5173)
DJANGO_VITE_DEV_SERVER_HOST = env.str('VITE_DEV_HOST', default='localhost')

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'COERCE_DECIMAL_TO_STRING': False,
}
