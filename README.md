# Entertainment Web App

This project is an **Entertainment Web App** built with **Angular**, **NgRx**, **Firebase Authentication**, and **TailwindCSS**. It lets users search for movies and TV shows, and manage bookmarks. Plus, users can securely authenticate to access their personalized content.

## Features

- **User Authentication**: Secure authentication using Firebase with sign-up, login, and logout functionality.
- **Search for Movies and TV Shows**: Users can search for movies and TV shows in a single query using an API.
- **Bookmarking**: Users can bookmark movies and TV shows for later reference, with bookmarks saved per user.
- **Responsive UI**: The app is fully responsive and styled using TailwindCSS, ensuring compatibility across all screen sizes.
- **Lazy Loading**: Lazy-loaded Angular components for optimized performance.
- **Form Validation**: Form validation for login and sign-up forms.

## Technologies Used

- **Angular** (Standalone Components)
- **NgRx** (State Management)
- **RxJS** (Reactive Programming)
- **Firebase Authentication** (User Authentication)
- **TailwindCSS** (Styling)
- **TypeScript** (Primary Programming Language)
- **Jest** (Unit Testing Framework)

## Getting Started

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ktscates/entertainment-web-app.git
   cd entertainment-web-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

### Running the App

    ```bash
    ng serve
    ```
    Open your browser and navigate to `http://localhost:4200/`.

## Usage

### User Authentication

- Users can sign up or log in using Firebase Authentication.
- Authenticated users are redirected to the Home page, and if they are not authenticated, they are redirected to the login/signup page.

### Movie and TV Show Search

- The app allows users to search for both movies and TV shows using a single query.
- Search results are identified as movies or TV shows based on the `media_type` field returned by the API.

### Bookmark Management

- Users can bookmark movies and TV shows.
- Bookmarked items are persisted per user and displayed in the "Bookmarks" section.

## NgRx State Management

The app uses NgRx for state management. Key NgRx features include:

- **Actions**: Trigger state changes for movie search and bookmarking etc...
- **Reducers**: Handle how the state changes in response to actions.
- **Effects**: Manage side effects like API calls for movie and TV show data etc...
- **Selectors**: Provide an efficient way to query and derive specific slices of the application state.

## Authentication

Firebase Authentication is used to manage user login and signup. The `AuthGuard` protects authenticated routes, and only authenticated users can access movie, TV show, and bookmark sections.

## Bookmark Management

The `BookmarkService` allows users to:

- Bookmark and unbookmark items.
- Retrieve bookmarked items on app initialization.
- Store bookmarks specific to each user using Firebase.

## Deployment

The app is deployed on **Netlify**. A `_redirects` file is included in the build to handle Angular’s client-side routing, ensuring that refreshing or navigating directly to any route works correctly.

## Known Issues

- **Page Reload on Nested Routes**: Refreshing a page on a nested route (e.g., `/home` or `/movies`) may return a 404 error on some hosting platforms. This is resolved with proper redirect settings (e.g., a `_redirects` file on Netlify).

## Live Link

You can access the deployed application at [Entertainment Web App](https://ktscates-entertainment-web-app.netlify.app/).
