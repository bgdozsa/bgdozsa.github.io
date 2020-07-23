function sendOrderData() {
    const message = document.querySelector("#message")
    const extra = parseInt(document.querySelector("[name=extra]:checked").value)
    //console.log(extra)
    const sauce = parseInt(document.querySelector("#sauce").value)
    const quantity = parseInt(document.querySelector("#quantity").value)
    const price = (1200 + extra + sauce) * quantity
    message.innerText = price;
}