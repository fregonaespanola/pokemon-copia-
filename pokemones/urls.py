from django.urls import path

from .views import Listado, Detalle, PokemonDetailView, PokemonListView, register_user
from . import views

app_name = "pokemones"
urlpatterns = [
    path('api/', PokemonListView.as_view(), name='usuario-list'),
    path('api/<int:pk>/', PokemonDetailView.as_view(), name='usuario-detail'),
    path('register/', register_user, name='register'),

]
