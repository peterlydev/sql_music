DROP TABLE IF EXISTS songs;

CREATE TABLE songs (
    id serial PRIMARY KEY,
    title VARCHAR(255),
    year_of_song INT,
    fav_line VARCHAR(500),
    artist_id int
);
