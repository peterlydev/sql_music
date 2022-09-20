INSERT INTO artists (name) 
VALUES
('Blackpink'),
('Fozzy'),
('Lizzo');

INSERT INTO songs (title, year_of_song, fav_line, artist_id) 
VALUES
(
    'Shut Down', 
    2022, 
    $str$Blackpink in your area!$str$,
    1
),
(
    'Pink Venom', 
    2022, 
    $str$Blackpink in your area.$str$,
    1
),
(
    'Judas',
    2017,
    $str$You are beautiful on the inside, you are innocence personified.$str$,
    2

),
(
    'About Damn Time',
    2022,
    $str$Im coming out tonight.$str$,
    3
),
(
    'Good As Hell',
    2019,
    $str$I do my hair toss, check my nails, baby how you doing?$str$,
    3
);
