from django.contrib.auth.models import User

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
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user