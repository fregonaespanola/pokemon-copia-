from typing import Any
from django.db.models.query import QuerySet
from django.shortcuts import render
from django.views import generic
from .models import Pokemon
from django.contrib.auth.mixins import LoginRequiredMixin
# Create your views here.
class Listado(generic.ListView):
    template_name = "pokemones/listado.html"
    model = Pokemon
    paginate_by = 4

class Detalle(LoginRequiredMixin, generic.DetailView):
    template_name = "pokemones/detalle.html"
    model = Pokemon

from rest_framework import viewsets

from .serializers import PokemonSerializer

class PokemonViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Pokemon.objects.all()
    serializer_class = PokemonSerializer

