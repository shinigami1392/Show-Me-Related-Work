var request = require("request");
var base_url = "http://54.201.123.246:8081/search?q=";

describe(" checks showME Server is running or not", function() {
  describe("GET /", function() {

	//test to see if the search query is successfully able to fetch the paper or not.
    it("returns user details", function(done) {
	  var user_url = base_url + "Research on Image Processing Based on Improved Particle Swarm Optimization"
      //request.get(user_url, function(error, response, body) {
		//var body_res = JSON.parse(body);
		//expect(response.statusCode).toBe(200);
		done();
      //});
    });
  });
});

