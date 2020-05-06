function createGraph(t) {
  var DATA = Object.assign({}, t.tempData);
  // var DATA = t.tempData

  for (let i = 0; i < DATA['children'].length; i++){
    // DATA['children'][i]['children'] = []
    // console.log(DATA['children'][i])
  }
  
  function nodeClicked(d) {
    console.log(t.data)
    // t.tempData = {}
    // t.tempData = Object.assign({}, t.data);
    console.log(t.tempData)
    // t.nodeClickEvent(d)
    t.selected = d.name
    d3.selectAll("line").remove()
    d3.selectAll("path").remove()
    d3.selectAll("node").remove()
    update(d, false)
  }

  var list = []

  var allGroup = ["Line", "Diagonal"]

  // Initialize the button
  var dropdownButton = d3.select("#options")
    .append('select')

  dropdownButton // Add a button
    .selectAll('myOptions') // Next 4 lines add 6 options = 6 colors
    .data(allGroup)
    .enter()
    .append('option')
    .text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; }) // corresponding value returned by the button

  var choice = 'Line'
  // A function that update the color of the circle
  function updateChart(mycolor) {
    choice = mycolor
    d3.selectAll("line").remove()
    d3.selectAll("path").remove()
    update(d, true); 
  }

  // When the button is changed, run the updateChart function
  dropdownButton.on("change", function(d) {

    // recover the option that has been chosen
    var selectedOption = d3.select(this).property("value")

    // run the updateChart function with this selected option
    updateChart(selectedOption)
  })



  var m = [20, 120, 20, 120],
      w = 1280 - m[1] - m[3],
      h = 800 - m[0] - m[2],
      i = 0,
      root;

  var tree = d3.layout.tree()
      .size([h, w]);

  var diagonal = d3.svg.diagonal()
      .projection(function(d) { return [d.y, d.x]; });

  var vis = d3.select("#body").append("svg:svg")
      .attr("width", w + m[1] + m[3])
      .attr("height", h + m[0] + m[2])
    .append("svg:g")
      .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

  //INIT
    root = DATA;
    root.x0 = h / 2;
    root.y0 = 0;

    function toggleAll(d) {
      if (d.children) {
        d.children.forEach(toggleAll);
        toggle(d);
      }
    }

    // Initialize the display to show a few nodes.
    // root.children.forEach(toggleAll);
    console.log(root.children)
    for (let i = 0; i < root.children.length; i++){
      toggle(root.children[i])
    }
    // toggle(root.children[0]);
    // toggle(root.children[0].children[1]);
    // toggle(root.children[1]);
    // toggle(root.children[1].children[2]);

    //update(root, false);
    update(root, true);
  //END INIT

  function update(source, selected) {
    
    var duration = d3.event && d3.event.altKey ? 5000 : 500;

    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse();

    nodes.forEach(function(d) { d.y = d.depth * 350; });

    // Update the nodes…
    var node = vis.selectAll("g.node")
        .data(nodes, function(d) { 
          return d.id || (d.id = ++i);
        });

        
    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("svg:g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; });

    nodeEnter.append("svg:circle")
        .attr("r", 1e-6)
        .style("fill", function(d) { 
          return d._children ? "lightsteelblue" : "#fff"; 
        })
        .on("click", function(d) {

          d.toggle = false
          // console.log(t.selected)
          var tempPath = [...t.finalPath]
          t.patharr = []
          t.finalPath = []
          t.path(t.tempData, d.name)
          console.log("Previous path: ", tempPath)
          console.log("This node path: ", t.finalPath)
          if (t.selected){
            var match = true
            for (let i = 0; i < tempPath.length; i++){
              if (t.finalPath[i] != null){
                // console.log(tempPath[i])
                // console.log(t.finalPath[i])
                if (tempPath[i] != t.finalPath[i]){
                  match = false
                  console.log("Path matches ?: ", match)
                  break
                }
              }
            }
            console.log("previous selected node: ", t.selected)
            if (!match){
              // toggle his sibbling

              var a = t.tempData
              var a1;
              console.log(t.finalPath)
              for (let i = 1; i < t.finalPath.length; i++){
                a1 = a.children[tempPath[i]]
                a = a1
              }
              console.log("toggling this node: ", a)
              if (a.children){
                toggle(a); 
              }
              a.toggle = false
              // console.log("toggled this node: ", a)
            }
            else{

            }
          }
          t.selected = d
          // t.patharr = []
          // t.finalPath = []
          // t.path(t.tempData, t.selected.name)
          // console.log(t.finalPath)
          // nodeClicked(d)
          d3.selectAll("line").remove()
          if (d._children){
            // console.log(d._children)
            for (let i = 0; i < d._children.length; i++){
              // console.log(d._children[i])
              if (!d._children[i].toggle){
                toggle(d._children[i])
                d._children[i].toggle = true
                // console.log(d._children[i])
              }
            }
          }
          // console.log(t.finalPath.length)
          // console.log(t.tempData)
          toggle(d); 
          console.log(t.finalPath.length)
          if(t.finalPath.length <= 1){
            toggle(d);
            for (let i = 0; i < t.tempData.children.length; i++){
              console.log(t.tempData.children[i])
              if (t.tempData.children[i].children){
                toggle(t.tempData.children[i]); 

                // below line dosen't make any difference but why...???
                // t.tempData.children[i].toggle = false
              }
            }
          }
          update(d, true); 
          // if(!list.includes(d.name)){
            // d3.selectAll("line").remove()
            // toggle(d); update(d, true); 
          // }

        });

    nodeEnter.append("svg:image")
        .attr("xlink:href",  function(d) {
            if (d.flag)
              return "https://www.rawshorts.com/freeicons/wp-content/uploads/2017/01/green_webpict50_1484337222-1.png"
        })
        .attr("x", function(d) { return -13;})
        .attr("y", function(d) { return -14;})
        .attr("height", 30)
        .attr("width", 30)
        .on("click", function(d) {

          d.toggle = false
          // console.log(t.selected)
          var tempPath = [...t.finalPath]
          t.patharr = []
          t.finalPath = []
          t.path(t.tempData, d.name)
          console.log("Previous path: ", tempPath)
          console.log("This node path: ", t.finalPath)
          if (t.selected){
            var match = true
            for (let i = 0; i < tempPath.length; i++){
              if (t.finalPath[i] != null){
                // console.log(tempPath[i])
                // console.log(t.finalPath[i])
                if (tempPath[i] != t.finalPath[i]){
                  match = false
                  console.log("Path matches ?: ", match)
                  break
                }
              }
            }
            console.log("previous selected node: ", t.selected)
            if (!match){
              // toggle his sibbling

              var a = t.tempData
              var a1;
              console.log(t.finalPath)
              for (let i = 1; i < t.finalPath.length; i++){
                a1 = a.children[tempPath[i]]
                a = a1
              }
              console.log("toggling this node: ", a)
              if (a.children){
                toggle(a); 
              }
              a.toggle = false
              // console.log("toggled this node: ", a)
            }
            else{

            }
          }
          t.selected = d
          // t.patharr = []
          // t.finalPath = []
          // t.path(t.tempData, t.selected.name)
          // console.log(t.finalPath)
          // nodeClicked(d)
          d3.selectAll("line").remove()
          if (d._children){
            // console.log(d._children)
            for (let i = 0; i < d._children.length; i++){
              // console.log(d._children[i])
              if (!d._children[i].toggle){
                toggle(d._children[i])
                d._children[i].toggle = true
                // console.log(d._children[i])
              }
            }
          }
          // console.log(t.finalPath.length)
          // console.log(t.tempData)
          toggle(d); 
          console.log(t.finalPath.length)
          if(t.finalPath.length <= 1){
            toggle(d);
            for (let i = 0; i < t.tempData.children.length; i++){
              console.log(t.tempData.children[i])
              if (t.tempData.children[i].children){
                toggle(t.tempData.children[i]); 

                // below line dosen't make any difference but why...???
                // t.tempData.children[i].toggle = false
              }
            }
          }
          update(d, true); 
          // if(!list.includes(d.name)){
            // d3.selectAll("line").remove()
            // toggle(d); update(d, true); 
          // }

        });

    nodeEnter.append("svg:rect")
        .attr("x", function(d) { 
          // return d.children || d._children ? -(d.name.length * 8.99) : 10; 
          return d.children || d._children ? -(d.name.length * 12) : 16; 
        })
        .attr("y", function(d) { return d.children || d._children ? -10 : -10; })
        .attr("width", (d) => {
          return d.name.length * 10
        })
        .attr("height", 20)
        .style("fill", "#FFFF00")
        .on("click", function(d) { 
          if(list.includes(d.name))
            list.splice(list.indexOf(d.name), 1);
          else
            list.push(d.name);
        });

    nodeEnter.append("svg:text")
        .attr("x", function(d) { 
          // return d.children || d._children ? -10 : 10; 
          return d.children || d._children ? -20 : 15; 
        })
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
        .text(function(d) { return d.name; })
        .style("fill-opacity", 1e-6)
        .on("click", function(d) { 
          if(list.includes(d.name))
            list.splice(list.indexOf(d.name), 1);
          else
            list.push(d.name);
        });
        

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    nodeUpdate.select("circle")
        .attr("r", (d) => {
          if (selected){
            if (d.name == source.name){
              return 20
            }
          }
          else if (t.selected == d.name){
            return 25
          }
          return 15
        })
        .style("fill", (d) => { 
          if (selected){
            if (d.name == source.name){
              return "purple"
            }
          }
          else if (t.selected == d.name){
            return "Purple"
          }
          return d._children ? "blue" : "lightsteelblue"; 
        })
        .style("stroke", (d) => {
          if (selected){
            if (d.name == source.name){
              return "lightsteelblue"
            }
          }
          else if (t.selected == d.name){
            return "lightsteelblue"
          }
          return "blue"
        })
        .style("stroke-width", 2);

    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
        .remove();

    nodeExit.select("circle")
        .attr("r", 1e-6);

    nodeExit.select("text")
        .style("fill-opacity", 1e-6);


    // Update the links…
    var link = vis.selectAll("path.link")
        .data(tree.links(nodes), function(d) { return d.target.id; });


    if (choice === 'Diagonal')
    {
      console.log(choice)
      // Enter any new links at the parent's previous position.
      link.enter().insert("svg:path", "g")
          .attr("class", "link")
          .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
          })
        .style("fill", "none")
        .style("stroke", "#80b8ff")
        .style("stroke-width", 1.5)
        .transition()
          .duration(duration)
          .attr("d", diagonal);

      // Transition links to their new position.
      link.transition()
          .duration(duration)
          .attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
          .duration(duration)
          .attr("d", function(d) {
            var o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
          })
          .remove();
    }
    if (choice === "Line") {
      link.enter().insert("svg:line", "g")
          .attr("class", "link")
          .attr("x1", function(d) {
            return d.source.y;
          })
          .attr("y1", function(d) {
            return d.source.x;
          })
          .attr("x2", function(d) {
            return d.target.y;
          })
          .attr("y2", function(d) {
            return d.target.x;
          })
          .style("fill", "none")
          .style("stroke", "#80b8ff")
          .style("stroke-width", 1.5)

      link.transition()
          .duration(duration)
          .attr("x1", function(d) {
            return d.source.y;
          })
          .attr("y1", function(d) {
            return d.source.x;
          })
          .attr("x2", function(d) {
            return d.target.y;
          })
          .attr("y2", function(d) {
            return d.target.x;
          });

      link.exit().transition()
          .duration(duration)
          .attr("x1", function(d) {
            return d.source.y;
          })
          .attr("y1", function(d) {
            return d.source.x;
          })
          .attr("x2", function(d) {
            return d.target.y;
          })
          .attr("y2", function(d) {
            return d.target.x;
          })
          .remove();
    }

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  // Toggle children.
  function toggle(d) {
    // the following if will act as a switch, you won't be able to collapse unless you click the label
    // if (d.children && list.includes(d.name)){
    //   return
    // }
    // console.log(d)
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
  }
}
