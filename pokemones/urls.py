from django.urls import path

from .views import Listado, Detalle, PokemonDetailView, PokemonListView
from . import views

app_name = "pokemones"
urlpatterns = [
    path('api/', PokemonListView.as_view(), name='usuario-list'),
    path('api/<int:pk>/', PokemonDetailView.as_view(), name='usuario-detail'),

]
