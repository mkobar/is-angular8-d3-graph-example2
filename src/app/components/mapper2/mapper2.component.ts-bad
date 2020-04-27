// V2.3 from https://stackoverflow.com/questions/47256258/collapsible-trees-in-typescript-and-d3-version-v3

import { Component, Inject, OnInit } from '@angular/core';
 import { Http } from '@angular/http';
 import {
     hierarchy,
     HierarchyNode,
     HierarchyPointNode,
     HierarchyLink,
     HierarchyPointLink,
     StratifyOperator,
     TreeLayout,
     tree,
     ClusterLayout,
     cluster
 } from 'd3-hierarchy'
 import * as d3 from 'd3';
 import { forEach } from '@angular/router/src/utils/collection';

import { Node, Link, MapTree } from '../../models'
import { MapTreeService } from '../../service/map-tree.service'
 
interface HierarchyDatum {
     name: string;
     value: number;
     r: number; // radius
     q: string; // query string
     results: boolean; // does it have results?
     children?: Array<HierarchyDatum>;
}
@Component({
    selector: "app-mapper",
    templateUrl: "mapper2.component.html",
    styleUrls: ["mapper2.component.css"],
    //providers: [],
    //encapsulation: ViewEncapsulation.None,
})
export class Mapper2Component implements OnInit {
     private margin: any = { top: 10, right: 120, bottom: 10, left: 120 };
     private width: number;
     private height: number;
     private root: HierarchyPointNode<HierarchyDatum>;
     private tree: TreeLayout<HierarchyDatum>;
     private svg: any;
     private diagonal: any;
     private g: any;
    title = 'D3 tree with Angular 8 v2.4';

  data: HierarchyDatum = {
     name: "A1",
     value: 100,
     r: 40,
     q: 'cars', // root
     results: true,
     children: [
         {
             name: "B1",
             value: 100,
	     r: 20,
	     q: 'old cars',
	     results: true,
             children: [
                 {
                     name: "C1",
		     value: 100,
		     r: 20,
		     q: 'old used cars',
	             results: false,
                     children: undefined 
                 },
                 {
                     name: "C2",
                     value: 300,
		     r: 20,
		     q: 'old used trucks',
	             results: false,
                     children: [
                         {
                             name: "D1",
                             value: 100,
			     r: 20,
			     q: 'old trucks',
	                     results: false,
                             children: undefined
                         },
                         {
                             name: "D2",
                             value: 300,
			     r: 20,
			     q: 'new trucks',
	                     results: false,
                             children: undefined
                         }
                     ] 
                 },
                 {
                     name: "C3",
                     value: 200,
		     r: 20,
		     q: 'vintage cars',
	             results: false,
                     children: undefined 
                 }
             ]
         },
         {
             name: "B2",
             value: 200,
	     r: 20,
	     q: 'cars for sale',
	     results: false,
             children: [
                 {
                     name: "C4",
                     value: 100,
		     r: 20,
		     q: 'old cars for sale',
		     results: false,
                     children: undefined 
                 },
                 {
                     name: "C5",
                     value: 300,
		     r: 20,
		     q: 'used cars for sale',
		     results: false,
                     children: undefined 
                 },
                 {
                     name: "C6",
                     value: 200,
		     r: 20,
		     q: 'new cars for sale',
		     results: false,
                     children: [
                         {
                             name: "D3",
                             value: 100,
			     r: 20,
			     q: 'cars for rent',
			     results: false,
                             children: undefined
                         },
                         {
                             name: "D4",
                             value: 300,
			     r: 20,
			     q: 'cars for lease',
			     results: false,
                             children: undefined
                         }
                     ]  
                 }
             ]
         }
     ]
 };

     constructor() {
     //this.width = 450 - this.margin.left - this.margin.right;
     //this.height = 250 - this.margin.top - this.margin.bottom;
     }

     ngOnInit() {
       /***
       this.mapTreeService.$data.subscribe(data => {
         this.data = data;
       });
       ***/

       this.initSvg();
       this.initTree();
       this.drawTree(this.root);
     }

