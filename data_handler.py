import persistence


def get_statuses():
    return persistence.get_statuses()


def get_boards():
    return persistence.get_boards()


def get_cards_for_board(board_id):
    statuses = get_statuses()
    cards = {}
    for status in statuses:
        cards[status['id']] = persistence.get_cards(board_id, status['id'])
    return cards


def add_new_board():
    persistence.add_new_board()
