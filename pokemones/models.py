from django.db import models

class Tipo(models.Model):
    nombre = models.CharField(max_length=100)
    imagen = models.ImageField(upload_to='fotos')
    color = models.CharField(max_length=100) 

    def __str__(self):
        return self.nombre

class Ataque(models.Model):
    nombre = models.CharField(max_length=100)
    tipo = models.ForeignKey(Tipo, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

class Pokemon(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    tipo = models.ForeignKey(Tipo, on_delete=models.CASCADE)
    ataques = models.ManyToManyField(Ataque)
    imagen = models.ImageField(upload_to='fotos')

    def __str__(self):
        return self.nombre