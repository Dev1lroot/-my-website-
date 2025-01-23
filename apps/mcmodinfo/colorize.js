function ColorizedOut(string) {
	var colors = [{id:"2",code:"00AF00"},{id:"4",code:"AF0000"},{id:"6",code:"AFAF00"},{id:"8",code:"0000AF"},{id:"e",code:"FFD800"}];
	var output = string;
	if (string.includes("&")) {
		var input = string.split("&");
		for (var i in input){
			for (var c in colors){
				if (colors[c].id == input[i].charAt(0))
				{
					output = output.replace("&"+input[i],'<span style="color:#'+colors[c].code+';">'+input[i].substring(1)+"</span>");
				}
			}
		}
	}
	return output;
}