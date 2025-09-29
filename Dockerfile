# Use official Node.js image
FROM node:18

#Set working directory
WORKDIR /app

#Copy package files
COPY package*.json ./

#Install dependencies
RUN npm install

#Copy the rest of the app
COPY . .

#Build the next.js app
RUN npm run build

#Expose port 3000
EXPOSE 3000

#Run the app
CMD ["npm", "start"]