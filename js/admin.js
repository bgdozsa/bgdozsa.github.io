/* A megvalósítandó html kód
<tr>
    <th scope="row">1</th>
    <td>Mark Otto</td>
    <td>@otto</td>
    <td>Úszód</td>
    <td class="btn-group">
        <button class="btn btn-info" title="Szerkesztés">
            <i class="fas fa-sync-alt"></i>
        </button>
        <button class="btn btn-danger" title="Törlés">
            <i class="fas fa-trash-alt"></i>
        </button>
    </td>
</tr> */


//főprogram
const serverUrl = "https://my-json-server.typicode.com/bgdozsa/bgdozsa.github.io/felhasznalok/"
const kulcsok = ["id", "név", "email", "cím"]
startGetUsers()


function startGetUsers() {
    getServerData(serverUrl).then(
        data => { táblázatRajzolás(data) }
    )
}


function getServerData(url) {
    let fetchOptions = {
        method: "GET",
        mode: "cors",
        cache: "no-cache"
    }
    return fetch(url, fetchOptions).then(  //a then-t a fgv híváshoz tettük
        response => response.json(),
        err => console.error(err)
    )
}


function táblázatRajzolás(felhasználók) {
    let tablBody = document.querySelector("#userTable")  //szülőelem, beillesztés helye
    tablBody.innerHTML = ""  //előző tartalom törlése, kell?
    for (let i in felhasználók) {  //sorok száma: az in egy indexet generál userenként
        let tr = document.createElement("tr")  //üres sor készítése
        
        //sorszámok cella sorfejlécként
        let sorSzamCella = document.createElement("th")
        sorSzamCella.scope = "row"
        sorSzamCella.innerHTML = parseInt(i)+1
        tr.appendChild(sorSzamCella)
        
        //adatcellák feltöltése a felhaszmálók objektumtömbből
        //a kulcsok tömb megadásával a sorrend a kulcsok tömbből jön
        for (let key of kulcsok) {
            let td = document.createElement("td")    
            td.innerHTML = felhasználók[i][key]
            tr.appendChild(td)
        }
        
        //gombcsoportot tartalmazó cella elkészítése
        let gombCsoport = document.createElement("td")
        gombCsoport.className = "btn-group"
        //Szerkesztés gomb elkészítése
        let szerkesztésGomb = document.createElement("button")
        szerkesztésGomb.className = "btn btn-info"
        szerkesztésGomb.title = "Szerkesztés"
        szerkesztésGomb.setAttribute("onclick", "szerkesztésFüggvény(this)")
        szerkesztésGomb.innerHTML = '<i class="fas fa-sync-alt"></i>'
        gombCsoport.appendChild(szerkesztésGomb)
        //Törlés gomb elkészítése
        let törlésGomb = document.createElement("button")
        törlésGomb.className = "btn btn-danger"
        törlésGomb.title = "Törlés"
        //így nem adja vissza a paramétert, ha kiteszem a zárójelet és a thist, akkor nem csak a gombnyomásra működik
        //törlésGomb.addEventListener("click", törlésFüggvény)
        törlésGomb.setAttribute("onclick", "törlésFüggvény(this)") //így jó!!!!
        törlésGomb.innerHTML = '<i class="fas fa-trash-alt"></i>'
        gombCsoport.appendChild(törlésGomb)
        tr.appendChild(gombCsoport)  //a gombcsoport beillesztése
        
        tablBody.appendChild(tr)  //a cellákkal feltöltött sor beillesztése
    } //for
}


function törlésFüggvény(gomb) {
    if (confirm("Biztosan törlöd a felhasználót?")) {
        let tr = gomb.parentElement.parentElement
        let id = tr.querySelector(":nth-child(2)").innerHTML
        let fetchOptions = { method: "DELETE", mode: "cors", cache: "no-cache" }
        fetch(serverUrl + id, fetchOptions)
            .then( resp => resp.json() )
            .then( json => startGetUsers() )
    }
}


function szerkesztésFüggvény(gomb) {
    let tr = gomb.parentElement.parentElement
    let kiválasztottSorszám = tr.querySelector("th").innerHTML
    //console.log(kiválasztottSorszám)
    if (gomb.className == "btn btn-info") { //előkészítés szerkesztésre
        gomb.className = "btn btn-success"
        gomb.title = "Mentés"
        gomb.innerHTML = '<i class="fas fa-save"></i>'
        tr.className = "table-warning"
        for (let i = 3; i < 6; i++) {  //a sorszám és az id nem módosítható
            let cella = tr.querySelector("td:nth-child(" + i + ")")
            let cellaTartalom = cella.innerHTML
            cella.innerHTML = ""
            let input = document.createElement("input")
            input.className = "form-control"
            input.value = cellaTartalom
            cella.appendChild(input)
        }
    } else { //mentés és visszaállítás
        gomb.className = "btn btn-info"
        gomb.title = "Szerkesztés"
        gomb.innerHTML = '<i class="fas fa-sync-alt"></i>'
        tr.className = ""
        let módosítottAdatsor = { név: "", email: "", cím: "" }
        for (let i = 3; i < 6; i++) {
            let cella = tr.querySelector(":nth-child(" + i + ")")
            let input = cella.querySelector("input")
            let cellaTartalom = input.value
            cella.removeChild(input)
            cella.innerHTML = cellaTartalom  //visszaírás a táblázatba
            switch (i) {
                case 3: módosítottAdatsor.név = cellaTartalom; break;
                case 4: módosítottAdatsor.email = cellaTartalom; break;
                case 5: módosítottAdatsor.cím = cellaTartalom; break;
            }
        }
        let id = tr.querySelector(":nth-child(2)").innerHTML
        let fetchOptions = { method: "PUT", mode: "cors", cache: "no-cache",
                        headers: {"Content-Type": 'application/json'},
                        body: JSON.stringify(módosítottAdatsor) }
        fetch(serverUrl + id, fetchOptions)
            .then( resp => resp.json(), err => console.error(err) )
            .then( json => startGetUsers() )
    }
}


function ujMentes() {
    let újNév = document.querySelector("#nameInput").value
    document.querySelector("#nameInput").value = ""
    let újEmail = document.querySelector("#emailInput").value
    document.querySelector("#emailInput").value = ""
    let újCím = document.querySelector("#addressInput").value
    document.querySelector("#addressInput").value = ""
    let újFelhasználó = { név: újNév, email: újEmail, cím: újCím }
    //az id-t a server adja hozzá automatikusan, de utolsó mezőnek
    let fetchOptions = { method: "POST",
                        headers: {"Content-Type": 'application/json'},
                        body: JSON.stringify(újFelhasználó) }
    fetch(serverUrl, fetchOptions)
        .then( resp => resp.json(), err => console.error(err) )
        .then( json => startGetUsers() )
}
