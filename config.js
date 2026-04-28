// Set this to your Render URL after deployment (e.g., https://your-app.onrender.com)
// Leave it as empty string "" to use the same server (local testing)
const API_BASE_URL = "http://localhost:8000"; 

// Helper function to build API URLs
function getApiUrl(endpoint) {
    return API_BASE_URL ? `${API_BASE_URL}${endpoint}` : endpoint;
}
