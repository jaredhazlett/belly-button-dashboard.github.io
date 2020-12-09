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
		var changed_id = data.samples[0].id
		var sample_values = data.samples[0].sample_values
		var otu_ids = data.samples[0].otu_ids
		var otu_labels = data.samples[0].otu_labels
		var wfreq = data.metadata[0].wfreq
		var sample_values_split = sample_values.slice(0, 10).reverse()
		for (var i=0; i < otu_ids.length; i++) {
			otu_ids[i] = "OTU " + otu_ids[i];

		var trace1 = {
		type: "bar",
		x: sample_values_split,
		y: otu_ids,
		orientation: "h",
		text: otu_labels

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
			sizeref: 2
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
			}
		}]

		var layout = {
			width: 500, 
			height: 500,
	}

		Plotly.newPlot('gauge', data, layout);

	}
	})
}
init();


function optionChanged(identification) {
	d3.json("samples.json").then((data) => {
		var meta = data.metadata.filter(metadatum => metadatum.id == identification)
		var samples = data.samples.filter(sample => sample.id == identification)
		console.log(meta)
		console.log(samples)
		var changed_id = meta[0].id
		console.log(changed_id)
		var bbtype = meta[0].bbtype
		var ethnicity = meta[0].ethnicity
		var gender = meta[0].gender
		var location = meta[0].location
		var wfreq = meta[0].wfreq
		console.log(changed_id)
		console.log(gender)
		var otu_ids = samples[0].otu_ids
		var otu_labels = samples[0].otu_labels
		var sample_values = samples[0].sample_values
		var sample_values_split = sample_values.slice(0,10).reverse()
		for (var i=0; i < otu_ids.length; i++) {
			otu_ids[i] = "OTU " + otu_ids[i];

		var trace1 = {
		type: "bar",
		x: sample_values_split,
		y: otu_ids,
		orientation: "h",
		text: otu_labels

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
			sizeref: 2
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
			}
		}]

		var layout = {
			width: 500, 
			height: 500,
	}

		Plotly.newPlot('gauge', data, layout);

		//builtDemographics()

	}
	})
}


// function buildDemographics(changed_id, bbtype, ethnicity, gender, location, wfreq) {
// 	var demographicstable = d3.select("#sample-metadata")
// 	var newparagraph;
// 	for (var i = 0; i < 12; i++) {
// 		paragraph = demographicstable.append("p")
// 		paragraph.append("p").text()
// 	}
// }
