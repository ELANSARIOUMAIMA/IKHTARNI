# Step 1: Use official Node.js image
FROM node:18

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy Node.js dependencies and install
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of the Node.js project
COPY . .

# Step 5: Install Python 3 and pip
RUN apt-get update && apt-get install -y python3 python3-pip
RUN pip3 install --upgrade pip

# Step 6: Copy Python requirements and install
COPY resume_matcher/requirements.txt ./resume_matcher/requirements.txt
RUN pip3 install -r ./resume_matcher/requirements.txt

# Step 7: Expose port 5000 (your Node.js backend)
EXPOSE 5000

# Step 8: Start the Node.js server
CMD ["node", "server.js"]
