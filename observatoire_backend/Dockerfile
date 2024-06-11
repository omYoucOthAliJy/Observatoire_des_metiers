# Étape 1: Construction de l'application
FROM node:18-alpine AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances de développement
RUN npm install

# Copier le reste du code de l'application dans le répertoire de travail
COPY . .

# Construire l'application NestJS pour la production
RUN npm run build

# Étape 2: Créer l'image de production
FROM node:18-alpine AS production

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier uniquement les fichiers nécessaires pour exécuter l'application
COPY package*.json ./
RUN npm install --only=production

# Copier les fichiers construits depuis l'étape de build
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/src/templates ./dist/templates

# Définir les variables d'environnement pour la production
ENV DB_TYPE=""
ENV DB_HOST=""
ENV DB_PORT=""
ENV DB_ROOT_USER=""
ENV DB_ROOT_PASSWORD=""
ENV DB_NAME=""
ENV DB_SYNCHRONIZE=""

ENV MAILER_HOST=""
ENV MAILER_PORT=""
ENV MAILER_USER=""
ENV MAILER_PASSWORD=""
ENV MAIL_FROM=""

ENV JWT_SECRET=""
ENV JWT_EXPIRE=""

ENV JWT_SECRET_ADMIN=""
ENV JWT_EXPIRE_ADMIN=""

# Exposer le port sur lequel l'application sera exécutée
EXPOSE 4000

# Démarrer l'application
CMD ["node", "dist/main"]
