{% block content %}
// redirect to home if logged in
window.magpieSession.then(json => {
    if (json.authenticated) {
        window.location.assign("home.html")
    }
}) 
{% endblock %}