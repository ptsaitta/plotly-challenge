//load in data to use to build charts

function buildChart(sample) {
    //load in data from json file and assign vars
    d3.json("../../samples.json").then((data) => {
        var samples = data.samples;
        var results = samples.filter(sampleEntry => sampleEntry.id == sample);
        var result = results[0];


        var sample_values = result.sample_values;
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;

        //Build bar chart

        var barChartData = [
            {   x:sample_values[0:9],
                y:otu_ids[0:9],
                type:"bar",
                orientation: "h",
            }
        ];

        var barChartStyle = {
                title: "Bar Chart Title",

        };
        
        Plotly.newPlot("bar", barChartData, barChartStyle);

        var bubbleChartData = {
                x: otu_ids,
                y: sample_values,
                mode:"markers",
            };

        var bubbleChartStyle = {

            title:"No. Bacteria Cultures per Sample"
            xaxis:{title:"OTU_ID"}
            yaxis:{title:"Number"}
            hovermode:"closest"
        }
    }   
}
