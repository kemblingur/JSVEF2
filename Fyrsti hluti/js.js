//módel sem lýsir hvernig hver og einn köttur á að lýta út
var catModel = '<div class="catContainer"><h1 class="name"></h1><img src="" class="catImg"><div class="counter"></div></div>'

//gögn sem halda utanum kettina mína
var data = [
	{
		name: "Jón Gunnarsson",
		img: "img/unnamed.jpg",
		counter: 0
	},
	{
		name: "Gunnar Jónsson",
		img: "img/2.jpg",
		counter: 0
	},
	{
		name: "Gunnar Jónsson",
		img: "img/2.jpg",
		counter: 0
	}
];
//set gögnin úr fylkinu í skjalið þegar að það er tilbúið
jQuery(document).ready(function($) {
	render(data);
});
//render function sem býr til alla kettina sem mér vantar.
function render(data) {
	//for lykkja sem keyrir eins oft og það eru kettir til að framkalla
	for (var i = 0; i < data.length; i++) {
		//tek inn containerinn.
		var container = $("#main");
		//bæti við einu módeli í hann.
		container.append(catModel);
		//Vel neðsta módelið sem ég mun síðan vinna meira meðþ
		var currentCat = container.children("div:last-child");
		//Súper kúl jQuery onelinerar sem sjá um að setja inn nafn, mynd og teljara fyrir köttinn.
		currentCat.children(".name").text(data[i].name);
		currentCat.children(".catImg").attr('src', data[i].img);;
		currentCat.children(".counter").text(data[i].counter);
		//festir click function á myndina sem kallar í annan function
		currentCat.click(function(event) {
			//sendi í þann function hlut sem er viðeigandi counter element
			acceptClicks($(event.target).next());
		});
	}
}
//function sem tekur tölu úr elementi, hækkar hana um einn, og setur upphækkuðu töluna aftur í elementið.
function acceptClicks(element) {
	var number = element.text();
	number++;
	element.text(number);
}