# Use uma imagem base oficial do Python
FROM python:3.8-slim

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o arquivo de dependências para o diretório de trabalho
COPY requirements.txt .

# Instale as dependências do projeto
RUN pip install --no-cache-dir -r requirements.txt

# Copie o restante da aplicação para o container
COPY . .

# Exponha a porta que o FastAPI vai rodar
EXPOSE 8000

# Comando para iniciar a aplicação FastAPI usando Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
