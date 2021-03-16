'''
    unmoked_app_test.py
'''
import unittest
from app import get_leaderboard, is_winner
DB_USERNAME_INPUT = 'username'
DATA_USERNAME_INPUT = "data_username"
USERNAME_INPUT = ""
LEADERBOARD_INPUT = ""
SCORE = 0
USER_INPUT = []
EXPECTED_OUTPUT = ""
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



if __name__ == '__main__':
    unittest.main()
