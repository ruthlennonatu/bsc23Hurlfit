var HttpStatus = require('http-status-codes');
const Server = "http://localhost:3000"


test('should return 400 for MongoDB SQL injection attempt', async () => {
    let testID = {id:1};

    fetch(Server +"/LoginSubmit", {
      method: "POST",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(testID)
    }).then(res => {
      console.log(HttpStatus.StatusCodes.BAD_REQUEST)
      expect(res.status).toBe(HttpStatus.StatusCodes.BAD_REQUEST);
    });
});

test('checks if signup data doesnt get added to database should return 400', async() =>{
  let testUser = {
    FirstName:"test",
    LastName:"Test",
    Email:"test",
  };

  fetch(Server +"/SignupSubmit", {
    method: "POST",
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(testUser)
  }).then(res => {
    expect(res.status).toBe(HttpStatus.StatusCodes.BAD_REQUEST);
  });
});

test("See if headers are set correctly on return", async() =>{
  //need to figure out how to set security headers to test
});

test('checks if signup data gets added to database correctly', async() =>{
  let testUser = {
    FirstName:"test",
    LastName:"Test",
    Email:"test",
    Password:"test",
    Gender:"test",
    Date:"test"
  };

  fetch(Server +"/SignupSubmit", {
    method: "POST",
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(testUser)
  }).then(res => {
    expect(res.status).toBe(HttpStatus.StatusCodes.ACCEPTED);
  });
});


