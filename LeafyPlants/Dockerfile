FROM node:18-alpine as build 

WORKDIR /app

#copying package file 
COPY package*.json ./

#installing pacakages 
RUN npm install 

#copying remaining code 
COPY . . 


#build the application 
RUN npm run build


#production stage with nginx 
FROM nginx:alpine 


#copying build files from build stage 
COPY --from=build /app/dist /usr/share/nginx/html 


#copy nginx configuration 
COPY nginx.conf /etc/nginx/conf.d/default.conf 


EXPOSE 80 


CMD ["nginx", "-g", "daemon off;"] 



