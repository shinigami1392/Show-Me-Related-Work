var request = require("request");
var obj = require("../app.js")
var url = "http://localhost:8081/relations/upvote/remove"

describe("Remove upvote for a relaton", function(){
    describe("GET /", function() {	  
		
		it("returns status code 200", function(done) {
			request.get(url, function(error, response, body) {
				expect(response.statusCode).toBe(200);
				done();
			});
		});
		
		it("Sets updated flag true on success", function(done) {
			request.get(url, function(error, response, body) {				
				var parsed_body = JSON.parse(body);
				expect(parsed_body['updated']).toBe(true)						
				done();								
			});
		});		
	});
});
