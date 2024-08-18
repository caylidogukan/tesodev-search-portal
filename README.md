# Tesodev Search Portal


## Tech Stack

- **Frontend**: Vue 3, TypeScript, Vite
- **Backend**: Node.js, Express.js
- **Styling**: CSS (custom)
- **Package Manager**: npm

## Pages and Components

### Pages
- **Home.vue**: The main landing page that includes the search bar, a list of top news items, and a footer with contact details.
- **AddRecord.vue**: The page where users can add new records. Includes form validation and a popup notification upon successful record submission.
- **SearchResults.vue**: The page where search results are displayed based on the user's query.

### Components
- **Pagination.vue**: Handles pagination for the search results.
- **Popup.vue**: Displays success or error messages when adding new records.
- **SearchInput.vue**: Provides the input field for the search functionality.
  
### Other Directories
- **assets/**: Contains static assets like images (e.g., `tesodev-logo.png`, `news.png`).
- **data/**: Stores mock data (e.g., `mock-data.json`) for search functionality.
- **router/**: Contains the routing setup for navigating between different pages.
- **utils/**: Includes utility functions like `transformData.ts` to process data.

###server.mjs explanation:
I have implemented server.mjs to handle URL shortening securely and bypass CORS restrictions. The frontend needed to interact with an external URL-shortening API, but direct requests from the browser faced limitations. The backend server acts as a proxy, forwarding requests to the external API, preventing CORS issues, and keeping sensitive API credentials hidden. This approach simplifies frontend API interaction while enhancing security and flexibility.


## Setup Instructions

### Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later)

### Running the project  
- Start the backend server
  * cd backend
  * node server.mjs
- In a new terminal window, start the frontend
  * npm run dev
