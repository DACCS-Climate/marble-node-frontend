const loadTable = async (tableContainerId, fetchPath, responseKey, rowCreationCallback) => {
    let response;
    if (URL.parse(fetchPath) === null) {
        response = await marbleAPIFetch(fetchPath);
    } else {
        response = await JSONAPIFetch(fetchPath);
    }
    const tableContainer = document.getElementById(tableContainerId);
    const responseData = await response.json();
    tableContainer.setAttribute("data-href", response.url)
    for (row of document.querySelectorAll(".row")) {
        row.remove();
    }
    responseData[responseKey].forEach(rowData => {
        const template = tableContainer.querySelector("#row-template");
        const row = document.importNode(template.content, true);
        rowCreationCallback(row, rowData)
        template.parentElement.appendChild(row);
    })
    const prevButton = tableContainer.querySelector(".prev-button");
    const nextButton = tableContainer.querySelector(".next-button");
    [prevButton, nextButton].forEach(button => {
        button.disabled = true;
        button.removeAttribute("data-href")
    })
    responseData.links.forEach(link => {
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

const sortTable = async (tableContainerId, responseKey, rowCreationCallback, e) => {
    const tableContainer = document.getElementById(tableContainerId);
    const currentURL = URL.parse(tableContainer.getAttribute("data-href"));
    const table = tableContainer.querySelector("table");
    let [sortKey, direction] = table.getAttribute("data-sort").split("-");
    if (sortKey === e.target.id) {
        direction = direction == "asc" ? "desc" : "asc";
    } else {
        sortKey = e.target.id;
        direction = "asc";
    }
    currentURL.searchParams.set("sort_by", sortKey);
    currentURL.searchParams.set("ascending", direction === "asc");
    await loadTable(tableContainerId, currentURL.toString(), responseKey, rowCreationCallback);
    table.setAttribute("data-sort", `${sortKey}-${direction}`)
}

const initTable = async (tableContainerId, fetchPath, responseKey, rowCreationCallback) => {
    await loadTable(tableContainerId, fetchPath, responseKey, rowCreationCallback)
    for (elem of document.getElementsByClassName("sortable-column")) {
        elem.addEventListener("click", e => sortTable(tableContainerId, responseKey, rowCreationCallback, e))
    }
    ["prev-button", "next-button"].forEach(buttonClass => {
        document.querySelector(`#${tableContainerId} .${buttonClass}`).addEventListener("click", (e) => {
            loadTable(tableContainerId, e.target.getAttribute("data-href"), responseKey, rowCreationCallback)
        })
    })
}
