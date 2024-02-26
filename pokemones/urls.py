from django.urls import path

from .views import Listado, Detalle
from . import views

app_name = "pokemones"
urlpatterns = [
    path("", Listado.as_view(), name="index"),
    path("<int:pk>/", Detalle.as_view(), name="detalle"),
]