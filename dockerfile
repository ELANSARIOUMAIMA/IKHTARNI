# 1. Image de base : Python + Node (pour les scripts Python et Node)
FROM python:3.10-slim

# 2. Installer Node.js
RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean

# 3. Définir le répertoire de travail dans le conteneur
WORKDIR /IKHTARNI

# 4. Copier et installer les dépendances Python
COPY resume_matcher/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copier tout le code du projet 
COPY . .

# 6. Installer les dépendances Node pour le serveur
WORKDIR /IKHTARNI/server
RUN npm install

# 7. Revenir au répertoire principal
WORKDIR /IKHTARNI

# 8. Donner les droits d’exécution à start.sh
RUN chmod +x start.sh

# 9. Exposer les ports utilisés par tes serveurs Node
EXPOSE 5000

# 10. Lancer les deux serveurs Node
CMD ["./start.sh"]
