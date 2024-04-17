# Fighter-Stats

Ce projet englobe une application backend et un frontend Angular. Réalisé dans le cadre du module Angular de notre formation, ce projet se décompose en 
plusieurs sections expliquées ci-dessous.

## Outils et technos utilisées

- Node.js : Environnement de développement JavaScript côté serveur
- WebStorm : Excellente prise en charge de Node.js et Angular
- GitKraken : Client Git qui facilite le versioning
- Angular : Framework TypeScript facile à initialiser

## Installation en local

### Repository

Clonage du répertoire
```bash
git clone https://github.com/Borloo/express-spotilike
```

### Pré-requis

- Node.js

### Installation des dépendances

```bash
npm install
```

```bash
npm run install-project-dependencies
```

## Base de données

<img src="./assets/images/DB_schemas.png" alt="DB schemas">

### Tables

1. User
```sql
create table User
(
    id       INTEGER
        primary key autoincrement,
    username TEXT,
    password TEXT,
    email    TEXT
);
```

2. Artist
```sql
create table Artist
(
    id     INTEGER
        primary key autoincrement,
    name   TEXT,
    avatar TEXT
);
```

3. Album
```sql
create table Album
(
    id           INTEGER
        primary key autoincrement,
    title        VARCHAR(255),
    cover_image  VARCHAR(255),
    release_date DATE,
    artist_id    INT
        references Artist
);
```

4. Gender
```sql
create table Gender
(
    id          INTEGER
        primary key autoincrement,
    title       TEXT,
    description TEXT
);
```

5. Song
```sql
create table Song
(
    id        INTEGER
        primary key autoincrement,
    title     VARCHAR(255),
    duration  INT,
    artist_id INT
        references Artist,
    gender_id INT
        references Gender,
    album_id  INT
        references Album
);
```

### Tables de jointures

1. Song_Gender
```sql
create table Song_Gender
(
    song_id  INT
        references Song,
    genre_id INT
        references Gender,
    primary key (song_id, genre_id)
);
```

2. Song_Album
```sql
create table Song_Album
(
    song_id  INT
        references Song
            on delete cascade,
    album_id INT
        references Album
            on delete cascade,
    primary key (song_id, album_id)
);
```

3. Song_Artist
```sql
create table Song_Artist
(
    song_id   INT
        references Song,
    artist_id INT
        references Artist
            on delete cascade,
    primary key (song_id, artist_id)
);
```

## L'implémentation

### Backend

1. Model
```javascript
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Song', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        artist_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        gender_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        album_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        tableName: 'Song',
        timestamps: false
    });
};
```

2. Relations
```javascript
var DataTypes = require("sequelize").DataTypes;
var _Album = require("./Album");
var _Artist = require("./Artist");
var _Gender = require("./Gender");
var _Song = require("./Song");
var _Song_Album = require("./Song_Album");
var _Song_Artist = require("./Song_Artist");
var _Song_Gender = require("./Song_Gender");
var _User = require("./User");

function initModels(sequelize) {
    var Album = _Album(sequelize, DataTypes);
    var Artist = _Artist(sequelize, DataTypes);
    var Gender = _Gender(sequelize, DataTypes);
    var Song = _Song(sequelize, DataTypes);
    var Song_Album = _Song_Album(sequelize, DataTypes);
    var Song_Artist = _Song_Artist(sequelize, DataTypes);
    var Song_Gender = _Song_Gender(sequelize, DataTypes);
    var User = _User(sequelize, DataTypes);

    Song.belongsTo(Album, { as: "album", foreignKey: "album_id"});
    Album.hasMany(Song, { as: "songs", foreignKey: "album_id"});
    Song_Album.belongsTo(Album, { as: "album", foreignKey: "album_id"});
    Album.hasMany(Song_Album, { as: "Song_Albums", foreignKey: "album_id"});
    Album.belongsTo(Artist, { as: "artist", foreignKey: "artist_id"});
    Artist.hasMany(Album, { as: "Albums", foreignKey: "artist_id"});
    Song.belongsTo(Artist, { as: "artist", foreignKey: "artist_id"});
    Artist.hasMany(Song, { as: "Songs", foreignKey: "artist_id"});
    Song_Artist.belongsTo(Artist, { as: "artist", foreignKey: "artist_id"});
    Artist.hasMany(Song_Artist, { as: "Song_Artists", foreignKey: "artist_id"});
    Song.belongsTo(Gender, { as: "gender", foreignKey: "gender_id"});
    Gender.hasMany(Song, { as: "Songs", foreignKey: "gender_id"});
    Song_Gender.belongsTo(Gender, { as: "genre", foreignKey: "genre_id"});
    Gender.hasMany(Song_Gender, { as: "Song_Genders", foreignKey: "genre_id"});
    Song_Album.belongsTo(Song, { as: "song", foreignKey: "song_id"});
    Song.hasMany(Song_Album, { as: "Song_Albums", foreignKey: "song_id"});
    Song_Artist.belongsTo(Song, { as: "song", foreignKey: "song_id"});
    Song.hasMany(Song_Artist, { as: "Song_Artists", foreignKey: "song_id"});
    Song_Gender.belongsTo(Song, { as: "song", foreignKey: "song_id"});
    Song.hasMany(Song_Gender, { as: "Song_Genders", foreignKey: "song_id"});

    return {
        Album,
        Artist,
        Gender,
        Song,
        Song_Album,
        Song_Artist,
        Song_Gender,
        User,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
```

