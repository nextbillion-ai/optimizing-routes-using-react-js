
# Optimizing Routes Using React.js

![NextBillion.ai Logo](https://nextbillion.ai/wp-content/uploads/2022/10/nb-logo-colored-80x73.png)

This repository contains an example of how to use NextBillion.ai's Route Optimization V2 API with React.js. It demonstrates how to integrate NextBillion.ai's powerful route optimization capabilities into your React.js application to efficiently plan and optimize routes for various use cases.

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (>=14.x)
- npm (>=7.x)

## Getting Started

Follow these instructions to set up and run the project on your local machine:

Clone the repository:
```bash
git clone https://github.com/your-username/optimizing-routes-using-react-js.git
cd optimizing-routes-using-react-js
```
## Install dependencies:
```bash
npm install
```

## Set up environment variables:
You will need to set up environment variables to use NextBillion.ai's Route Optimization V2 API. Create a .env file in the root of the project and add the following variables:

```makefile
NB_AI_API_KEY=your_nextbillio_api_key
```
Replace your_nextbillio_api_key with your actual API key from NextBillion.ai. This API key is required to authenticate your requests to the route optimization service.

## Run the application:
```bash
npm run dev
```
The application will start, and you can access it in your web browser at http://localhost:3000.

## Technologies Used

The example project utilizes the following technologies:

1. React.js - A popular JavaScript library for building user interfaces.
2. Vite - A fast build tool and development server for modern web projects.
3. @nbai/nbmap-gl - NextBillion.ai's NBMap GL library for interactive maps.
4. Axios - A promise-based HTTP client for making API requests.

## Usage

The example application showcases how to make API requests to NextBillion.ai's Route Optimization V2 API using Axios and how to display the optimized routes on an interactive map using the NBMap GL library. You can use this as a starting point to integrate route optimization capabilities into your own React.js applications.

Make sure to check the documentation for NextBillion.ai's [Route Optimization V2 API](https://docs.nextbillion.ai/docs/optimization/api/route-optimization-v2) for more details on the available endpoints and request parameters.

## License
This project is licensed under the MIT License.


## Contact
For any questions or inquiries, please contact our team at support@nextbillion.ai or visit our website NextBillion.ai.