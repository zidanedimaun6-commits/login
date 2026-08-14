// ============================
// PAGE NAVIGATION
// ============================

function showPage(pageName) {

    // Get all pages
    let pages = document.querySelectorAll(".page");

    // Hide all pages
    pages.forEach(function(page) {
        page.style.display = "none";
    });

    // Show selected page
    document.getElementById(pageName).style.display = "block";
}


// ============================
// CREATE ACCOUNT
// ============================

function register() {

    let username = document.getElementById("registerUsername").value;
    let email = document.getElementById("registerEmail").value;
    let password = document.getElementById("registerPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    let message = document.getElementById("registerMessage");


    // Check empty fields

    if (
        username === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {
        message.textContent = "Please fill in all fields.";
        return;
    }


    // Check password

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        return;
    }


    // Save account

    let account = {
        username: username,
        email: email,
        password: password
    };


    localStorage.setItem("account", JSON.stringify(account));


    message.style.color = "green";
    message.textContent = "Account created successfully!";


    // Clear fields

    document.getElementById("registerUsername").value = "";
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerPassword").value = "";
    document.getElementById("confirmPassword").value = "";


    // Go to login after 1 second

    setTimeout(function() {
        showPage("login");
    }, 1000);
}


// ============================
// LOGIN
// ============================

function login() {

    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    let message = document.getElementById("loginMessage");


    // Get saved account

    let savedAccount = localStorage.getItem("account");


    if (savedAccount === null) {

        message.textContent = "No account found. Create an account first.";

        return;
    }


    // Convert JSON back into object

    let account = JSON.parse(savedAccount);


    // Check username and password

    if (
        username === account.username &&
        password === account.password
    ) {

        // Save login status

        localStorage.setItem("loggedIn", "true");

        message.style.color = "green";
        message.textContent = "Login successful!";


        updateMenu();


        setTimeout(function() {
            showPage("home");
        }, 500);

    } else {

        message.style.color = "red";
        message.textContent = "Incorrect username or password.";
    }
}


// ============================
// LOGOUT
// ============================

function logout() {

    localStorage.removeItem("loggedIn");

    updateMenu();

    showPage("home");

    document.getElementById("welcomeText").textContent =
        "Please login to continue.";
}


// ============================
// UPDATE MENU
// ============================

function updateMenu() {

    let loggedIn = localStorage.getItem("loggedIn");

    let loginMenu = document.getElementById("loginMenu");
    let logoutMenu = document.getElementById("logoutMenu");

    let welcomeText = document.getElementById("welcomeText");


    if (loggedIn === "true") {

        loginMenu.style.display = "none";
        logoutMenu.style.display = "block";

        let account = JSON.parse(
            localStorage.getItem("account")
        );

        welcomeText.textContent =
            "Welcome, " + account.username + "!";

    } else {

        loginMenu.style.display = "block";
        logoutMenu.style.display = "none";
    }
}


// ============================
// CHECK LOGIN WHEN PAGE LOADS
// ============================

updateMenu();