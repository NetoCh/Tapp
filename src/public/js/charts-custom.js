function Charts() {
    this.init = function () {
        $(document).ready(()=>{
                    var violet = '#DF99CA',
                    red    = '#F0404C',
                    green  = '#7CF29C';

                    $.get("/api/admin/getDatos", {}, function (response) {
                        if(response.success){
                            /*  Cargar gráficas s todos los datos llegan    */
                                     // ------------------------------------------------------- //
                                    // Charts Gradients
                                    // ------------------------------------------------------ //
                                    var ctx1 = $("canvas").get(0).getContext("2d");
                                    var gradient1 = ctx1.createLinearGradient(150, 0, 150, 300);
                                    gradient1.addColorStop(0, '#273044');
                                    gradient1.addColorStop(1, '#273044');

                                    var gradient2 = ctx1.createLinearGradient(10, 0, 150, 300);
                                    gradient2.addColorStop(0, '#5d99de');
                                    gradient2.addColorStop(1, '#5d99de');


                                    // ------------------------------------------------------- //
                                    // Gráfica de cantidad de vacantes registradas por mes
                                    // ------------------------------------------------------ //
                                    var BARCHARTEXMPLE2    = $('#cantVacantesMes');
                                    var barChartExample2 = new Chart(BARCHARTEXMPLE2, {
                                        type: 'bar',
                                        options: {
                                            scales: {
                                                xAxes: [{
                                                    display: true,
                                                    gridLines: {
                                                        color: '#fff'
                                                    }
                                                }],
                                                yAxes: [{
                                                    display: true,
                                                    ticks: {
                                                        max: 100,
                                                        min: 5
                                                    },
                                                    gridLines: {
                                                        color: '#fff'
                                                    }
                                                }]
                                            },
                                            legend: false
                                        },
                                        data: {
                                            labels: [response.data[3][0].mes, response.data[3][1].mes, response.data[3][2].mes, response.data[3][3].mes, response.data[3][4].mes, response.data[3][5].mes, response.data[3][6].mes, response.data[3][7].mes, response.data[3][8].mes, response.data[3][9].mes, response.data[3][10].mes, response.data[3][11].mes],
                                            datasets: [
                                                {
                                                    label: "Cantidad",
                                                    backgroundColor: [
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2
                                                    ],
                                                    hoverBackgroundColor: [
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2
                                                    ],
                                                    borderColor: [
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2,
                                                        gradient2
                                                    ],
                                                    borderWidth: 1,
                                                    data: [response.data[3][0].cantidad, response.data[3][1].cantidad, response.data[3][2].cantidad, response.data[3][3].cantidad, response.data[3][4].cantidad, response.data[3][5].cantidad, response.data[3][6].cantidad, response.data[3][7].cantidad, response.data[3][8].cantidad, response.data[3][9].cantidad, response.data[3][10].cantidad, response.data[3][11].cantidad],
                                                }
                                            ]
                                        }
                                    });

                            
                                    // ------------------------------------------------------- //
                                    // Gráfica de cantidad de profesionales registrados por mes
                                    // ------------------------------------------------------ //
                                    var BARCHARTEXMPLE3    = $('#cantProfesionalesMes');
                                    var barChartExample3 = new Chart(BARCHARTEXMPLE3, {
                                        type: 'bar',
                                        options: {
                                            scales: {
                                                xAxes: [{
                                                    display: true,
                                                    gridLines: {
                                                        color: '#fff'
                                                    }
                                                }],
                                                yAxes: [{
                                                    display: true,
                                                    ticks: {
                                                        max: 50,
                                                        min: 5
                                                    },
                                                    gridLines: {
                                                        color: '#fff'
                                                    }
                                                }]
                                            },
                                            legend: false
                                        },
                                        data: {
                                            labels: [response.data[4][0].mes, response.data[4][1].mes, response.data[4][2].mes, response.data[4][3].mes, response.data[4][4].mes, response.data[4][5].mes, response.data[4][6].mes, response.data[4][7].mes, response.data[4][8].mes, response.data[4][9].mes, response.data[4][10].mes, response.data[4][11].mes],
                                            datasets: [
                                                {
                                                    label: "Data Set 1",
                                                    backgroundColor: [
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1
                                                    ],
                                                    hoverBackgroundColor: [
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1
                                                    ],
                                                    borderColor: [
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1,
                                                        gradient1
                                                    ],
                                                    borderWidth: 1,
                                                    data: [response.data[4][0].cantidad, response.data[4][1].cantidad, response.data[4][2].cantidad, response.data[4][3].cantidad, response.data[4][4].cantidad, response.data[4][5].cantidad, response.data[4][6].cantidad, response.data[4][7].cantidad, response.data[4][8].cantidad, response.data[4][9].cantidad, response.data[4][10].cantidad, response.data[4][11].cantidad],
                                                }
                                            ]
                                        }
                                    });
                                
                                    // ------------------------------------------------------- //
                                    // Gráfica de cantidad de empresas registradas por mes
                                    // ------------------------------------------------------ //
                                    var LINECHARTEXMPLE   = $('#CantEmpMes');
                                    var lineChartExample = new Chart(LINECHARTEXMPLE, {
                                        type: 'line',
                                        options: {
                                            legend: {labels:{fontColor:"#777", fontSize: 12}},
                                            scales: {
                                                xAxes: [{
                                                    display: true,
                                                    gridLines: {
                                                        color: '#fff'
                                                    }
                                                }],
                                                yAxes: [{
                                                    display: true,
                                                    ticks: {
                                                        max: 50,
                                                        min: 5
                                                    },
                                                    gridLines: {
                                                        color: '#fff'
                                                    }
                                                }]
                                            },
                                        },
                                        data: {
                                            labels: [response.data[1][0].mes, response.data[1][1].mes, response.data[1][2].mes, response.data[1][3].mes, response.data[1][4].mes, response.data[1][5].mes, response.data[1][6].mes, response.data[1][7].mes, response.data[1][8].mes, response.data[1][9].mes, response.data[1][10].mes, response.data[1][11].mes],
                                            datasets: [
                                                {
                                                    label: "Cantidad",
                                                    fill: true,
                                                    lineTension: 0.3,
                                                    backgroundColor: gradient1,
                                                    borderColor: '#273044',
                                                    borderCapStyle: 'butt',
                                                    borderDash: [],
                                                    borderDashOffset: 0.0,
                                                    borderJoinStyle: 'miter',
                                                    borderWidth: 2,
                                                    pointBorderColor: gradient1,
                                                    pointBackgroundColor: "#fff",
                                                    pointBorderWidth: 2,
                                                    pointHoverRadius: 5,
                                                    pointHoverBackgroundColor: gradient1,
                                                    pointHoverBorderColor: "rgba(220,220,220,1)",
                                                    pointHoverBorderWidth: 2,
                                                    pointRadius: 1,
                                                    pointHitRadius: 10,
                                                    data: [response.data[1][0].cantidad, response.data[1][1].cantidad, response.data[1][2].cantidad, response.data[1][3].cantidad, response.data[1][4].cantidad, response.data[1][5].cantidad, response.data[1][6].cantidad, response.data[1][7].cantidad, response.data[1][8].cantidad, response.data[1][9].cantidad, response.data[1][10].cantidad, response.data[1][11].cantidad],
                                                    spanGaps: false
                                                }
                                            ]
                                        }
                                    });


                                    // ------------------------------------------------------- //
                                    // Gráfica de cantidad de empresas y profesionales registrados
                                    // ------------------------------------------------------ //
                                    var DOUGHNUTCHARTEXMPLE  = $('#cantEmpProf');
                                    var pieChartExample = new Chart(DOUGHNUTCHARTEXMPLE, {
                                        type: 'doughnut',
                                        options: {
                                            cutoutPercentage: 80,
                                        },
                                        data: {
                                            labels: [
                                                "Empresas",
                                                "Profesionales"
                                            ],
                                            datasets: [
                                                {
                                                    data: [response.data[2][0].cantidad,response.data[2][1].cantidad],
                                                    borderWidth: 0,
                                                    backgroundColor: [
                                                        '#5d99de',
                                                        '#273044 '
                                                    ],
                                                    hoverBackgroundColor: [
                                                        '#5d99de',
                                                        '#273044'
                                                    ]
                                                }]
                                            }
                                    });

                                    var pieChartExample = {
                                        responsive: true
                                    };

                                    // ------------------------------------------------------- //
                                    // Gráfica de cantidad de vacantes por tipo de horario
                                    // ------------------------------------------------------ //
                                    var DOUGHNUTCHARTEXMPLE2  = $('#cantVacantesTipoHorario');
                                    var pieChartExample2 = new Chart(DOUGHNUTCHARTEXMPLE2, {
                                        type: 'doughnut',
                                        options: {
                                            cutoutPercentage: 80,
                                        },
                                        data: {
                                            labels: [
                                                response.data[5][0].nombre,response.data[5][1].nombre,
                                                response.data[5][2].nombre,response.data[5][3].nombre
                                            ],
                                            datasets: [
                                                {
                                                    data: [response.data[5][0].cantidad,response.data[5][1].cantidad,
                                                           response.data[5][2].cantidad,response.data[5][3].cantidad],
                                                    borderWidth: 0,
                                                    backgroundColor: [
                                                        '#5d99de',
                                                        '#273044 '
                                                    ],
                                                    hoverBackgroundColor: [
                                                        '#5d99de',
                                                        '#273044'
                                                    ]
                                                }]
                                            }
                                    });

                                    var pieChartExample2 = {
                                        responsive: true
                                    };


                                    // ------------------------------------------------------- //
                                    // Gráfica de cantidad de hombres y mujeres
                                    // ------------------------------------------------------ //
                                    var PIECHARTEXMPLE    = $('#cantMF');
                                    var pieChartExample = new Chart(PIECHARTEXMPLE, {
                                        type: 'pie',
                                        data: {
                                            labels: [
                                                "Hombres",
                                                "Mujeres"
                                            ],
                                            datasets: [
                                                {
                                                    data: [response.data[0][0].cantidad, response.data[0][1].cantidad],
                                                    borderWidth: 0,
                                                    backgroundColor: [
                                                        "#0000ff",
                                                        "#ffc0cb"
                                                    ],
                                                    hoverBackgroundColor: [
                                                        "#0000cc",
                                                        "#e5acb6"
                                                    ]
                                                }]
                                            }
                                    });

                                    var pieChartExample = {
                                        responsive: true
                                    };
                                    Swal.fire({
                                        title: 'Todos los datos han sido cargados.',
                                        showClass: {
                                        popup: 'animate__animated animate__fadeInDown'
                                        },
                                        hideClass: {
                                        popup: 'animate__animated animate__fadeOutUp'
                                        }
                                    })
                        }
                        else{
                            let timerInterval
                            Swal.fire({
                            title: 'Se ha producido un error',
                            html: 'Redireccionando en <b></b> milisegundos.',
                            timer: 2000,
                            timerProgressBar: true,
                            onBeforeOpen: () => {
                                Swal.showLoading()
                                timerInterval = setInterval(() => {
                                const content = Swal.getContent()
                                if (content) {
                                    const b = content.querySelector('b')
                                    if (b) {
                                    b.textContent = Swal.getTimerLeft()
                                    }
                                }
                                }, 100)
                            },
                            onClose: () => {
                                clearInterval(timerInterval)
                                window.location.href = "/";
                            }
                            }).then((result) => {
                            /* Read more about handling dismissals below */
                            if (result.dismiss === Swal.DismissReason.timer) {
                                console.log('I was closed by the timer')
                            }
                            });
                        }
                    });
               

        });
    
    };
}




   
