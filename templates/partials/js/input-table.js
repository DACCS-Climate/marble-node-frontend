const listDrop = (e) => {
    const elem = document.getElementById(e.dataTransfer.getData("text/plain"));
    const dropTarget = elem.nextElementSibling;
    if (dropTarget !== e.target) { // TODO: prevent dropping into different tables
        e.target.after(elem);
        elem.after(dropTarget);
    }
    e.target.classList.remove("drag-over");
    elem.classList.remove("is-dragging");
}

const listDragStart = (e) => {
    e.target.parentElement.classList.add("dragging");
    setTimeout(() => e.target.classList.add("is-dragging"), 0); // hack to keep dragged item visible
    e.dataTransfer.setData("text/plain", e.target.id);
}

const listDragEnd = (e) => {
    e.target.parentElement.classList.remove("dragging");
    e.target.classList.remove("is-dragging");
}

const addListDropEvents = (target) => {
    target.addEventListener("drop", listDrop);
    target.addEventListener("dragenter", (e) => {
        e.preventDefault();
        e.target.classList.add("drag-over");
    });
    target.addEventListener("dragleave", (e) => {
        e.target.classList.remove("drag-over");
    })
    target.addEventListener("dragover", (e) => e.preventDefault());
}

const removeListRow = (e) => {
    e.preventDefault();
    const nextElem = e.target.parentElement.nextElementSibling;
    if (nextElem && nextElem.classList.contains("drop-target")) {
        nextElem.remove(); // remove following drop target if it exists
    }
    e.target.parentElement.remove(); // remove author row
}

const enforceUniqueValue = (e) => {
    e.target.setCustomValidity("")
    const name = e.target.getAttribute("name")
    const inputs = e.target.parentElement.parentElement.parentElement.querySelectorAll(`.list-input[name="${name}"]`);
    for (elem of inputs) {
        if (elem.value === e.target.value && elem !== e.target) {
            e.target.setCustomValidity("Value must be unique");
            e.target.reportValidity();
        }
    }
}

const addListRow = (e) => {
    const section = e.target.parentElement;
    const template = section.querySelector("template");
    const elem = document.importNode(template.content, true);
    const elemType = section.id
    window.listIDs = window.listIDs || {};
    window.listIDs[elemType] = window.listIDs[elemType] || 0;
    elem.firstElementChild.id = `${elemType}-${window.listIDs[elemType]}`;
    window.listIDs[elemType] += 1;
    addListDropEvents(elem.querySelector(".drop-target"));
    elem.firstElementChild.addEventListener("dragstart", listDragStart);
    elem.firstElementChild.addEventListener("dragend", listDragEnd);
    elem.querySelectorAll('[data-unique="true"]').forEach(uniqueElem => uniqueElem.addEventListener("blur", enforceUniqueValue))
    elem.querySelector(".list-remove").addEventListener("click", removeListRow)
    e.target.before(elem)
}

const populateSection = (sectionId, data) => {
    const section = document.getElementById(sectionId);
    const addButton = section.querySelector(".list-add");
    for (row of section.querySelectorAll(".list-row")) {
        row.querySelector(".list-remove").click();
    }
    let rowCount = 0
    data.forEach(rowData => {
        addButton.click();
        const row = section.querySelector(":nth-last-child(1 of .list-row)")
        for ([key, value] of Object.entries(rowData)) {
            row.querySelector(`[name=${key}]`).value = value;
        }
        rowCount += 1;
    })
    const minRows = parseInt(section.getAttribute("data-min-rows")) || 0;
    for (let i = 0; i < (minRows - rowCount); i++) {
        addButton.click();
    }
}

const getSectionData = (sectionId) => {
    const section = document.getElementById(sectionId);
    const data = [];
    for (row of section.querySelectorAll(".list-row")) {
        const rowData = {};
        for (input of row.querySelectorAll(".list-input")) {
            if (input.value) {
                rowData[input.getAttribute("name")] = input.value;
            }
        }
        data.push(rowData)
    }
    return data;
}

document.addEventListener('DOMContentLoaded', () => {
    for (elem of document.getElementsByClassName("list-add")) {
        elem.addEventListener("click", (e) => {
            e.preventDefault();
            addListRow(e);
        })
    }
    for (elem of document.getElementsByClassName("drop-target")) {
        addListDropEvents(elem);
    }
    for (elem of document.getElementsByClassName("list-section")) {
        const minRows = parseInt(elem.getAttribute("data-min-rows"));
        if (minRows) {
            addButton = elem.querySelector(".list-add")
            for (let i = 0; i < minRows; i++) {
                addButton.click();
            }
        }
    }
})
