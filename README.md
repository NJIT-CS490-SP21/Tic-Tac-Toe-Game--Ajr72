# Flask and create-react-app

## Requirements
1. `npm install`
2. `pip install -r requirements.txt`


## Setup
1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

## Run Application
1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

## Deploy to Heroku
*Don't do the Heroku step for assignments, you only need to deploy for Project 2*
1. Create a Heroku app: `heroku create --buildpack heroku/python`
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Push to Heroku: `git push heroku miestne_1:main`
## How to clone this repository
*Option one: clone this directory using the clone button.
*Option two: Use the following command in the terminal to clone:
..* `git clone git@github.com:NJIT-CS490-SP21/project2-ajr72.git`
## Known Problems.
1. When a tile is already clicked is should not be allowed to click again but in my app it is still allowing to click again. If i had more time then I would try different solution to solve this problem.
2. UI is not good. If i had more time I would definetely make a nicer and clean UI.
3. The board should be displayed only after atleast two users are logged in but in my case it is displayed even one user is logged in. I would learned how to use if else in html if I had more time.
## Known Technical Issues
1. For me React itself was technical issue because the syntax was very difficult to understand for me. I had difficulty in creating the component, changing the state, using emmit to broadcast the states to clients,using useeffect to recieve the data from servers.
-> I solved this by going to professor's office hours, doing research online and asking for help on slack.
2. My second Issue was to deploying my app on heroku. The issue I was having was my Board.js had an error and it  was not compiling. another issue was that i didn't add required build packes.
-> I solved this issue by removing the error in my Board.js file and added buildpacks as shown above.
3. Third Issue i was having was that somehow when there was a draw in the match then my app was not showing it was a draw. The issue was that it was not updating the properly.
-> I solved this error by updating the state correctly.
