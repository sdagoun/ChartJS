WAF.define('ChartJS', ['waf-core/widget'], function(widget) {

    var ChartJS = widget.create('ChartJS', {
        chartType: widget.property({
            type: 'enum',
            values: {
                pie: 'pie',
                radar: 'radar'
            },
            defaultValue: 'pie'
        }),
        items: widget.property({
            type: 'datasource',
            attributes: [{
                name: 'value'
            }, {
                name: 'label'
            }]
        }),
        verticalLines: widget.property({
            type: 'boolean',
            defaultValue: false
        }),
        horizontalLines: widget.property({
            type: 'boolean',
            defaultValue: false
        }),
        track: widget.property({
            type: 'boolean',
            defaultValue: false
        }),
        init: function() {
            var $node = this.node;
            this.render($node);

            //alert(this.chartType());
            this.chartType.onChange(function() {
                this.render($node);
            });
            this.items.onCollectionChange(function(elements) {
                if (!elements.length) return;
                if (this.chartType() == 'pie') this.updatepie($node, elements, this.verticalLines(), this.horizontalLines(), this.track());
                else this.updateradar($node, elements);
            });
        },
        render: function($node) {
            //var $node=$(this.node);
            //alert(this.chartType());
            if (this.chartType() == 'pie') {
                (function basic_pie(container) {

                    var
                    d1 = [
                        [0, 4]
                    ],
                        d2 = [
                            [0, 3]
                        ],
                        d3 = [
                            [0, 1.03]
                        ],
                        d4 = [
                            [0, 3.5]
                        ],
                        graph;

                    graph = Flotr.draw(container, [{
                        data: d1,
                        label: 'Comedy'
                    }, {
                        data: d2,
                        label: 'Action'
                    }, {
                        data: d3,
                        label: 'Romance',
                        pie: {
                            explode: 50
                        }
                    }, {
                        data: d4,
                        label: 'Drama'
                    }], {
                        HtmlText: false,
                        grid: {
                            verticalLines: false,
                            horizontalLines: false
                        },
                        xaxis: {
                            showLabels: false
                        },
                        yaxis: {
                            showLabels: false
                        },
                        pie: {
                            show: true,
                            explode: 6
                        },
                        mouse: {
                            track: true
                        },
                        legend: {
                            position: 'se',
                            backgroundColor: '#D2E8FF'
                        }
                    });
                })($node);

            }
            else {
                (function basic_radar(container) {

                    // Fill series s1 and s2.
                    var
                    s1 = {
                        label: 'Actual',
                        data: [
                            [0, 3],
                            [1, 8],
                            [2, 5],
                            [3, 5],
                            [4, 3],
                            [5, 9]
                        ]
                    },
                        s2 = {
                            label: 'Target',
                            data: [
                                [0, 8],
                                [1, 7],
                                [2, 8],
                                [3, 2],
                                [4, 4],
                                [5, 7]
                            ]
                        },
                        graph, ticks;

                    // Radar Labels
                    ticks = [
                        [0, "Statutory"],
                        [1, "External"],
                        [2, "Videos"],
                        [3, "Yippy"],
                        [4, "Management"],
                        [5, "oops"]
                    ];

                    // Draw the graph.
                    graph = Flotr.draw(container, [s1, s2], {
                        radar: {
                            show: true
                        },
                        grid: {
                            circular: true,
                            minorHorizontalLines: true
                        },
                        yaxis: {
                            min: 0,
                            max: 10,
                            minorTickFreq: 2
                        },
                        xaxis: {
                            ticks: ticks
                        },
                        mouse: {
                            track: true
                        }
                    });
                })($node);
            }
        },
        updatepie: function(container, elements, vl, hl, tr) {
            var datas = [];
            //debugger;
            var i = 0;
            while (i < elements.length) {
                datas.push({
                    data: [
                        [0, elements[i].value]
                    ],
                    label: elements[i].label
                });
                i++;
            }
            Flotr.draw(container, datas, {
                HtmlText: false,
                grid: {
                    verticalLines: vl,
                    horizontalLines: hl
                },
                xaxis: {
                    showLabels: false
                },
                yaxis: {
                    showLabels: false
                },
                pie: {
                    show: true,
                    explode: 6
                },
                mouse: {
                    track: tr
                },
                legend: {
                    position: 'se',
                    backgroundColor: '#D2E8FF'
                }
            });

        },
        updateradar: function(container, elements) {
            (function basic_radar(container) {

                // Fill series s1 and s2.
                // var
                //s1 = { label : 'Actual', data : [[0, 3], [1, 8], [2, 5], [3, 5], [4, 3], [5, 9]] },
                //s2 = { label : 'Target', data : [[0, 8], [1, 7], [2, 8], [3, 2], [4, 4], [5, 7]] },
                //graph, ticks;
                var datas = [];
                var ticks = [];
                var i = 0;
                var max = elements[0].value;
                while (i < elements.length) {
                    if (elements[i].value > max) max = elements[i].value;
                    datas.push([i, elements[i].value]);
                    ticks.push([i, elements[i].label]);
                    i++;
                }


                // Draw the graph.
                graph = Flotr.draw(container, [{
                    label: container.id,
                    data: datas
                }], {
                    radar: {
                        show: true
                    },
                    grid: {
                        circular: true,
                        minorHorizontalLines: true
                    },
                    yaxis: {
                        min: 0,
                        max: max,
                        minorTickFreq: 2
                    },
                    xaxis: {
                        ticks: ticks
                    },
                    mouse: {
                        track: true
                    }
                });
            })(container);

        }

        //        ,
        //        /* Create a property */
        //        test: widget.property({
        //            onChange: function(newValue) {
        //                this.node.innerHTML = this.test(); /* this contains the widget and newValue contains its current value */
        //            }
        //        })
    });

    //    /* Map the custom event above to the DOM click event */
    //    ChartJS.mapDomEvents({
    //        'click': 'action'
    //    });
    return ChartJS;

});

/* For more information, refer to http://doc.wakanda.org/Wakanda0.DevBranch/help/Title/en/page3871.html */