# Klangwolke
[Klangwolke](https://klangwolke.herokuapp.com/) is a [Soundcloud](https://soundcloud.com/)-inspired app that allows users to stream and share techno/house music.

## Technologies Used
### Backend:
* Python
* Flask
* WTForms
* SQLAlchemy
* PostgreSQL
* Docker
* Heroku

### Frontend:
* JavaScript
* React
* Redux
* Styled-Components

## Development
### Setting Up
1. Clone the repository
2. Install dependencies
   1. `pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt`
   2. `cd react-app && npm install`
3. Create a `.env` file based on the `.env.example`, with the proper settings for your development environment
4. Set up your PostgreSQL user and database, and make sure that it matches the information in the `.env`
5. Get into pipenv and get the database up to date:
   1. `pipenv shell`
   2. `flask db upprade`
   3. `flask seed all`
6. Start development servers
   1. `flask run`
   2. `npm start`

### Installing new dependencies

If you add any Python dependencies to your pipfiles (using `pipenv install`), you will need to regenerate the `requirements.txt` before deployment.

For production dependencies, run `pipenv lock -r > requirements.txt`.

For development dependencies, run `pipenv lock -r --dev > dev-requirements.txt`.

**Note**: `psycopg2-binary` MUST remain a dev dependency because you can't install it on apline-linux. There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.

## Coming Soon
* Song pages
* User pages
* Comments (with full CRUD functionality)
* Implementation of song queues

## Documentation
* [Database Schema](https://github.com/isaacsungpak/klangwolke/wiki/Database-Schema)
* [Feature List](https://github.com/isaacsungpak/klangwolke/wiki/Feature-List)
* [User Stories](https://github.com/isaacsungpak/klangwolke/wiki/User-Stories)
* [Wireframes](https://github.com/isaacsungpak/klangwolke/wiki/Wireframes)
