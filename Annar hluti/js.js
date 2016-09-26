//Model sem heldur utan um allar upplýsingar í tengslum við ketti ásamt því að halda utanum hvaða kött ég er á núna.
var model = {
	currentCat:null,
	//fylki af kattahlutum sem er hægt að bæta fjölda katta takmarkaðan einungis af vinnsluminni tölvunnar.
	cats: [
		{
			name: "Jón Gunnarsson",
			img: "img/1.jpg",
			counter: 0
		},
		{
			name: "Gunnar Jónsson",
			img: "img/2.jpg",
			counter: 0
		},
		{
			name: "Hannes Guðmundsson",
			img: "img/3.jpg",
			counter: 0
		}
	],

};
//Oið í MVO sem sér um að tengja saman módelið og viewið
var octopus = {
	//init function sem sér um að velja fyrir mig fyrsta köttinn í kattarfylkinu þegar að forritið er fyrst keyrt upp
	//ásamt því kallar hann í init functionana í báðum viewunum mínum.
	init: function () {
		//Þessi lína er tæknilega séð óþarfi, en það er næs að sýna eitthvern kött default
		model.currentCat = model.cats[0];
		catListView.init();
		catView.init();
	},
	//skilar mér til baka kettinum sem ég er núna með opinn. (currentCat í módelinu)
	getCurrentCat: function () {
		return model.currentCat;
	},
	//skilar til baka öllum köttum sem eru í módelinu, þ.e. öllu fylkinu.
	getCats: function () {
		return model.cats;
	},
	//breytir gildi currentcat inni í módelinu í eitthvern hlut úr kattafylkinu.
	setCurrentCat: function (cat) {
		model.currentCat = cat;
	},
	//hækkar teljarann hjá núverandi ketti.
	incrementCounter: function () {
		model.currentCat.counter++;
		//setur á ný upplysingarnar fyrir kattaviewið á sinn stað með render fallinu í kattaviewinu.
		catView.render();
	}
}

//sjálft cattaviewið
var catView = {
	//init fall sem sér um að ná í viðeigandi element úr HTMLinu og setja eventlistener á myndina. 
	init: function() {
		//aldrei notað aftur, eiginlega óþarfi að ná í það
		this.catElement = document.getElementById("catContainer");
		//Næ í element sem geyma nafn, mynd og smellitölu kattarins.
		this.catNameElement = document.getElementById("name");
		this.catImgElement = document.getElementById("catImg");
		this.catCountElement = document.getElementById("counter");
		//hlusta eftir smellum á myndina. Þetta er hægt að gera einusinni vegna þess að ég er ekki að breyta img elementinu, heldur bara src attributeinu
		this.catImgElement.addEventListener("click", function (e) {
			octopus.incrementCounter();
		});

		this.render();
	},
	//render fall sem sér um að setja upplýsingar um valinn kött inn í HTML elementin.
	render: function () {
		var currentCat = octopus.getCurrentCat();
		this.catCountElement.textContent = currentCat.counter;
		this.catNameElement.textContent = currentCat.name;
		this.catImgElement.src = currentCat.img;
	}
}
//listaviewið sem að skiptir um kött í kattaviewinu eftir hvaða nafn ég smelli á.
var catListView = {
	//init function sem gerir voðalega lítið. Hann nær í listann og kallar śiðan á render fallið.
	init: function () {
		this.catList = document.getElementById("list");
		this.render();
	},
	//render fall
	render: function () {
		//næ í alla kettina úr módelinu með octopusinum.
		var cats = octopus.getCats();
		//tæmi listann, óþafi, sem good practice
		this.catList.innerHTML = "";
		//lykkja sem keyrir gegnum alla kettina, nær í nafnið á þeim og setur í listann
		//Gerir einnig mega kúl closuretrikk til þess að setja næs eventlistener á öll stökin í listanum.
		for (var i = 0; i < cats.length; i++) {
			//set núverandi kött í breytu
			var cat = cats[i];
			//bý til nýtt li
			var listItem = document.createElement("li");
			//set nafn kattarins í þetta li
			listItem.textContent = cat.name;
			//set function sem eventlistener á fallið sem breytir núverandi ketti skv. uppröðun hluta í fylkinu í módelinu
			//IFFY sem leysir leiðinlega vandamálið þar sem maður er ekki að vinna með núverandi hlut, heldur þann seinasta sem unnið var með
			listItem.addEventListener("click", (function(cat) {
				return function () {
					octopus.setCurrentCat(cat);
					catView.render();
				}
			})(cat));
			//set að lokum listastakið í listan.
			this.catList.appendChild(listItem);
		}
	}
}

//keyri upp allt dæmið
octopus.init();