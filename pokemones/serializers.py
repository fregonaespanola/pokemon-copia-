from .models import Pokemon, Tipo, Ataque
from rest_framework import serializers


class TipoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipo
        fields = ['nombre', 'color','imagen']

class AtaqueSerializer(serializers.ModelSerializer):
    tipo = TipoSerializer() 

    class Meta:
        model = Ataque
        fields = ['nombre', 'tipo'] 


class PokemonSerializer(serializers.HyperlinkedModelSerializer):
    tipo = TipoSerializer()
    ataques = AtaqueSerializer(many=True)
    class Meta:
        model = Pokemon
        fields = ['nombre', 'descripcion', 'tipo', 'ataques', 'imagen']