// const { json } = require("express")

async function fetchAccuracy() {
  try {
    const response = await fetch('/face_accuracy');
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching accuracy data:", error);
    return [];
  }
}

function renderChart(data) {
  const ctx = document.getElementById("accuracyChart").getContext("2d");
  if (!data || data.length === 0) {
    console.warn("No data available for chart");
    return;
  }

  const labels = data.map((item) => item.name);
  const values = data.map((item) => item.encoding_count);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Number of Encodings",
          data: values,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const accuracyData = await fetchAccuracy();
  console.log("Fetched accuracy data:", accuracyData);
  renderChart(accuracyData);
});
