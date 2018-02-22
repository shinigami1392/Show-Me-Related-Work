var request = require("request");
var obj = require("../app.js")
var base_url = "http://localhost:8081/domains/"

describe("Find list of papers for given domain", function(){
    describe("GET /", function() {	  
		
		it("returns status code 200", function(done) {			
			var url = base_url + "1";			
			request.get(url, function(error, response, body) {				
				expect(response.statusCode).toBe(200);
				done();
			});
		});
		
		it("returns all papers under that domain", function(done) {			
			var url = base_url + "1";
			request.get(url, function(error, response, body) {				
				var parsed_body = JSON.parse(body);	
				//console.log(parsed_body);				
				expect(parsed_body['total']).toEqual(parsed_body['papers'].length);		
				done();
			});
		});

	});
});
