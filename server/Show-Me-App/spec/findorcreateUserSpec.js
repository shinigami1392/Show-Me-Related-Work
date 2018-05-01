var request = require("request");
var base_url = "http://54.201.123.246:8081/users/user";

describe(" checks the user management functionality of the application", function() {
  describe("POST /", function() {    
       	   
	    //test to check if the  API is able to fetch the user details of an existing user or not using facebook provider.
        it("fetch the user details of an existing user using facebook provider", function(done) { 
           request.post(base_url,{json:true,body:{userId:"facebook|1719071618152739", first_name:"Sachin",last_name:"Magar",email:"sac.magar@gmail.com"}},function(request, response,body){ 
               expect(response.statusCode).toBe(200);
			   expect(body.found).toBe(true);
			   expect(body.user.first_name).toBe("Sachin");
			   expect(body.user.last_name).toBe("Magar");
			   expect(body.user.email).toBe("sac.magar@gmail.com");
			   expect(body.user.userId).toBe("facebook|1719071618152739");
               done();
            });
       });

		//test to check if the  API is able to fetch the user details of an existing user or not using linkedIn provider.
        it("fetch the user details of an existing user using linkedIn provider", function(done) { 
           request.post(base_url,{json:true,body:{userId:"linkedin|M3eM6yF1Kr", first_name:"Pranjal",last_name:"Karankar",email:"pranjal_karankar@hotmail.com"}},function(request, response,body){ 
               expect(response.statusCode).toBe(200);
			   expect(body.found).toBe(true);
			   expect(body.user.first_name).toBe("Pranjal");
			   expect(body.user.last_name).toBe("Karankar");
			   expect(body.user.email).toBe("pranjal_karankar@hotmail.com");
			   expect(body.user.userId).toBe("linkedin|M3eM6yF1Kr");
               done();
            });
       });	

		//test to check if the  API is able to create a new user if the user doesn't exist in the DB and return its details
        it("create a new user and return back its details", function(done) { 
           request.post(base_url,{json:true,body:{userId:"facebook|1870629992947416", first_name:"Abhishek",last_name:"Dutta",email:"adutta14@asu.edu"}},function(request, response,body){ 
               expect(response.statusCode).toBe(200);
			   expect(body.found).toBe(true);
			   expect(body.user.first_name).toBe("Abhishek");
			   expect(body.user.last_name).toBe("Dutta");
			   expect(body.user.email).toBe("adutta14@asu.edu");
			   expect(body.user.userId).toBe("facebook|1870629992947416");
               done();
            });
       });	   
	});
});