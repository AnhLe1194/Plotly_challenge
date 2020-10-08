function init() {
    
    // Populate the dropdown with subject ID's from the list of sample Names
      d3.json("samples.json").then((data) => {

        // Select the dropdown element
        var dropdownMenu = d3.select("#selDataset");
        var ids = data.names
        ids.forEach(id => {
        dropdownMenu.append('option').text(id)  
        });
        
      // Use the first ID from the names to build initial plots
      const firstSubject = ids[0];
      updateCharts(firstSubject);
      updateMetadata(firstSubject);
    });
}

function updateMetadata(sample) {
    d3.json("data/samples.json").then((data) => {
        var metadata = data.metadata;
        var filterArray = metadata.filter(sampleObject => sampleObject.id == sample);
        var result = filterArray[0];
        var metaPanel = d3.select("#sample-metadata");
        metaPanel.html("");
        Object.entries(result).forEach(([key, value]) => {
            metaPanel.append("h6").text(`${key.toUpperCase()}: ${value}`)
        })
    
  // Data for Gauge Chart
    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        marker: {size: 28, color:'850000'},
        value: result.wfreq,
        title: 'Belly Button Washing Frequency<br> Scrubs per Week',
        titlefont: {family: '"Palatino Linotype", "Book Antiqua", Palatino, serif'},
        type: "indicator",
        mode: "gauge+number"
      }
    ];
    // Layout for Gauge Chart
  
    var layout = {
      width: 450,
       height: 400,
       margin: { t: 25, r: 25, l: 25, b: 25 },
       line: {
       color: '600000'
       },
       paper_bgcolor: "#a5bdc6",
       font: { color: "#85541d", family: "Serif" }
     };
  
    
    Plotly.newPlot("gauge", data, layout);
  // Use `Object.entries` to add each key and value pair to the metaPanel
  // Hint: Inside the loop, you will need to use d3 to append new
  // tags for each key-value in the metadata.
    });
  }




  
  function optionChanged(newid) {
    updateCharts(newid);
    updateMetadata(newid);
    }
    
init();
 
