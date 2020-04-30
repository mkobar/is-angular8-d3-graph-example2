import { Component, OnInit } from '@angular/core';

// declare const createGraph: any;

@Component({
  selector: 'app-horizontal-chart',
  templateUrl: 'horizontal-chart.component.html',
  styleUrls: ['./horizontal-chart.component.css']
})
export class HorizontalChartComponent implements OnInit {

  svg;
  selected;
  tempData;
  data = {
    "name": "A1 cars",
    "flag": true,
    "children": [
     {
      "name": "B1 old cars",
      "flag": false,
      "children": [
       {
        "name": "C1 old used cars",
        "flag": false,
       },
       {
        "name": "C2 old used trucks",
      "flag": false,
        "children": [
         {
           "name": "D1 old trucks", 
           "flag": false,
           "size": 3534
          },
         {
           "name": "D2 new trucks", 
           "flag": false,
           "size": 5731
          }
        ]
       },
       {
        "name": "C3 vintage cars",
        "flag": false,
       }
      ]
     },
     {
      "name": "B2 cars for sale",
      "flag": true,
      "children": [
       {
         "name": "C4 old cars for sale", 
         "flag": false,
         "size": 17010
        },
       {
         "name": "C5 used cars for sale", 
         "flag": false,
         "size": 5842
        },
       {
        "name": "C6 new cars for sale",
        "flag": false,
        "children": [
         {
           "name": "D3 cars for rent", 
           "flag": false,
           "size": 1983
          },
         {
           "name": "D4 cars for lease", 
           "flag": false,
           "size": 2047
          }
        ]
       },
       {
         "name": "C7 rental cars for sale", 
         "flag": false,
         "size": 6006
        }
      ]
     },
     {
      "name": "B3 display",
      "flag": false,
     },
     {
      "name": "B4 physics",
      "flag": false,
     }
    ]
   };

  constructor() { }

  ngOnInit() {

    // createGraph(this.data)
    var t = this
    // t.tempData = t.data
    t.tempData = Object.assign({}, t.data);
    t.drawGraph(t)

  }

  patharr = []
  finalPath = []
  selectedNode;
  
  path(obj, value){
    // console.log(obj)
    // console.log(this.patharr)

    if (this.patharr.length == 0){
      this.patharr.push('root')
    }

    if(obj.name == value){
      // console.log(name)
      // console.log(value)
      this.finalPath = [...this.patharr]
      console.log('final path', this.finalPath)
    }
    else if (obj.children){
      for (let j = 0; j < obj.children.length; j++){
        // console.log('looooop: ',j)
        if (this.patharr.length != 0){
          this.patharr.push(j)
        }
        if (this.finalPath.length == 0)
          this.path(obj.children[j], value);
      }
    }
    this.patharr.pop()

    return ;
  };

  // CLICK EVENT HERE

  nodeClickEvent(d) {
    this.selectedNode = d
    this.patharr = []
    this.finalPath = []
    // console.log(d)
    // this.tempData.children[0].children.push(
    //   {"name": "New node", "flag": true, "size": 1983}
    // )
    if (d.parent){
      this.path(this.tempData, d.name)

      console.log(this.finalPath)
      var a;
      var a1;

      a = this.tempData
      for (let i = 1; i < this.finalPath.length; i++){
        a1 = a.children[this.finalPath[i]]
        a = a1
      }
      // console.log(a)
      
      if (a.children){
        for (let i = 0; i < a.children.length; i++){
          if (a.children[i].children){
            a.children[i].children = []
          }
        }
      }
      
      a = this.tempData
      for (let i = 1; i < this.finalPath.length-1; i++){
        a1 = a.children[this.finalPath[i]]
        a = a1
      }
      // console.log(a)
      a.children = []
      a.children.push(d)

    }
  }

  drawGraph(t) {
    var DATA = t.tempData
    
    function nodeClicked(d) {
      t.nodeClickEvent(d)
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
      root.children.forEach(toggleAll);
      toggle(root.children[0]);
      toggle(root.children[0].children[1]);
      toggle(root.children[1]);
      toggle(root.children[1].children[2]);
  
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
            // if (t.selectedNode == d){
            //   d3.selectAll("line").remove()
            //   d3.selectAll("path").remove()
            //   d3.selectAll("node").remove()
              
            //   DATA = {}
            //   DATA = Object.assign({}, t.data);
            //   console.log(DATA)
            //   update(DATA, false)
            // }
            // else{
            //   nodeClicked(d)
            // }
            nodeClicked(d)
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
            // if (t.selectedNode == d){
            //   d3.selectAll("line").remove()
            //   d3.selectAll("path").remove()
            //   d3.selectAll("node").remove()
              
            //   DATA = {}
            //   DATA = Object.assign({}, t.data);
            //   console.log(DATA)
            //   update(DATA, false)
            // }
            // else{
            //   nodeClicked(d)
            // }
            nodeClicked(d)
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
            // if (selected){
            //   if (d.name == source.name){
            //     return 20
            //   }
            // }
            if (t.selected == d.name){
              return 25
            }
            return 15
          })
          .style("fill", (d) => { 
            // if (selected){
            //   if (d.name == source.name){
            //     return "purple"
            //   }
            // }
            if (t.selected == d.name){
              return "Purple"
            }
            return d._children ? "blue" : "lightsteelblue"; 
          })
          .style("stroke", (d) => {
            // if (selected){
            //   if (d.name == source.name){
            //     return "lightsteelblue"
            //   }
            // }
            if (t.selected == d.name){
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
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    }

  }
}
