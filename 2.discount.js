// Prompt 1: Refactoriza este código para que sea más legible y mantenga buenas prácticas.

// Prompt 2: Añade comentarios JSDoc a esta función getDiscount.

// Prompt 3: Explica esta función línea por línea como si yo fuera un desarrollador junior.
// Prompt 4: Escribe tests unitarios en Jest para esta función getDiscount.

/**
 * Calcula el precio con descuento según la membresía del usuario y el umbral de precio.
 *
 * Reglas:
 * - Si el usuario no es miembro (o no se provee), no hay descuento.
 * - Si es miembro y el precio es mayor a 100, se aplica 20% de descuento.
 * - Si es miembro y el precio es 100 o menor, se aplica 10% de descuento.
 *
 * @param {number} price - Precio original. Debe ser un número válido y no negativo.
 * @param {{ isMember?: boolean } | null | undefined} user - Objeto de usuario con flag de membresía.
 * @returns {number} Precio final tras aplicar el descuento correspondiente.
 * @throws {Error} Si price no es un número válido o es negativo.
 */
function getDiscount(price, user) {
    // Validaciones tempranas
    if (typeof price !== "number" || isNaN(price) || price < 0) {
        throw new Error("price debe ser un número válido y no negativo");
    }

    const isMember = Boolean(user && user.isMember);
    if (!isMember) return price;

    const MEMBER_HIGH_THRESHOLD = 100;
    const HIGH_DISCOUNT_RATE = 0.8; // 20% descuento
    const STANDARD_DISCOUNT_RATE = 0.9; // 10% descuento

    const rate = price > MEMBER_HIGH_THRESHOLD ? HIGH_DISCOUNT_RATE : STANDARD_DISCOUNT_RATE;
    return price * rate;
}

module.exports = { getDiscount };