3. Album routes
```javascript
const express = require('express');
const router = express.Router();
const {initModels} = require('../models/init-models');
const {sequelize} = require("./../models");
const ModelService = require('./../services/ModelService');
const AuthenticationService = require('./../services/AuthenticationService');

const {Album, Artist, Song, Gender} = initModels(sequelize);
const modelService = new ModelService();
const authenticationService = new AuthenticationService();

router.get('/', async (req, res) => {
    try {
        const albums = await Album.findAll(modelService.get_album_model());
        res.status(201).json(albums);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/:id', async (req, res) => {
    const album_id = req.params.id;
    try {
        const album = await Album.findByPk(album_id, modelService.get_album_model());
        if (!album) {
            res.status(409).json({error: 'Unknow album id: ' + album_id});
            return;
        }
        res.status(201).json(album);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/:id/songs', async (req, res) => {
    const album_id = req.params.id;
    try {
        const album = await Album.findByPk(album_id, modelService.get_album_model(true));
        if (!album) {
            res.status(409).json({error: 'Unknow album id: ' + album_id});
            return;
        }
        res.status(201).json(album.songs);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, cover_image, release_date, artist_id } = req.body;
        if (!title){
            res.status(400).json({ error: 'Title required' });
            return;
        }
        if (!cover_image){
            res.status(400).json({ error: 'Cover image required' });
            return;
        }
        if (!release_date){
            res.status(400).json({ error: 'Release date required' });
            return;
        }
        if (!artist_id){
            res.status(400).json({ error: 'Artist id required' });
            return;
        }
        const artist = await Artist.findByPk(artist_id);
        if (!artist){
            res.status(409).json({error: 'Unknow artist id: ' + artist_id});
            return;
        }
        const album = await Album.create({
            title,
            cover_image,
            release_date,
            artist_id
        });
        res.status(201).json(album);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/:id/songs', async (req, res) => {
    const album_id = req.params.id;
    const { title, duration, artist_id, gender_id} = req.body;
    try {
        if (!title){
            res.status(400).json({ error: 'Title required' });
            return;
        }
        if (!duration){
            res.status(400).json({ error: 'Duration (s) required' });
            return;
        }
        if (!artist_id){
            res.status(400).json({ error: 'Artist id required' });
            return;
        }
        if (!gender_id){
            res.status(400).json({ error: 'Gender id required' });
            return;
        }
        const album = await Album.findByPk(album_id);
        if (!album){
            res.status(409).json({error: 'Unknow album id: ' + album_id});
            return;
        }
        const artist = await Artist.findByPk(artist_id);
        if (!artist){
            res.status(409).json({error: 'Unknow artist id: ' + artist_id});
            return;
        }
        const gender = await Gender.findByPk(gender_id);
        if (!gender){
            res.status(409).json({error: 'Unknow gender id: ' + gender_id});
            return;
        }
        const newSong = await Song.create({
            title,
            duration,
            artist_id,
            gender_id,
            album_id
        });
        res.status(201).json(newSong);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async (req, res) => {
    const album_id = req.params.id;
    try {
        const album = await Album.findByPk(album_id);
        if (!album){
            res.status(409).json({error: 'Unknow album id: ' + album_id});
            return;
        }
        await album.update(req.body);
        res.status(201).json(album);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', authenticationService.authenticate_token.bind(authenticationService), async (req, res) => {
    const album_id = req.params.id;
    try {
        const album = await Album.findByPk(album_id);
        if (!album){
            res.status(409).json({error: 'Unknow album id: ' + album_id});
            return;
        }
        await Song.destroy({
            where: {
                album_id: album_id
            }
        });
        await album.destroy();
        res.status(200).json({message: "Album id: " + album_id + " deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
```

