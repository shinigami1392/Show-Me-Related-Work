var request = require("request");
var app = require("../app.js");
var base_url = "http://localhost:8081/relations/get?";

describe(" SHowMe Relations", function() {
  describe("GET /", function() {
	  
	//test to check if invalid Relation Id is properly handled by the application.
    it("returns status code 200", function(done) {
	  var relation_url = base_url + "id=678&user=user0";
      request.get(relation_url, function(error, response, body) {
        expect(response.statusCode).not.toBe(200);
        done();
      });
    });
	
	//test to check if invalid user Id is properly handled by the application.
    it("returns status code 200", function(done) {
	  var user_url = base_url + "id=13&user=user1000";
      request.get(user_url, function(error, response, body) {
        expect(response.statusCode).not.toBe(200);
        done();
      });
    });
	  
	//test to see if all relation properties can be fetched properly
    it("returns realtions based on the Relation Id", function(done) {
	  var rel_url = base_url + "id=13&user=user0";
      request.get(rel_url, function(error, response, body) {
		var body_res = JSON.parse(body);
		console.log(body_res);
		done();
      });
    });
  });
});

