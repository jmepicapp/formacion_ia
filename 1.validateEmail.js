// Prompt: Escribe una función en JavaScript que valide emails usando una expresión regular simple.
const validateEmail = (email) => {
    // Expresión regular simple: parte local, @, dominio y TLD de al menos 2 letras
    const re = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
    return re.test(String(email).trim());
}

// JavaScript
console.log(validateEmail("usuario.ejemplo@dominio.com")); // true
console.log(validateEmail("usuario@dominio")); // false