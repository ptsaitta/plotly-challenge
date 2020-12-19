//load in data to use to build charts

function buildChart(sample) {
    //load in data from json file and assign vars
    d3.json("samples.json").then((data) => {
        var samples = data.samples;
        var results = samples.filter(sampleEntry => sampleEntry.id == sample);
        var result = results[0]
    }
}
