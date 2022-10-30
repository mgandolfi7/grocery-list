const deleteText = document.querySelectorAll(".fa-trash");

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteItem)
});

async function deleteItem() {
    const lItem = this.parentNode.childNodes[1].innerText;
    try {
        const res = await fetch("deleteItem", {
            method: "delete",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "listItemS": lItem
            })
        })
        const data = await res.json()
        console.log(data)
        location.reload()
    } catch(err) {
        console.log(err)
    }
}
