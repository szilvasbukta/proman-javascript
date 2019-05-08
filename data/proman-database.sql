--
-- PostgresSQL database dump
--

-- Dumped from database version 9.5.6
-- Dumped by pg_dump version 9.5.6

ALTER TABLE IF EXISTS ONLY public.board DROP CONSTRAINT IF EXISTS pk_board_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.status DROP CONSTRAINT IF EXISTS pk_status_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.card DROP CONSTRAINT IF EXISTS pk_card_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.card DROP CONSTRAINT IF EXISTS fk_board_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.card DROP CONSTRAINT IF EXISTS fk_status_id CASCADE;


DROP TABLE IF EXISTS public.board;
DROP SEQUENCE IF EXISTS public.board_id_seq;
CREATE TABLE board (
    id serial NOT NULL,
    title text
);

DROP TABLE IF EXISTS public.crad;
DROP SEQUENCE IF EXISTS public.card_id_seq;
CREATE TABLE card (
    id serial NOT NULL,
    board_id integer,
    title text,
    status_id integer,
    order_id integer
);

DROP TABLE IF EXISTS public.status;
DROP SEQUENCE IF EXISTS public.status_id_seq;
CREATE TABLE status (
    id    serial NOT NULL,
    title text
);


ALTER TABLE ONLY board
    ADD CONSTRAINT pk_board_id PRIMARY KEY (id);

ALTER TABLE ONLY status
    ADD CONSTRAINT pk_status_id PRIMARY KEY (id);

ALTER TABLE ONLY card
    ADD CONSTRAINT pk_card_id PRIMARY KEY (id);


ALTER TABLE ONLY card
    ADD CONSTRAINT fk_board_id FOREIGN KEY (board_id) REFERENCES board(id);

ALTER TABLE ONLY card
    ADD CONSTRAINT fk_status_id FOREIGN KEY (status_id) REFERENCES status(id);


INSERT INTO board VALUES (1, 'Board 1');
INSERT INTO board VALUES (2, 'Board 2');
SELECT pg_catalog.setval('board_id_seq', 2, true);

INSERT  INTO  status VALUES  (0, 'new');
INSERT  INTO  status VALUES  (1, '"in progress"');
INSERT  INTO  status VALUES  (2, 'testing');
INSERT  INTO  status VALUES  (3, 'done');
SELECT pg_catalog.setval('status_id_seq', 3, true);


INSERT  INTO  card VALUES  (1, 1, 'new card 1', 0, 0);
INSERT  INTO  card VALUES  (2, 1, 'new card 2', 0, 1);
INSERT  INTO  card VALUES  (3, 1, 'in progress card', 1, 0);
INSERT  INTO  card VALUES  (4, 1, 'planning', 2, 0);
INSERT  INTO  card VALUES  (5, 1, 'done card 1', 3, 0);
INSERT  INTO  card VALUES  (6, 1, 'done card 1', 3, 1);
INSERT  INTO  card VALUES  (7, 2, 'new card 1', 0, 0);
INSERT  INTO  card VALUES  (8, 2, 'new card 2', 0, 1);
INSERT  INTO  card VALUES  (9, 2, 'in progress card', 1, 0);
INSERT  INTO  card VALUES  (10, 2, 'planning"', 2, 0);
INSERT  INTO  card VALUES  (11, 2, 'done card 1', 3, 0);
INSERT  INTO  card VALUES  (12, 2, 'done card 1', 3, 1);
SELECT pg_catalog.setval('card_id_seq', 12, true);