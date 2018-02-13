var request = require("request");
var app = require("../app.js")
var base_url = "http://localhost:8081/"

describe(" checks showME Server is running or not", function() {
  describe("GET /", function() {
	  
	//test to check the status code to 200  
    it("returns status code 200", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
	
	
	//test to see if user details are fetched or not from the mongoDB
    it("returns user details", function(done) {
	  var user_url = base_url + "users/userId/user2"
      request.get(user_url, function(error, response, body) {
		var body_res = JSON.parse(body);
		expect(body_res.found).toBe(false)
		expect(body_res.user.first_name).toBe("First4");
		expect(body_res.user.last_name).toBe("Last4");
		expect(body_res.user.email).toBe("akhairna@asu.edu");
		app.closeServer();
		done();
      });
    });
  });
});

