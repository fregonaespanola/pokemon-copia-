from typing import Any

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.db.models.query import QuerySet
from django.shortcuts import render
from django.views import generic
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics
from .models import Pokemon
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import viewsets, status
from rest_framework.pagination import PageNumberPagination

from .serializers import UserSerializer, PokemonListSerializer, PokemonDetailSerializer


class PokemonPagination(PageNumberPagination):
    page_size = 4  # Especifica el número de pokemon por página
    # page_size_query_param = 'page_size'  # Parámetro opcional para permitir que el cliente especifique el tamaño de página
    # max_page_size = 1000  # Límite máximo para el tamaño de página


class Listado(generic.ListView):
    template_name = "pokemones/listado.html"
    model = Pokemon
    paginate_by = 4
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]


class Detalle(generic.DetailView):
    template_name = "pokemones/detalle.html"
    model = Pokemon
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]


class PokemonListView(generics.ListAPIView):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Pokemon.objects.all()
    serializer_class = PokemonListSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = PokemonPagination


class PokemonDetailView(generics.RetrieveAPIView):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Pokemon.objects.all()
    serializer_class = PokemonDetailSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]


@api_view(['POST'])
def register_user(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GoogleLogin(SocialLoginView):  # if you want to use Authorization Code Grant, use this
    adapter_class = GoogleOAuth2Adapter
    callback_url = 'http://localhost:8000/accounts/google/login/callback/'
    client_class = OAuth2Client
