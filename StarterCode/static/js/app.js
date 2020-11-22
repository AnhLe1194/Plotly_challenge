function init() {
    
    // Populate the dropdown with subject ID's from the list of sample Names
      d3.json("samples.json").then(function(data){

        // Select the dropdown element
        var dropdownMenu = d3.select("#selDataset");
        var ids = data.names
        ids.forEach(id => {
        
            var dropdownid = dropdownMenu.append('option')
            dropdownid.text(id)

        });
        
      // Use the first ID from the names to build initial plots
      const firstid = ids[0];
      updatecharts(firstid);
      updatetable(firstid);
    });
}

function updatetable(sample) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var filterArray = metadata.filter(sampleObject => sampleObject.id == sample);
        var result = filterArray[0];
        var table = d3.select("#sample-metadata");
        table.html("");
        Object.entries(result).forEach(([key, value]) => {
            var cell = table.append("h6")
            cell.text(`${key}: ${value}`)
        })
    
//  Gauge Chart 

     var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: result.wfreq,
        title: 'Belly Button Washing Frequency Scrubs per Week',
        type: "indicator",
        mode: "gauge+number"
      }
    ];
    
    var layout = { width: 500, height: 400, margin: { t: 1, b: 0 } };
    
    Plotly.newPlot("gauge", data, layout);
    });
}

function updatecharts(sample) {    
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
        y: otu_ids.slice(0,10).map(otuID => `OTU${otuID}`).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        name: "Greek",
        type: "bar",
        orientation: "h"
  };

  var data = [trace1];

  var layout = {
        title: "Top Ten OTUs for Individual " +sample,
        margin: {l: 150, r: 50, t: 50, b: 100}
  };

  Plotly.newPlot("bar", data, layout);  
  });
  
}

function optionChanged(newid) {
    updatecharts(newid);
    updatetable(newid);
}
    
init();

