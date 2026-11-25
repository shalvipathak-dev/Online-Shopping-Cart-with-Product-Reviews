let contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {

    // Stop page from refreshing
    event.preventDefault();

    // Get input values
    let name = document.getElementById("contactName").value.trim();
    let email = document.getElementById("contactEmail").value.trim();
    let subject = document.getElementById("contactSubject").value;
    let message = document.getElementById("contactMessage").value.trim();

    let status = document.getElementById("contactStatus");

    // Check name
    if (name.length < 3) {
        status.style.color = "#ff5555";
        status.innerText = "Please enter a valid name.";
        return;
    }

    // Check email
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        status.style.color = "#ff5555";
        status.innerText = "Please enter a valid email.";
        return;
    }

    // Check subject
    if (subject === "") {
        status.style.color = "#ff5555";
        status.innerText = "Please select a subject.";
        return;
    }

    // Check message
    if (message.length < 10) {
        status.style.color = "#ff5555";
        status.innerText = "Message must contain at least 10 characters.";
        return;
    }

    // Save demo message in localStorage
    let messages = JSON.parse(
        localStorage.getItem("contactMessages")
    ) || [];

    messages.push({
        name: name,
        email: email,
        subject: subject,
        message: message,
        date: new Date().toLocaleString()
    });

    localStorage.setItem(
        "contactMessages",
        JSON.stringify(messages)
    );

    // Success message
    status.style.color = "#25d68a";
    status.innerText = "✓ Your message has been submitted successfully!";

    // Reset form
    contactForm.reset();

});