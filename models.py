from app import db


 
class Players(db.Model):
   
    username = db.Column(db.String(80), unique=True,primary_key=True, nullable=False)
    score = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<Person %r>' % self.username
