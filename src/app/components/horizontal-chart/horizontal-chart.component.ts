import { Component, OnInit } from '@angular/core';

declare const createGraph: any;

@Component({
  selector: 'app-horizontal-chart',
  templateUrl: 'horizontal-chart.component.html',
  styleUrls: ['./horizontal-chart.component.css']
})
export class HorizontalChartComponent implements OnInit {
  svg;
  data = {
    "name": "A1 cars",
    "children": [
     {
      "name": "B1 old cars",
      "children": [
       {
        "name": "C1 old used cars",
        "children": [
         {"name": "AgglomerativeCluster", "size": 3938},
         {"name": "CommunityStructure", "size": 3812},
         {"name": "HierarchicalCluster", "size": 6714},
         {"name": "MergeEdge", "size": 743}
        ]
       },
       {
        "name": "C2 old used trucks",
        "children": [
         {"name": "D1 old trucks", "size": 3534},
         {"name": "D2 new trucks", "size": 5731},
         {"name": "SpanningTree", "size": 3416}
        ]
       },
       {
        "name": "C3 vintage cars",
        "children": [
         {"name": "AspectRatioBanker", "size": 7074}
        ]
       }
      ]
     },
     {
      "name": "B2 cars for sale",
      "children": [
       {"name": "C4 old cars for sale", "size": 17010},
       {"name": "C5 used cars for sale", "size": 5842},
       {
        "name": "C6 new cars for sale",
        "children": [
         {"name": "D3 cars for rent", "size": 1983},
         {"name": "D4 cars for lease", "size": 2047},
         {"name": "D5 ateInterpolator", "size": 1375},
         {"name": "RectangleInterpolator", "size": 2042}
        ]
       },
       {"name": "ISchedulable", "size": 1041},
       {"name": "Parallel", "size": 5176},
       {"name": "Pause", "size": 449},
       {"name": "Tween", "size": 6006}
      ]
     },
     {
      "name": "data",
      "children": [
       {
        "name": "converters",
        "children": [
         {"name": "Converters", "size": 721},
         {"name": "DelimitedTextConverter", "size": 4294},
         {"name": "JSONConverter", "size": 2220}
        ]
       },
       {"name": "DataField", "size": 1759},
       {"name": "DataTable", "size": 772},
       {"name": "DataUtil", "size": 3322}
      ]
     },
     {
      "name": "display",
      "children": [
       {"name": "DirtySprite", "size": 8833},
       {"name": "RectSprite", "size": 3623},
       {"name": "TextSprite", "size": 10066}
      ]
     },
     {
      "name": "flex",
      "children": [
       {"name": "FlareVis", "size": 4116}
      ]
     },
     {
      "name": "physics",
      "children": [
       {"name": "DragForce", "size": 1082},
       {"name": "GravityForce", "size": 1336},
       {"name": "SpringForce", "size": 1681}
      ]
     },
     {
      "name": "query",
      "children": [
       {"name": "AggregateExpression", "size": 1616},
       {"name": "Match", "size": 3748},
       {"name": "Maximum", "size": 843},
       {
        "name": "methods",
        "children": [
         {"name": "add", "size": 593},
         {"name": "variance", "size": 335},
         {"name": "where", "size": 299},
         {"name": "xor", "size": 354}
        ]
       },
       {"name": "Minimum", "size": 843},
       {"name": "Range", "size": 1594},
       {"name": "Sum", "size": 791},
       {"name": "Variance", "size": 1876},
       {"name": "Xor", "size": 1101}
      ]
     },
     {
      "name": "scale",
      "children": [
       {"name": "IScaleMap", "size": 2105},
       {"name": "LinearScale", "size": 1316},
       {"name": "TimeScale", "size": 5833}
      ]
     },
     {
      "name": "util",
      "children": [
       {"name": "Arrays", "size": 8258},
       {"name": "Filter", "size": 2324},
       {"name": "Geometry", "size": 10993},
       {
        "name": "heap",
        "children": [
         {"name": "FibonacciHeap", "size": 9354},
         {"name": "HeapNode", "size": 1233}
        ]
       },
       {"name": "IEvaluable", "size": 335},
       {"name": "IValueProxy", "size": 874},
       {
        "name": "math",
        "children": [
         {"name": "DenseMatrix", "size": 3165},
         {"name": "SparseMatrix", "size": 3366}
        ]
       },
       {"name": "Maths", "size": 17705},
       {"name": "Orientation", "size": 1486},
       {
        "name": "palette",
        "children": [
         {"name": "ColorPalette", "size": 6367},
         {"name": "SizePalette", "size": 2291}
        ]
       },
       {"name": "Property", "size": 5559},
       {"name": "Strings", "size": 22026}
      ]
     },
     {
      "name": "vis",
      "children": [
       {
        "name": "axis",
        "children": [
         {"name": "Axes", "size": 1302},
         {"name": "CartesianAxes", "size": 6703}
        ]
       },
       {
        "name": "controls",
        "children": [
         {"name": "AnchorControl", "size": 2138},
         {"name": "TooltipControl", "size": 8435}
        ]
       },
       {
        "name": "data",
        "children": [
         {"name": "Data", "size": 20544},
         {"name": "NodeSprite", "size": 19382},
         {
          "name": "render",
          "children": [
           {"name": "ArrowType", "size": 698},
           {"name": "ShapeRenderer", "size": 2247}
          ]
         },
         {"name": "ScaleBinding", "size": 11275},
         {"name": "TreeBuilder", "size": 9930}
        ]
       },
       {
        "name": "events",
        "children": [
         {"name": "DataEvent", "size": 2313},
         {"name": "VisualizationEvent", "size": 1117}
        ]
       },
       {
        "name": "legend",
        "children": [
         {"name": "Legend", "size": 20859},
         {"name": "LegendRange", "size": 10530}
        ]
       },
       {
        "name": "operator",
        "children": [
         {
          "name": "distortion",
          "children": [
           {"name": "BifocalDistortion", "size": 4461},
           {"name": "FisheyeDistortion", "size": 3444}
          ]
         },
         {
          "name": "encoder",
          "children": [
           {"name": "ColorEncoder", "size": 3179},
           {"name": "SizeEncoder", "size": 1830}
          ]
         },
         {
          "name": "filter",
          "children": [
           {"name": "FisheyeTreeFilter", "size": 5219},
           {"name": "VisibilityFilter", "size": 3509}
          ]
         },
         {"name": "IOperator", "size": 1286},
         {
          "name": "label",
          "children": [
           {"name": "Labeler", "size": 9956},
           {"name": "StackedAreaLabeler", "size": 3202}
          ]
         },
         {
          "name": "layout",
          "children": [
           {"name": "AxisLayout", "size": 6725},
           {"name": "TreeMapLayout", "size": 9191}
          ]
         },
         {"name": "Operator", "size": 2490},
         {"name": "SortOperator", "size": 2023}
        ]
       },
       {"name": "Visualization", "size": 16540}
      ]
     }
    ]
   };

  constructor() { }

  ngOnInit() {
    createGraph(this.data)
  }

}
