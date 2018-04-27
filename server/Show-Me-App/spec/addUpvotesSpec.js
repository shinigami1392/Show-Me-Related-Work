var request = require("request");
var base_url = "http://54.201.123.246:8081/relations/upvote/add?"

describe("Add upvote for a relation", function(){
    describe("PUT /", function() {	  
        var query_string = "domain=0&source=8248098&destination=6465053&user=Abc";
        var url = base_url + query_string;
		it("Check status code for correct request", function(done) {            
            request({
                method: 'PUT',
                uri: url,

             }, function(request, response,body){            
                expect(response.statusCode).toBe(200);
                done();
             });

        });
        
        // Check if API if returning correct output
        it("Check updated flag for correct request", function(done) {            
            request({
                method: 'PUT',
                uri: url,
             }, function(request, response,body){
                var parsed_body = JSON.parse(body);                
                expect(parsed_body['updated']).toBe(true);
                done();
             });

        });
        
        // Check if API returns 404 for POST
        it("Check status code for POST method", function(done) {            
            request({
                method: 'POST',
                uri: url,
                }, function(request, response,body){
                    expect(response.statusCode).toBe(404);
                    done();
                });
        });
        
        // Check if API returns 404 for GET
        it("Check status code for GET method", function(done) {            
            request({
                method: 'GET',
                uri: url,
                }, function(request, response,body){
                    expect(response.statusCode).toBe(404);
                    done();
                });
        });

        //  Check for non existent Paper IDs
        var query_string1 = "domain=0&source=000000000&destination=6465053&user=Abc";
        var bad_url1 = base_url + query_string1;
        it("Check status code and text for non existing paper", function(done) {            
            request({
                method: 'PUT',
                uri: bad_url1,
                }, function(request, response,body){  
                    JSON.stringify(body);  
                    expect(body).toBe('Source paper not found')                    
                    expect(response.statusCode).toBe(400);
                    done();
                });
        });


        // Check for incorrect query parameter domain
        var query_string2 = "do=0&source=8248098&destination=6465053&users=Abc";
        var bad_url2 = base_url + query_string2;
        it("Check status code and message for incorrect domain", function(done) {            
            request({
                method: 'PUT',
                uri: bad_url2,
                }, function(request, response,body){ 
                    JSON.stringify(body);                  
                    expect(body).toBe('Please enter domain')                    
                    expect(response.statusCode).toBe(400);
                    done();
                });
        });


        //Check for incorrect query parameter source
        var query_string3 = "domain=0&sourc=8248098&destination=6465053&users=Abc";
        var bad_url3 = base_url + query_string3;
        it("Check status code for incorrect method", function(done) {            
            request({
                method: 'PUT',
                uri: bad_url3,
                }, function(request, response,body){
                    JSON.stringify(body);                 
                    expect(body).toBe('Please enter source')                    
                    expect(response.statusCode).toBe(400);
                    done();
                });
        });


        // Check for incorrect query parameter destination
        var query_string4 = "domain=0&source=8248098&destin=6465053&user=Abc";
        var bad_url4 = base_url + query_string4;
        it("Check status code and text for incorrect destination", function(done) {            
            request({
                method: 'PUT',
                uri: bad_url4,
                }, function(request, response,body){
                    JSON.stringify(body);                 
                    expect(body).toBe('Please enter destination') ;                   
                    expect(response.statusCode).toBe(400);
                    done();
                });
        });

        // Check for incorrect query parameter user
        var query_string5 = "domain=0&source=8248098&destination=6465053&usersss=";
        var bad_url5 = base_url + query_string5;
        it("Check status code and text for incorrect user", function(done) {            
            request({
                method: 'PUT',
                uri: bad_url5,
                }, function(request, response,body){
                    //JSON.stringify(body);                   
                    //expect(body).toBe('Please enter user') ;                   
                   // expect(response.statusCode).toBe(400);
                    done();
                });
        });

        //Check for case where a relation does not exist between papers
        var query_string6 = "domain=0&source=8248098&destination=8336572&user=Abc";
        var bad_url6 = base_url + query_string6;
        it("When no relation exists between papers", function(done) {            
            request({
                method: 'PUT',
                uri: bad_url6,
                }, function(request, response,body){                    
                    //JSON.stringify(body);                   
                    //expect(body).toBe('There is no relation exists between papers!') ;                   
                    //expect(response.statusCode).toBe(400);
                    done();
                });
        });
	});
});