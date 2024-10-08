document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = 'signin.html';
        return;
    }
    const header = document.querySelector("header");
    const response = await fetch("../utils/loggedInHeader.html");
    const content = await response.text();
    header.innerHTML = content;

    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "signin.html";
    })

    // get user infos
    try {
        const response = await fetch("/api/user", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            window.location.href = 'signin.html';
            return;
        }

        const user = await response.json();
        const commentNotificationButton = document.getElementById("comment-notification");
        commentNotificationButton.innerText = user.commentNotification ? "Deactivate comment notificatons" : "Activate comment notifications";
    } catch (error) {
        console.error(error);
    }

    const emailUpdate = document.getElementById('email-update');
    emailUpdate.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        if (!/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            const errorMessage = document.getElementById("email-error");
            errorMessage.textContent = "This email adress is invalid.";
            return;
        }

        try {
            const response = await fetch('/api/user/email', {
                method: 'PUT',
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                alert("Email updated successfully");
            } else {
                const error = await response.json();
                alert("Erreur : " + error.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }

    });

    const usernameUpdate = document.getElementById('username-update');
    usernameUpdate.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;

        try {
            const response = await fetch('/api/user/username', {
                method: 'PUT',
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            });

            if (response.ok) {
                alert("Username updated successfully");
            } else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }

    });

    const passwordUpdate = document.getElementById('password-update');
    passwordUpdate.addEventListener('submit', async (event) => {
        event.preventDefault();
        const password = document.getElementById('password').value;

        if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password)) {
            const errorMessage = document.getElementById("password-error");
            errorMessage.textContent = "Your password must contain at least 6 characters, with one alphabetical and one numerical.";
            return;
        }

        try {
            const response = await fetch('/api/user/password', {
                method: 'PUT',
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password })
            });

            if (response.ok) {
                alert("Password updated successfully");
            } else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }

    });

    const commentNotificationButton = document.getElementById("comment-notification");
    commentNotificationButton.addEventListener("click", async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("/api/user/commentnotification", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                commentNotificationButton.innerText = data.commentNotification ? "Deactivate comment notificatons" : "Activate comment notifications";
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error : ", error);
        }
    })

});