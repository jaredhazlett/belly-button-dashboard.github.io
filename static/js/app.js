console.log(d3.json("samples.json"));


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


function optionChanged(id) {
	d3.json("samples.json").then((data) => {
		var meta = data.metadata.filter(metadatum => metadatum.id == id)
		var sample = data.samples.filter(sample => sample.id == id)
		console.log(meta);
		console.log(sample);
	});
};

function initDisplay() {
	optionChangedMeta(940).then((data) => {

	})

}

function initGraphs() {
	optionChangedSample(940).then((data) => {

	})
}

function createBar() {
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
};

function createBubble() {
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
}