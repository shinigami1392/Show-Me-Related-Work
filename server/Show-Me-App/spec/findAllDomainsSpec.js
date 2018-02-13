var request = require("request");
var obj = require("../app.js")
var url = "http://localhost:8081/domains/all"

describe("Find All Domains Test", function(){
    describe("GET /", function() {	  

		it("returns all domains data", function(done) {
			request.get(url, function(error, response, body) {
				//console.log(JSON.parse(body));
				var parsed_body = JSON.parse(body);
				expect(body["id"]).toBe("1");
				expect(body["name"]).toBe("Domain 1");
				//console.log("after expect");
				obj.closeServer();
				done();
			});
		});

	});
});
