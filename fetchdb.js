let allData = []; // Store all data globally

// Function to Fetch Data from Backend
async function fetchData() {
    try {
        const response = await fetch("/fetch-events");
        allData = await response.json();
        console.log(allData)
        // displayData(allData); // Display all data initially
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

// Function to Display Data
function displayData(dataArray) {
    const container = document.getElementById("events");
    container.innerHTML = ""; // Clear previous data

    dataArray.forEach(data => {
        const card = document.createElement("div");
        card.classList.add("card");
        

        card.innerHTML = `
            <h3>${data.title}</h3>
            <p><strong>Date:</strong> ${data.date}</p>
            <img src="${data.image}" alt="${data.title}">
            <p>${data.description}</p>
            <a href=${data.Chat} target="_blank">
        <button >Join</button>
        </a>
        `;

        container.appendChild(card);
    });
}

// Function to Search and Filter Data
function searchData() {
    console.log("searching")
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    console.log(searchValue)
    const filteredData = allData.filter(item => 
        item.title.toLowerCase().includes(searchValue.toLowerCase()) || 
        item.interests.some(interest => interest.toLowerCase().includes(searchValue.toLowerCase()))
    );
    
    console.log(filteredData)
   if(filteredData.length>0){
    console.log("in if block")
    displayData(filteredData);
    }
    else{
        console.log("in else block")
         const container = document.getElementById("events");
    container.innerHTML = "<h2>No results found</h2>";
    } // Display filtered results
}
function openEventModal(){
    window.open ("https://chat.whatsapp.com/EPhF1dVXS1g9DVieo61oBd","_blank");
}
// Fetch Data on Page Load
fetchData();
console.log(allData)
