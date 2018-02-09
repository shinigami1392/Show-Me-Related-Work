describe("Find all domains testing", function () {

    it("Check for empty database", function () {
        if (expect(findAllDomains(1)).toBe(false)) {
            console.log("Empty database test passed");
        }
        
    });
    it("Check with Database containing values", function () {
        if (expect(findAllDomains(res)).toBe(true)) {
            console.log(res)
        }
        else {
            console.log("Test failed");
        }
    });
    it("Check for errors", function () {
        expect(findAllDomains()).toBe(false);
    });
    
});