import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
from sqlalchemy import desc
from flask import request
load_dotenv(find_dotenv())  # This is to load your env variables from .env
app = Flask(__name__, static_folder='./build/static')

# Point SQLAlchemy to your Heroku database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# IMPORTANT: This must be AFTER creating db variable to prevent
# circular import issues
import models
db.create_all()

cors = CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)
users = []
players = []
spectators = []


@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)


# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    ''' Connecting user'''
    print('user connected')


# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    '''when user is connected '''
    print('User disconnected!')


@socketio.on('move')
def on_move(data):  # data is whatever arg you pass in your emit call on client
    '''when players play a move'''
    print(str(data))

    # This emits the 'move' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('move', data, broadcast=True, include_self=False)


@socketio.on('login')
def on_login(
        data):  # data is whatever arg you pass in your emit call on client
    """whever players login"""
    print("username", data["username"], "request.sid", request.sid)

    leaderboard=add_user_to_db(data["username"])

    # This emits the 'login' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    #{"username":data["username"],"score":score,"id":data["id"],"userType":data["userType"]}
    socketio.emit('login', {
        "username": data["username"],
        "id": data["id"],
        "userType": data["userType"],
        "leaderboard": leaderboard
    },
                  broadcast=True,
                  include_self=False)
    
def add_user_to_db(user):
    all_users = models.Players.query.all(
    )  #all users in the players table in the database
    users = []  #userlist
    leaderboard = {}  #leaderboard

    #print("username",data["username"],"request.sid",request.sid)
    # print("login",str(data))
    #print("userType",data["userType"])
    for people in all_users:  #adding all users to user's list
        users.append(people.username)

    if user not in users:  #if user is not in the database add to the database with the score of 100

        new_user = models.Players(username=user, score=100)
        #print("newuser",new_user)
        db.session.add(new_user)
        db.session.commit()

    leaderboard=get_leaderboard()
    
    return leaderboard



@socketio.on("replay")
def on_replay(data):
    """When replay event is recieved"""
    socketio.emit('replay', data, broadcast=True, include_self=False)


# Note we need to add this line so we can import app in the python shell


@socketio.on("winner")
def on_winner(data):
    """ when recieving winner event"""
    print(data)
    print("userType", data["userType"], request.sid)

   

    leaderboard = {}  #empty dictionaryfor leaderboard

    update_score(data["username"],data["players"])

    leaderboard=get_leaderboard()

    socketio.emit('winner', {
        "leaderboard": leaderboard
    },
                  broadcast=True,
                  include_self=True)

def get_leaderboard():
    leader = {}
    desc_ordered_list = models.Players.query.order_by(
        desc(models.Players.score)).all(
        )  #list of user in descending order based on the score
    for user in desc_ordered_list:  #adding username as a key and score as a value to the leaderboard dictionary
        leader[user.username] = user.score
    leader = json.dumps(leader, sort_keys=False)
    return leader
    
def update_score(username,players):
    playerX = db.session.query(models.Players).filter_by(
        username=players
        [0]).first()  #player withe user name of playerX from database.
    playerO = db.session.query(models.Players).filter_by(
        username=players
        [1]).first()  #player withe user name of playerO from database.
    if playerX.username == username:  #adding 1 point to the score of a  playerX if  it's user name matches with the username of winner
        playerX.score += 1
        db.session.commit()
    else:
        playerX.score -= 1
        db.session.commit()

    if playerO.username == username:  #adding 1 point to the score of a  playerO if  it's user name matches with the username of winner
        playerO.score += 1
        db.session.commit()
    else:
        playerO.score -= 1
        db.session.commit()

if __name__ == "__main__":
    # Note that we don't call app.run anymore. We call socketio.run with app arg
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
