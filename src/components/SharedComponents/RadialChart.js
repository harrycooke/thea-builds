// import React from 'react';
// import ReactApexChart from 'react-apexcharts'

// class RadialChart extends React.Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       options: {
//         plotOptions: {
//           radialBar: {
//             startAngle: this.props.startAngle,
//             endAngle: this.props.endAngle,
//             hollow: {
//               margin: 0,
//               size: '75%',
//               background: '#fff',
//               position: 'front',
//               dropShadow: {
//                 enabled: true,
//                 top: 3,
//                 left: 0,
//                 blur: 4,
//                 opacity: 0.24
//               }
//             },
//             track: {
//               background: '#fff',
//               strokeWidth: '100%',
//               margin: 0, // margin is in pixels
//               dropShadow: {
//                 enabled: true,
//                 top: -3,
//                 left: 0,
//                 blur: 4,
//                 opacity: 0.35
//               }
//             },

//             dataLabels: {
//               name: {
//                 offsetY: -10,
//                 show: false,
//                 color: '#888',
//                 fontSize: '17px'
//               },
//               value: {
//                 formatter: function (val) {
//                   return parseInt(val);
//                 },
//                 color: '#111',
//                 fontSize: '36px',
//                 show: true,
//               }
//             }
//           }
//         },
//         fill: {
//           type: 'gradient',
//           gradient: {
//             shade: 'dark',
//             type: 'horizontal',
//             shadeIntensity: 0.5,
//             gradientToColors: [this.props.fromColor],
//             inverseColors: true,
//             opacityFrom: 1,
//             opacityTo: 1,
//             stops: [0, 100]
//           },
//           colors: this.props.toColor
//         },
//         stroke: {
//           lineCap: 'round'
//         },
//         labels: ['percent'],
//       },
//       series: [this.props.series],
//     }
//   }

//   render() {
//     return (
//       <div id="card" style={{ zIndex: -100 }}>
//         <div id="chart">
//           <ReactApexChart
//             options={this.state.options}
//             series={this.state.series}
//             type="radialBar"
//             height="250 " />
//         </div>
//       </div>
//     )
//   }
// }
// export default RadialChart