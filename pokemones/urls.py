from django.urls import path

from .views import Listado, Detalle, register_user
from . import views

app_name = "pokemones"
urlpatterns = [
    path("", Listado.as_view(), name="index"),
    path("<int:pk>/", Detalle.as_view(), name="detalle"),
    path('register/', register_user, name='register'),
    path('api/<int:pk>/', views.PokemonViewSet.as_view({'get': 'retrieve'}), name='pokemon-detail'),
]
