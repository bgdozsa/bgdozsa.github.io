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

let felhasználók = [
    {név: "Bagó Lajos", email: "bl@gmail.com", cím: "1111 Buda, Fő utca 11."},
    {név: "Boros Lujza", email: "blu@gmail.com", cím: "1111 Buda, Fő utca 22."},
    {név: "Banya Géza", email: "bg@gmail.com", cím: "1111 Buda, Fő utca 33."},
    {név: "Bálint Bianka", email: "bb@gmail.com", cím: "1111 Buda, Fő utca 44."},
    {név: "Bús Gerzson", email: "bge@gmail.com", cím: "1111 Buda, Fő utca 55."},
    {név: "Botos Lili", email: "bl@gmail.com", cím: "1111 Buda, Fő utca 66."},
    {név: "Békés Gusztáv", email: "bgu@gmail.com", cím: "1111 Buda, Fő utca 77."}
]

táblázatRajzolás()

function táblázatRajzolás() {
    let tablBody = document.querySelector("#userTable")  //szülőelem, beillesztés helye
    for (let i in felhasználók) {  //sorok száma: az in egy indexet generál userenként
        let tr = document.createElement("tr")  //üres sor készítése
        
        //sorszámok cella sorfejlécként
        let sorSzamCella = document.createElement("th")
        sorSzamCella.scope = "row"
        sorSzamCella.innerHTML = parseInt(i)+1
        tr.appendChild(sorSzamCella)
        
        //adatcellák feltöltése a felhaszmálók objektumtömbből
        for (let mező of Object.values(felhasználók[i])) {
            let td = document.createElement("td")    
            td.innerHTML = mező
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
        let kiválasztottSorszám = tr.querySelector("th").innerHTML
        //console.log(kiválasztottSorszám)
        //let kiválasztottNév = tr.querySelector("td:nth-child(2)").innerHTML
        //felhasználók = felhasználók.filter(person => person.név != kiválasztottNév);
        //myArray.delete(3); //a 4. elemet törli, másik megoldás
        felhasználók.splice(kiválasztottSorszám - 1, 1)  //törlés a listából
        document.querySelector("#userTable").innerHTML = ""  //előző táblázat törlése
        táblázatRajzolás()
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
        for (let i = 2; i < 5; i++) {
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
        for (let i = 2; i < 5; i++) {
            let cella = tr.querySelector("td:nth-child(" + i + ")")
            let input = cella.querySelector("input")
            let cellaTartalom = input.value
            cella.removeChild(input)
            cella.innerHTML = cellaTartalom  //visszaírás a táblázatba
            switch (i) {
                case 2: felhasználók[kiválasztottSorszám - 1].név = cellaTartalom; break;
                case 3: felhasználók[kiválasztottSorszám - 1].email = cellaTartalom; break;
                case 4: felhasználók[kiválasztottSorszám - 1].cím = cellaTartalom; break;
            }
        }
        //console.log(felhasználók[kiválasztottSorszám-1])
    }
}


function ujMentes() {
    let újNév = document.querySelector("#nameInput").value
    let újEmail = document.querySelector("#emailInput").value
    let újCím = document.querySelector("#addressInput").value
    let újFelhasználó = { név: újNév, email: újEmail, cím: újCím }
    felhasználók.push(újFelhasználó)
    console.log(felhasználók)
    document.querySelector("#userTable").innerHTML = ""  //előző táblázat törlése
    táblázatRajzolás()
}