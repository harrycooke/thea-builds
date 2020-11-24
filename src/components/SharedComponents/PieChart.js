// import React from "react";
// import ReactApexChart from "react-apexcharts";

// class PieChart extends React.Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       options: {
//         dataLabels: {
//           enabled: false
//         },
//         fill: {
//           type: 'gradient',
//           colors: ["#41acff", "#3aefd9"]
//         },

//         responsive: [{
//           breakpoint: 480,
//           options: {
//             chart: {
//               width: 200
//             },
//             legend: {
//               show: false,
//               position: 'bottom'
//             }
//           },
//         }, {
//           breakpoint: 1430,
//           options: {
//             chart: {
//               width: 260
//             },
//             legent: {
//               show: false,
//               position: 'bottom'
//             }
//           }
//         }, {
//           breakpoint: 1280,
//           options: {
//             chart: {
//               width: 307
//             },
//             legent: {
//               show: false,
//               position: 'bottom'
//             }
//           }
//         }
//         ]
//       },
//       series: [37,12],
//     }
//   }

//   render() {
//     return (
//       <div id="chart">
//         <ReactApexChart options={this.state.options} series={this.state.series} type="donut" width="280" />
//       </div>
//     );
//   }
// }

// export default PieChart;