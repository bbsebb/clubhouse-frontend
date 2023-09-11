# gestion-club-angular-app/Dockerfile
FROM nginx:alpine
COPY dist/clubhouse-frontend /usr/share/nginx/html