4. Route service
```javascript
const userRoutes = require('./../routes/app-user');
const genderRoutes = require('../routes/app-gender');
const artistRoutes = require('./../routes/app-artist');
const albumRoutes = require('./../routes/app-album');

class RouteService{

    constructor(app) {
        this.app = app;
    }

    init_routes(){
        this.app.use('/users', userRoutes);
        this.app.use('/genders', genderRoutes);
        this.app.use('/artists', artistRoutes);
        this.app.use('/albums', albumRoutes);
    }
}

module.exports = RouteService;
```

5. Application service
```javascript
const express = require('express');
const RouteService = require("./RouteService");

class AppService{

    constructor(app, sequelize, PORT) {
        this.app = app;
        this.sequelize = sequelize;
        this.PORT = PORT;
        this.routeService = new RouteService(app);
    }

    init_app(){
        this.setup_express();
        this.start_listening();
        this.routeService.init_routes();
    }

    setup_express(){
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });
        this.app.use(express.json())
    }

    start_listening(){
        this.app.listen(this.PORT, () => {
            console.debug('Express server listening on port ' + this.PORT);
        });

        this.app.on('error', this.on_error);
        this.app.on('listening', this.on_listening);
    }

    on_error(){
        console.log("Error");
    }

    on_listening(){
        console.log("Listening");
    }
}

module.exports = AppService;
```

6. Authentication service
```javascript
const jwt = require("jsonwebtoken");
const secret_key = "secret_key";
const bcrypt = require('bcryptjs');
const {sequelize} = require("./../models");
const {initModels} = require("../models/init-models");

const { User } = initModels(sequelize);

class AuthenticationService {

    constructor() {
    }

    generate_token(data) {
        return jwt.sign(data, secret_key)
    }

    async authenticate_token(req, res, next) {
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({error: "Unauthorized"});
        if (!token.startsWith('Bearer')) return res.status(401).json({error: "Wrong method: use bearer"});
        const is_authorize = this.verify_token(token);
        if (!is_authorize) return res.status(403).json({error: "Forbidden"});
        req.user = await User.findByPk(is_authorize.user_id);
        next();
    }

    verify_token(token) {
        try {
            return jwt.verify(token.split(" ")[1], secret_key);
        } catch (error) {
            return null;
        }
    }

    async generate_hashed_password(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    async compare_password(password, form_password) {
        return await bcrypt.compare(password, form_password)
    }
}

module.exports = AuthenticationService
```

7. Application file
```javascript
const express = require('express');
const {sequelize} = require("./models");
const app = express();
const PORT = process.env.PORT ||3000;

const AppService = require("./services/AppService");
const appService = new AppService(app, sequelize, PORT);

appService.init_app();
```

### Frontend

1. Artist bean
```typescript
import {Song} from "./song";

export interface Artist {
    id: number,
    name: string,
    avatar: string,
    Songs: Song[] | undefined
}
```

