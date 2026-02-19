// Function to open the event modal
function openEventModal() {
    document.getElementById("eventModal").style.display = "block";
}

// Function to close the event modal
function closeEventModal() {
    document.getElementById("eventModal").style.display = "none";
}

// Function to open the group modal
function openGroupModal() {
    document.getElementById("groupModal").style.display = "block";
}

// Function to close the group modal
function closeGroupModal() {
    document.getElementById("groupModal").style.display = "none";
}

// Function to search for events based on user input
async function searchGroups() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const eventsContainer = document.querySelector(".featured-events");
    eventsContainer.innerHTML = ""; // Clear previous results

    try {
        const response = await fetch('events.json');
        const events = await response.json();

        // Filter events based on user input
        const filteredEvents = events.filter(event => 
            event.interests.some(interest =>(interest.toLowerCase().includes(input))
                    
                
               
            )
        );
       

        // Check if any events match the search criteria
        if (filteredEvents.length > 0) {
            filteredEvents.forEach(event => {
                const eventCard = document.createElement("div");
                eventCard.className = "event-card";
                eventCard.innerHTML = `
                    <img src="${event.image}" alt="${event.title}" class="event-image">
                    <h3>${event.title}</h3>
                    <p>Date: ${event.date}</p>
                    <p>${event.description}</p>
                    <button>Join</button>
                   `;
                eventsContainer.appendChild(eventCard);
            });
        } else {
            eventsContainer.innerHTML = "<p>No events found for your interest.</p>";
        }
    } catch (error) {
        console.error("Error fetching events:", error);
        eventsContainer.innerHTML = "<p>There was an error fetching the events. Please try again later.</p>";
    }
}

// Close the modal when the user clicks outside of it
window.onclick = function(event) {
    const eventModal = document.getElementById("eventModal");
    const groupModal = document.getElementById("groupModal");
    
    if (event.target === eventModal) {
        closeEventModal();
    }
    if (event.target === groupModal) {
        closeGroupModal();
    }
}

// Optional: Close the modal when the 'Esc' key is pressed
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeEventModal();
        closeGroupModal();
    }
});