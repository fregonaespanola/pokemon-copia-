from django.contrib import admin
from .models import Pokemon, Tipo, Ataque
# Register your models here.
admin.site.register(Pokemon)
admin.site.register(Tipo)
admin.site.register(Ataque)