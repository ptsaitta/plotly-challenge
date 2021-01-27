//load 'metadata' data

function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var results = metadata.filter(sampleEntry => sampleEntry.id == sample);
        var result = results[0];

        //want to select <div id="sample-metadata" class="panel-body"></div>

        var resultTile = d3.select("#sample-metadata");

        //clear previous metadata text
        resultTile.html("");

        //want to append each result to something in this tile

        Object.entries(result).forEach(([key, value]) => {
            resultTile.append("h5").text(key + " : " + value);
        }
        );
});
}


//load in data to use to build charts

function buildChart(sample) {
    //load in data from json file and assign vars
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var results = samples.filter(sampleEntry => sampleEntry.id == sample);
        var result = results[0];


        var sample_values = result.sample_values;
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;

        //Build bar chart

        var barChartData = [
            {   x:sample_values.slice(0,10), //references dict items properly
                y:otu_ids.slice(0,10).map(ID => `otu_ID ${ID}`),
                text: otu_labels.slice(0,10),
                type:"bar",
                orientation: "h",
            }
        ];

        var barChartStyle = {
                title: "Bacteria Top Ten",

        };
        
        Plotly.newPlot("bar", barChartData, barChartStyle);

        //Build bubble chart
        //I was going to change the color theme, but I both like and think it's apt that theyre kinda skin tone colored
        
        var bubbleChartData = [
            {
                x: otu_ids,
                y: sample_values,
                mode:"markers",
                marker: { size: sample_values, color: otu_ids} 
            }
        ];

        var bubbleChartStyle = {

            title:"No. Bacteria Cultures per Sample",
            xaxis:{title:"OTU_ID"},
            yaxis:{title:"Number"},
            hovermode:"closest",
        };

        Plotly.newPlot("bubble", bubbleChartData, bubbleChartStyle);
    });   
}

//initialize

function init() {
//          <select id="selDataset" onchange="optionChanged(this.value)"></select>
// Need to select on this element
    var selection = d3.select("#selDataset");

    //populate select options
    d3.json("samples.json").then((data) => {
        var names = data.names;
    
        names.forEach((sample) => {
            selection.append("option").text(sample).property("value", sample);
        });


        //create initial plots with first sample
        var initialSample = names[0];
        buildMetadata(initialSample);
        buildChart(initialSample);
    });
}

//update data when new selection is made
//<select id="selDataset" onchange="optionChanged(this.value)"></select>

function optionChanged(newSelection) {
    buildChart(newSelection);
    buildMetadata(newSelection);
}

//run initialization
init();
