const db = require('../dbConfig/init');
const Song = require('./Song');

module.exports = class Artist {
    constructor(data){
        this.id = data.id;
        this.name = data.name;
    };
    
    static get all(){ 
        return new Promise (async (resolve, reject) => {
            try {
                // console.log(db);
                const result = await db.query(`SELECT * FROM artists;`)
                const artists = result.rows.map(a => ({id: a.id, name: a.name}));
                resolve(artists);
            } catch (err) {
                reject("Error retrieving artists")
            }
        })
    };

    get songs(){
        return new Promise (async (resolve, reject) => {
            try {
                const result = await db.query('SELECT id, title FROM songs WHERE artist_id = $1;', [ this.id ]);
                const songs = result.rows.map(b => ({title: b.title, path: `/songs/${b.id}`}))
                resolve(songs);
            } catch (err) {
                reject("Artist's songs could not be found");
            };
        });
    };

    destroy(){
        return new Promise(async(resolve, reject) => {
            try {
                const result = await db.query(`DELETE FROM artists WHERE id = $1 RETURNING id;`, [ this.id ]);
                resolve(`Artist ${result.id} was deleted`)
            } catch (err) {
                reject('Artist could not be deleted')
            }
        })   
    }

    static findById(id){
        return new Promise (async (resolve, reject) => {
            try {
                let artistData = await db.query(`SELECT * FROM artists WHERE id = $1;`, [ id ]);
                let artist = new Artist(artistData.rows[0]);
                resolve(artist);
            } catch (err) {
                reject('Artist not found');
            };
        });
    };

    static create(name){
        return new Promise (async (resolve, reject) => {
            try {
                let artistData = await db.query(`INSERT INTO artists (name) VALUES ($1) RETURNING *;`, [ name ]);
                let artist = new Artist(artistData.rows[0]);
                resolve (artist);
            } catch (err) {
                reject('Artist could not be created');
            };
        });
    };

    static findOrCreateByName(name){
        return new Promise (async (resolve, reject) => {
            try {
                let artist;
                const artistData = await db.query(`SELECT * FROM artists WHERE name = $1;`, [ name ]);
                if(!artistData.rows.length) {
                    artist = await Artist.create(name);
                } else {
                    artist = new Artist(artistData.rows[0]);
                };
                resolve(artist);
            } catch (err) {
                reject(err);
            };
        });
    };
};

