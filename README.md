# :hibiscus: Bouquet-gen

A website built to generate bouquets :bouquet: based on a user's prompt.

## :thinking: How does it work?

The tech stack is:

- **Frontend** - NextJS, TailwindCSS, Clerk
- **Backend** - Flask, Prisma
- **DB** - Postgres
- **Deployment** - Vercel for the front and back end, Supabase for the DB

For now the website simply prompts OpenAI's api and parses it's response. However in the future I plan to make my own NLP specifically for this website (which is why I used Flask for this project!). I chose NextJS and TailwindCSS to create a reactive and clean ui to complement the aesthetic of my websites theme. I also used Clerk and Prisma to streamline my process and have easier access to my DB and authentication.

### :smiling_face_with_tear: Challenges faced while working on this project

Deployment was a huge issue for me as a new developer trying out various new technologies while trying not to pay money for set up. I struggled to get Flask up and running on Vercel for weeks until I finally managed to get it (somehow) working. However, I originally handled all my Prisma operations in my Flask backend through Prisma-Client-Py: which unfortunately Vercel had a large facet of issues properly initializing. Thus for the sake of not paying for a separate backend deployment I migrated my Prisma operations to NextJs whilst keeping parts of my Flask backend functional for possible future AI projects I would like to work on using this project.

## :hammer_and_wrench: Running locally

1. Clone the repo and in the root directory run `npm install`

2. Create an .env file in the root directory and add your Clerk, OpenAI, and Google Images keys

3. Cd into the backend folder and run `py -3 -m venv .venv` then `.venv\Scripts\activate`

4. To use saving, run a local db on postgres and add its db url to your .env
