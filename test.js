var fs=require('fs');
var x= "holy fuckin shit";
var json={"fX":10, "fY":5, "tX":15, "tY":25};
console.log(json);
//console.log(JSON.stringify(json));
fs.appendFile('okay.txt', JSON.stringify(json)+"\n", function(err){
	if(err) return console.log(err);
	console.log('appended');
});
/*
fs.readFile('okay.txt', 'utf8',function(err, contents){
	console.log(contents);
});
*/
//JSON.parse(json);
x=JSON.stringify(json);
//console.log(x);

