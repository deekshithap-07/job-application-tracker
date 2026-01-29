let applications = JSON.parse(localStorage.getItem("applications")) || [];

function addApplication() {
  const company = document.getElementById("company").value;
  const role = document.getElementById("role").value;
  const status = document.getElementById("status").value;

  if (company === "" || role === "") {
    alert("Please fill all fields");
    return;
  }

  applications.push({ company, role, status });
  saveAndRender();

  document.getElementById("company").value = "";
  document.getElementById("role").value = "";
}

function renderApplications() {
  const list = document.getElementById("applicationList");
  list.innerHTML = "";

  let applied = 0, interview = 0, rejected = 0;

  applications.forEach((app, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${app.company}</strong> – ${app.role}
      <br>
      <select onchange="updateStatus(${index}, this.value)">
        <option ${app.status === "Applied" ? "selected" : ""}>Applied</option>
        <option ${app.status === "Interview" ? "selected" : ""}>Interview</option>
        <option ${app.status === "Rejected" ? "selected" : ""}>Rejected</option>
      </select>
      <br>
      <button onclick="deleteApplication(${index})">Delete</button>
    `;

    list.appendChild(li);

    if (app.status === "Applied") applied++;
    if (app.status === "Interview") interview++;
    if (app.status === "Rejected") rejected++;
  });

  updateStats(applied, interview, rejected);
}

function updateStatus(index, newStatus) {
  applications[index].status = newStatus;
  saveAndRender();
}

function deleteApplication(index) {
  applications.splice(index, 1);
  saveAndRender();
}

function updateStats(applied, interview, rejected) {
  const total = applications.length;
  const completed = interview + rejected;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  document.getElementById("appliedCount").textContent = applied;
  document.getElementById("interviewCount").textContent = interview;
  document.getElementById("rejectedCount").textContent = rejected;

  document.getElementById("progressBar").style.width = progress + "%";
  document.getElementById("progressText").textContent = progress + "% Completed";
}

function saveAndRender() {
  localStorage.setItem("applications", JSON.stringify(applications));
  renderApplications();
}

renderApplications();
