// d3.json("samples.json").then(function(data){
//     // console.log(data)
//     var dropdownMenu = d3.select("#selDataset");
//     var names = data.names
//     // console.log(samples)
//     names.forEach(name => {
//     dropdownMenu.append('option').text(name)  
//     });
//     charts(names[0])

// });

// function optionChanged(newname) {
//     charts(newname)
// }

// function charts(name) {
//     console.log(name)
//     d3.json("samples.json").then(function(data){
//         var samples = data.samples
//         console.log(samples)
//     })
// }

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

init();
 
