# pylint: disable= E1101, C0413, R0903, W0603, W1508

from app import DB


class Players(DB.Model):

    username = DB.Column(DB.String(80),
                         unique=True,
                         primary_key=True,
                         nullable=False)
    score = DB.Column(DB.Integer, nullable=False)

    def __repr__(self):
        return '<Player %r>' % self.username
