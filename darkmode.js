let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

// Enable dark mode by adding the class and updating localStorage
const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

// Disable dark mode by removing the class and updating localStorage
const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.removeItem('darkmode', null) // Use removeItem for clarity
}

// Apply dark mode on page load if it was active
if (darkmode === "active") {
    enableDarkmode()
}

// Add event listener to toggle dark mode
if (themeSwitch) { // Ensure themeSwitch exists
    themeSwitch.addEventListener("click", () => {
        darkmode = localStorage.getItem('darkmode')
        darkmode !== "active" ? enableDarkmode() : disableDarkmode()
    })
}