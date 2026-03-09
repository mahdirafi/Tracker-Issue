const issuesContainer = document.getElementById("issuesContainer");
const btnAll = document.getElementById("btnAll");
const btnOpen = document.getElementById("btnOpen");
const btnClosed = document.getElementById("btnClosed");

const loadingSpringer = document.getElementById("loadingSpringer")
const issueCount = document.getElementById("issueCount")

let allIssues = [];

// spinner
function showLoading(){
    loadingSpringer.classList.remove("hidden")
    issuesContainer.innerHTML = "";

}
function hideLoading(){
    loadingSpringer.classList.add("hidden")
    loadingSpringer.classList.add("flex")
}


 async function loadIssues() {
    showLoading();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    hideLoading();
    allIssues =data.data 
    displayIssues(allIssues);
    console.log(data);
}

function displayIssues(issues) {
    issuesContainer.innerHTML = "";  

    issueCount.innerText = ` ${issues.length} Issue`

    issues.forEach(issue => {
    const card = document.createElement("div");
    card.className = "p-4 space-y-4 bg-white shadow-sm rounded-md border-t-2 border-b-2";
    card.style.borderTop = issue.status === "open" ? "4px solid green" : "4px solid purple";
    card.style.borderBottom = issue.status === "open" ? "4px solid green" : "4px solid purple";

    
    const statusContent = issue.status === "open" 
        ? `<img src="./assets/Open-Status.png" alt="">` 
        : `<i class="fa-regular fa-circle-check text-purple-700"></i>`;

    card.innerHTML = `
        <div class="flex justify-between items-center line-clamp-1">
            ${statusContent}
            <div class="btn text-red-400 bg-red-100 rounded-full shadow-md">${issue.priority}</div>
        </div>
        <div>
            <h2 class="font-bold text-xl">${issue.title}</h2>
            <p class="line-clamp-2 font-medium text-gray-500">${issue.description}</p>
        </div>
        <div class="flex gap-3">
            <div class="btn text-red-400 bg-red-100 rounded-full shadow-md"><i class="fa-solid fa-bug"></i> BUG</div>
            <div class="btn text-yellow-400 bg-yellow-100 rounded-full shadow-md"><i class="fa-solid fa-circle-radiation"></i> HELP WANTED</div>
        </div>
        <hr class="text-gray-300">
        <div>
            <p>#${issue.id} by ${issue.author}</p>
            <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
        </div>
    `;

    issuesContainer.appendChild(card);
    card.addEventListener("click", () => showModal(issue));
});

}
// btn function 
btnAll.addEventListener("click", () => {
    displayIssues(allIssues);  
    setActiveButton(btnAll);
    console.log(btnAll);
});

btnOpen.addEventListener("click", () => {
    const openIssues = allIssues.filter(issue => issue.status === "open");
    displayIssues(openIssues); 
    setActiveButton(btnOpen);
    console.log(btnOpen);
});

btnClosed.addEventListener("click", () => {
    const closedIssues = allIssues.filter(issue => issue.status === "closed");
    displayIssues(closedIssues); 
    setActiveButton(btnClosed);
});
// set active button
function setActiveButton(activeBtn) {
    [btnAll, btnOpen, btnClosed].forEach(btn => {
        btn.className = "btn bg-white text-gray-500";  
    });
    activeBtn.className = "btn text-white bg-primary";
}
// modal function 
function showModal(issue) {
    const modal = document.getElementById("issueModal");

   
    document.getElementById("modalTitle").textContent = issue.title;
    document.getElementById("modalDescription").textContent = issue.description;

     
    const statusEl = document.getElementById("modalStatus");
    if(issue.status === "open"){
        statusEl.textContent = "Opened";
        statusEl.className = "text-white bg-green-500 rounded-full shadow-md px-2 py-1";
    } else {
        statusEl.textContent = "Closed";
        statusEl.className = "text-white bg-purple-500 rounded-full shadow-md px-2 py-1";
    }

   
    document.getElementById("modalAuthor").textContent = `Opened by ${issue.author}`;
    document.getElementById("modalDate").textContent = new Date(issue.createdAt).toLocaleDateString();

    
    document.getElementById("modalAssignee").textContent = issue.assignee || "Not Assigned";

   
    const priorityEl = document.getElementById("modalPriority");
    priorityEl.textContent = issue.priority;
    priorityEl.className = `text-white ${issue.priority === "HIGH" ? "bg-red-500" : "bg-yellow-500"} rounded-full shadow-md px-2 py-1`;

    
    const labelsEl = document.getElementById("modalLabels");
    labelsEl.innerHTML = "";
    issue.labels?.forEach(label => {
        const div = document.createElement("div");
        div.className = "btn bg-gray-100 shadow-md";
        div.textContent = label;
        labelsEl.appendChild(div);
    });

    modal.showModal();
}

loadIssues();