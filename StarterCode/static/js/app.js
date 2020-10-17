function init() {
    
    // Populate the dropdown with subject ID's from the list of sample Names
      d3.json("samples.json").then(function(data){

        // Select the dropdown element
        var dropdownMenu = d3.select("#selDataset");
        var ids = data.names
        ids.forEach(id => {
        dropdownMenu.append('option').text(id)  
        });
        
      // Use the first ID from the names to build initial plots
      const firstid = ids[0];
      updateCharts(firstid);
      updateMetadata(firstid);
    });
}

function updateMetadata(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var filterArray = metadata.filter(sampleObject => sampleObject.id == sample);
        var result = filterArray[0];
        var metaPanel = d3.select("#sample-metadata");
        metaPanel.html("");
        Object.entries(result).forEach(([key, value]) => {
            metaPanel.append("h6").text(`${key}: ${value}`)
        })
    
  // Data for Gauge Chart 
    // Layout for Gauge Chart
     var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: result.wfreq,
        title: 'Belly Button Washing Frequency Scrubs per Week',
        type: "indicator",
        mode: "gauge+number"
      }
    ];
    
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    
    Plotly.newPlot("gauge", data, layout);
  // Use `Object.entries` to add each key and value pair to the metaPanel
  // Hint: Inside the loop, you will need to use d3 to append new
  // tags for each key-value in the metadata.
    });
}

function updateCharts(sample) {    
    d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var filterArray = samples.filter(sampleObject => sampleObject.id == sample);
    var result = filterArray[0];
    var sample_values = result.sample_values;
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels; 

    // Bubble Chart
    var trace1 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
        size: sample_values,
        color: otu_ids,
        colorscale:"Electric"
        }
    };

    var data = [trace1];

    var layout = {
        title: 'Bacteria Cultures per Sample',
        showlegend: false,
        hovermode: 'closest',
        xaxis: {title:"OTU (Operational Taxonomic Unit) ID " +sample},
        margin: {t:30}
    };

    Plotly.newPlot('bubble', data, layout); 

    // Bar Chart
    var trace1 = {
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        name: "Greek",
        type: "bar",
        orientation: "h"
    };


    var data = [trace1];

    var layout = {
        title: "Top Ten OTUs for Individual " +sample,
        margin: {l: 100, r: 100, t: 100, b: 100}
    };
    Plotly.newPlot("bar", data, layout);  
    });
}

function optionChanged(newid) {
    updateCharts(newid);
    updateMetadata(newid);
}
    
init();

