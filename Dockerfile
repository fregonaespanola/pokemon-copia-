# Usar una imagen base de Python
FROM python:latest

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo requirements.txt e instalar las dependencias
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Copiar todo el código de la aplicación Django
COPY . .

# Exponer el puerto 8000 para la aplicación Django
EXPOSE 8000

# Comando para ejecutar la aplicación Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
