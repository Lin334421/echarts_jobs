

var ROOT_PATH = 'http://192.168.8.110:5000';

var chartDom = document.getElementById('referenced_relation');
var myChart = echarts.init(chartDom);
var option;

myChart.showLoading();
$.getJSON(ROOT_PATH + '/repo_dependencies/repo_dependencies_top_n', function (graph) {
    // console.log(graph)
    myChart.hideLoading();
    // console.log(graph)
    graph.nodes.forEach(function (node) {
        var position
        if(node.size<=9 && node.size>=4){
            position = 'bottom'
        }else if(node.size<4){
            position = 'right'
        }else{
            position = 'left'
        }
        node.label = {
            show: node.symbolSize >= graph.top_n,
            position: position
        };
    });
    option = {
        title: {
            text: 'repo引用关系',
            subtext: 'Circular layout',
            top: 'bottom',
            left: 'middle'
        },
        tooltip: {},
        legend: [
            // {
            //     data: graph.categories.map(function (a) {
            //         return a.name;
            //     })
            // }
        ],
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                focusNodeAdjacency:true,
                name: 'repo',
                type: 'graph',
                layout: 'circular',
                itemStyle:{
                    // color:'#FFA500',
                    borderWidth:1,
                    // borderColor:'#FF8C00'
                },
                circular: {
                    rotateLabel: false
                },
                data: graph.nodes,
                links: graph.links,
                categories: graph.categories,
                roam: true,
                label: {
                    position: 'right',
                    formatter: '{b}\n被引用:{c}',
                    show: true,
                    fontSize:8,
                    color: '#000000',
                    fontFamily:'Microsoft YaHei'
                },
                lineStyle: {
                    color: '#F5DEB3',
                    curveness: 0.3
                }
            }
        ]
    };
    // console.log(option)
    myChart.setOption(option);
    myChart.hideLoading();
    // graph.nodes.forEach(function (node) {
    //     node.symbolSize = 5;
    // });
    // option = {
    //     title: {
    //         text: 'Les Miserables',
    //         subtext: 'Default layout',
    //         top: 'bottom',
    //         left: 'right'
    //     },
    //     animationDurationUpdate: 15,
    //     tooltip: {},
    //     legend: [
    //         {
    //             // selectedMode: 'single',
    //             data: graph.categories.map(function (a) {
    //                 return a.name;
    //             })
    //         }
    //     ],
    //     series: [
    //         {
    //             focusNodeAdjacency:true,
    //             name: 'Les Miserables',
    //             type: 'graph',
    //             layout: 'force',
    //             data: graph.nodes,
    //             links: graph.links,
    //             categories: graph.categories,
    //             roam: true,
    //             label: {
    //                 position: 'right'
    //             },
    //             force: {
    //                 repulsion: 400,
    //                 edgeLength:100
    //             },
    //             edgeSymbol:['circle', 'arrow'],
    //             edgeSymbolSize:5,
    //             // symbolOffset:[15,0]
    //             // lineStyle:{
    //             //
    //             // }
    //
    //
    //         }
    //     ]
    // };
    // myChart.setOption(option);
});

option && myChart.setOption(option);
