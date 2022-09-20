DROP TABLE IF EXISTS artists;

CREATE TABLE artists (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL
);
