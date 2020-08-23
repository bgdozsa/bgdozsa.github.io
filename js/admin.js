/* <tr>
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
    szerkesztésGomb.innerHTML = '<i class="fas fa-sync-alt"></i>'
    gombCsoport.appendChild(szerkesztésGomb)
    //Törlés gomb elkészítése
    let törlésGomb = document.createElement("button")
    törlésGomb.className = "btn btn-danger"
    törlésGomb.title = "Törlés"
    törlésGomb.innerHTML = '<i class="fas fa-trash-alt"></i>'
    gombCsoport.appendChild(törlésGomb)
    tr.appendChild(gombCsoport)  //a gombcsoport beillesztése

    tablBody.appendChild(tr)  //a cellákkal feltöltött sor beillesztése
}

