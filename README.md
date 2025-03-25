# Allergy Display Site

A web application to display common allergy data using the `common-allergies-js` npm package.

<img width="1363" alt="image" src="https://github.com/user-attachments/assets/11b48cea-9322-4234-9e3e-a734ac0fdcc8" />
<img width="1435" alt="image" src="https://github.com/user-attachments/assets/392b1e1d-32b0-4267-a259-900f667c3ef8" />


## Features

- Displays a comprehensive list of common allergies
- Provides detailed information for each allergy, including:
  - Medical names
  - Common symptoms
  - Treatment options
  - Cross-reactivity information
  - Foods to avoid
  - Common sources
  - Seasonality information
  - Prevalence data
  - Testing methods
  
- Advanced filtering capabilities:
  - Search across all allergy information
  - Filter by category
  - Filter by type
  - Interactive category and type badges for quick filtering
  
- Responsive design with Bootstrap
- Animated card interactions
- Detailed view for each allergy

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd allergy-display-site
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the development server, run:
```
npm start
```

Open your browser and go to `http://localhost:8080` to view the application.

### Using the Application

- Browse the list of allergies on the home page
- Use the search box to search through all allergy information
- Filter allergies by category or type using the dropdown menus
- Click on category or type badges to quickly filter the list
- Click "View Details" on any allergy card to see comprehensive information

## Build

To create a production build, run:
```
npm run build
```

The built files will be located in the `dist` directory.

## Testing

The application includes comprehensive test coverage using Jest and React Testing Library.

To run the tests, use:
```
npm test
```

Tests include:
- Component rendering
- Search functionality
- Filter interactions
- Category and type badge clicking
- Error handling
- Loading states

## Development

This project uses:
- React 18
- React Router for navigation
- React Bootstrap for UI components
- CSS animations for interactions
- Jest and React Testing Library for testing

## License

This project is licensed under the ISC License.
