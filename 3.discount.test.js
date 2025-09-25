// Tests de Jest para getDiscount

// Importación: si estás usando CommonJS, descomenta la siguiente línea y exporta la función en 2.discount.js con module.exports = { getDiscount };
// const { getDiscount } = require("./2.discount");

// Para este entorno, definimos una copia local (ajusta según tu sistema de módulos)
function getDiscount(price, user) {
    if (typeof price !== "number" || isNaN(price) || price < 0) {
        throw new Error("price debe ser un número válido y no negativo");
    }
    const isMember = Boolean(user && user.isMember);
    if (!isMember) return price;

    const MEMBER_HIGH_THRESHOLD = 100;
    const HIGH_DISCOUNT_RATE = 0.8; // 20%
    const STANDARD_DISCOUNT_RATE = 0.9; // 10%

    const rate = price > MEMBER_HIGH_THRESHOLD ? HIGH_DISCOUNT_RATE : STANDARD_DISCOUNT_RATE;
    return price * rate;
}

describe("getDiscount", () => {
    describe("validaciones de entrada", () => {
        test("lanza error si price no es número", () => {
            expect(() => getDiscount("100", { isMember: true })).toThrow(
                "price debe ser un número válido y no negativo"
            );
        });

        test("lanza error si price es NaN", () => {
            expect(() => getDiscount(NaN, { isMember: true })).toThrow(
                "price debe ser un número válido y no negativo"
            );
        });

        test("lanza error si price es negativo", () => {
            expect(() => getDiscount(-1, { isMember: true })).toThrow(
                "price debe ser un número válido y no negativo"
            );
        });
    });

    describe("usuario no miembro o no provisto", () => {
        test("sin usuario: retorna el mismo precio", () => {
            expect(getDiscount(50)).toBe(50);
        });

        test("usuario sin membresía: retorna el mismo precio", () => {
            expect(getDiscount(50, { isMember: false })).toBe(50);
        });

        test("usuario objeto vacío: retorna el mismo precio", () => {
            expect(getDiscount(50, {})).toBe(50);
        });
    });

    describe("usuario miembro", () => {
        test("precio mayor a 100 aplica 20% de descuento", () => {
            expect(getDiscount(150, { isMember: true })).toBe(120); // 150 * 0.8
        });

        test("precio exactamente 100 aplica 10% de descuento", () => {
            expect(getDiscount(100, { isMember: true })).toBe(90); // 100 * 0.9
        });

        test("precio menor o igual a 100 aplica 10% de descuento", () => {
            expect(getDiscount(80, { isMember: true })).toBe(72); // 80 * 0.9
        });

        test("funciona con valores decimales", () => {
            expect(getDiscount(199.99, { isMember: true })).toBeCloseTo(159.992, 5);
            expect(getDiscount(99.99, { isMember: true })).toBeCloseTo(89.991, 5);
        });
    });
});