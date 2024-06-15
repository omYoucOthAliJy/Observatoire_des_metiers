# Étape 1: Construction de l'application
FROM node:18-alpine AS builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier le reste du code de l'application dans le répertoire de travail
COPY . .

ARG NEXT_PUBLIC_BASE_URL

ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

# Construire l'application Next.js pour la production
RUN npm run build

# Étape 2: Créer l'image de production
FROM node:18-alpine AS production

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier uniquement les fichiers nécessaires pour exécuter l'application
COPY package*.json ./
RUN npm install --only=production

# Copier les fichiers construits depuis l'étape de build
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/next.config.js ./

# Définir les variables d'environnement pour la production
ENV NODE_ENV="production"

# Exposer le port sur lequel l'application sera exécutée
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
