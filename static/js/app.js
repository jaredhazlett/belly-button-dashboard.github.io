console.log(d3.json("samples.json"));

var para = d3.select("#paragraph1")

function inputDropDown() {
	d3.json("samples.json").then((data) => {
	var select = document.getElementById("selDataset");
	var options = data.names;
		for (var i = 0; i < options.length; i++) {
			var opt = options[i];
			var el = document.createElement("option");
			el.textContent = opt;
			el.value = opt;
			select.appendChild(el);
		};
	});
};

inputDropDown()

function init() {
	d3.json("samples.json").then((data) => {
		var metadatas = data.metadata[0]
		console.log(metadatas)
		var changed_id = data.samples[0].id
		var sample_values = data.samples[0].sample_values
		var otu_ids = data.samples[0].otu_ids.slice(0,10).reverse()
		var otu_labels = data.samples[0].otu_labels
		var wfreq = data.metadata[0].wfreq
		var sample_values_split = sample_values.slice(0, 10).reverse()
		for (var i=0; i < otu_ids.length; i++) {
			otu_ids[i] = "OTU " + otu_ids[i];}


		d3.select("div").select("#sample-metadata")
		.selectAll("p")
    	.data([metadatas])
    	.enter()
    	.append("p")
    	.html(function(d) {
      		return `<p>${d.age}</p><p>${d.bbtype}</p><p>${d.ethnicity}</p><p>${d.gender}</p><p>${d.id}</p><p>${d.location}</p><p>${wfreq}</p>`
    	})


		var trace1 = {
		type: "bar",
		x: sample_values_split,
		y: otu_ids,
		orientation: "h",
		text: otu_labels,
		marker: {
			color: 'darkorange'
		}

		}

		var data = [trace1]

		var layout = {
			title: `${changed_id} Belly Button Data`
		}

		var CHART = d3.selectAll("#bar").node();

		Plotly.newPlot("bar", data, layout)

		var data = [{
		x: otu_ids,
		y: sample_values_split,
		text: otu_labels,
		mode: 'markers',
		marker: {
			size: (sample_values_split),
			sizeref: 2,
			color: [4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048],
			showscale: false
		}
	}]	

		var layout = {
			title: `Belly Button Data ${changed_id}`
	}

		Plotly.newPlot("bubble", data, layout)

		var data = [{
			domain: { x: [0, 1], y: [0, 1]},
			value: wfreq,
			type: "indicator",
			mode: "gauge+number",
			title: { text: `Wash Frequency ${changed_id}`},
			gauge: {
				axis: { range: [null, 9] },
				bar: {'color': "black"},
				bordercolor: "gray",
				steps: [
					{'range': [0,3], 'color': 'red'},
					{'range': [3,6], 'color': 'yellow'},
					{'range': [6,9], 'color': 'green'}
				]
			}
		}]

		var layout = {
			width: 400, 
			height: 400,
	}

		Plotly.newPlot('gauge', data, layout);

	})


}

init();


// var austinWeather = [{
//   date: "2018-02-01",
//   low: 51,
//   high: 76
// },
// {
//   date: "2018-02-02",
//   low: 47,
//   high: 59
// },
// {
//   date: "2018-02-03",
//   low: 44,
//   high: 59
// },
// {
//   date: "2018-02-04",
//   low: 52,
//   high: 73
// },
// {
//   date: "2018-02-05",
//   low: 47,
//   high: 71
// }
// ];

//   d3.select("ul")
//     .selectAll("li")
//     .data(austinWeather)
//     .enter()
//     .append("li")
//     .html(function(d) {
//       return `<li>${d.date}</li><li>${d.low}</li><li>${d.high}</li>`
//     })


function optionChanged(identification) {
	d3.json("samples.json").then((data) => {
		var meta = data.metadata.filter(metadatum => metadatum.id == identification)
		var samples = data.samples.filter(sample => sample.id == identification)
		console.log(meta)
		console.log(samples)
		var metaDemo = meta[0]
		var changed_id = meta[0].id
		console.log(changed_id)
		var bbtype = meta[0].bbtype
		var ethnicity = meta[0].ethnicity
		var gender = meta[0].gender
		var location = meta[0].location
		var wfreq = meta[0].wfreq
		console.log(changed_id)
		console.log(gender)
		var otu_ids = samples[0].otu_ids.slice(0,10).reverse()
		var otu_labels = samples[0].otu_labels
		var sample_values = samples[0].sample_values
		var sample_values_split = sample_values.slice(0,10).reverse()
		for (var i=0; i < otu_ids.length; i++) {
			otu_ids[i] = "OTU " + otu_ids[i];


		var selection = d3.select("div").select("#sample-metadata")
		.selectAll("p").data([metaDemo])

    	selection.enter()
    		.append("p")
    		.merge(selection)
    		.html(function(d) {
      		return `<p>${d.age}</p><p>${d.bbtype}</p><p>${d.ethnicity}</p><p>${d.gender}</p><p>${d.id}</p><p>${d.location}</p><p>${wfreq}</p>`
    	})

		var trace1 = {
		type: "bar",
		x: sample_values_split,
		y: otu_ids,
		orientation: "h",
		text: otu_labels,
		marker: {
			color: 'darkorange'
		}

		}

		var data = [trace1]

		var layout = {
			title: `${changed_id} Belly Button Data`
		}

		var CHART = d3.selectAll("#bar").node();

		Plotly.newPlot("bar", data, layout)

		data = [{
		x: otu_ids,
		y: sample_values_split,
		text: otu_labels,
		mode: 'markers',
		marker: {
			size: (sample_values_split),
			sizeref: 2,
			color: [4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048],
			showscale: false
		}
		}]

		var layout = {
			title: `Belly Button Data ${changed_id}`
	}

		Plotly.newPlot("bubble", data, layout)

		var data = [{
			domain: { x: [0, 1], y: [0, 1]},
			value: wfreq,
			type: "indicator",
			mode: "gauge+number",
			title: { text: `Wash Frequency ${changed_id}`},
			gauge: {
				axis: { range: [null, 9] },
				bar: {'color': "black"},
				bordercolor: "gray",
				steps: [
					{'range': [0,3], 'color': 'red'},
					{'range': [3,6], 'color': 'yellow'},
					{'range': [6,9], 'color': 'green'}
				]
			}
		}]

		var layout = {
			width: 400, 
			height: 400,
	}

		Plotly.newPlot('gauge', data, layout);



		
	}
	})
}


// d3.json("samples.json").then((data) => {
// 	var metadatas = data.metadata[0]
// })

// d3.select("ul")
//   .selectAll("li")
//   .data(metadatas)
//   .enter()
//   .append("li")
//   .html(function(d) {
//   return `<li>$${d.age}</li><li>${d.bbtype}</li><li>${d.ethnicity}</li><li>${d.gender}</li><li>${d.id}</li><li>${d.location}</li><li>${d.wfreq}</li>`
//   })



// function buildDemographics(changed_id, bbtype, ethnicity, gender, location, wfreq) {
// 	var demographicstable = d3.select("#sample-metadata")
// 	var newparagraph;
// 	for (var i = 0; i < 12; i++) {
// 		paragraph = demographicstable.append("p")
// 		paragraph.append("p").text()
// 	}
// }
