function sendOrderData() {
    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const address = document.querySelector("#address").value.trim();
    const comment = document.querySelector("#comment").value.trim();
    const extra = parseInt(document.querySelector("[name=extra]:checked").value)
    const sauce = parseInt(document.querySelector("#sauce").value)
    const quantity = parseInt(document.querySelector("#quantity").value)

    if (isValidPersonalData(name, email, address, comment) && isValidQuantity(quantity)) {
        const message = document.querySelector("#message")
        message.innerText = getTotal(extra, sauce, quantity);
    }
}


function isValidPersonalData(name, email, address, comment) {
    if (!name) {
        alert("A név megadása kötelező!")
        return false
    }
    if (!email || !(email.indexOf("@") > 0) || !(email.indexOf(".") > 0)) {
        alert("Érvénytelen e-mail cím!")
        return false
    }
    if (address.length < 10) {
        alert("Kérjük pontos címet adj meg!")
        return false
    }
    if ((comment.indexOf("<") >= 0) && (comment.indexOf(">") > 0)) {
        alert("A megjegyzésben nem megengedett a HTML használata!")
        return false
    }
    return true
}


function isValidQuantity(quantity) {
    if (!quantity || quantity < 1 || quantity > 10) {
        alert("Csak 1 és 10 közötti darabot rendelhetsz!")
        return false
    }
    return true
}
    

function getTotal(extra, sauce, quantity) {
    let price = (1200 + extra + sauce) * quantity
    if (price < 5000) {
        price += 500
    }
    return price
}
