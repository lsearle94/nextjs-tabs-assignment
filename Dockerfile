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

#Generate Prisma client
RUN npx prisma generate

#Build the next.js app (skip lint)
RUN npx next build --no-lint

#Expose port 3000
EXPOSE 3000

#Run the app
CMD ["npm", "start"]