     initSvg() {
         this.width = 720 - this.margin.right - this.margin.left;
	 this.height = 640 - this.margin.top - this.margin.bottom;

	 //this.svg = d3.select('.container').append("svg")
	 this.svg = d3.select('#tree').append('svg')
             .attr("width", this.width + this.margin.right + this.margin.left)
             .attr("height", this.height + this.margin.top + this.margin.bottom)
         //.attr('viewBox', '0 0 900 500');
         //.attr('viewBox', '0 0 '+this.width+' '+this.height);
             .append("g")
             .attr("class", "g")
             //.attr("transform", "translate(5,5)");
	     //this.g = this.svg.append('g')
	     .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

         d3.select('svg g.g')
             .append("g")
             .attr("class", "links");
         d3.select('svg g.g')
             .append("g")
	     .attr("class", "nodes");
     } // initSvg

    initTree() {
         // console.log("flare inside", this.data);
	 this.tree = tree<HierarchyDatum>();

         // console.log(this.tree)
         this.tree.size([this.height, this.width]);
	 this.root = this.tree(hierarchy<HierarchyDatum>(this.data));
         // console.log(this.root)
     } // initTree

     private drawTree(root1: HierarchyPointNode<HierarchyDatum>) {

         // console.log("root1 = ",root1)
         // console.log("root1.decendants() = ",root1.descendants())
	 // console.log("root1.links() = ",root1.links())

	 let activeQuery: any = null;
         let lastActive: any = null;
	 // render loop here
	 const render = (selection, { root1 }) => {

           // active Node
           const gNodes = d3.select('svg g.nodes')
             .selectAll('circle.node')
	     .data(root1.descendants())

           // console.log("root1.decendants() = ",root1.descendants())

	   // ENTER
	   const gEnter = gNodes.enter()
	     .append('g')

	   gEnter.append('circle')
	     //.attr('style', "fill: #6542a4;stroke: #ccc;stroke-width: 3px;")
	     .attr('style', function (d) {
	     // console.log("style d=",d)
	     if (d && d !== {}) { // because some are empty!!
	      if ((<Node>d).data.results === true) {
	    //  //compiles but wrong //if (d.results === true) {
	    //      return "fill: #6542a4;stroke: #ccc;stroke-width: 3px;";
	    //    } else {
	         return "fill: #ccc;stroke: #ccc;stroke-width: 3px;";
		  }
		 }
	       })
             .attr('cx', function (d) { return d.x; })
             .attr('cy', function (d) { return d.y; })
	     //.attr('r', 20)
	     .merge(gNodes)
	     //.attr('r', function (d) { return d.data.r} )
	     .attr('r', function (d) {
	       // console.log("d.data.r=",d.data.r);
	       return d.data.r} )
	     /***
	     .attr('r', function (d,i) {
	     if (i === activeQuery) {
	        // console.log("i=",i);
		// console.log("activeQuery=", activeQuery);
	        return 40;
		//} else {
		}
	     if (i === lastActive) {
	        // console.log("i2=",i);
	        return 20;
		}
		})
		***/
	     //.on("click", this.clickOn.bind(this));
	     .on("click", clickOn.bind(this));

	     /***
	     this.g.append('text') // center
	     .attr('class', 'name')
             .attr('x', function (d) { return d.x; })
             .attr('y', function (d) { return d.y; })
             .attr('font-size', '22px')
             .attr('text-anchor', 'middle')
             .text(d => d.data.name)
	     //.text(function(d) { return d.name })
	     ***/

	     gEnter.append('text') // center
	     .attr('class', 'query')
             .attr('x', function (d) { return d.x; })
	     //.attr('y', function (d) { return d.y-20; })
	     .attr('y', function (d) { return d.y + ( -d.data.r -20); })
             .attr('font-size', '22px')
             .attr('text-anchor', 'middle')
	     .text(d => d.data.q)

	     // UPDATE
	     //var gUpdate = gEnter.merge(gNodes);
	     /***
	     const gUpdate = gNodes
	     .attr('r', function (d) { return d.data.r} )
	     **/
	     /***
     	     .attr('r', function (d,i) {
             if (i === activeQuery) {
	        // console.log("i3=",i);
		// console.log("activeQuery3=", activeQuery);
	        return 40;
	      } else {
	        // console.log("i4=",i);
	        return 20;
		}})
		***/

	      //const gExit = this.g.exit().transition().remove()

      // Links
           d3.select('svg g.links')
             .selectAll('line.link')
             .data(root1.links())
             .enter()
             .append('line')
             .classed('link', true)
             .attr('style', "stroke: #ccc;stroke-width: 3px;")
	     .attr('x1', function (d) { return d.source.x; })
	     .attr('y1', function (d) { return d.source.y; })
	     .attr('x2', function (d) { return d.target.x; })
	     .attr('y2', function (d) { return d.target.y; });
	 } // eo render

	 const clickOn = (d, i, n) => {
	   d.data.r = 40
	   // console.log("clicked =",d.data.name)
	   // console.log("d=",d)
	   // console.log("i=",i)
	   // console.log("n=",n)
	   lastActive = activeQuery;
	   activeQuery = d;
	   d.data.results = true
	   //root1.descendants()[i].Node.data.r = 20;
	   //root1.descendants()[lastActive].data.r = 20;
	   if (lastActive != null) {
	       lastActive.data.r = 20;
	       // console.log("old-clicked =",lastActive.data.name)
	   }
	   //// console.log("old-clicked =",root1.descendants()[lastActive].data.name)
           // console.log("root1.decendants() = ",root1.descendants())
           // console.log("root1 = ",root1)
	   //render(this.svg, {this.root});
	   render(this.svg, {root1});
           //this.drawTree(this.root);
           //this.update(d);
	} // clickOn

	render(this.svg, {root1}); // first time

     } // draw tree

/*** OLD STUFF =============================================
 update(source) {
    let i = 0;
    let duration = 750;

    //let treeData = this.treeLayout(source);
    //let treeData = this.treeLayout;
    let treeData = source;
    // console.log(treeData)
    let nodes = treeData.descendants();
    // console.log(nodes)
    let links = treeData.descendants().slice(1);
    // console.log(links)

    nodes.forEach(d => d.y = d.depth * 180);

    let node = this.svg.selectAll("g.node")
        .data(nodes, d =>  d.id || (d.id = ++i) );

    let nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", d => "translate(" + source.y0 + "," + source.x0 + ")")
        .on("click", this.click.bind(this));

    nodeEnter.append("circle")
        .attr("class", "node")
        .attr("r", 1e-6)
        .style("fill", d => d._children ? "lightsteelblue" : "#fff");

    let nodeUpdate = nodeEnter.merge(node);

    //nodeUpdate.transition()
    //    .duration(duration)
    //    .attr("transform", d => "translate(" + d.y + "," + d.x + ")");

    nodeUpdate.select("circle.node")
        .attr("r", 10)
        .style("fill", d => d._children ? "lightsteelblue" : "#fff")
        .attr("cursor", "pointer");

    let nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", d => "translate(" + source.y + "," + source.x + ")")
        .remove();

    nodeExit.select("circle")
        .attr("r", 1e-6);

    nodeExit.select("text")
        .style("fill-opacity", 1e-6);

    let link = this.svg.selectAll("path.link")
        .data(links, d => d.id);

    let linkEnter = link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", d => {
            let o = { x: source.x0, y: source.y0 };
            return this.diagonal(o, o);
        });
    
    let linkUpdate = linkEnter.merge(link);

    //linkUpdate.transition()
    //    .duration(duration)
    //    .attr("d", d => {
    //        return this.diagonal(d, d.parent)
    //    });

    let linkExit = link.exit().transition()
        .duration(duration)
        .attr("d", d => {
            let o = { x: source.x, y: source.y };
            return this.diagonal(o, o);
        })
        .remove();

    nodes.forEach(d => {
        d.x0 = d.x;
        d.y0 = d.y;
    });

}

click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }

    this.update(d);
}

  initOLD() {
        
  //d3.json('../../assets/flare.json').then(data => {
  //d3.json('../../assets/flare.json').then(function(data) {

  //// console.log(data)
	//this.root = d3.hierarchy(data, (d) => d.children);
	//this.root = d3.hierarchy(data);
	//this.root2 = d3.hierarchy({
	var root3 = d3.hierarchy({
           name: "root",
           children: [
              {name: "child #1"},
              {
                  name: "child #2",
                  children: [
                     {name: "grandchild #1"},
                     {name: "grandchild #2"},
                     {name: "grandchild #3"}
                  ]
              }
	      ],
	      x0: 0,
	      y0: 0
	   });

	//this.root2 = root3
        root3.x0 = height / 2;
        root3.y0 = 0;

        let collapse = function (d) {
            if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
        }    

        root3.children.forEach(collapse);

        this.update(root3);
	//     });
	    


     this.treeLayout = d3.tree().size([height, width]);
   }

diagonal(s, d) {
    let path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path;
    }
    ***/
}

