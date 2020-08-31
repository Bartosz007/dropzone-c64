/// <reference path="data.js" />
/// <reference path="interwal.js" />
var Load = {
    init: function () {
        document.getElementById("tlo-screen").style.left = 0
        document.body.onkeydown = function (e) {
            switch (e.which) {
                case 38:
                    Data.klawisze.up = 1
                    break;
                case 37:
                    Data.klawisze.left = 1
                    break;
                case 40:
                    Data.klawisze.down = 1
                    break;
                case 39:
                    Data.klawisze.right = 1
                    break;
                case 17:
                    Data.klawisze.ctrl = 1
                    break;
                case 32:
                    Data.klawisze.space = 1
                    break;
                case 81:
                    Data.klawisze.q = 1
                    break;
                case 13:
                    if (Data.kolej == 0) {
                        document.getElementById("intro").remove()
                    }

                    if (Data.game == 1 || Data.game == 0)
                        Data.game = !Data.game
                    else
                        location.reload();
                    document.getElementById("ladowanie").play()
                    Data.kolej++
                    break;
                case 69:
                    if (!Data.help) {
                        document.getElementById("turt").style.display = "block"
                        Data.help = !Data.help
                    } else {
                        document.getElementById("turt").style.display = "none"
                        Data.help = !Data.help

                    }
                    break;
            }
        }
        document.body.onkeyup = function (e) {
            switch (e.keyCode) {
                case 38:
                    Data.klawisze.up = 0
                    break;
                case 37:
                    Data.klawisze.left = 0
                    break;
                case 40:
                    Data.klawisze.down = 0
                    break;
                case 39:
                    Data.klawisze.right = 0
                    break;
                case 17:
                    Data.klawisze.ctrl = 0
                    break;
                case 32:
                    Data.klawisze.space = 0
                    break;
                case 81:
                    Data.klawisze.q = 0
                    break;
            }
        }
        var c = document.getElementById("cv1");
        var ctx = c.getContext("2d");
        ig = document.createElement("img")
        ig.src = "gpx/normal/prawo/spoczynek0.png";
        ig.style.width = "48px"
        ctx.drawImage(ig, 322, 150);

        //humany
        var dd = []
        for (var i = 0; i < Data.Postacie.l2men; i++) {
            var poz = Math.floor((Math.random() * 800) + 1500);
            var kier = Math.floor(Math.random() * 2);
            var wys = 264
            var ig = document.createElement("img")
            ig.src = "gpx/postacie/man.gif"
            ig.style.left = poz + "px"
            ig.style.top = wys + "px"
            ig.className = "human"
            ig.id = "hum" + i
            ig.style.display = "none"
            document.getElementById("tlo-poj").appendChild(ig)


            dd[i] = document.createElement("img")
            dd[i].className = "deadanim"
            dd[i].style.left = (poz - 100) + "px"
            dd[i].style.top = (wys - 30) + "px"
            dd[i].src = "gpx/animacje/animacjahum2.gif"
            document.getElementById("tlo-poj").appendChild(dd[i])

            setTimeout(function () {
                for (var i = 0; i < dd.length; i++) {
                    dd[i].remove()
                    document.getElementById("hum" + i).style.display = "block"
                }
            }, 400)

            Data.Postacie.men.push({ pozycja: poz, pozycjapocz: poz, wys: wys, kierunek: kier, status: "visible" })
        }
        //plantery
        var dd2 = []
        for (var i = 0; i < Data.Postacie.lplanter; i++) {
            var poz = Math.floor((Math.random() * 2100) + 1200);
            var wys = Math.floor((Math.random() * 100) + 20);
            var zrzut = Math.floor((Math.random() * 8000) + 300);//12000,3000
            var zmiana = Math.floor((Math.random() * 3000) + 400);
            var kierZmiany = Math.floor(Math.random() * 2);
            var kier = Math.floor(Math.random() * 2);

            var ig2 = document.createElement("img")
            ig2.src = "gpx/postacie/planter.gif"
            ig2.style.left = poz + "px"
            ig2.style.top = wys + "px"
            ig2.className = "planter"
            ig2.id = "plant" + i
            ig2.style.display = "none"
            document.getElementById("tlo-poj").appendChild(ig2)
            Data.Postacie.planter.push({
                pozycja: poz, pozycjapocz: poz, wys: wys, wyspocz: wys, kierunek: kier,
                status: "visible", zrzutTTL: zrzut, zmianaH: zmiana, kierunekZmiany: kierZmiany
            })

            dd2[i] = document.createElement("img")
            dd2[i].className = "deadanim"
            dd2[i].style.left = (poz - 100) + "px"
            dd2[i].style.top = (wys - 30) + "px"
            dd2[i].src = "gpx/animacje/animacja.gif"
            document.getElementById("tlo-poj").appendChild(dd2[i])

            setTimeout(function () {
                for (var i = 0; i < Data.Postacie.lplanter; i++) {
                    dd2[i].remove()
                    document.getElementById("plant" + i).style.display = "block"
                }
            }, 400)

        }
        //blunder storm
        var dd4 = []
        for (var i = 0; i < Data.Postacie.lbstorm; i++) {
            var ig6 = document.createElement("img")
            var pozbs = Math.floor((Math.random() * 2100) + 1200)
            var kierbs = Math.floor(Math.random() * 2)
            var wysbs = 100
            ig6.src = "gpx/postacie/blander" + (Math.floor(Math.random() * 2) + 1) + ".gif"
            ig6.id = "blund" + i
            ig6.className = "blunderstorm"
            ig6.style.top = wysbs + "px"
            ig6.style.left = pozbs + "px"
            ig6.style.display = "none"
            document.getElementById("tlo-poj").appendChild(ig6)
            Data.Postacie.bstorm.push({ pozycja: pozbs, wys: wysbs, kierunek: kierbs, status: "visible" })

            dd4[i] = document.createElement("img")
            dd4[i].className = "deadanim"
            dd4[i].style.left = (pozbs - 100) + "px"
            dd4[i].style.top = (wysbs - 30) + "px"
            dd4[i].src = "gpx/animacje/animacja.gif"
            document.getElementById("tlo-poj").appendChild(dd4[i])

            setTimeout(function () {
                for (var i = 0; i < dd4.length; i++) {
                    dd4[i].remove()
                    document.getElementById("blund" + i).style.display = "block"
                }
            }, 400)
        }
        //spore
        var dd3 = []
        for (var i = 0; i < Data.Postacie.lspore; i++) {
            var ig7 = document.createElement("img")
            var pozsp = Math.floor((Math.random() * 2100) + 1200)
            var wyssp = Math.floor((Math.random() * 100) + 60);
            var kiersp = Math.floor(Math.random() * 2)
            ig7.src = "gpx/postacie/spore.gif"
            ig7.id = "spor" + i
            ig7.className = "spore"
            ig7.style.top = wyssp + "px"
            ig7.style.left = pozsp + "px"
            ig7.style.display = "none"
            document.getElementById("tlo-poj").appendChild(ig7)
            Data.Postacie.spore.push({
                pozycja: pozsp, wys: wyssp, wyspocz: wyssp, kierunek: kiersp, status: "visible"
            })

            dd3[i] = document.createElement("img")
            dd3[i].className = "deadanim"
            dd3[i].style.left = (pozsp - 100) + "px"
            dd3[i].style.top = (wyssp - 30) + "px"
            dd3[i].src = "gpx/animacje/animacja.gif"
            document.getElementById("tlo-poj").appendChild(dd3[i])

            setTimeout(function () {
                for (var i = 0; i < Data.Postacie.lspore; i++) {
                    dd3[i].remove()
                    document.getElementById("spor" + i).style.display = "block"
                }
            }, 400)
        }
        //antimater
        var dd5 = []
        for (var i = 0; i < Data.Postacie.lantimater; i++) {
            var ig8 = document.createElement("img")
            var pozat = Math.floor((Math.random() * 2100) + 1200)
            var wysat = Math.floor((Math.random() * 200) + 20);
            ig8.src = "gpx/postacie/antimater.gif"
            ig8.id = "antimat" + i
            ig8.className = "antimater"
            ig8.style.top = wysat + "px"
            ig8.style.left = pozat + "px"
            ig8.style.display = "none"
            document.getElementById("tlo-poj").appendChild(ig8)
            Data.Postacie.antimater.push({
                pozycja: pozat, wys: wysat, status: "visible"
            })

            dd5[i] = document.createElement("img")
            dd5[i].className = "deadanim"
            dd5[i].style.left = (pozat - 100) + "px"
            dd5[i].style.top = (wysat - 30) + "px"
            dd5[i].src = "gpx/animacje/animacja.gif"
            document.getElementById("tlo-poj").appendChild(dd5[i])

            setTimeout(function () {
                for (var i = 0; i < dd5.length; i++) {
                    dd5[i].remove()
                    document.getElementById("antimat" + i).style.display = "block"
                }
            }, 400)
        }
        //manchecked
        var mck = document.createElement("img")
        mck.src = "gpx/postacie/manchaked.gif"
        mck.id = "manchecked"
        document.getElementById("tlo-poj").appendChild(mck)

        //lives
        for (var i = 0; i < Data.lives; i++) {
            var lv = document.createElement("img")
            lv.src = "gpx/life.png"
            lv.className = "live"
            lv.id = "zycie" + i
            document.getElementById("lives").appendChild(lv)
        }
        // dead animation
        var ig10 = document.createElement("img")
        ig10.src = "gpx/animacje/smierc.gif"
        ig10.id = "dead-scene"
        ig10.style.position = "absolute"
        ig10.style.width = "400px"
        document.getElementById("ekran2").appendChild(ig10)

        //strzykawki
        for (var i = 0; i < Data.strzykawki; i++) {
            var st = document.createElement("img")
            st.src = "gpx/inj.png"
            st.className = "strzykawki"
            st.id = "strzykawka" + i
            document.getElementById("multikill").appendChild(st)
        }

    }
}
