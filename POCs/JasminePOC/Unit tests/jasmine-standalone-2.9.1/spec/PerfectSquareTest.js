describe("Perfect Square Tests", function () {

    it("Check for 4", function () {
        expect(isPerfectSquare(4)).toBe(true);
    });
    it("Check for 5", function () {
        expect(isPerfectSquare(5)).toBe(false);
    });
    it("check for negative number", function () {
        expect(isPerfectSquare(-1)).toBe(false);
    });
    
});