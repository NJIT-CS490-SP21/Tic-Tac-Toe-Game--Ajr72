"""
Managing Database
"""
# pylint: disable= E1101, C0413, R0903, W0603, W1508
import os
from flask import Flask, send_from_directory, json, request
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
# from sqlalchemy import desc
load_dotenv(find_dotenv())  # This is to load your env variables from .env
APP = Flask(__name__, static_folder='./build/static')

# Point SQLAlchemy to your Heroku database
APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

DB = SQLAlchemy(APP)

# IMPORTANT: This must be AFTER creating db variable to prevent
# circular import issues
import models
DB.create_all()

CORS = CORS(APP, resources={r"/*": {"origins": "*"}})
SOCKETIO = SocketIO(APP,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)


@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    """To Build"""
    return send_from_directory('./build', filename)


# When a client connects from this Socket connection, this function is run
@SOCKETIO.on('connect')
def on_connect():
    ''' Connecting user'''
    print('user connected')


# When a client disconnects from this Socket connection, this function is run
@SOCKETIO.on('disconnect')
def on_disconnect():
    '''when user is connected '''
    print('User disconnected!')


@SOCKETIO.on('move')
def on_move(data):  # data is whatever arg you pass in your emit call on client
    '''when players play a move'''
    print(str(data))

    # This emits the 'move' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    SOCKETIO.emit('move', data, broadcast=True, include_self=False)


@SOCKETIO.on('login')
def on_login(
        data):  # data is whatever arg you pass in your emit call on client
    """whever players login"""
    print("username", data["username"], "request.sid", request.sid)

    leaderboard = add_user_to_db(data["username"])
    print(leaderboard)
    # This emits the 'login' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    #{"username":data["username"],"score":score,"id":data["id"],"userType":data["userType"]}
    SOCKETIO.emit('login', {
        "username": data["username"],
        "id": data["id"],
        "leaderboard": leaderboard
    },
                  broadcast=True,
                  include_self=False)


def add_user_to_db(user):
    """ Add new user to database"""
    all_users = models.Players.query.all(
    )  #all users in the players table in the database
    users = []  #userlist
    leaderboard = {}  #leaderboard
    unordered_leader_board = {} # unordered leaderboard
    #print("username",data["username"],"request.sid",request.sid)
    # print("login",str(data))
    #print("userType",data["userType"])
    for people in all_users:  #adding all users to user's list
        users.append(people.username)
    
    if user not in users:  #if user is not in the database add to the database with the score of 100
        new_user = models.Players(username=user, score=100)
        #print("newuser",new_user)
        DB.session.add(new_user)
        DB.session.commit()
    for a_user in all_users:
        key = a_user.username
        key = str(key)
        scores = a_user.score
        print("key", key)
        unordered_leader_board[key] = scores
        #print("type of a_user.username", type(a_user.username))
    #print(unordered_leader_board)
    leaderboard = get_leaderboard(unordered_leader_board)
    # print("leaderboard", leaderboard)
    return leaderboard

    

@SOCKETIO.on("replay")
def on_replay(data):
    """When replay event is recieved"""
    SOCKETIO.emit('replay', data, broadcast=True, include_self=False)


# Note we need to add this line so we can import app in the python shell
@SOCKETIO.on("winner")
def on_winner(data):
    """ when recieving winner event"""
    print(data)
    print("userType", data["userType"], request.sid)

    leaderboard = {}  #empty dictionaryfor leaderboard
    unordered_leader_board = {}
    update_score(data["username"], data["players"])
    all_users = models.Players.query.all(
    )  #all users in the players table in the database
    for user in all_users:
        unordered_leader_board[user.username] = user.score

    leaderboard = get_leaderboard(unordered_leader_board)

    SOCKETIO.emit('winner', {"leaderboard": leaderboard},
                  broadcast=True,
                  include_self=True)


#function to get the leaderboard in descending order
def get_leaderboard(unordered_leader_board):
    """ Getting leader board in decending order"""

    desc_ordered_list = dict(
        sorted(unordered_leader_board.items(),
               key=lambda item: item[1],
               reverse=True))

    #desc_ordered_list = json.dumps(desc_ordered_list, sort_keys=False)
    # for  unit testing mocked or unmocked please comment the above line
    return desc_ordered_list


#function to update the score of player based on if he is the winner or looser.
def update_score(username, players):
    """update the score of players"""
    player_x = DB.session.query(
        models.Players).filter_by(username=players[0]).first(
        )  #player withe user name of playerX from database.
    player_o = DB.session.query(
        models.Players).filter_by(username=players[1]).first(
        )  #player withe user name of playerO from database.
    if is_winner(player_x.username, username):
        #adding 1 point to the score of a playerX if
        #it's user name matches with the username of winner
        player_x.score += 1
        DB.session.commit()
    else:
        player_x.score -= 1
        DB.session.commit()

    if is_winner(player_o.username, username):
        #adding 1 point to the score of a playerO if
        #it's user name matches with the username of winner
        player_o.score += 1
        DB.session.commit()
    else:
        player_o.score -= 1
        DB.session.commit()


def is_winner(db_username, data_username):
    """Check if the player is winnner or not"""
    if db_username == data_username:
        return True
    return False


if __name__ == "__main__":
    # Note that we don't call app.run anymore. We call socketio.run with app arg
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
