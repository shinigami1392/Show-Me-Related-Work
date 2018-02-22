var request = require("request");
var obj = require("../app.js")
var url = "http://localhost:8081/domains/all"

describe("Find All Domains Test", function(){
    describe("GET /", function() {	  
		
		it("returns status code 200", function(done) {
			request.get(url, function(error, response, body) {
				expect(response.statusCode).toBe(200);
				done();
			});
		});
		
		it("returns all domains data", function(done) {
			request.get(url, function(error, response, body) {
				
				var parsed_body = JSON.parse(body);
				expect(parsed_body['found']).toBe(true);				
				var domains = parsed_body['domains'];
				expect(domains.length).toEqual(23);			
				
				//obj.closeServer();
				done();
			});
		});

	});
});
