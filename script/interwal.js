/// <reference path="data.js" />
/// <reference path="movement.js" />

setInterval(interwal, 1)
function interwal() {
    if (Data.game == 1) {
        //---------------------------------------klawisze pozycji--------------------------------------
        var obr
        if (Data.cloak)
            obr = "cloak"
        else
            obr = "normal"
        if (Data.klawisze.left == 1 && Data.status == "alive") {
            if (Data.zwrot == 0) {
                Data.obrazek = "gpx/" + obr + "/lewo/ruch0.png"
                Data.zwrot = 1
            }

            if (Data.obrazek == "gpx/" + obr + "/lewo/spoczynek1.png" || Data.obrazek == "gpx/" + obr + "/lewo/spoczynek0.png")
                Data.obrazek = "gpx/" + obr + "/lewo/ruch0.png"
            if (Data.zegar % 200 == 0 && Data.obrazek == "gpx/" + obr + "/lewo/ruch1.png")
                Data.obrazek = "gpx/" + obr + "/lewo/ruch0.png"
            else if (Data.zegar % 200 == 0 && Data.obrazek == "gpx/" + obr + "/lewo/ruch0.png")
                Data.obrazek = "gpx/" + obr + "/lewo/ruch1.png"


            if (Data.speed.left < Data.vmax)
                Data.speed.left += 0.02
        }
        else {
            if (Data.speed.left > 0)
                Data.speed.left -= 0.02

            if (Data.obrazek == "gpx/" + obr + "/lewo/ruch1.png" || Data.obrazek == "gpx/" + obr + "/lewo/ruch0.png")
                Data.obrazek = "gpx/" + obr + "/lewo/spoczynek0.png"
            if (Data.zegar % 200 == 0 && Data.obrazek == "gpx/" + obr + "/lewo/spoczynek1.png")
                Data.obrazek = "gpx/" + obr + "/lewo/spoczynek0.png"
            else if (Data.zegar % 200 == 0 && Data.obrazek == "gpx/" + obr + "/lewo/spoczynek0.png")
                Data.obrazek = "gpx/" + obr + "/lewo/spoczynek1.png"
        }

        if (Data.klawisze.right == 1 && Data.status == "alive") {
            if (Data.zwrot == 1) {
                Data.obrazek = "gpx/" + obr + "/prawo/ruch0.png"
                Data.zwrot = 0
            }

            if (Data.obrazek == "gpx/" + obr + "/prawo/spoczynek1.png" || Data.obrazek == "gpx/" + obr + "/prawo/spoczynek0.png")
                Data.obrazek = "gpx/" + obr + "/prawo/ruch0.png"
            if (Data.zegar % 200 == 0 && Data.obrazek == "gpx/" + obr + "/prawo/ruch1.png")
                Data.obrazek = "gpx/" + obr + "/prawo/ruch0.png"
            else if (Data.zegar % 200 == 0 && Data.obrazek == "gpx/" + obr + "/prawo/ruch0.png")
                Data.obrazek = "gpx/" + obr + "/prawo/ruch1.png"

            if (Data.speed.right < 4)
                Data.speed.right += 0.02
        }
        else {
            if (Data.speed.right > 0)
                Data.speed.right -= 0.02

            if (Data.obrazek == "gpx/" + obr + "/prawo/ruch1.png" || Data.obrazek == "gpx/" + obr + "/prawo/ruch0.png")
                Data.obrazek = "gpx/" + obr + "/prawo/spoczynek0.png"
            if (Data.zegar % 200 == 0 && Data.obrazek == "gpx/" + obr + "/prawo/spoczynek1.png")
                Data.obrazek = "gpx/" + obr + "/prawo/spoczynek0.png"
            else if (Data.zegar % 200 == 0 && Data.obrazek == "gpx/" + obr + "/prawo/spoczynek0.png")
                Data.obrazek = "gpx/" + obr + "/prawo/spoczynek1.png"
        }

        if (Data.klawisze.up == 1 && Data.status == "alive") {
            if (Data.pozycja.pionowo > 0) {
                Data.pozycja.pionowo -= 3
            }
        }

        if (Data.klawisze.down == 1 && Data.status == "alive") {
            if (Data.pozycja.pionowo < 252) {
                Data.pozycja.pionowo += 1.5
            }
        }

        if (Data.status == "alive") {
            Data.pozycja.poziomo += Data.speed.left
            Data.pozycja.poziomo -= Data.speed.right
        }
        if (Data.speed.left < 0)
            Data.speed.left = 0
        if (Data.speed.left > Data.vmax)
            Data.speed.left = Data.vmax
        if (Data.speed.right < 0)
            Data.speed.right = 0
        if (Data.speed.right > Data.vmax)
            Data.speed.right = Data.vmax

        if (Data.pozycja.pionowo < 252 && Data.status == "alive")
            Data.pozycja.pionowo = Data.pozycja.pionowo + 0.75
        document.getElementById("tlo-poj").style.left = Data.pozycja.poziomo + "px"

        if (Data.pozycja.poziomo <= -3645.62) {
            Data.pozycja.poziomo = -317
        }
        if (Data.pozycja.poziomo >= -316.68) {
            Data.pozycja.poziomo = -3645.62
        }

        var c = document.getElementById("cv1");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, 664, 300);
        ig = document.createElement("img")
        ig.src = Data.obrazek;
        ig.style.width = "48px"
        ctx.drawImage(ig, 322, Data.pozycja.pionowo, 48, 48);

        //---------------------------------------laser--------------------------------------

        if (Data.klawisze.ctrl == 1 && Data.status == "alive") {
            if (Data.cooldown == 1) {
                var dropper = -(Data.pozycja.poziomo) + 330
                if (Data.zwrot == 0)
                    Data.laser.push({ x1: 322 + 24, x2: (322 + 40) + 24, y: (Data.pozycja.pionowo + 24), ttl: 35, kierunek: Data.zwrot, x1b: dropper })
                else
                    Data.laser.push({ x1: 322 - 24, x2: (322 + 40) - 24, y: (Data.pozycja.pionowo + 24), ttl: 35, kierunek: Data.zwrot, x1b: dropper })
            }
            if (Data.cooldown == 30) {
                Data.cooldown = 0
            }
            Data.cooldown++
            document.getElementById("shoot").play()
        }
        else {
            Data.cooldown = 0
        }

        for (var i = 0; i < Data.laser.length; i++) {
            var c = document.getElementById("cv1");
            var ctx = c.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(Data.laser[i].x1, Data.laser[i].y)
            ctx.lineTo(Data.laser[i].x2, Data.laser[i].y)
            ctx.closePath();
            ctx.strokeStyle = "#FFFFFF";
            ctx.stroke();
            if (Data.laser[i].kierunek == 0) {
                Data.laser[i].x1 += 9
                Data.laser[i].x2 += 9
            } else {
                Data.laser[i].x1 -= 9
                Data.laser[i].x2 -= 9
            }
            Data.laser[i].ttl--
            if (Data.laser[i].ttl == 0) {
                Data.laser.splice(i, 1)
            }
        }
        //----------------------------------------------cloak----------------------------------------
        if (Data.klawisze.q == 1 && Data.cleakTTL <= 0) {
            Data.cleakTTL = 50
            Data.cloak = !Data.cloak
        }
        Data.cleakTTL--
        if (Data.cloak) {
            Data.cloakTime--
        }
        if (Data.cloakTime <= 0) {
            Data.cleakTTL = 100
            Data.cloak = false
        }
        document.getElementById("kampoziom").style.width = (Data.cloakTime / 20) + "px"
        // document.getElementById("kamuflarz").textContent = Data.cloakTime

        //-------------------------------------------strzykawki-------------------------------------------
        if (Data.klawisze.space == 1 && Data.strzykawkiTTL <= 0 && Data.strzykawki > 0 && Data.zegar > 200 && Data.status == "alive") {

            Data.strzykawkiTTL = 100
            Data.strzykawki--
            document.getElementById("multikill").innerHTML = ""

            for (var i = 0; i < Data.strzykawki; i++) {
                var st = document.createElement("img")
                st.src = "gpx/inj.png"
                st.className = "strzykawki"
                st.id = "strzykawka" + i
                document.getElementById("multikill").appendChild(st)
            }

            var dropper = -(Data.pozycja.poziomo) + 330
            //planter
            for (var i = 0; i < Data.Postacie.lplanter; i++) {
                var roznicapoziomo = Math.abs(Data.Postacie.planter[i].pozycja - dropper)
                if (roznicapoziomo < 300 && Data.Postacie.planter[i].status == "visible") {
                    Data.Postacie.l2planter--
                    Data.Postacie.planter[i].status = "dead"
                    document.getElementById("plant" + i).style.display = "none"
                    Data.punkty += 150
                }
            }
            //android
            for (var i = 0; i < Data.Postacie.landroid; i++) {
                var roznicapoziomo = Math.abs(Data.Postacie.android[i].pozycja - dropper)
                if (roznicapoziomo < 300 && Data.Postacie.android[i].status == "visible") {
                    Data.Postacie.l2android--
                    Data.Postacie.android[i].status = "dead"
                    document.getElementById("andr" + i).style.display = "none"
                    Data.punkty += 50
                }
            }
            //nemesite
            for (var i = 0; i < Data.Postacie.lnemesite; i++) {
                var roznicapoziomo = Math.abs(Data.Postacie.nemesite[i].pozycja - dropper)
                if (roznicapoziomo < 300 && Data.Postacie.nemesite[i].status == "visible") {
                    Data.Postacie.l2nemesite--
                    Data.Postacie.nemesite[i].status = "dead"
                    document.getElementById("nemes" + i).style.display = "none"
                    Data.punkty += 250
                }
            }
            //nyhme
            if (Data.Postacie.nyhme != null) {
                var roznicapoziomo = Math.abs(Data.Postacie.nyhme.pozycja - dropper)
                if (roznicapoziomo < 300 && Data.Postacie.nyhme.status == "visible") {
                    Data.Postacie.nyhme.status = "dead"
                    document.getElementById("nyhme").style.display = "none"
                    setTimeout(function () {
                        Data.Postacie.nyhme = null
                        document.getElementById("nyhme").remove()
                    }, 1000)
                    Data.punkty += 100
                }
            }
            //bstorm            
            for (var i = 0; i < Data.Postacie.lbstorm; i++) {
                var roznicapoziomo = Math.abs(Data.Postacie.bstorm[i].pozycja - dropper)
                if (roznicapoziomo < 300 && Data.Postacie.bstorm[i].status == "visible") {
                    Data.Postacie.l2bstorm--
                    Data.Postacie.bstorm[i].status = "dead"
                    document.getElementById("blund" + i).style.display = "none"
                    Data.punkty += 250
                }
            }
            //antimater
            for (var i = 0; i < Data.Postacie.lantimater; i++) {
                var roznicapoziomo = Math.abs(Data.Postacie.antimater[i].pozycja - dropper)
                if (roznicapoziomo < 300 && Data.Postacie.antimater[i].status == "visible") {
                    Data.Postacie.l2antimater--
                    Data.Postacie.antimater[i].status = "dead"
                    document.getElementById("antimat" + i).style.display = "none"
                    Data.punkty += 150
                }
            }
            //spore
            for (var i = 0; i < Data.Postacie.lspore; i++) {
                var roznicapoziomo = Math.abs(Data.Postacie.spore[i].pozycja - dropper)
                if (roznicapoziomo < 300 && Data.Postacie.spore[i].status == "visible") {
                    Data.Postacie.l2spore--
                    Data.Postacie.spore[i].status = "dead"
                    document.getElementById("spor" + i).style.display = "none"
                    Data.punkty += 750
                }
            }
            //trailer
            for (var i = 0; i < Data.Postacie.ltrailer; i++) {
                var roznicapoziomo = Math.abs(Data.Postacie.trailer[i].pozycja - dropper)
                if (roznicapoziomo < 300 && Data.Postacie.trailer[i].status == "visible") {
                    Data.Postacie.l2trailer--
                    Data.Postacie.trailer[i].status = "dead"
                    document.getElementById("trail" + i).style.display = "none"
                    Data.punkty += 250
                }
            }

            document.getElementById("killall").play()
        }
        Data.strzykawkiTTL--
        //----------------------------------------PETLA GŁÓWNA-------------------------------------------------
        if (Data.zegar > 200 && Data.status == "alive") {
            //----------------------------------------man-------------------------------------------------
            for (var i = 0; i < document.getElementsByClassName("human").length; i++) {
                if (Data.Postacie.men[i].status == "visible") {
                    document.getElementsByClassName("human")[i].style.left = Data.Postacie.men[i].pozycja + "px"
                    if (Data.Postacie.men[i].kierunek == 0) {
                        Data.Postacie.men[i].pozycja += 0.1
                        if ((Data.Postacie.men[i].pozycjapocz - Data.Postacie.men[i].pozycja) < -200) {
                            Data.Postacie.men[i].kierunek = 1
                        }
                    }
                    else {
                        Data.Postacie.men[i].pozycja -= 0.1
                        if ((Data.Postacie.men[i].pozycjapocz - Data.Postacie.men[i].pozycja) > 200) {
                            Data.Postacie.men[i].kierunek = 0
                        }
                    }
                    //lapanie mena
                    if (parseInt(Data.Postacie.men[i].pozycja) <= parseInt(-Data.pozycja.poziomo) + 350
                    && parseInt(Data.Postacie.men[i].pozycja) + 24 >= parseInt(-Data.pozycja.poziomo) + 350
                    && Data.pozycja.pionowo > 230) {
                        if (Data.eq == 0 && Data.Postacie.men[i].status == "visible") {
                            Data.Postacie.men[i].status = "invisible"
                            document.getElementById("hum" + i).style.display = "none";
                            Data.eq++
                            document.getElementById("catch").play()
                        }
                    }
                }
            }
            //manchacked
            document.getElementById("manchecked").style.left = -(Data.pozycja.poziomo) + 336 + "px"
            document.getElementById("manchecked").style.top = Data.pozycja.pionowo + 36 + "px"
            if (Data.eq == 1 && Data.status == "alive") {
                document.getElementById("manchecked").style.display = "block"
            } else {
                document.getElementById("manchecked").style.display = "none"
            }
            //--------------------------------------------planter----------------------------------------------
            for (var i = 0; i < Data.Postacie.lplanter; i++) {
                if (Data.Postacie.planter[i].status != "inactive") {

                    if (Data.Postacie.planter[i].zrzutTTL != 0) {

                        //predkosc plantera
                        if (Data.Postacie.planter[i].kierunek == 0) {
                            Data.Postacie.planter[i].pozycja -= 0.4
                        } else {
                            Data.Postacie.planter[i].pozycja += 0.4
                        }
                        //odbicia plantera
                        if (Data.Postacie.planter[i].pozycja >= 3400) {
                            Data.Postacie.planter[i].kierunek = 0
                        }
                        if (Data.Postacie.planter[i].pozycja <= 1100) {
                            Data.Postacie.planter[i].kierunek = 1
                        }

                        document.getElementById("plant" + i).style.left = Data.Postacie.planter[i].pozycja + "px"
                        //zmiana wysokosci plantera
                        if (Data.Postacie.planter[i].zmianaH <= 0) {
                            if (Data.Postacie.planter[i].kierZmiany == 0) {
                                Data.Postacie.planter[i].wys += 0.4
                            } else {
                                Data.Postacie.planter[i].wys -= 0.4
                            }

                            var a = Math.abs(Data.Postacie.planter[i].wyspocz - Data.Postacie.planter[i].wys)
                            var b = Math.floor((Math.random() * 70) + 50)

                            if (a > b || Data.Postacie.planter[i].wys < 20 || Data.Postacie.planter[i].wys > 250) {
                                Data.Postacie.planter[i].zmianaH = Math.floor((Math.random() * 3000) + 400)
                                if (Data.Postacie.planter[i].kierZmiany == 0) {
                                    Data.Postacie.planter[i].kierZmiany = 1
                                } else {
                                    Data.Postacie.planter[i].kierZmiany = 0
                                }
                            }
                            document.getElementById("plant" + i).style.top = Data.Postacie.planter[i].wys + "px"
                        }
                        Data.Postacie.planter[i].zmianaH--
                        Data.Postacie.planter[i].zrzutTTL--

                    } else if (Data.Postacie.planter[i].status != "dead") {
                        if (Data.Postacie.planter[i].wys <= 220) {
                            Data.Postacie.planter[i].wys += 0.25
                            if (Data.Postacie.planter[i].wys > 220) {
                                //---- nemesity
                                var nm = document.createElement("img")
                                nm.src = "gpx/postacie/nemesite.gif"
                                nm.className = "nemesite"
                                nm.id = "nemes" + Data.Postacie.lnemesite
                                nm.style.left = Data.Postacie.planter[i].pozycja + "px"
                                nm.style.top = Data.Postacie.planter[i].wys + "px"
                                document.getElementById("tlo-poj").appendChild(nm)
                                Data.Postacie.nemesite.push({
                                    pozycja: Data.Postacie.planter[i].pozycja,
                                    pozycjapocz: Data.Postacie.planter[i].pozycja,
                                    wys: Data.Postacie.planter[i].wys,
                                    kierunek: Data.Postacie.planter[i].kierunek,
                                    status: "visible"
                                })
                                Data.Postacie.lnemesite++
                                Data.Postacie.l2nemesite++
                                //---androidy
                                var ig4 = document.createElement("img")
                                ig4.src = "gpx/postacie/android.gif"
                                ig4.className = "android"
                                ig4.id = "andr" + Data.Postacie.landroid
                                ig4.style.left = Data.Postacie.planter[i].pozycja + "px"
                                ig4.style.top = Data.Postacie.planter[i].wys + 10 + "px"
                                document.getElementById("tlo-poj").appendChild(ig4)
                                Data.Postacie.planter[i].status = "inactive"
                                Data.Postacie.android.push({
                                    pozycja: Data.Postacie.planter[i].pozycja,
                                    pozycjapocz: Data.Postacie.planter[i].pozycja,
                                    wys: Data.Postacie.planter[i].wys + 10,
                                    kierunek: Data.Postacie.planter[i].kierunek,
                                    status: "visible"
                                })
                                Data.Postacie.landroid++
                                Data.Postacie.l2android++
                                document.getElementById("plant" + i).style.display = "none"
                                Data.Postacie.l2planter--
                            }
                        }
                    }
                    document.getElementById("plant" + i).style.top = Data.Postacie.planter[i].wys + "px"
                }
            }
            //---------------------------------------android----------------------------------------
            for (var i = 0; i < Data.Postacie.landroid; i++) {  //jak błąd to zastąpić Data.Postacie.android.length
                if (Data.Postacie.android[i].status == "visible") {


                    if (Data.Postacie.android[i].wys <= 264) {
                        Data.Postacie.android[i].wys += 0.15
                        document.getElementById("andr" + i).style.top = Data.Postacie.android[i].wys + "px"
                    }
                    if (Data.Postacie.android[i].wys > 264) {
                        if (Data.Postacie.android[i].kierunek) {
                            Data.Postacie.android[i].pozycja += 1
                        } else {
                            Data.Postacie.android[i].pozycja -= 1
                        }
                        var a = Math.abs(Data.Postacie.android[i].pozycjapocz - Data.Postacie.android[i].pozycja)
                        if (a >= 600 || Data.Postacie.android[i].pozycja > 3400 || Data.Postacie.android[i].pozycja < 1100) {
                            if (Data.Postacie.android[i].kierunek)
                                Data.Postacie.android[i].kierunek = 0
                            else
                                Data.Postacie.android[i].kierunek = 1
                        }
                        document.getElementById("andr" + i).style.left = Data.Postacie.android[i].pozycja + "px"
                    }
                }
            }
            //---------------------------------------nemesite-------------------------------------------
            for (var i = 0; i < Data.Postacie.lnemesite; i++) {
                if (Data.Postacie.nemesite[i].status == "visible") {

                    var a = Math.floor(Data.Postacie.nemesite[i].pozycja)
                    if (Data.klawisze.left == 1 && a < 3400 && a > 1100) {
                        if (Data.Postacie.nemesite[i].wys >= 25) {
                            Data.Postacie.nemesite[i].wys -= 3 + Math.random() * 1
                            Data.Postacie.nemesite[i].pozycja += 1 + Math.random() * 1
                        }
                    }
                    if (Data.klawisze.right == 1 && a < 3400 && a > 1100) {
                        if (Data.Postacie.nemesite[i].wys >= 25) {
                            Data.Postacie.nemesite[i].wys -= 3 + Math.random() * 1
                            Data.Postacie.nemesite[i].pozycja -= 1 + Math.random() * 1
                        }
                    }

                    var ppoz = parseInt(-Data.pozycja.poziomo) + 330            //pozycja playera względem planszy!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    var pwys = Data.pozycja.pionowo + 10

                    if (Data.Postacie.nemesite[i].wys < pwys)
                        Data.Postacie.nemesite[i].wys += 1.5 + Math.floor((Math.random() * 4)) - 2

                    if (Data.Postacie.nemesite[i].wys > pwys)
                        Data.Postacie.nemesite[i].wys -= 1.5 + Math.floor((Math.random() * 4)) - 2

                    if (ppoz < 3400 && ppoz > 1100) {
                        if (Data.Postacie.nemesite[i].pozycja > ppoz) {
                            Data.Postacie.nemesite[i].pozycja -= 3 + Math.floor((Math.random() * 4)) - 2
                        } else {
                            Data.Postacie.nemesite[i].pozycja += 3 + Math.floor((Math.random() * 4)) - 2
                        }
                    }

                    if (Data.Postacie.nemesite[i].pozycja < 3380 && Data.Postacie.nemesite[i].pozycja > 1070)
                        Data.Postacie.nemesite[i].pozycja += Math.floor((Math.random() * 4) + 1) - 2

                    Data.Postacie.nemesite[i].wys += Math.floor((Math.random() * 4) + 1) - 2

                    document.getElementById("nemes" + i).style.top = Data.Postacie.nemesite[i].wys + "px"
                    document.getElementById("nemes" + i).style.left = Data.Postacie.nemesite[i].pozycja + "px"
                }
            }
            //--------------------------------------------nyhme----------------------------------------------
            if (Data.zegar >= 8000 && Data.Postacie.nyhme == null) {  //ustawić na 15000 i != zmienić na ==
                var nyh = document.createElement("img")
                nyh.id = "nyhme"
                nyh.src = "gpx/postacie/nhyme.png"
                var pozn = Math.floor((Math.random() * 2100) + 1200);
                var wysn = Math.floor((Math.random() * 100) + 20);
                nyh.style.left = pozn + "px"
                nyh.style.top = wysn + "px"
                nyh.style.display = "none"
                Data.Postacie.nyhme = { pozycja: pozn, pozycjapocz: pozn, wys: wysn, status: "visible" }
                document.getElementById("tlo-poj").appendChild(nyh)

                dd = document.createElement("img")
                dd.className = "deadanim"
                dd.style.left = (pozn - 100) + "px"
                dd.style.top = (wysn - 30) + "px"
                dd.src = "gpx/animacje/animacjahum2.gif"
                document.getElementById("tlo-poj").appendChild(dd)

                setTimeout(function () {
                    nyh.style.display = "block"
                    dd.remove()
                }, 400)

            }
            if (Data.Postacie.nyhme != null) {
                var ppoz = parseInt(-Data.pozycja.poziomo) + 340
                var pwys = Data.pozycja.pionowo + 5

                if (Data.Postacie.nyhme.wys < pwys)
                    Data.Postacie.nyhme.wys += 1.2

                if (Data.Postacie.nyhme.wys > pwys)
                    Data.Postacie.nyhme.wys -= 1.1

                if (ppoz < 3400 && ppoz > 1100) {
                    if (Data.Postacie.nyhme.pozycja > ppoz) {
                        Data.Postacie.nyhme.pozycja -= 2.8
                    } else {
                        Data.Postacie.nyhme.pozycja += 2.8
                    }
                }
                document.getElementById("nyhme").style.left = Data.Postacie.nyhme.pozycja + "px"
                document.getElementById("nyhme").style.top = Data.Postacie.nyhme.wys + "px"

            }
            //blunder storm        
            for (var i = 0; i < Data.Postacie.lbstorm; i++) {
                if (Data.Postacie.bstorm[i].status == "visible") {

                    if (Data.Postacie.bstorm[i].kierunek)
                        Data.Postacie.bstorm[i].pozycja += 0.3
                    else
                        Data.Postacie.bstorm[i].pozycja -= 0.3

                    if (Data.Postacie.bstorm[i].pozycja > 3400)
                        Data.Postacie.bstorm[i].kierunek = 0
                    if (Data.Postacie.bstorm[i].pozycja < 1100)
                        Data.Postacie.bstorm[i].kierunek = 1
                    document.getElementById("blund" + i).style.left = Data.Postacie.bstorm[i].pozycja + "px"
                }
            }
            //spore
            for (var i = 0; i < Data.Postacie.lspore; i++) {
                if (Data.Postacie.spore[i].status == "visible") {

                    if (Data.Postacie.spore[i].kierunek)
                        Data.Postacie.spore[i].wys += 0.2
                    else
                        Data.Postacie.spore[i].wys -= 0.2

                    var a = Math.abs(Data.Postacie.spore[i].wyspocz - Data.Postacie.spore[i].wys)

                    if (a > 60) {
                        if (Data.Postacie.spore[i].kierunek == 1)
                            Data.Postacie.spore[i].kierunek = 0
                        else
                            Data.Postacie.spore[i].kierunek = 1
                    }

                    document.getElementById("spor" + i).style.top = Data.Postacie.spore[i].wys + "px"
                }
            }
            //trailery
            for (var i = 0; i < Data.Postacie.ltrailer; i++) {
                if (Data.Postacie.trailer[i].status == "visible") {

                    var ppoz = parseInt(-Data.pozycja.poziomo) + 330
                    var pwys = Data.pozycja.pionowo + 10
                    var odl = Math.abs(Data.Postacie.trailer[i].pozycja - ppoz)
                    if (odl < 550) {
                        var los = Math.floor(Math.random() * 6)
                        var mu = 0
                        var a = Data.Postacie.trailer[i].dzielnia
                        if (Data.Postacie.trailer[i].wys < pwys) {
                            Data.Postacie.trailer[i].wys += 0.5
                            Data.Postacie.trailer[i].zwrot = "up-down"
                            mu++
                        }
                        if (Data.Postacie.trailer[i].wys > pwys) {
                            Data.Postacie.trailer[i].wys -= 0.5
                            Data.Postacie.trailer[i].zwrot = "up-down"
                            mu++
                        }

                        if (ppoz < 3400 && ppoz > 1100 && mu == 0) {
                            if (Data.Postacie.trailer[i].pozycja > ppoz) {
                                Data.Postacie.trailer[i].pozycja -= 2
                                Data.Postacie.trailer[i].zwrot = "left-right"
                            } else {
                                Data.Postacie.trailer[i].pozycja += 2
                                Data.Postacie.trailer[i].zwrot = "left-right"
                            }
                        }

                        if (Data.Postacie.trailer[i].dzielnia == 6)
                            Data.Postacie.trailer[i].dzielnia = 1
                        Data.Postacie.trailer[i].dzielnia++
                        if (Data.Postacie.trailer[i].zwrot == "left-right")
                            document.getElementById("trail" + i).src = "gpx/postacie/dlugi2.png"
                        else
                            document.getElementById("trail" + i).src = "gpx/postacie/dlugi1.png"

                        document.getElementById("trail" + i).style.left = Data.Postacie.trailer[i].pozycja + "px"
                        document.getElementById("trail" + i).style.top = Data.Postacie.trailer[i].wys + "px"
                    }
                }
            }
            //-------------------------------------------hit-marki------------------------------------------------
            var dropper = -(Data.pozycja.poziomo) + 330
            function deadanim(x, y, h) {
                var dd = document.createElement("img")
                dd.className = "deadanim"
                dd.style.left = x + "px"
                dd.style.top = y + "px"
                dd.src = "gpx/animacje/animacja2.gif"
                if (h == 1) dd.src = "gpx/animacje/animacjahum.gif"
                document.getElementById("tlo-poj").appendChild(dd)
                setTimeout(
                    function () {
                        dd.remove()
                    }, 400)
            }
            for (var i = 0; i < Data.laser.length; i++) {
                if (Data.laser[i].kierunek == 0) {
                    Data.laser[i].x1b += 9
                } else {
                    Data.laser[i].x1b -= 9
                }
                var przed = Data.laser.length
                for (var j = 0; j < Data.Postacie.lmen; j++) {
                    var x = Math.abs((Data.Postacie.men[j].pozycja + 12) - (Data.laser[i].x1b + 6))
                    var y = Math.abs((Data.Postacie.men[j].wys + 10) - (Data.laser[i].y + 6))
                    if (x <= 12 && y <= 10 && Data.Postacie.men[j].status == "visible") {
                        Data.Postacie.men[j].status = "dead"
                        document.getElementById("hum" + j).style.display = "none"
                        Data.Postacie.l2men--
                        Data.laser.splice(i, 1)
                        deadanim((Data.Postacie.men[j].pozycja - 100), (Data.Postacie.men[j].wys - 30), 1)
                        break;
                    }
                }
                var po = Data.laser.length
                if (przed != po) {
                    continue;
                }
                //planter
                var przed = Data.laser.length
                for (var j = 0; j < Data.Postacie.lplanter; j++) {
                    var x = Math.abs((Data.Postacie.planter[j].pozycja + 12) - (Data.laser[i].x1b + 6))
                    var y = Math.abs((Data.Postacie.planter[j].wys + 10) - (Data.laser[i].y + 6))

                    if (x <= 12 && y <= 10 && Data.Postacie.planter[j].status == "visible") {
                        Data.Postacie.planter[j].status = "dead"
                        document.getElementById("plant" + j).style.display = "none"
                        Data.Postacie.l2planter--
                        Data.laser.splice(i, 1)
                        Data.punkty += 150
                        deadanim((Data.Postacie.planter[j].pozycja - 100), (Data.Postacie.planter[j].wys - 30))
                        break;
                    }

                }
                var po = Data.laser.length
                if (przed != po) {
                    continue;
                }
                //android
                var przed = Data.laser.length
                for (var j = 0; j < Data.Postacie.landroid; j++) {
                    var x = Math.abs((Data.Postacie.android[j].pozycja + 12) - (Data.laser[i].x1b + 6))
                    var y = Math.abs((Data.Postacie.android[j].wys + 10) - (Data.laser[i].y + 6))
                    if (x <= 12 && y <= 10 && Data.Postacie.android[j].status == "visible") {
                        Data.Postacie.android[j].status = "dead"
                        document.getElementById("andr" + j).style.display = "none"
                        Data.Postacie.l2android--
                        Data.laser.splice(i, 1)
                        Data.punkty += 50
                        deadanim((Data.Postacie.android[j].pozycja - 100), (Data.Postacie.android[j].wys - 30))
                        break;
                    }
                }
                var po = Data.laser.length
                if (przed != po) {
                    continue;
                }
                //nemesite
                var przed = Data.laser.length
                for (var j = 0; j < Data.Postacie.lnemesite; j++) {
                    var x = Math.abs((Data.Postacie.nemesite[j].pozycja + 12) - (Data.laser[i].x1b + 6))
                    var y = Math.abs((Data.Postacie.nemesite[j].wys + 10) - (Data.laser[i].y + 6))

                    if (x <= 12 && y <= 10 && Data.Postacie.nemesite[j].status == "visible") {
                        Data.Postacie.nemesite[j].status = "dead"
                        document.getElementById("nemes" + j).style.display = "none"
                        Data.Postacie.l2nemesite--
                        Data.laser.splice(i, 1)
                        Data.punkty += 250
                        deadanim((Data.Postacie.nemesite[j].pozycja - 100), (Data.Postacie.nemesite[j].wys - 30))
                        break;
                    }
                }
                var po = Data.laser.length
                if (przed != po) {
                    continue;
                }
                //nyhme
                var przed = Data.laser.length
                if (Data.Postacie.nyhme != null) {
                    var x = Math.abs((Data.Postacie.nyhme.pozycja + 12) - (Data.laser[i].x1b + 6))
                    var y = Math.abs((Data.Postacie.nyhme.wys + 10) - (Data.laser[i].y + 6))

                    if (x <= 20 && y <= 10 && Data.Postacie.nyhme.status == "visible") {
                        Data.Postacie.nyhme.status = "dead"
                        setTimeout(function () {
                            Data.Postacie.nyhme = null
                            document.getElementById("nyhme").remove()
                        }, 2000)
                        document.getElementById("nyhme").style.display = "none"
                        Data.laser.splice(i, 1)
                        Data.punkty += 100
                        deadanim((Data.Postacie.nyhme.pozycja - 100), (Data.Postacie.nyhme.wys - 30))
                        break;
                    }
                }
                var po = Data.laser.length
                if (przed != po) {
                    continue;
                }
                //bstorm            
                var przed = Data.laser.length
                for (var j = 0; j < Data.Postacie.lbstorm; j++) {
                    var x = Math.abs((Data.Postacie.bstorm[j].pozycja + 12) - (Data.laser[i].x1b + 6))
                    var y = Math.abs((Data.Postacie.bstorm[j].wys + 10) - (Data.laser[i].y + 6))

                    if (x <= 20 && y <= 10 && Data.Postacie.bstorm[j].status == "visible") {
                        Data.Postacie.bstorm[j].status = "dead"
                        document.getElementById("blund" + j).style.display = "none"
                        Data.Postacie.l2bstorm--
                        Data.laser.splice(i, 1)
                        Data.punkty += 250
                        deadanim((Data.Postacie.bstorm[j].pozycja - 100), (Data.Postacie.bstorm[j].wys - 30))
                        break;
                    }
                }
                var po = Data.laser.length
                if (przed != po) {
                    continue;
                }
                //antimater
                var przed = Data.laser.length
                for (var j = 0; j < Data.Postacie.lantimater; j++) {
                    var x = Math.abs((Data.Postacie.antimater[j].pozycja + 12) - (Data.laser[i].x1b + 6))
                    var y = Math.abs((Data.Postacie.antimater[j].wys + 10) - (Data.laser[i].y + 6))

                    if (x <= 20 && y <= 10 && Data.Postacie.antimater[j].status == "visible") {
                        Data.Postacie.antimater[j].status = "dead"
                        document.getElementById("antimat" + j).style.display = "none"
                        Data.Postacie.l2antimater--
                        Data.laser.splice(i, 1)
                        smierc()
                        Data.punkty += 150
                        break;
                    }
                }
                var po = Data.laser.length
                if (przed != po) {
                    continue;
                }
                //spore
                var przed = Data.laser.length
                for (var j = 0; j < Data.Postacie.lspore; j++) {
                    var x = Math.abs((Data.Postacie.spore[j].pozycja + 12) - (Data.laser[i].x1b + 6))
                    var y = Math.abs((Data.Postacie.spore[j].wys + 10) - (Data.laser[i].y + 6))

                    if (x <= 20 && y <= 10 && Data.Postacie.spore[j].status == "visible") {
                        Data.Postacie.spore[j].status = "dead"
                        document.getElementById("spor" + j).style.display = "none"
                        Data.Postacie.l2spore--
                        Data.laser.splice(i, 1)
                        var tb = [[Data.Postacie.spore[j].pozycja, Data.Postacie.spore[j].wys + 20],
                            [Data.Postacie.spore[j].pozycja, Data.Postacie.spore[j].wys - 20],
                        [Data.Postacie.spore[j].pozycja - 20, Data.Postacie.spore[j].wys],
                        [Data.Postacie.spore[j].pozycja + 20, Data.Postacie.spore[j].wys]]
                        for (var k = 0; k < 4; k++) {
                            var ig9 = document.createElement("img")
                            var pozt = Math.floor(tb[k][0])
                            var wyst = Math.floor(tb[k][1])
                            ig9.src = "gpx/postacie/dlugi2.png"
                            ig9.id = "trail" + Data.Postacie.ltrailer
                            ig9.className = "trailer"
                            ig9.style.top = wyst + "px"
                            ig9.style.left = pozt + "px"
                            document.getElementById("tlo-poj").appendChild(ig9)
                            Data.Postacie.trailer.push({
                                pozycja: pozt, pozycjapocz: pozt, wys: wyst, src: "gpx/postacie/dlugi2.png", dzielnia: Math.floor(Math.random() * 5) + 1, zwrot: "left-right", status: "visible"
                            })
                            Data.Postacie.ltrailer++
                            Data.Postacie.l2trailer++
                        }
                        Data.punkty += 750
                        break;
                    }
                }
                var po = Data.laser.length
                if (przed != po) {
                    continue;
                }
                //trailer
                for (var j = 0; j < Data.Postacie.ltrailer; j++) {
                    if (Data.Postacie.trailer[i].zwrot == "left-right") {
                        var x = Math.abs((Data.Postacie.trailer[j].pozycja + 12) - (Data.laser[i].x1b + 6))
                        var y = Math.abs((Data.Postacie.trailer[j].wys + 7) - (Data.laser[i].y + 6))
                        if (x <= 4 && y == 13 && Data.Postacie.trailer[j].status == "visible") {
                            Data.Postacie.trailer[j].status = "dead"
                            document.getElementById("trail" + j).style.display = "none"
                            Data.Postacie.l2trailer--
                            Data.laser.splice(i, 1)
                            Data.punkty += 250
                            break;
                        }
                    } else {
                        var x = Math.abs((Data.Postacie.trailer[j].pozycja + 12) - (Data.laser[i].x1b + 6))
                        var y = Math.abs((Data.Postacie.trailer[j].wys + 13) - (Data.laser[i].y + 6))
                        if (x <= 4 && y <= 8 && Data.Postacie.trailer[j].status == "visible") {
                            Data.Postacie.trailer[j].status = "dead"
                            document.getElementById("trail" + j).style.display = "none"
                            Data.Postacie.l2trailer--
                            Data.laser.splice(i, 1)
                            Data.punkty += 250
                            break;
                        }
                    }
                }
            }
            document.getElementById("punkty").textContent = Data.punkty
            //-------------------------------------------kolizje: human-android------------------------------------
            for (var i = 0; i < Data.Postacie.landroid; i++) {
                for (var j = 0; j < Data.Postacie.lmen; j++) {
                    var x = Math.abs(Data.Postacie.android[i].pozycja - Data.Postacie.men[j].pozycja)
                    if (x < 24 && Data.Postacie.android[i].status == "visible" && Data.Postacie.men[j].status == "visible") {
                        Data.Postacie.android[i].status = "dead"
                        Data.Postacie.men[j].status = "dead"
                        document.getElementById("hum" + j).style.display = "none"
                        document.getElementById("andr" + i).style.display = "none"
                        Data.Postacie.l2android--
                        Data.Postacie.l2men--
                    }
                }
            }
            //--------------------------------------------kolizje-------------------------------------------------
            function smierc() {
                document.getElementById("death").play()

                document.getElementById("ekran2").style.display = "block"
                document.getElementById("tlo-poj").style.display = "none"
                document.getElementById("tlo-screen").style.display = "block"
                document.getElementById("cv1").style.display = "none"
                document.getElementById("lives").innerHTML = ""
                document.getElementById("dead-scene").src = ""
                document.getElementById("dead-scene").src = "gpx/animacje/smierc.gif"
                document.getElementById("dead-scene").style.left = 135 + "px"
                document.getElementById("dead-scene").style.top = (Data.pozycja.pionowo - 55) + "px"
                Data.lives--
                for (var i = 0; i < Data.lives; i++) {
                    var lv = document.createElement("img")
                    lv.src = "gpx/life.png"
                    lv.className = "live"
                    lv.id = "zycie" + i
                    document.getElementById("lives").appendChild(lv)
                }
                if (Data.lives == 0) {
                    document.getElementById("ekran3").style.display = "block"
                    document.getElementById("endtitls").innerHTML += "<br> <br>Result: " + Data.punkty
                    Data.game = 2
                }

                setTimeout(function () {
                    document.getElementById("ekran2").style.display = "none"
                    document.getElementById("cv1").style.display = "block"
                    document.getElementById("tlo-poj").style.display = "block"
                    document.getElementById("ladowanie").play()
                }, 2000)
                setTimeout(function () {
                    if (Data.lives != 0) {
                        Data.status = "alive"
                    } else {
                        Data.game = 2
                    }
                }, 3000)

            }

            if (Data.status == "alive" && !Data.cloak) {
                var dropper = -(Data.pozycja.poziomo) + 330
                var dropperwys = Data.pozycja.pionowo + 12
                //planter
                for (var i = 0; i < Data.Postacie.lplanter; i++) {
                    var roznicapoziomo = Math.abs(Data.Postacie.planter[i].pozycja - dropper)
                    var roznicapionowo = Math.abs(Data.Postacie.planter[i].wys - dropperwys)
                    if (roznicapionowo < 34 && roznicapoziomo < 36 && Data.Postacie.planter[i].status == "visible") {
                        Data.status = "dead"
                        Data.Postacie.l2planter--
                        Data.Postacie.planter[i].status = "dead"
                        document.getElementById("plant" + i).style.display = "none"
                        smierc()
                    }
                }
                //android
                for (var i = 0; i < Data.Postacie.landroid; i++) {
                    var roznicapoziomo = Math.abs(Data.Postacie.android[i].pozycja - dropper)
                    var roznicapionowo = Math.abs(Data.Postacie.android[i].wys - dropperwys)
                    if (roznicapionowo < 34 && roznicapoziomo < 36 && Data.Postacie.android[i].status == "visible") {
                        Data.status = "dead"
                        Data.Postacie.l2android--
                        Data.Postacie.android[i].status = "dead"
                        document.getElementById("andr" + i).style.display = "none"
                        smierc()
                    }
                }
                //nemesite
                for (var i = 0; i < Data.Postacie.lnemesite; i++) {
                    var roznicapoziomo = Math.abs(Data.Postacie.nemesite[i].pozycja - dropper)
                    var roznicapionowo = Math.abs(Data.Postacie.nemesite[i].wys - dropperwys)
                    if (roznicapionowo < 34 && roznicapoziomo < 36 && Data.Postacie.nemesite[i].status == "visible") {
                        Data.status = "dead"
                        Data.Postacie.l2nemesite--
                        Data.Postacie.nemesite[i].status = "dead"
                        document.getElementById("nemes" + i).style.display = "none"
                        smierc()
                    }
                }
                //nyhme
                if (Data.Postacie.nyhme != null) {
                    var roznicapoziomo = Math.abs(Data.Postacie.nyhme.pozycja - dropper)
                    var roznicapionowo = Math.abs(Data.Postacie.nyhme.wys - dropperwys)
                    if (roznicapionowo < 44 && roznicapoziomo < 34 && Data.Postacie.nyhme.status == "visible") {
                        Data.status = "dead"
                        document.getElementById("nyhme").style.display = "none"
                        Data.Postacie.nyhme.status = "dead"
                        setTimeout(function () {
                            Data.Postacie.nyhme = null
                            document.getElementById("nyhme").remove()
                        }, 2000)
                        smierc()
                    }
                }
                //bstorm            
                for (var i = 0; i < Data.Postacie.lbstorm; i++) {
                    var roznicapoziomo = Math.abs(Data.Postacie.bstorm[i].pozycja - dropper)
                    var roznicapionowo = Math.abs((Data.Postacie.bstorm[i].wys + 100) - dropperwys)
                    if (roznicapionowo < 124 && roznicapoziomo < 34 && Data.Postacie.bstorm[i].status == "visible") {
                        Data.status = "dead"
                        Data.Postacie.l2bstorm--
                        Data.Postacie.bstorm[i].status = "dead"
                        document.getElementById("blund" + i).style.display = "none"
                        smierc()
                    }
                }
                //antimater
                for (var i = 0; i < Data.Postacie.lantimater; i++) {
                    var roznicapoziomo = Math.abs(Data.Postacie.antimater[i].pozycja - dropper)
                    var roznicapionowo = Math.abs(Data.Postacie.antimater[i].wys - dropperwys)
                    if (roznicapionowo < 34 && roznicapoziomo < 36 && Data.Postacie.antimater[i].status == "visible") {
                        Data.status = "dead"
                        Data.Postacie.l2antimater--
                        Data.Postacie.antimater[i].status = "dead"
                        document.getElementById("antimat" + i).style.display = "none"
                        smierc()
                    }
                }
                //spore
                for (var i = 0; i < Data.Postacie.lspore; i++) {
                    var roznicapoziomo = Math.abs(Data.Postacie.spore[i].pozycja - dropper)
                    var roznicapionowo = Math.abs(Data.Postacie.spore[i].wys - dropperwys)
                    if (roznicapionowo < 32 && roznicapoziomo < 34 && Data.Postacie.spore[i].status == "visible") {
                        Data.status = "dead"
                        Data.Postacie.l2spore--
                        Data.Postacie.spore[i].status = "dead"
                        document.getElementById("spor" + i).style.display = "none"
                        smierc()
                    }
                }
                //trailer
                for (var i = 0; i < Data.Postacie.ltrailer; i++) {
                    var roznicapoziomo = Math.abs(Data.Postacie.trailer[i].pozycja - dropper)
                    var roznicapionowo = Math.abs(Data.Postacie.trailer[i].wys - dropperwys)

                    if (Data.Postacie.trailer[i].zwrot == "left-right") {
                        roznicapionowo = (Math.abs(Data.Postacie.trailer[i].wys + 14) - dropperwys)
                        if (roznicapionowo < 28 && roznicapoziomo < 38 && Data.Postacie.trailer[i].status == "visible") {
                            Data.status = "dead"
                            Data.Postacie.l2trailer--
                            Data.Postacie.trailer[i].status = "dead"
                            document.getElementById("trail" + i).style.display = "none"
                            smierc()
                        }
                    }
                    else {
                        roznicapoziomo = Math.abs((Data.Postacie.trailer[i].pozycja + 14) - dropper)
                        if (roznicapionowo < 38 && roznicapoziomo < 28 && Data.Postacie.trailer[i].status == "visible") {
                            Data.status = "dead"
                            Data.Postacie.l2trailer--
                            Data.Postacie.trailer[i].status = "dead"
                            document.getElementById("trail" + i).style.display = "none"
                            smierc()
                        }
                    }
                }
            }

        }
        //------------------------------------------------mapka------------------------------------------
        if (Data.zegar > 200) {
            var c2 = document.getElementById("cv2");
            var ctx2 = c2.getContext("2d");
            ctx2.clearRect(0, 0, 414, 47);
            var przes = 18
            for (var i = 0; i < Data.Postacie.lplanter; i++) {
                if (Data.Postacie.planter[i].status == "visible") {
                    ctx2.beginPath()
                    ctx2.fillStyle = "#00ff00";
                    ctx2.fillRect(Data.Postacie.planter[i].pozycja / 10 + przes, Data.Postacie.planter[i].wys / 10, 4, 4);
                    ctx2.lineWidth = 8;
                    ctx2.lineWidth = 8;
                    ctx2.fill();
                    ctx2.stroke();
                }
            }
            //android
            for (var i = 0; i < Data.Postacie.landroid; i++) {
                if (Data.Postacie.android[i].status == "visible") {
                    ctx2.beginPath()
                    ctx2.fillStyle = "#E83523";
                    ctx2.fillRect(Data.Postacie.android[i].pozycja / 10 + przes, Data.Postacie.android[i].wys / 10, 4, 4);
                    ctx2.lineWidth = 8;
                    ctx2.lineWidth = 8;
                    ctx2.fill();
                    ctx2.stroke();
                }
            }
            //nemesite
            for (var i = 0; i < Data.Postacie.lnemesite; i++) {
                if (Data.Postacie.nemesite[i].status == "visible") {
                    ctx2.beginPath()
                    ctx2.fillStyle = "#A4E824";
                    ctx2.fillRect(Data.Postacie.nemesite[i].pozycja / 10 + przes, Data.Postacie.nemesite[i].wys / 10, 4, 4);
                    ctx2.lineWidth = 8;
                    ctx2.lineWidth = 8;
                    ctx2.fill();
                    ctx2.stroke();
                }
            }
            //nyhme
            if (Data.Postacie.nyhme != null) {
                if (Data.Postacie.nyhme.status == "visible") {
                    ctx2.beginPath()
                    ctx2.fillStyle = "#FF5D43";
                    ctx2.fillRect(Data.Postacie.nyhme.pozycja / 10 + przes, Data.Postacie.nyhme.wys / 10, 4, 4);
                    ctx2.lineWidth = 8;
                    ctx2.lineWidth = 8;
                    ctx2.fill();
                    ctx2.stroke();
                }
            }
            //bstorm            
            for (var i = 0; i < Data.Postacie.lbstorm; i++) {
                if (Data.Postacie.bstorm[i].status == "visible") {
                    ctx2.beginPath()
                    ctx2.fillStyle = "#3717E8";
                    ctx2.fillRect(Data.Postacie.bstorm[i].pozycja / 10 + przes, Data.Postacie.bstorm[i].wys / 10, 4, 4);
                    ctx2.lineWidth = 8;
                    ctx2.lineWidth = 8;
                    ctx2.fill();
                    ctx2.stroke();
                }
            }
            //antimater
            for (var i = 0; i < Data.Postacie.lantimater; i++) {
                if (Data.Postacie.antimater[i].status == "visible") {
                    ctx2.beginPath()
                    ctx2.fillRect(Data.Postacie.antimater[i].pozycja / 10 + przes, Data.Postacie.antimater[i].wys / 10, 4, 4);
                    ctx2.fillStyle = "#2FF2FF";
                    ctx2.lineWidth = 8;
                    ctx2.lineWidth = 8;
                    ctx2.fill();
                    ctx2.stroke();
                }
            }
            //spore
            for (var i = 0; i < Data.Postacie.lspore; i++) {
                if (Data.Postacie.spore[i].status == "visible") {
                    ctx2.beginPath()
                    ctx2.fillRect(Data.Postacie.spore[i].pozycja / 10 + przes, Data.Postacie.spore[i].wys / 10, 4, 4);
                    ctx2.fillStyle = "#344CFF";
                    ctx2.lineWidth = 8;
                    ctx2.lineWidth = 8;
                    ctx2.fill();
                    ctx2.stroke();
                }
            }
            //trailer
            for (var i = 0; i < Data.Postacie.ltrailer; i++) {
                if (Data.Postacie.trailer[i].status == "visible") {
                    ctx2.beginPath()
                    ctx2.fillRect(Data.Postacie.trailer[i].pozycja / 10 + przes, Data.Postacie.trailer[i].wys / 10, 4, 4);
                    ctx2.fillStyle = "#5B1CE8";
                    ctx2.lineWidth = 8;
                    ctx2.lineWidth = 8;
                    ctx2.fill();
                    ctx2.stroke();
                }
            }
            //human
            for (var i = 0; i < Data.Postacie.lmen; i++) {
                if (Data.Postacie.men[i].status == "visible") {
                    ctx2.beginPath()
                    ctx2.fillRect(Data.Postacie.men[i].pozycja / 10 + przes, Data.Postacie.men[i].wys / 10, 4, 4);
                    ctx2.fillStyle = "#701CE8";
                    ctx2.lineWidth = 8;
                    ctx2.lineWidth = 8;
                    ctx2.fill();
                    ctx2.stroke();
                }
            }
            var dropper = -(Data.pozycja.poziomo) + 330
            ctx2.beginPath()

            ctx2.fillStyle = "#bbb5e5";
            ctx2.fillRect(-((Data.pozycja.poziomo) / 10) + 50, Data.pozycja.pionowo / 10, 5, 5);
            //     
            ctx2.lineWidth = 8;
            ctx2.fill();
            ctx2.stroke();
        }

        //--------------------------------------------strzalki do drop-zone-----------------------
        if (Data.eq == 1) {
            if (Data.pozycja.poziomo < -1530) {
                document.getElementById("Lstr").style.display = "block"
                document.getElementById("Pstr").style.display = "none"
            }
            else {
                document.getElementById("Lstr").style.display = "none"
                document.getElementById("Pstr").style.display = "block"
            }
        } else {
            document.getElementById("Lstr").style.display = "none"
            document.getElementById("Pstr").style.display = "none"
        }
        //-----------------------------------------------------------oproznienie eq----------------------------------
        if (Data.eq == 1 && Data.Postacie.tmen == 0 && Data.pozycja.poziomo <= -1465 && Data.pozycja.poziomo >= -1570 && Data.pozycja.pionowo > 230) {
            Data.eq = 0
            document.getElementById("catch").play()
            var ig2 = document.createElement("img")
            ig2.src = "gpx/postacie/man.png"
            ig2.style.height = "14px"
            document.getElementById("Mcount").appendChild(ig2)
            Data.Postacie.lmen--
            Data.Postacie.l2men--
            Data.Postacie.tmen = 300
            Data.punkty += 200
            document.getElementById("punkty").textContent = Data.punkty
            if (Data.Postacie.lmen == 0) {
                for (var i = 0; i < Data.Postacie.l2men ; i++) {
                    document.getElementById("hum" + i).remove()
                }
            }
            var dv = document.createElement("div")
            dv.className = "dostarczenie"
            dv.textContent = "100"
            dv.style.left = (Math.floor(Math.random() * 200) - 100) + 1800 + "px"
            dv.style.top = (Math.floor(Math.random() * 80) - 40) + 220 + "px"
            document.getElementById("tlo-poj").appendChild(dv)
            setTimeout(function () {
                dv.remove()
            }, 1000)

        }
        if (Data.Postacie.tmen > 0) {
            Data.Postacie.tmen--
        }
        //---------------------------------------man-chacked-------------------------
        document.getElementById("remaining").textContent = Data.Postacie.l2men
        document.getElementById("catched").textContent = 8 - Data.Postacie.lmen
        //----------------------------------------konczenie rundy--------------------------
        function reload(level) {
            Data.Postacie.men = []
            Data.Postacie.lmen = 8
            Data.Postacie.l2men = 8
            Data.Postacie.tmen = 0
            Data.Postacie.planter = []
            Data.Postacie.android = []
            Data.Postacie.landroid = 0
            Data.Postacie.l2android = 0
            Data.Postacie.nemesite = []
            Data.Postacie.lnemesite = 0
            Data.Postacie.l2nemesite = 0
            Data.Postacie.nyhme = null
            Data.Postacie.bstorm = []
            Data.Postacie.spore = []
            Data.Postacie.antimater = []
            Data.Postacie.trailer = []
            Data.Postacie.ltrailer = 0
            Data.Postacie.l2trailer = 0
            Data.cloakTime += 600
            Data.zegar = 0
            switch (level) {
                case 2:
                    Data.Postacie.lplanter = 6
                    Data.Postacie.l2planter = 6
                    Data.Postacie.lbstorm = 3
                    Data.Postacie.l2bstorm = 3
                    Data.Postacie.lspore = 2
                    Data.Postacie.l2spore = 2
                    Data.Postacie.lantimater = 1
                    Data.Postacie.l2antimater = 1
                    break;
                case 3:
                    Data.Postacie.lplanter = 8
                    Data.Postacie.l2planter = 8
                    Data.Postacie.lbstorm = 5
                    Data.Postacie.l2bstorm = 5
                    Data.Postacie.lspore = 4
                    Data.Postacie.l2spore = 4
                    Data.Postacie.lantimater = 3
                    Data.Postacie.l2antimater = 3
                    break;
                case 4:
                    Data.Postacie.lplanter = 10
                    Data.Postacie.l2planter = 10
                    Data.Postacie.lbstorm = 7
                    Data.Postacie.l2bstorm = 7
                    Data.Postacie.lspore = 6
                    Data.Postacie.l2spore = 6
                    Data.Postacie.lantimater = 6
                    Data.Postacie.l2antimater = 6
                    break;
                case 5:
                    Data.Postacie.lplanter = 12
                    Data.Postacie.l2planter = 12
                    Data.Postacie.lbstorm = 10
                    Data.Postacie.l2bstorm = 10
                    Data.Postacie.lspore = 8
                    Data.Postacie.l2spore = 8
                    Data.Postacie.lantimater = 9
                    Data.Postacie.l2antimater = 9
                    break
                default:
                    Data.Postacie.lplanter = 16
                    Data.Postacie.l2planter = 16
                    Data.Postacie.lbstorm = 12
                    Data.Postacie.l2bstorm = 12
                    Data.Postacie.lspore = 10
                    Data.Postacie.l2spore = 10
                    Data.Postacie.lantimater = 14
                    Data.Postacie.l2antimater = 14
                    break;
            }
            if (Data.cloakTime > 1800) Data.cloakTime = 1800
        }
        if (Data.Postacie.l2planter == 0 && Data.Postacie.l2android == 0 && Data.Postacie.l2nemesite == 0 && Data.Postacie.l2bstorm == 0 &&
            Data.Postacie.l2spore == 0 && Data.Postacie.l2trailer == 0 && Data.Postacie.l2men == 0 && Data.Postacie.nyhme == null) {
            Data.level++
            reload(Data.level)

            document.getElementById("tlo-poj").innerHTML = ""
            var t = document.createElement("img")
            t.src = "gpx/background.png"
            t.id = "tlo-screen"
            document.getElementById("tlo-poj").appendChild(t)
            var mck = document.createElement("img")
            mck.src = "gpx/postacie/manchaked.gif"
            mck.id = "manchecked"
            document.getElementById("tlo-poj").appendChild(mck)
            var mc = document.createElement("div")
            mc.id = "Mcount"
            document.getElementById("tlo-poj").appendChild(mc)
            document.getElementById("ladowanie").play()
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
                var zrzut = Math.floor((Math.random() * 1200) + 300);//12000,3000
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
        }
        //---------------------------------------zegar---------------------------------
        Data.zegar++
    }
}
