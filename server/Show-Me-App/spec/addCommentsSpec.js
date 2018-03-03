var request = require("request");
var url = "http://54.201.123.246:8081/relations/comment/add"

describe("Add comment for a relation", function(){
    describe("GET /", function() {	  
		
		it("returns status code 200 if API is reachable", function(done) {
			request.get(url, function(error, response, body) {
				expect(response.statusCode).toBe(200);
				done();
			});
		});
		
		it("Sets add flag true on successful addition of comment", function(done) {
			request.get(url, function(error, response, body) {				
				var parsed_body = JSON.parse(body);
				expect(parsed_body['added']).toBe(true);						
				done();								
			});
		});		
	});
});
