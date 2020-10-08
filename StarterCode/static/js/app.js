// d3.json("samples.json").then(function(data){
//     // console.log(data)
//     var dropdownMenu = d3.select("#selDataset");
//     var names = data.names
//     var samples = data.samples
//     // console.log(samples)
//     names.forEach(name => {
//     dropdownMenu.append('option').text(name)  
//     });
//     // charts(names[0])

// });

// // function optionChanged(newname) {
// //     charts(newname)
// // }

// // function charts(name) {
// //     console.log(name)
// //     d3.json("samples.json").then(function(data){
// //         var samples = data.samples
// //         console.log(samples)
// //     })
// // }

function init() {
    // Select the dropdown element
    var selector = d3.select("#selDataset");
    
    // Populate the dropdown with subject ID's from the list of sample Names
      d3.json("samples.json").then((data) => {
        var dropdownMenu = d3.select("#selDataset");
        var ids = data.names
        ids.forEach(id => {
        dropdownMenu.append('option').text(id)  
        });
        
      // Use the first ID from the names to build initial plots
        charts(ids[0])
    });

    
        function optionChanged(newid) {
        charts(newid)
        };

        function charts(id) {
        d3.json("samples.json").then(function(data){
        var samples = data.samples
        // console.log(samples)
        


        })
    };











  }
  
  
  
  
  
  // Initialize the dashboard
  init();