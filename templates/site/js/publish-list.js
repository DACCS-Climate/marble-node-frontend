{% include "partials/js/table.js" %}

document.addEventListener('DOMContentLoaded', async () => {
    const user = (await window.magpieSession).user.user_name;
    const formatter = new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    })
    await initTable(
        "publish-list-panel", 
        `/users/${user}/data-requests/`, 
        "data_requests", 
        (row, request) => {
            const titleElem = row.querySelector(".row-title a")
            titleElem.innerText = request.title;
            titleElem.href = `publish.html?id=${request.id}`
            row.querySelector(".row-created").innerText = formatter.format(new Date(request.created));
            row.querySelector(".row-updated").innerText = formatter.format(new Date(request.updated));
            row.querySelector(".row-status").innerText = "pending" // TODO: get actual status
        })
})