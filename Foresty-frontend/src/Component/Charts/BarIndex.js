import React from "react";
import {
  Chart,
  Tooltip,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(Tooltip, Title, CategoryScale, LinearScale, BarElement, Legend);

export default function BarIndex(props) {
  const FilterData = () => {
    var sub = props.data;
    var keys = [];
    var values = [];
    // separate key and values from our data
    for (var i in sub) {
      keys.push(i);
      values.push(sub[i]);
    }
    var data = {};
    data.labels = keys;
    data.datasets = [
      {
        data: values,
        label: "Problem Type",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
      },
    ];
    return data;
  };
  return (
    <div className="w-3/4 flex justify-center overflow-hidden">
      <Bar data={FilterData()} height={"200px"} width={"auto"} />
    </div>
  );
}