2. Url service
```typescript
export class UrlService {

    private api_url = this.app_service.get_api_url();

    private artist_route = {
        get_artists: `${this.api_url}artists`,
        get_artists_by_id: `${this.api_url}artists/{id}`,
        get_artists_song: `${this.api_url}artists/{id}/songs`,
        put_artists: `${this.api_url}artists/{id}`,
        delete_artists: `${this.api_url}artists/{id}`,
    }

    private album_route = {
        get_albums: `${this.api_url}albums`,
        get_album_by_id: `${this.api_url}albums/{id}`,
        get_album_songs_by_id: `${this.api_url}albums/{id}/songs`,
        post_album: `${this.api_url}albums`,
        post_album_songs_by_id: `${this.api_url}albums/{id}/songs`,
        put_album_by_id: `${this.api_url}albums/{id}`,
        delete_album_by_id: `${this.api_url}albums/{id}`,
    }

    private user_route = {
        post_user_login: `${this.api_url}users/login`
    }

    constructor(
        private readonly app_service: AppService
    ) { }

    get_albums_routes(){
        return this.album_route;
    }

    get_artists_routes(){
        return this.artist_route;
    }

    get_users_routes() {
        return this.user_route;
    }

    handle_error(err: HttpErrorResponse): Observable<never>{
        let error_message: string = "";
        if (err.error instanceof ErrorEvent){
            error_message = `Server return code ${err.status}, error message is: ${err.message}`;
        }
        console.error(error_message)
        return throwError(() => error_message);
    }
}
```

3. Albums service
```typescript
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./url.service";
import {catchError, Observable, pipe, tap} from "rxjs";
import {Album} from "../beans/album";
import {Artist} from "../beans/artist";

@Injectable({
    providedIn: 'root'
})
export class AlbumsService {

    constructor(
        private readonly http: HttpClient,
        private readonly url_service: UrlService
    ) { }

    get_albums(): Observable<Album[]>{
        return this.http.get<Album[]>(this.url_service.get_albums_routes().get_albums)
            .pipe(
                tap(data => console.log('Albums', JSON.stringify(data))),
                catchError(this.url_service.handle_error)
            );
    }

    get_by_id(artist_id: string): Observable<Album> {
        let url_replace = this.url_service.get_albums_routes().get_album_by_id.replace('{id}', artist_id);
        return this.http.get<Album>(url_replace)
            .pipe(
                tap(data => console.log('Album', JSON.stringify(data))),
                catchError(this.url_service.handle_error)
            );
    }
}
```

4. Artist list component
```typescript
export class ArtistsListComponent implements OnInit, OnDestroy{

    error_message: string = "";
    sub!: Subscription;

    artists: Artist[] = [];

    currentArtist!: Artist | null;

    artist_id: number = 0;

    constructor(
        private readonly artists_service: ArtistsService
    ) {
    }

    ngOnInit() {
        this.set_artists();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private set_artists(){
        this.sub = this.artists_service.get_artists().subscribe({
            next: artists => {
                this.artists = artists;
            },
            error: err => this.error_message = err
        });
    }

    setCurrentArtist(artist: Artist) {
        this.currentArtist = null;
        setTimeout(() => {
            this.currentArtist = artist;
        }, 10)
    }
}
```

5. Artist list template
```html
<div class="container">
    <div *ngIf="artists" class="row gy-3 mt-4 justify-content-center">
        <div *ngFor="let artist of artists" class="col-3 me-4 card-artist">
            <a class="h-100 w-100" (click)="setCurrentArtist(artist)"
               [routerLink]="['/artists/', artist.id]" routerLinkActive="activeLinkClass" href="#">
                <div class="d-flex justify-content-center align-items-center">
                    <img class="img-avatar" src="assets/avatars/{{artist.avatar}}" alt="Artist avatar">
                </div>
                <div class="p-2">
                    <h3 class="m-0">
                        {{ artist.name }}
                    </h3>
                    <p class="artist-annotation small">Artist</p>
                </div>
            </a>
        </div>
    </div>
</div>
```

## Lancer l'application

```bash
npm run start_backend
```

Puis dans un autre terminal
```bash
npm run start_frontend
```

Maxime Etcheverria, Julien Ousmer, Titouan Foras & Clément Pagès
