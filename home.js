const issuesContainer = document.getElementById("issuesContainer");




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