import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import * as d3 from "d3";
import { HierarchyPointNode } from "d3";

export const margin = { top: 20, right: 120, bottom: 20, left: 120 };
export const width = 960 - margin.right - margin.left;
export const height = 800 - margin.top - margin.bottom;

@Component({
    selector: "mapper",
    template: "<svg></svg>",
    styleUrls: ["mapper.component.css"],
    providers: [],
    encapsulation: ViewEncapsulation.None,
})
export class MapperComponent implements OnInit {
    private svg;
    private treeLayout;
    private root;

    ngOnInit() {
        d3.json("../../assets/flare.json").then(data => {

            this.root = d3.hierarchy(data, (d) => d.children);
            this.root.x0 = height / 2;
            this.root.y0 = 0;

            let collapse = function (d) {
                if (d.children) {
                    d._children = d.children;
                    d._children.forEach(collapse);
                    d.children = null;
                }
            }    

            this.root.children.forEach(collapse);

            this.update(this.root);
        });

        this.svg = d3.select("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top                     + ")");

    this.treeLayout = d3.tree().size([height, width]);

}

update(source) {
    let i = 0;
    let duration = 750;

    let treeData = this.treeLayout(this.root);
    let nodes = treeData.descendants();
    let links = treeData.descendants().slice(1);

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

    nodeUpdate.transition()
        .duration(duration)
        .attr("transform", d => "translate(" + d.y + "," + d.x + ")");

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

    linkUpdate.transition()
        .duration(duration)
        .attr("d", d => {
            return this.diagonal(d, d.parent)
        });

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

diagonal(s, d) {
    let path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path;
    }
}

