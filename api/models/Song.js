const db = require('../dbConfig/init');

const Artist = require('./Artist');

module.exports = class Song {
    constructor(data, artist){
        this.id = data.id;
        this.title = data.title;
        this.yearOfSong = data.year_of_song;
        this.favLine = data.fav_line;
        this.artist = { name: data.artist_name, path: `/artists/${data.artist_id}`};
    };

    static get all(){
        return new Promise (async (resolve, reject) => {
            try {
                let songData = await db.query(`SELECT * FROM songs;`);
                let songs = songData.rows.map(b => new Song(b));
                resolve (songs);
            } catch (err) {
                reject('Song not found');
            }
        });
    };

    
    
    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                let songData = await db.query(`SELECT songs.*, artists.name as artist_name
                                                    FROM songs 
                                                    JOIN artists ON songs.artist_id = artists.id
                                                    WHERE songs.id = $1;`, [ id ]);
                let song = new Song(songData.rows[0]);
                resolve (song);
            } catch (err) {
                reject('Song not found');
            }
        });
    };
    
    static async create(songData){
        return new Promise (async (resolve, reject) => {
            try {
                const { title, yearOfSong, favLine, artistName} = songData;
                let artist = await Artist.findOrCreateByName(artistName);
                const result = await db.query(`INSERT INTO songs (title, year_of_song, fav_line, artist_id) VALUES ($1, $2, $3, $4) RETURNING*;`, [title, yearOfSong, favLine, artist.id]);
    
                resolve (result.rows[0]);
            } catch (err) {
                reject('Song could not be created');
            }
        });
    };

    destroy(){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await db.query(`DELETE FROM songs WHERE id = $1;`, [ this.id ]);
                const artist = await Artist.findById(result.rows[0].artist_id);
                const songs = await artist.songs;
                if(!songs.length){await artist.destroy()}
                resolve('Song was deleted')
            } catch (err) {
                reject('Song could not be deleted')
            }
        })
    };
};

