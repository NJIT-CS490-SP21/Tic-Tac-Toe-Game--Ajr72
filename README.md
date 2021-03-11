


# Cs490 Project2-ajr72 Multiplayer Tic Tac Toe Game

# Technologies used in this Project:
  * **CSS**: To give style and design to the webpage.
  * **Python**: It is programing language which will host the Flask Framework and socket on server side.
  * **Flask Framework**: To create a server and connect backend and frontend, to maintain the database  and emiting events to clients using  socket io.
  * **React.js** : To create different  components  of the games and emitring events to server using socket.
## Requirements
1. `npm install`  to run the app from client side in javascript.
2. `pip install -r requirements.txt`  to install all required libraries
1. os: to interact with the operating system to get so data like data from .env file and also to provide port number and ip address of the pc to the app.
    
      ->``` os``` is a prebuilt library.
2. ```Flask ```: to create,run and handeling sockets events.
3. ```Flask-Cors```: to handle cross-origins in reacts.js
4. ```Flask-SocketIO```: to talk to recieving and emmint event from and to cliens in react.js.
5. ```Flask-SQLAlchemy``` to maintain the  databse of users and their scores.
>>>>>>> 617b94a516f684eb59270afccd3a7cebec2389ab
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
* Option one: clone this directory using the clone button.
* Option two: Use the following command in the terminal to clone:
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

3. Push to Heroku: `git push heroku :milestone_2:main```

## Known Problems.
1. When the new user is added the it will not show to the leaderbord of  that new user as I my 'include_self' is set to false in the login event in my app.py. This is because i am seperating users based on the counter. The counter increments by 1 when the user logs in and if counter is less than 3 it will push users to playerlist or it will users to spectatorlist. And if I make 'include_self' to true then it will add the first user twice in playerlist so from second player all will be aded to spectator list. if had more time i would change the structure my code to support what i told before.

## Feature I wanted to add.
1. I want add commentory/chat channel where spectator can make comment and all users including players and spectators can see that. I would use the concepts we studied in the class about chat app. 
2. I also want to add profile image for each users so it will show in the leaderbord as well as where the name of the users are displayed. I will learn how to add images to database in sqlAlchamy and postgres and maintiang the images in leaderbord dictionary in python.
3. Also I want to add championship which will have quater finals, semifinals and final and winner can get awards and gamecoins. I think i need to learn more react and more socketio where i can set state for the type of match and which players are playing what kind of match. 
## Known Technical Issues.
1. I had an issue to send winner to all clients and server after the game ends. The mistake I was making that I was sending the old state to the clients and server so all of them ws getting state where there was no winner yet. I solved the issue with the help of professor. I created a new variable for checking the winner when the state of board and it emit the updated winner to the server.
2. I had an issue with updating the score for players when the game ends.the mistake I was making that I was only emit data only for winner but not for losser so it was udating score only for the winner. I solved this issue with the help of professor.To solve this proplem I emitted the list of players and username of winner from client to server and then created variable for playerX and playerO that would be the player from databse with the username of players in the player list. if the PlayerX or PlayerO's username is equal to username of player then added point to the score or else deduct the point from score.
3. The third isuue I was having to make queries in using sqlAlchamy. I used the resources provided in the milestone specs to solve the issue.
4. I had issue with deploying app to heroku. I solved the issue by following lecture and hw notes provided by the professor.

