const neo4j = require('neo4j-driver').v1;

// const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
// const session = driver.session();

var rawFile = new XMLHttpRequest();
var allText = ""
rawFile.open("GET", "query.txt", false);
rawFile.onreadystatechange = function ()
{
    if(rawFile.readyState === 4)
    {
    	if(rawFile.status === 200 || rawFile.status == 0)
		{
			allText = rawFile.responseText;
            console.log(allText);
		}
	}
}
rawFile.send(null);

// const resultPromise = session.run(
//   'CREATE (a:Person {name: $name}) RETURN a',
//   {name: personName}
// );

// resultPromise.then(result => {
//   session.close();

//   const singleRecord = result.records[0];
//   const node = singleRecord.get(0);

//   console.log(node.properties.name);

//   driver.close();
// });