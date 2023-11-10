var ROOT_PATH = 'http://192.168.8.110:5000';

var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;
fetch(ROOT_PATH+'/repo_dependencies/top_referenced_file')
    .then(response => {
        // console.log(response)
        return response.json()
    })
    .then(data => {
        // console.log(data)
        // 数据成功返回后，填充下拉框的选项
        data.forEach(option => {
            const optionElement = document.createElement('option');
            console.log(option['file_path'])
            optionElement.value = option['file_path']
            // optionElement.value = option.value;
            optionElement.text = option['file_path'];
            dropdown.appendChild(optionElement);
        });
    })
    .catch(error => {
        console.error('获取选项数据失败:', error);
    });
dropdown.addEventListener('change', function() {
    const selectedValue = dropdown.value;
    // console.log('选择的值:', selectedValue);
    myChart.hideLoading();
    let option_data
    fetch(ROOT_PATH+'/repo_dependencies/top_referenced_file_area_commit_info?value='+selectedValue, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // 根据你的需求设置头部
            // 其他头部参数
        },

    })
        .then(response => response.json())
        .then(data => {
            // option_data = data
            // console.log('-----------------------')
            // console.log(data); // 处理后端返回的数据
            // console.log('..................')
            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        label: {
                            show: true
                        }
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        magicType: { show: true, type: ['line', 'bar'] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                calculable: true,
                legend: {
                    data: ['0时区', '中国', '北美', '印度', '日韩', '欧洲', '澳洲'],
                    itemGap: 10,
                    width: '100%',
                    right: '25%'
                },
                grid: {
                    top: '12%',
                    left: '3%',
                    right: '10%',
                    width: '90%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: data['years']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'alter_file_lines',
                        // axisLabel: {
                        //     formatter: function (a) {
                        //         a = +a;
                        //         return isFinite(a) ? echarts_sample.format.addCommas(+a / 1000) : '';
                        //     }
                        // }
                    }
                ],
                dataZoom: [
                    {
                        show: true,
                        start: 94,
                        end: 100
                    },
                    {
                        type: 'inside',
                        start: 94,
                        end: 100
                    },
                    {
                        show: true,
                        yAxisIndex: 0,
                        filterMode: 'empty',
                        width: 30,
                        height: '80%',
                        showDataShadow: false,
                        left: '93%'
                    }
                ],
                series: data['series']
            };
            myChart.setOption(option);

        })
        .catch(error => {
            console.error('请求错误:', error);
        });



});
option && myChart.setOption(option);




