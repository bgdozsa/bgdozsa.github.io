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

// <tr>
let sor = document.createElement("tr")
//sor.innerHTML = "sor próbaszöveg"
let szuloElem = document.querySelector("tbody#js")
szuloElem.appendChild(sor)

// <th> #
let sorSzamCella = document.createElement("th")
sorSzamCella.scope = "row"
sorSzamCella.innerHTML = "1"
szuloElem = document.querySelector("tbody#js>tr")
szuloElem.appendChild(sorSzamCella)       

// <td> Név
let nevCella = document.createElement("td")
nevCella.innerHTML = "Márk Lukács"
szuloElem = document.querySelector("tbody#js>tr")
szuloElem.appendChild(nevCella)

// <td> Email
let emailCella = document.createElement("td")
emailCella.innerHTML = "@ml"
szuloElem = document.querySelector("tbody#js>tr")
szuloElem.appendChild(emailCella)

// <td> Cím
let cimCella = document.createElement("td")
cimCella.innerHTML = "Kisfoktő"
szuloElem = document.querySelector("tbody#js>tr")
szuloElem.appendChild(cimCella)

// <td> Gombok cellája
let gombCella = document.createElement("td")
gombCella.className = "btn-group"
szuloElem = document.querySelector("tbody#js>tr")
szuloElem.appendChild(gombCella)

// <button> Szerkesztés gomb
let szerkesztésGomb = document.createElement("button")
szerkesztésGomb.className = "btn btn-info"
szerkesztésGomb.title = "Szerkesztés"
szuloElem = document.querySelector("tbody#js>tr td:last-child")
szuloElem.appendChild(szerkesztésGomb)

// <button> törlés gomb
let törlésGomb = document.createElement("button")
törlésGomb.className = "btn btn-danger"
törlésGomb.title = "Törlés"
szuloElem = document.querySelector("tbody#js>tr td:last-child")
szuloElem.appendChild(törlésGomb)

// <button> Szerkesztés gomb ikon
let szerkesztésGombIkon = document.createElement("i")
szerkesztésGombIkon.className = "fas fa-sync-alt"
szuloElem = document.querySelector("tbody#js>tr td:last-child>button.btn.btn-info")
szuloElem.appendChild(szerkesztésGombIkon)

// <button> törlés gomb ikon
let törlésGombIkon = document.createElement("i")
törlésGombIkon.className = "fas fa-trash-alt"
szuloElem = document.querySelector("tbody#js>tr td:last-child>button.btn.btn-danger")
szuloElem.appendChild(törlésGombIkon)

