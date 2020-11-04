import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const Column3D = ({ data }) => {
  const chartConfigs = {
    type: "Column3d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Most Popular",
        yAxisName:"Stars",
        XAxisName:"Repos",
        YAxisNameFontSize:"16px",
        XAxisNameFontSize:"16px",
        decimals: 0,
        pieRadius: "50%",
      },
      // Chart Data
      data,
    },
  };

  return <ReactFC {...chartConfigs} />;
};

export default Column3D;
