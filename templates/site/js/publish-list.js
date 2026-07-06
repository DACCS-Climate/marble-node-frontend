const loadTable = async (fetchPath) => {
    let response;
    if (URL.parse(fetchPath) === null) {
        response = await marbleAPIFetch(fetchPath);
    } else {
        response = await JSONAPIFetch(fetchPath);
    }
    const publishRequests = await response.json();
    window.currentRequestURL = response.url;
    const formatter = new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    })
    for (row of document.querySelectorAll(".row")) {
        row.remove();
    }
    publishRequests.data_requests.forEach(request => {
        const template = document.getElementById("row-template");
        const row = document.importNode(template.content, true);
        const titleElem = row.querySelector(".row-title a")
        titleElem.innerText = request.title;
        titleElem.href = `publish.html?id=${request.id}`
        row.querySelector(".row-created").innerText = formatter.format(new Date(request.created));
        row.querySelector(".row-updated").innerText = formatter.format(new Date(request.updated));
        row.querySelector(".row-status").innerText = "pending" // TODO: get actual status
        template.parentElement.appendChild(row);
    })
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    [prevButton, nextButton].forEach(button => {
        button.disabled = true;
        button.removeAttribute("data-href")
    })
    publishRequests.links.forEach(link => {
        if (link.rel === "next") {
            nextButton.setAttribute("data-href", link.href);
            nextButton.disabled = false;
        }
        if (link.rel === "prev") {
            prevButton.setAttribute("data-href", link.href);
            prevButton.disabled = false;
        }
    })
}

const sortTable = async (e) => {
    const currentURL = URL.parse(window.currentRequestURL);
    const table = document.getElementById("publish-table");
    let [sortKey, direction] = table.getAttribute("data-sort").split("-");
    if (sortKey === e.target.id) {
        direction = direction == "asc" ? "desc" : "asc";
    } else {
        sortKey = e.target.id;
        direction = "asc";
    }
    currentURL.searchParams.set("sort_by", sortKey);
    currentURL.searchParams.set("ascending", direction === "asc");
    await loadTable(currentURL.toString());
    table.setAttribute("data-sort", `${sortKey}-${direction}`)
}

document.addEventListener('DOMContentLoaded', async () => {
    const user = (await window.magpieSession).user.user_name;
    await loadTable(`/users/${user}/data-requests/`)
    for (elem of document.getElementsByClassName("sortable-column")) {
        elem.addEventListener("click", sortTable)
    }
    ["prev-button", "next-button"].forEach(buttonId => {
        document.getElementById(buttonId).addEventListener("click", (e) => loadTable(e.target.getAttribute("data-href")))
    })
})