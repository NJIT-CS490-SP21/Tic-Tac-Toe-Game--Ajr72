"""
moacked_app_test.py
"""
import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys
from sqlalchemy import desc
# This lets you import from the parent directory (one level up)
sys.path.append(os.path.dirname(os.path.abspath('../')))
from app import add_user_to_db, get_player
import app
import models
USERNAME_INPUT = "key"
INITIAL_USER = 'Goku'
INITIAL_SCORE = 98
INITIAL_USER_2 = 'Ang'
INITIAL_SCORE_2 = 100
INITIAL_USER_3 = 'Flash'
INITIAL_SCORE_3 = 160
INITIAL_USER_4 = 'Joker'
INITIAL_SCORE_4 = 200
INITIAL_USER_5 = 'Hulk'
INITIAL_SCORE_5 = 90
EXPECTED_OUTPUT = ''
PLAYERS="players"
INDEX="index"

class AddUserTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                USERNAME_INPUT: 'naman',
                EXPECTED_OUTPUT: {
                    "naman": 100,
                    INITIAL_USER: INITIAL_SCORE,
                },
            },
            {
                USERNAME_INPUT: 'ash',
                EXPECTED_OUTPUT: {
                    "naman": 100,
                    "ash": 100,
                    INITIAL_USER: INITIAL_SCORE,
                },
            },
            {
                USERNAME_INPUT: 'james',
                EXPECTED_OUTPUT: {
                    "naman": 100,
                    "ash": 100,
                    "james": 100,
                    INITIAL_USER: INITIAL_SCORE,
                },
            },
            {
                USERNAME_INPUT: 'peter',
                EXPECTED_OUTPUT: {
                    "naman": 100,
                    "ash": 100,
                    "james": 100,
                    "peter": 100,
                    INITIAL_USER: INITIAL_SCORE,
                },
            },
        ]
        initial_player = models.Players(username=INITIAL_USER,
                                        score=INITIAL_SCORE)

        self.initial_db_mock = [initial_player]
        print(self.initial_db_mock)

    def mocked_db_session_add(self, username):
        self.initial_db_mock.append(username)
        #print("1sr", self.initial_db_mock)
    def mocked_db_session_commit(self):
        #print("2nd",self.initial_db_mock)
        pass

    def mocked_person_query_all(self):
        #print("3rd", self.initial_db_mock)
        return self.initial_db_mock

    def mocked_add_to_dict(self):
        pass

    def test_success(self):
        for test in self.success_test_params:
            with patch('models.Players.query') as mocked_query:
                mocked_query.all = self.mocked_person_query_all
                with patch('app.DB.session.add', self.mocked_db_session_add):
                    with patch('app.DB.session.commit',
                               self.mocked_db_session_commit):
                        #print("initial_db_mock", self.initial_db_mock)
                        #print("test[USERNAME_INPUT]", test[USERNAME_INPUT])
                        #print(add_user_to_db(test[USERNAME_INPUT]))
                        #print("test[EXPECTED_OUTPUT]", EXPECTED_OUTPUT)
                        actual_result = add_user_to_db(test[USERNAME_INPUT])
                        #print("Actual", actual_result)
                        expected_result = test[EXPECTED_OUTPUT]
                        #print("Expected", expected_result)
                        self.assertEqual(len(actual_result),
                                         len(expected_result))
                        self.assertEqual(actual_result, expected_result)


class GetPLayerTestCase(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
               
                PLAYERS: ["Goku","Ang"],
                INDEX:0,
                EXPECTED_OUTPUT: models.Players(username=INITIAL_USER,score=INITIAL_SCORE),
            },
            {
               
                PLAYERS: ["Goku","Ang"],
                INDEX:1,
                EXPECTED_OUTPUT: models.Players(username=INITIAL_USER_2,score=INITIAL_SCORE_2),
            },
            {
               
                PLAYERS: ["Hulk","Flash"],
                INDEX:0,
                EXPECTED_OUTPUT: models.Players(username=INITIAL_USER_5,score=INITIAL_SCORE_5),
            },
             {
               
                PLAYERS: ["Hulk","Flash"],
                INDEX:1,
                EXPECTED_OUTPUT: models.Players(username=INITIAL_USER_3,score=INITIAL_SCORE_3),
            },
             {
               
                PLAYERS: ["Joker","Flash"],
                INDEX:1,
                EXPECTED_OUTPUT: models.Players(username=INITIAL_USER_3,score=INITIAL_SCORE_3),
            },
             {
               
                PLAYERS: ["Joker","Flash"],
                INDEX:0,
                EXPECTED_OUTPUT: models.Players(username=INITIAL_USER_4,score=INITIAL_SCORE_4),
            },
        ]
        initial_player = models.Players(username=INITIAL_USER,
                                        score=INITIAL_SCORE)
        initial_player_2 =  models.Players(username=INITIAL_USER_2,
                                        score=INITIAL_SCORE_2)
        initial_player_3 =  models.Players(username=INITIAL_USER_3,
                                        score=INITIAL_SCORE_3)
        initial_player_4 =  models.Players(username=INITIAL_USER_4,
                                        score=INITIAL_SCORE_4)
        initial_player_5 =  models.Players(username=INITIAL_USER_5,
                                        score=INITIAL_SCORE_5)
        self.initial_db_mock = [initial_player,initial_player_2,initial_player_3,initial_player_4,initial_player_5]  
        print("grt_player_initial_db",self.initial_db_mock)
    def mock_query_filter_by(self,players,index):
        player=""
        for user in self.initial_db_mock:
            if user.username == players[index]:
                player = user
                break
        return player
    def test_success(self):
        for test in self.success_test_params: 
             with patch("app.helper_player",self.mock_query_filter_by):
                 actual_result =get_player(test[PLAYERS],test[INDEX])
                 print("Actual", actual_result)
                 expected_result=test[EXPECTED_OUTPUT]
                 print("Expected", expected_result)
                 #self.assertEqual(len(actual_result),
                                         #len(expected_result))
                 self.assertEqual(actual_result.username, expected_result.username)
                 self.assertEqual(actual_result.score, expected_result.score)

            
if __name__ == '__main__':
    unittest.main()
