from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.contrib.auth.views import LogoutView
from . import settings
from pokemones.views import PokemonViewSet
from rest_framework import routers
from rest_framework.authtoken import views as viewsfr
router = routers.DefaultRouter()
router.register(r'api', PokemonViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/logout/', LogoutView.as_view(), name="logout"),  # Corrección aquí
    path("accounts/", include("django.contrib.auth.urls")),
    path('accounts/', include('allauth.urls')),
    path('', include('pokemones.urls')),
    path('api-token-auth/', viewsfr.obtain_auth_token),
]

urlpatterns += router.urls

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
