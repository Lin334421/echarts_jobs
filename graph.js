

var ROOT_PATH = 'http://192.168.8.110:5000';
var api_path = '/repo_dependencies/one_file_reference_graph'
var chartDom = document.getElementById('graph');
var myChart = echarts.init(chartDom);
var option;
const dropdown = document.getElementById('dropdown');
myChart.showLoading();



dropdown.addEventListener('change', function() {
    const selectedValue = dropdown.value;
    // console.log('选择的值:', selectedValue);
    // myChart.hideLoading();
    fetch(ROOT_PATH+ api_path+'?'+'file='+selectedValue, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // 根据你的需求设置头部
            // 其他头部参数
        },

    })
        .then(response => response.json())
        .then(graph => {
            myChart.hideLoading();
            console.log(graph)
            graph.nodes.forEach(function (node) {
                node.label = {
                    show: node.symbolSize > 30
                };
            });
            option = {
                title: {
                    text: '文件引用关系图',
                    subtext: 'Circular layout',
                    top: 'bottom',
                    left: 'right'
                },
                tooltip: {},
                legend: [
                    {
                        data: graph.categories.map(function (a) {
                            return a.name;
                        })
                    }
                ],
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                series: [
                    {
                        name: 'file',
                        type: 'graph',
                        layout: 'circular',
                        circular: {
                            rotateLabel: true
                        },
                        data: graph.nodes,
                        links: graph.links,
                        categories: graph.categories,
                        roam: true,
                        label: {
                            position: 'right',
                            formatter: '{b}'
                        },
                        lineStyle: {
                            color: 'source',
                            curveness: 0.3
                        }
                    }
                ]
            };
            myChart.setOption(option);

        })
        .catch(error => {
            console.error('请求错误:', error);
        });



});
option && myChart.setOption(option);
