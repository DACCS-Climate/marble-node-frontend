const submitForm = async (e) => {
    e.preventDefault();
    e.target.querySelector("button[type=submit]").setAttribute("disabled", true)
    document.getElementById("error-message").innerText = ""
    const user = (await window.magpieSession).user.user_name;
    try {
        const response = await marbleAPIFetch(`/users/${user}/data-requests/${window.requestID}`, {
            method: window.requestID ? "PATCH" : "POST",
            body: JSON.stringify(getFormData())
        })
        const json = await response.json();
        if (response.ok) {
            window.location.href = `${window.location.origin}${window.location.pathname}?id=${json.id}`;
        } else if (json.detail) {
            const message = json.detail.map(error => {
                const loc = error.loc.slice(1).join(" -> ");
                return `${loc} : ${error.msg}`
            }).join("\n");
            document.getElementById("error-message").innerText = message;
        } else {
            document.getElementById("error-message").innerText = "Submission Error"
        }
    } catch (error) {
        document.getElementById("error-message").innerText = JSON.stringify(error);
        throw error;
    }
    e.target.querySelector("button[type=submit]").removeAttribute("disabled")
}

const getFormData = () => {
    return {
        title: document.getElementById("title").value || null,
        description: document.getElementById("description").value || null,
        contact: document.getElementById("contact").value || null,
        authors: getSectionData("author-section"), {# getSectionData is defined in input-table.js #}
        geometry: window.geometryMap.pm.getGeomanLayers(true).toGeoJSON(),
        temporal: serializeTemporal(),
        assets: Object.fromEntries(getSectionData("asset-section").map(({id, ...asset}) => [(id || ""), { ...asset, roles: asset.roles.split("\n") }])),
        links: getSectionData("link-section"),
        extra_properties: Object.fromEntries(getSectionData("properties-section").map(({key, value}) => [key, value]))     
    };
}

const populateFormData = (data) => {
    document.getElementById("title").value = data.title || "";
    document.getElementById("description").value = data.description || "";
    document.getElementById("contact").value = data.contact || "";
    populateSection("author-section", data.authors || []); {# populateSection is defined in input-table.js #}
    document.getElementById("geometry-geojson").value = data.geometry ? JSON.stringify(data.geometry, null, 4) : "";
    mapifyGeoJSON();
    const temporal = data.temporal || []
    if (temporal.length) {
        const temporalData = deserializeTemporal(temporal);
        document.getElementById("temporal")._flatpickr.setDate(temporalData.dates);
        document.getElementById("time-zone").value = temporalData.time_zone;
    } else {
        document.getElementById("temporal")._flatpickr.setDate([]);
        document.getElementById("time-zone").value = "";
    }
    populateSection("asset-section", Object.entries(data.assets || {}).map(([id, asset]) => { return {id: id, ...asset, roles: (asset.roles || []).join("\n")} }))
    populateSection("link-section", data.links || [])
    populateSection("properties-section", Object.entries(data.extra_properties || {}).map(([key, value]) => { return {key: key, value: value} }))
}

const reloadFromCache = () => {
    const dataString = sessionStorage.getItem("publish-form") || "{}";
    populateFormData(JSON.parse(dataString));
}

const loadFromAPI = async (requestID) => {
    const user = (await window.magpieSession).user.user_name;
    try {
        const response = await marbleAPIFetch(`/users/${user}/data-requests/${window.requestID}`);
        const json = await response.json();
        if (response.ok) {
            populateFormData(json);
        } else {
            document.getElementById("error-message").innerText = json.detail || "Error loading publish data";
        }
    } catch (error) {
        document.getElementById("error-message").innerText = error;
    }
}

const populateForm = async (requestID) => {
    document.getElementById("error-message").innerText = "";
    const [navigationEntry] = performance.getEntriesByType("navigation");
    if (navigationEntry && navigationEntry.type === "reload") {
        reloadFromCache();
        return;
    }
    if (requestID !== null) {
        await loadFromAPI(requestID);
    }
}

const refreshForm = async (e) => {
    sessionStorage.removeItem("publish-form");
    const params = new URLSearchParams(window.location.search);
    const requestID = params.get("id") || null;
    requestID ? await loadFromAPI(requestID) : reloadFromCache();
}

const setGeoJSON = (e) => {
    document.getElementById("geometry-geojson").value = JSON.stringify(window.geometryMap.pm.getGeomanLayers(true).toGeoJSON(), null, 4);
}

const setLayerEvents = (layer) => {
    ["pm:update", "pm:edit"].forEach((event) => layer.on(event, setGeoJSON));
    layer.on("pm:cut", (e) => setLayerEvents(e.layer)); // pm:cut creates a new layer
}

const mapifyGeoJSON = () => {
    const geoJSON = document.getElementById("geometry-geojson").value;
    if (geoJSON) {
        try {
            let originalLayers = [];
            window.geometryMap.eachLayer(layer => layer.pm ? originalLayers.push(layer): null);
            L.geoJSON(JSON.parse(geoJSON), {pmIgnore: false}).addTo(window.geometryMap);
            originalLayers.forEach(layer => layer.remove());
            window.geometryMap.pm.getGeomanLayers().forEach(layer => setLayerEvents(layer));
        } catch (error) {
            document.getElementById("error-message").innerText = error;
        }
    } else {
        window.geometryMap.eachLayer(layer => layer.pm ? layer.remove() : null);
    }
}

const prepareMap = () => {
    const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    window.geometryMap = new L.Map("geometry-map", {layers: [tileLayer], center: [0, 0], zoom: 3});
    window.geometryMap.pm.addControls({
        position: "topleft",
        drawCircleMarker: false,
        drawCircle: false,
        drawText: false,
    });
    window.geometryMap.pm.Toolbar.createCustomControl({
        name: "GeoJSON",
        title: "GeoJSON",
        disableOtherButtons: true,
        className: "geojson-icon",
        onClick: () => document.getElementById("geometry-input").classList.toggle("show-geojson")
    });
    window.geometryMap.on("pm:create", (e) => {
        setGeoJSON(e);
        setLayerEvents(e.layer);
    });
    window.geometryMap.on("pm:remove", setGeoJSON);
    mapifyGeoJSON();
    document.getElementById("geometry-geojson").addEventListener("blur", mapifyGeoJSON)
    const resizeObserver = new ResizeObserver(() => window.geometryMap.invalidateSize());
    resizeObserver.observe(window.geometryMap.getContainer());
}

const prepareTemporal = () => {
    flatpickr("#temporal", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        mode: "range",
        utc: true,
        time_24h: true,
        allowInput: true
    })
}

const serializeTemporal = () => {
    const tzOffset = document.getElementById("time-zone").value
    return document.getElementById("temporal")._flatpickr.selectedDates.map(date => {
        return new Date(date - date.getTimezoneOffset() * 60000).toISOString().replace(/Z$/, tzOffset) 
    })
}

const deserializeTemporal = (dates) => {
    const offsetRegex = /[+-]\d{2}:\d{2}$/;
    return {
        dates: dates.map(dateStr => new Date(dateStr.replace(offsetRegex, ""))), 
        time_zone: dates[0].match(offsetRegex)[0]
    }
}

const prepareForm = () => {
    prepareMap();
    prepareTemporal();
    document.forms[0].addEventListener("submit", submitForm);
}

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const page = document.getElementById("publish-panel");
    prepareForm();
    window.requestID = params.get("id") || "";
    if (params.get("id")) {
        page.setAttribute("data-form", "edit");
    } else {
        page.setAttribute("data-form", "new");
    }
    await populateForm(params.get("id"))
    document.getElementById("menu-publish-request").classList.add("highlight");
    document.getElementById("refresh-content").addEventListener("click", refreshForm)
})

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        sessionStorage.setItem("publish-form", JSON.stringify(getFormData()))
    }
})

{% include "partials/js/form-content.js" %}
