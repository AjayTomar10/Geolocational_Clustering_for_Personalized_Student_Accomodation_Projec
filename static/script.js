// Hardcoded data for cities, colleges, and their lat/lng
const cityColleges = {
  bangalore: [
      { name: "IISc", lat: 13.021, lng: 77.566 },
      { name: "RVCE", lat: 12.923, lng: 77.500 },
      { name: "BMSCE", lat: 12.941, lng: 77.565 },
      { name: "PESU", lat: 12.933, lng: 77.534 },
      { name: "MSRIT", lat: 13.031, lng: 77.566 },
      { name: "Christ University", lat: 12.937, lng: 77.621 },
      { name: "NITTE Meenakshi", lat: 13.130, lng: 77.586 },
      { name: "Jain University", lat: 12.834, lng: 77.684 },
      { name: "Reva University", lat: 13.108, lng: 77.637 },
      { name: "New Horizon College", lat: 12.960, lng: 77.697 }
  ],
  delhi: [
      { name: "IIT Delhi", lat: 28.545, lng: 77.192 },
      { name: "DTU", lat: 28.750, lng: 77.117 },
      { name: "NSUT", lat: 28.609, lng: 77.033 },
      { name: "IIIT Delhi", lat: 28.544, lng: 77.272 },
      { name: "JMI", lat: 28.561, lng: 77.280 },
      { name: "IGDTUW", lat: 28.665, lng: 77.232 },
      { name: "GGSIPU", lat: 28.751, lng: 77.117 },
      { name: "MAIT", lat: 28.716, lng: 77.113 },
      { name: "BVP", lat: 28.631, lng: 77.208 },
      { name: "Sharda University", lat: 28.475, lng: 77.493 }
  ],
  mumbai: [
      { name: "IIT Bombay", lat: 19.133, lng: 72.915 },
      { name: "VJTI", lat: 19.022, lng: 72.855 },
      { name: "SPIT", lat: 19.106, lng: 72.836 },
      { name: "NMIMS", lat: 19.107, lng: 72.836 },
      { name: "KJ Somaiya", lat: 19.072, lng: 72.899 },
      { name: "ICT Mumbai", lat: 19.025, lng: 72.857 },
      { name: "Thakur College", lat: 19.221, lng: 72.862 },
      { name: "Atharva College", lat: 19.208, lng: 72.835 },
      { name: "DJ Sanghvi", lat: 19.111, lng: 72.841 },
      { name: "Rizvi College", lat: 19.067, lng: 72.830 }
  ],
  chennai: [
      { name: "IIT Madras", lat: 12.991, lng: 80.233 },
      { name: "Anna University", lat: 13.011, lng: 80.236 },
      { name: "SSN College", lat: 12.845, lng: 80.152 },
      { name: "SRM University", lat: 12.823, lng: 80.045 },
      { name: "VIT Chennai", lat: 12.841, lng: 80.153 },
      { name: "Hindustan University", lat: 12.842, lng: 80.145 },
      { name: "Sathyabama University", lat: 12.872, lng: 80.228 },
      { name: "St. Joseph's", lat: 12.850, lng: 80.223 },
      { name: "Saveetha Engineering College", lat: 13.033, lng: 80.066 },
      { name: "Velammal Engineering College", lat: 13.120, lng: 80.214 }
  ],
  hyderabad: [
      { name: "IIT Hyderabad", lat: 17.544, lng: 78.572 },
      { name: "IIIT Hyderabad", lat: 17.445, lng: 78.348 },
      { name: "JNTU Hyderabad", lat: 17.494, lng: 78.391 },
      { name: "OUCE", lat: 17.421, lng: 78.523 },
      { name: "GITAM Hyderabad", lat: 17.421, lng: 78.682 },
      { name: "CBIT", lat: 17.394, lng: 78.315 },
      { name: "Vardhaman College", lat: 17.265, lng: 78.410 },
      { name: "MGIT", lat: 17.384, lng: 78.393 },
      { name: "CMRIT", lat: 17.493, lng: 78.572 },
      { name: "Anurag University", lat: 17.417, lng: 78.524 }
  ],
  kolkata: [
      { name: "IIT Kharagpur", lat: 22.314, lng: 87.310 },
      { name: "Jadavpur University", lat: 22.499, lng: 88.371 },
      { name: "IEM Kolkata", lat: 22.575, lng: 88.430 },
      { name: "Techno India", lat: 22.579, lng: 88.431 },
      { name: "Heritage Institute", lat: 22.461, lng: 88.396 },
      { name: "Amity Kolkata", lat: 22.669, lng: 88.439 },
      { name: "UEM Kolkata", lat: 22.576, lng: 88.431 },
      { name: "GNIT", lat: 22.693, lng: 88.472 },
      { name: "BP Poddar", lat: 22.548, lng: 88.391 },
      { name: "Adamas University", lat: 22.826, lng: 88.446 }
  ],
  pune: [
      { name: "COEP", lat: 18.529, lng: 73.849 },
      { name: "VIT Pune", lat: 18.457, lng: 73.867 },
      { name: "PCCOE", lat: 18.650, lng: 73.759 },
      { name: "MIT Pune", lat: 18.523, lng: 73.818 },
      { name: "Bharati Vidyapeeth", lat: 18.464, lng: 73.857 },
      { name: "DY Patil", lat: 18.631, lng: 73.807 },
      { name: "Sinhgad College", lat: 18.455, lng: 73.810 },
      { name: "PICT", lat: 18.463, lng: 73.867 },
      { name: "FLAME University", lat: 18.535, lng: 73.827 },
      { name: "Symbiosis", lat: 18.592, lng: 73.772 }
  ]
};


