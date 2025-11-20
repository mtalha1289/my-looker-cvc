looker.plugins.visualizations.add({
  id: "my-github-cvc",
  label: "My GitHub‑Hosted CVC",
  options: {},

  updateAsync: function(data, element, config, queryResponse) {
    element.innerHTML = "";

    const table = document.createElement("table");
    table.style.border = "1px solid black";
    table.style.borderCollapse = "collapse";

    // Header
    const header = document.createElement("tr");
    queryResponse.fields.dimension_like.forEach(dim => {
      const th = document.createElement("th");
      th.textContent = dim.label;
      th.style.border = "1px solid black";
      header.appendChild(th);
    });
    queryResponse.fields.measure_like.forEach(measure => {
      const th = document.createElement("th");
      th.textContent = measure.label;
      th.style.border = "1px solid black";
      header.appendChild(th);
    });
    table.appendChild(header);

    // Rows
    data.forEach(row => {
      const tr = document.createElement("tr");
      queryResponse.fields.dimension_like.forEach(dim => {
        const td = document.createElement("td");
        td.textContent = row[dim.name].value;
        td.style.border = "1px solid black";
        tr.appendChild(td);
      });
      queryResponse.fields.measure_like.forEach(measure => {
        const td = document.createElement("td");
        td.textContent = row[measure.name].value;
        td.style.border = "1px solid black";
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });

    element.appendChild(table);

    this.trigger("renderComplete");
  }
});
