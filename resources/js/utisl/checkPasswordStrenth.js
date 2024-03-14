export default function checkPasswordStrength(password) {
    let strength = 0;

    // Length check
    if (password.length >= 8) strength++;

    // Variety checks
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[^a-zA-Z0-9]+/)) strength++;

    // Strength rating
    switch (strength) {
        case 0:
            return "Muy débil";
        case 1:
        case 2:
            return "Débil";
        case 3:
            return "Media";
        case 4:
        case 5:
            return "Fuerte";
    }
}
