import csv
import database_common

STATUSES_FILE = './data/statuses.csv'
BOARDS_FILE = './data/boards.csv'
CARDS_FILE = './data/cards.csv'

_cache = {}  # We store cached data in this dict to avoid multiple file readings


# def _read_csv(file_name):
#     """
#     Reads content of a .csv file
#     :param file_name: relative path to data file
#     :return: OrderedDict
#     """
#     with open(file_name) as boards:
#         rows = csv.DictReader(boards, delimiter=',', quotechar='"')
#         formatted_data = []
#         for row in rows:
#             formatted_data.append(dict(row))
#         return formatted_data


# def _get_data(data_type, file, force):
#     """
#     Reads defined type of data from file or cache
#     :param data_type: key where the data is stored in cache
#     :param file: relative path to data file
#     :param force: if set to True, cache will be ignored
#     :return: OrderedDict
#     """
#     if force or data_type not in _cache:
#         _cache[data_type] = _read_csv(file)
#     return _cache[data_type]


# def clear_cache():
#     for k in list(_cache.keys()):
#         _cache.pop(k)


# def get_statuses(force=False):
#     return _get_data('statuses', STATUSES_FILE, force)


# def get_boards(force=False):
#     return _get_data('boards', BOARDS_FILE, force)

@database_common.connection_handler
def get_boards(cursor):
    cursor.execute("""
        SELECT * FROM board
        ORDER BY id DESC 
    """)
    return cursor.fetchall()


@database_common.connection_handler
def get_cards(cursor, board_id, status_id):
    cursor.execute("""
        SELECT * FROM card
        WHERE board_id = %(board_id)s AND status_id = %(status_id)s
    """, {'board_id': board_id, 'status_id': status_id})
    return cursor.fetchall()


@database_common.connection_handler
def get_statuses(cursor):
    cursor.execute("""
        SELECT * FROM status
        ORDER BY id
    """)
    return cursor.fetchall()
