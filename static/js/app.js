console.log(d3.json("samples.json"));

function unpack(rows, index) {
	return rows.map(function(row) {
		return row[index];
	});
};

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

// function pickNum() {
// 	d3.json("samples.json").then((data) => {
// 		for (var i = 0; i < 12; i++) {
// 			var name_i = data.samples[i].id
// 			var sample_values_i = data.samples[i].sample_values
// 			var otu_ids_i = data.samples[i].otu_ids
// 			var otu_labels_i = data.samples[i].otu_labels
// 			var wash_frequency_i = data.metadata[i].wfreq
// 			console.log(name_i)
// ////	})
//}
//pickNum()



function optionChanged(id) {
	d3.json("samples.json").then((data) => {
		//const result = words.filter(word => word.length > 6);
		var meta = data.metadata.filter(metadatum => metadatum.id == id)
		console.log(meta)
		init(meta)
	})
}



function init() {
	d3.json("samples.json").then((data) => {
		var name = data.samples[0].id
		var sample_values = data.samples[0].sample_values
		var otu_ids = data.samples[0].otu_ids
		var otu_labels = data.samples[0].otu_labels
		var wash_frequency = data.metadata[0].wfreq
		var sample_values_sliced = sample_values.slice(0, 10)
		var otu_ids_sliced = otu_ids.slice(0, 10)
		var otu_labels_sliced = otu_labels.slice(0, 10)
		console.log(name)
		console.log(sample_values)
		console.log(otu_ids)
		console.log(otu_labels)
		console.log(sample_values_sliced)
		console.log(otu_ids_sliced)
		console.log(otu_labels_sliced)
		for (var i=0; i < otu_ids.length; i++) {
			otu_ids[i] = "OTU " + otu_ids[i];

		}
	})
}

function BuildPlots() {
	var trace1 = {
			type: "bar",
			x: sample_values_sliced,
			y: otu_ids,
			orientation: "h",
			text: otu_labels

		}

	var data = [trace1]

	var layout = {
			title: `${name} Belly Button Data`
		}

	var CHART = d3.selectAll("#bar").node();

	Plotly.newPlot("bar", data, layout)

	var data = [{
		x: otu_ids,
		y: sample_values_sliced,
		text: otu_labels,
		mode: 'markers',
		marker: {
			size: (sample_values_sliced),
			sizeref: 2
		}
	}]	

		var layout = {
			title: `Belly Button Data ${name}`
		}

		Plotly.newPlot("bubble", data, layout)

		var data = [{
			domain: { x: [0, 1], y: [0, 1]},
			value: wash_frequency,
			type: "indicator",
			mode: "gauge+number",
			title: { text: `Wash Frequency ${name}`},
			gauge: {
				axis: { range: [null, 9] },
			}
		}]

	var layout = {
		width: 500, 
		height: 500,
	}

		Plotly.newPlot('gauge', data, layout);
		optionChanged(940)

};

// 		}

// 		var trace1 = {
// 			type: "bar",
// 			x: sample_values_sliced,
// 			y: otu_ids,
// 			orientation: "h",
// 			text: otu_labels

// 		}

// 		var data = [trace1]

// 		var layout = {
// 			title: `${name} Belly Button Data`
// 		}

// 		var CHART = d3.selectAll("#bar").node();

// 		Plotly.newPlot("bar", data, layout)

// 		var data = [{
// 			x: otu_ids,
// 			y: sample_values_sliced,
// 			text: otu_labels,
// 			mode: 'markers',
// 			marker: {
// 				size: (sample_values_sliced),
// 				sizeref: 2
// 			}
// 		}]	

// 		var layout = {
// 			title: `Belly Button Data ${name}`
// 		}

// 		Plotly.newPlot("bubble", data, layout)

// 		var data = [{
// 			domain: { x: [0, 1], y: [0, 1]},
// 			value: wash_frequency,
// 			type: "indicator",
// 			mode: "gauge+number",
// 			title: { text: `Wash Frequency ${name}`},
// 			gauge: {
// 				axis: { range: [null, 9] },
// 			}
// 		}]

// 		var layout = {
// 			width: 500, 
// 			height: 500,
// 		}

// 		Plotly.newPlot('gauge', data, layout);
// 		optionChanged(940)

// 	});
// };

init();


function displayMetadata() {
	d3.json("samples.json").then((data) => {
		optionChanged()
		var age = data.metadata[0].age
		var bbtype = data.metadata[0].bbtype
		var ethnicity = data.metadata[0].ethnicity
		var gender = data.metadata[0].gender
		var id_meta = data.metadata[0].id
		var location = data.metadata[0].location
		var wfreq = data.metadata[0].wfreq
		console.log(age)
		appendParagraph(age, bbtype, ethnicity, gender, id_meta, location, wfreq);
	});
};

displayMetadata()

function appendParagraph(age, bbtype, ethnicity, gender, id_meta, location, wfreq) {
	var table = d3.select("#paragraph1");
	var para = table.select("p");
	para.append("p").text(age)
	para.append("p").text(bbtype)

}

appendParagraph()
