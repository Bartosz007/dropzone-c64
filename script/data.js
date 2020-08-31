/// <reference path="movement.js" />
/// <reference path="interwal.js" />
var Data = {
    help: 0,
    game: 0,
    kolej: 0,
    klawisze: {
        up: 0,
        left: 0,
        down: 0,
        right: 0,
        ctrl: 0,
        space: 0,
        shift: 0
    },
    pozycja: {
        poziomo: -317,
        pionowo: 120,
    },
    speed: {
        left: 0,
        right: 0,
        vert: 0
    },
    laser: [{}],
    vmax: 4,
    cooldown: 0,
    zwrot: 0,
    obrazek: "gpx/normal/prawo/spoczynek0.png",
    zegar: 0,
    eq: 0,
    status: "alive",
    cloak: false,
    cleakTTL: 0,
    cloakTime: 1800,
    lives: 3,
    punkty: 0,
    strzykawki: 3,
    strzykawkiTTL: 0,
    level: 1,
    Postacie: {
        men: [], //tablica menów
        lmen: 8,  //liczba menów
        l2men: 8,   //pomocnicza liczba menów  
        tmen: 0,   //liczba złapanych menów
        planter: [], //tablica planterów 
        lplanter: 4, //liczba planterów  - ustawić na 10
        l2planter: 4, //liczba planterów - pomocnicza  - ustawić na 10
        android: [],  //tablica androidów
        landroid: 0,   //liczba androidów
        l2android: 0,   //liczba androidów - pomocnicza
        nemesite: [],   //tablica nemesitów
        lnemesite: 0,   //liczba nemesitów
        l2nemesite: 0,   //liczba nemesitów-pomocnicza
        nyhme: null,    //nyhme - zmienna
        bstorm: [],    //tablica blunder stormów
        lbstorm: 2,    //liczba blunder stormów  - ustawić na 1 lub 2 
        l2bstorm: 2,  //liczba blunder stormów - pomocnicza  - ustawić na 1 lub 2 
        spore: [],    //tablica sporów
        lspore: 1,    //liczba sporów       -- ustawić na 1
        l2spore: 1,     //liczba sporów - pomocnicza     -- ustawić na 1
        antimater: [],   //tablica antymaterii
        lantimater: 0,   //liczba antymaterii       -- ustawić na 0/1
        l2antimater: 0,    //liczba antymaterii - pomocnicza   -- ustawić na 0/1
        trailer: [],   //tablica trailerów
        ltrailer: 0,    //liczba trailerów  -- ustawić na 0
        l2trailer: 0,    //liczba trailerów - pomocnicza   -- ustawić na 0
    }
}
