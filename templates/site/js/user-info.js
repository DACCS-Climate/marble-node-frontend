const setInputAttrs = (input, data) => {
    input.setAttribute("minlength", data.min_length)
    input.setAttribute("maxlength", data.max_length)
    {# 
        // intentionally don't implement pattern checking client side because of potential
        // for regex syntax that doesn't work for both client and server side regex libraries 
    #}
}

const createTextQuestion = (question, index, surveyForm) => {
    const template = surveyForm.querySelector("#text-question-template");
    const elem = document.importNode(template.content, true);
    const label = elem.querySelector("label")
    label.innerText = question.text;
    const textarea = elem.querySelector("textarea")
    label.setAttribute("for", `question-${index}`);
    textarea.id = `question-${index}`
    if (question.required) {
        textarea.setAttribute("required", true)
    }
    setInputAttrs(textarea, question)
    surveyForm.appendChild(elem)
}

const degeneralizeOtherSection = (otherBlock, newId) => {
    const section = otherBlock.querySelector("#PLACEHOLDER-section");
    if (section) {
        section.id = section.id = newId
    }
    for (otherElem of otherBlock.querySelectorAll("[for=PLACEHOLDER-section]")) {
        otherElem.setAttribute("for", newId);
    }
    {# 
        PLACEHOLDER could also appear in the <style> block but it shouldn't be rendered becuase data_min_rows is not set 
    #}
} 

const createChoiceQuestion = (question, index, surveyForm, response) => {
    const template = surveyForm.querySelector("#choice-question-template");
    const elem = document.importNode(template.content, true);
    const label = elem.querySelector("label")
    const fieldset = elem.querySelector("fieldset")
    const otherBlock = fieldset.querySelector(".other-option")
    const otherSectionId = `other-${index}-section`;
    degeneralizeOtherSection(otherBlock, otherSectionId);
    setInputAttrs(otherBlock.querySelector("template").content.querySelector(".list-input"), question)
    label.innerText = question.text;
    label.setAttribute("for", `question-${index}`);
    fieldset.id = `question-${index}`
    fieldset.setAttribute("data-min-choices", question.min_choices)
    fieldset.setAttribute("data-max-choices", question.max_choices)
    Object.entries(question.choices).forEach(([choice, choiceText]) => {
        const choiceInput = document.createElement("input")
        choiceInput.setAttribute("type", "checkbox")
        choiceInput.id = `choice-${index}-${choice}`
        choiceInput.setAttribute("value", choice)
        const choiceLabel = document.createElement("label")
        choiceLabel.setAttribute("for", `choice-${index}-${choice}`)
        choiceLabel.innerText = choiceText
        choiceLabel.prepend(choiceInput)
        otherBlock.before(choiceLabel)
    })
    surveyForm.appendChild(elem)
    if (! question.allow_others) {
        otherBlock.classList.add("hidden");
    }
    if (question.required) {
        label.classList.add("required");
        fieldset.setAttribute("required", true)
    }
}


const populateFormData = (json) => {
    window.__formData = json;
    document.getElementById("survey-title").innerText = json.survey.title;
    const questions = document.getElementById("questions");
    json.survey.questions.forEach((question, index) => {
        if (question.question_type === "text") {
            createTextQuestion(question, index, questions, json.response[index])
        } else {
            createChoiceQuestion(question, index, questions, json.response[index])
        }
    })
    initInputTables() {# initInputTables is defined in input-table.js #}
    json.survey.questions.forEach((question, index) => {
        if (json.response[index] === null) {
            return
        }
        if (question.question_type === "text") {
            document.getElementById(`question-${index}`).value = json.response[index];
        } else {
            json.response[index].forEach(resp => {
                const checkbox = document.querySelector(`#question-${index} [value='${resp}']`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            })
            if (question.allow_others) {
                const otherResponses = (json.response[index] || []).filter(resp => ! (resp in question.choices)).map(resp => {return {"other-value": resp} })
                if (otherResponses.length) {
                    populateSection(`other-${index}-section`, otherResponses) {# populateSection is defined in input-table.js #}
                }
            }
        }
    })
}

const loadFromAPI = async () => {
    const user = (await window.magpieSession).user.user_name;
    try {
        const params = new URLSearchParams(window.location.search)
        const surveyID = params.get("id")
        if (!surveyID) {
            throw new Error("No 'id' parameter is provided in the URL. Cannot load user info survey data.") 
        }
        const surveyResponse = await marbleAPIFetch(`/users/${user}/surveys/${surveyID}`);
        const surveyJson = await surveyResponse.json();
        if (surveyResponse.ok) {
            const responseResponse = await marbleAPIFetch(`/users/${user}/surveys/${surveyID}/response`);
            let responseJson;
            if (responseResponse.ok) {
                responseJson = (await responseResponse.json()).answers;
            } else if (responseResponse.status === 404) {
                window.__newResponse = true
                responseJson = new Array(surveyJson.questions.length).fill(null);
            }
            populateFormData({survey: surveyJson, response: responseJson});
        } else {
            document.getElementById("error-message").innerText = json.detail || "Error loading user info data";
        }
    } catch (error) {
        document.getElementById("error-message").innerText = error;
        throw error;
    }
}

const reloadFromCache = () => {
    const dataString = sessionStorage.getItem("user-info-form") || "{}";
    populateFormData(JSON.parse(dataString));
}

const refreshForm = async () => {
    sessionStorage.removeItem("user-info-form");
    for (elem of document.querySelectorAll("#questions > .form-input")) {
        elem.remove();
    }
    await loadFromAPI()
}

const getFormData = () => {
    const data = window.__formData;
    Array.from(document.getElementsByClassName("question-input")).forEach((elem, index) => {
        if (elem.tagName === "TEXTAREA" && elem.value.length > 1) {
            data.response[index] = elem.value;
        } else {
            data.response[index] = [];
            for (inp of elem.querySelectorAll("input[type=checkbox]:checked")) {
                data.response[index].push(inp.value);
            }
            for (inp of elem.querySelectorAll(".list-input:not(:placeholder-shown)")) {
                data.response[index].push(inp.value);
            } 
        }
    })
    return data;
}

const populateForm = async () => {
    document.getElementById("error-message").innerText = "";
    const [navigationEntry] = performance.getEntriesByType("navigation");
    if (navigationEntry && navigationEntry.type === "reload") {
        reloadFromCache();
    } else {
        await loadFromAPI();
    }
}

const _validateFormHelperMessage = (elem) => {
    const count =  elem.querySelectorAll("input:checked,.list-input:not(:placeholder-shown)").length;
    const required = elem.getAttribute("required")
    if (required && count === 0) {
        return "Select at least one option."
    }
    const minChoices = parseInt(elem.getAttribute("data-min-choices"))
    const maxChoices = parseInt(elem.getAttribute("data-max-choices"))
    if (count > 0) {
        if (count < minChoices) {
            return `Select at least ${minChoices} options.`
        }
        if (count > maxChoices) {
            return `Select no more than ${maxChoices} options.`
        }
    }
    return null;
}

const validateForm = () => {
    for (elem of document.querySelectorAll("#questions fieldset.question-input")) {
        let message = _validateFormHelperMessage(elem);
        if (message) {
            const inputElem = elem.querySelector("input")
            inputElem.setCustomValidity(message)
            elem.addEventListener("input", (e) => { e.currentTarget.querySelector("input").setCustomValidity("") }, {once: true})
            inputElem.reportValidity()
            return false
        }
    }
    return true
}

const submitForm = async (e) => {
    e.preventDefault()
    if (validateForm()) {
        const user = (await window.magpieSession).user.user_name;
        const params = new URLSearchParams(window.location.search)
        const surveyID = params.get("id")
        try {
            const submitResponse = await marbleAPIFetch(
                `/users/${user}/surveys/${surveyID}/response`,
                {method: (window.__newResponse ? "POST" : "PUT"), body: JSON.stringify({answers: getFormData().response})}
            );
            const json = await submitResponse.json()
            if (submitResponse.ok) {
                window.__formData.response = json.answers;
                await refreshForm()
            } else {
                document.getElementById("error-message").innerText = JSON.stringify(json.detail || '"Error submitting user info data"');
            }
        } catch (error) {
            document.getElementById("error-message").innerText = error;
            throw error;
        } 
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await populateForm()
    document.getElementById("refresh-content").addEventListener("click", refreshForm)
    document.getElementById("survey-form").addEventListener("submit", submitForm)
})

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        sessionStorage.setItem("user-info-form", JSON.stringify(getFormData()))
    }
})

{% include "partials/js/form-content.js" %}

