describe('Unit Test cases for findUser',function(){
    
    it('check if the user exists in DB depending on the query id user1',function(){        
        if(expect(findUser("user1").found.toMatch(/true/)){
			console.log("Test Passed");
			console.log(res.user);
		}
		else {
				console.log("Test Failed!!");
		}	
    });  

	it('check if the user exists in DB depending on the query id user 2',function(){        
        if(expect(findUser("user2").found.toMatch(/true/)){
			console.log("Test Passed");
			console.log(res.user);
		}
		else {
				console.log("Test Failed!!");
		}
    }); 
	
});

