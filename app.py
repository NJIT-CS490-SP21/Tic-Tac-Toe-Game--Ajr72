import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
from sqlalchemy import desc
from flask import request
load_dotenv(find_dotenv()) # This is to load your env variables from .env
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
socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)
users =[]
players =[]
spectators=[]
@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    leaderboard={}
    
# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')

# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided
@socketio.on('chat')
def on_chat(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('chat',  data, broadcast=True, include_self=False)
@socketio.on('move')
def on_move(data): # data is whatever arg you pass in your emit call on client
    print(str(data))
    """Connecting Socket"""
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('move', data, broadcast=True, include_self=False)

@socketio.on('login')
def on_login(data): # data is whatever arg you pass in your emit call on client
    """Connecting Socket"""
    print("username",data["username"],"request.sid",request.sid)
    global leaderboard
    all_users =models.Players.query.all()
    users=[]
    users_data=[];
    leaderboard={}
    
    #print("username",data["username"],"request.sid",request.sid)
   # print("login",str(data))
    #print("userType",data["userType"])
    for people in all_users:
        users.append(people.username)
    
    if data["username"] not in users:
   
        new_user = models.Players(username=data['username'],score=100)
        #print("newuser",new_user)
        db.session.add(new_user)
        db.session.commit()
    
    desc_ordered_list = models.Players.query.order_by(desc(models.Players.score)).all()
    for user in desc_ordered_list:
        leaderboard[user.username] = user.score
    users_data.append(leaderboard)
    #print(users_data)
    
    
   
   # print("leaderboard",leaderboard)
    leaderboard=json.dumps(leaderboard,sort_keys=False)
   
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    #{"username":data["username"],"score":score,"id":data["id"],"userType":data["userType"]}
    socketio.emit('login', {"username":data["username"],"id":data["id"],"userType":data["userType"],"leaderboard":leaderboard}, broadcast=True, include_self=False)


# Note that we don't call app.run anymore. We call socketio.run with app arg
@socketio.on("replay")
def on_replay(data):
 socketio.emit('replay', data, broadcast=True, include_self=False) 

# Note we need to add this line so we can import app in the python shell

@socketio.on("winner")
def on_winner(data):
    print(data)
    print("userType",data["userType"],request.sid)
    leaderboard ={}
    
    if(data["userType"]=="PlayerX" or data["userType"]=="PlayerO"):
        user = db.session.query(models.Players).filter_by(username=data["username"]).first()
        print(user,user.username,user.score)
        
       # print(user,"before score",user.score)
        if data['winner']==data["userType"]:
          user.score+=+1
          db.session.commit()
          #print("winner",leaderboard[user.username])
          print(user, "after score", user.score)
        elif data['winner']!=data["userType"]:
            user.score-=1
            db.session.commit()
        else:
            user.score+=0
            db.session.commit()
          #print("losser",leaderboard[user.username])
            print(user, "after score", user.score)
        desc_ordered_list = models.Players.query.order_by(desc(models.Players.score)).all()
        for user in desc_ordered_list:
            leaderboard[user.username] = user.score
        leaderboard=json.dumps(leaderboard,sort_keys=False)
        
         
    socketio.emit('winner',{"winner":data["winner"],"username": data["username"],"id":data["id"] ,"userType":data["userType"],"leaderboard":leaderboard},broadcast=True, include_self=True)      

if __name__ == "__main__":
# Note that we don't call app.run anymore. We call socketio.run with app arg
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )