'''
    unmoked_app_test.py
    to test if the player is winner or not
'''
import unittest
from app import is_winner, get_leaderboard
DB_USERNAME_INPUT = 'username'
DATA_USERNAME_INPUT = "data_username"
EXPECTED_OUTPUT = ""

LEADERBOARD_INPUT = ''


class IsWinnerTestCase(unittest.TestCase):
    """Class to test is_winner function"""
    def setUp(self):
        """set up function"""
        self.success_test_params = [
            {
                DB_USERNAME_INPUT: "Naman",
                DATA_USERNAME_INPUT: "Naman",
                EXPECTED_OUTPUT: True
            },
            {
                DB_USERNAME_INPUT: "Naman",
                DATA_USERNAME_INPUT: "Namen2",
                EXPECTED_OUTPUT: False
            },
            {
                DB_USERNAME_INPUT: "Ash",
                DATA_USERNAME_INPUT: "Naman",
                EXPECTED_OUTPUT: False
            },
            {
                DB_USERNAME_INPUT: "Ashutosh",
                DATA_USERNAME_INPUT: "Ashutosh",
                EXPECTED_OUTPUT: True
            },
        ]
        self.failure_test_params = [
            {
                DB_USERNAME_INPUT: "Naman",
                DATA_USERNAME_INPUT: "Naman",
                EXPECTED_OUTPUT: False
            },
            {
                DB_USERNAME_INPUT: "Naman",
                DATA_USERNAME_INPUT: "Namen2",
                EXPECTED_OUTPUT: True
            },
            {
                DB_USERNAME_INPUT: "Ash",
                DATA_USERNAME_INPUT: "Naman",
                EXPECTED_OUTPUT: True
            },
            {
                DB_USERNAME_INPUT: "Ashutosh",
                DATA_USERNAME_INPUT: "Ashutosh",
                EXPECTED_OUTPUT: False
            },
        ]

    def test_is_winner(self):
        """test success case of is_winner function"""
        for test in self.success_test_params:
            actual_result = is_winner(test[DB_USERNAME_INPUT],
                                      test[DATA_USERNAME_INPUT])
            print("actual", actual_result)
            # Assign the expected output as a variable from test
            expected_result = test[EXPECTED_OUTPUT]
            print("expected", expected_result)
            # Use assert checks to see compare values of the results
            self.assertEqual(actual_result, expected_result)
            self.assertEqual(len(str(actual_result)),
                             len(str(expected_result)))

        for test in self.failure_test_params:
            actual_result = is_winner(test[DB_USERNAME_INPUT],
                                      test[DATA_USERNAME_INPUT])
            print("actual", actual_result)
            # Assign the expected output as a variable from test
            expected_result = test[EXPECTED_OUTPUT]
            print("expected", expected_result)
            # Use assert checks to see compare values of the results

            self.assertNotEqual(len(str(actual_result)),
                                len(str(expected_result)))
            self.assertNotEqual(actual_result, expected_result)


class GetLeaderboardTestCase(unittest.TestCase):
    """ Class for get_leaderboaer testcase"""
    def setUp(self):
        """setup function"""
        self.success_test_params = [
            {
                LEADERBOARD_INPUT: {
                    "Ang": 100,
                    "Zuko": 98,
                    "Katara": 101
                },
                EXPECTED_OUTPUT: {
                    "Katara": 101,
                    "Ang": 100,
                    "Zuko": 98
                },
            },
            {
                LEADERBOARD_INPUT: {
                    "Batman": 99,
                    "Robin": 120,
                    "Joker": 200,
                    "Cyborg": 89
                },
                EXPECTED_OUTPUT: {
                    "Joker": 200,
                    "Robin": 120,
                    "Batman": 99,
                    "Cyborg": 89
                },
            },
            {
                LEADERBOARD_INPUT: {
                    "Flash": 259,
                    "Thwan": 300,
                    "KidFlash": 200,
                    "BlackFlash": 150,
                    "Zoom": 270
                },
                EXPECTED_OUTPUT: {
                    "Thwan": 300,
                    "Zoom": 270,
                    "Flash": 259,
                    "KidFlash": 200,
                    "BlackFlash": 150
                },
            },
            {
                LEADERBOARD_INPUT: {
                    "Thanos": 350,
                    "CaptianA": 320,
                    "Hulk": 330,
                    "Thor": 400,
                    "BlackWidow": 300,
                    "Ironman": 450
                },
                EXPECTED_OUTPUT: {
                    "Ironman": 450,
                    "Thor": 400,
                    "Thanos": 350,
                    "Hulk": 330,
                    "CaptianA": 320,
                    "BlackWidow": 300
                },
            },
        ]

    def test_get_leaderboard(self):
        """testing get_leaderboard function"""
        for test in self.success_test_params:
            actual_result = get_leaderboard(test[LEADERBOARD_INPUT])
            print("Actual", actual_result)
            # Assign the expected output as a variable from test
            expected_result = test[EXPECTED_OUTPUT]
            print("Expected", expected_result)
            # Use assert checks to see compare values of the results
            self.assertEqual(actual_result, expected_result)
            self.assertEqual(len(actual_result), len(expected_result))
            self.assertEqual(type(actual_result), type(expected_result))


if __name__ == '__main__':
    unittest.main()
