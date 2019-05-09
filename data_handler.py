import persistence


def get_statuses():
    return persistence.get_statuses()


def get_boards():
    """
    Gather all boards
    :return:
    """
    return persistence.get_boards()


# def get_cards_for_board(board_id):
#     persistence.clear_cache()
#     all_cards = persistence.get_cards()
#     matching_cards = []
#     for card in all_cards:
#         if card['board_id'] == str(board_id):
#             card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
#             matching_cards.append(card)
#     return matching_cards


def get_cards_for_board(board_id):
    statuses = get_statuses()
    cards = {}
    for status in statuses:
        cards[status['title']] = persistence.get_cards(board_id, status['id'])
    return cards