function populateColleges() {
  const city = document.getElementById("city").value;
  const collegeDropdown = document.getElementById("college");
  collegeDropdown.innerHTML = '<option value="">Select College</option>'; // Clear previous options

  if (city && cityColleges[city]) {
      cityColleges[city].forEach(college => {
          const option = document.createElement("option");
          option.value = `${college.lat},${college.lng}`;
          option.textContent = college.name;
          collegeDropdown.appendChild(option);
      });
  }
}

function updateMap() {
  const college = document.getElementById("college").value;
  if (college) {
      const [lat, lng] = college.split(",");
      const map = document.getElementById("map");
      map.src = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  }
}
function updateMapFromLatLng() {
  const latitude = document.getElementById("latitude").value;
  const longitude = document.getElementById("longitude").value;

  if (latitude && longitude) {
      const map = document.getElementById("map");
      map.src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
  } else {
      alert("Please enter both latitude and longitude to preview the map.");
  }
}

function toggleInputFields() {
  const inputMethod = document.getElementById("input-method").value;
  const latLngFields = document.getElementById("lat-lng-fields");
  const cityCollegeFields = document.getElementById("city-college-fields");

  if (inputMethod === "lat-lng") {
      latLngFields.style.display = "block";
      cityCollegeFields.style.display = "none";
  } else if (inputMethod === "city-college") {
      latLngFields.style.display = "none";
      cityCollegeFields.style.display = "block";
  } else {
      latLngFields.style.display = "none";
      cityCollegeFields.style.display = "none";
  }
}

document.getElementById('location-form').onsubmit = async (e) => {
  e.preventDefault();

  const inputMethod = document.getElementById("input-method").value;
  let latitude, longitude;

  if (inputMethod === "lat-lng") {
      latitude = document.getElementById("latitude").value;
      longitude = document.getElementById("longitude").value;
  } else if (inputMethod === "city-college") {
      const college = document.getElementById("college").value;
      if (!college) {
          alert("Please select a college.");
          return;
      }
      [latitude, longitude] = college.split(",");
  }

  const preference1 = document.getElementById('preference1').value;
  const preference2 = document.getElementById('preference2').value;
  const display_metro = document.getElementById('display-metro').value; // Get the value of the hidden input

  if (!latitude || !longitude) {
      alert("Please provide valid latitude and longitude.");
      return;
  }

  try {
      const response = await fetch('/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
              latitude: latitude,
              longitude: longitude,
              preference1: preference1,
              preference2: preference2,
              display_metro: display_metro, // Include display_metro
          }),
      });

      if (response.ok) {
          const result = await response.json();
          if (result.status === 'success') {
              document.getElementById('map').src = `/map`;
              alert('Map generated successfully');
          } else {
              alert(result.message || 'Error generating map');
          }
      } else {
          alert('Error: Could not fetch data');
      }
  } catch (error) {
      alert('Error: Something went wrong');
      console.error(error);
  }
};




// When 'Yes' button is clicked
document.getElementById("metro-yes").addEventListener("click", function () {
  const metroValue = this.getAttribute("data-value"); // Get the 'data-value' of the clicked button

  document.getElementById("display-metro").value = metroValue; // Update hidden input value
  this.classList.add("active"); // Highlight the selected button
  document.getElementById("metro-no").classList.remove("active"); // Remove highlight from the other button
});

// When 'No' button is clicked
document.getElementById("metro-no").addEventListener("click", function () {
  const metroValue = this.getAttribute("data-value"); // Get the 'data-value' of the clicked button

  document.getElementById("display-metro").value = metroValue; // Update hidden input value
  this.classList.add("active"); // Highlight the selected button
  document.getElementById("metro-yes").classList.remove("active"); // Remove highlight from the other button
});