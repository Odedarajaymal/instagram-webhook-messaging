# Instagram Webhook and Messaging API

## Overview

This project implements a webhook handler for Instagram comments and a direct messaging feature using the Instagram Graph API. When a user comments on a post with the phrase "price please," the bot automatically responds with a predefined message via direct message.

## Architecture

- **Webhook Handler:** Listens for incoming Instagram webhook events and processes comments.
- **Messaging Service:** Sends direct messages to users based on comment triggers.

### Tech Stack

- **Node.js:** JavaScript runtime for server-side development.
- **Express:** A web framework for Node.js that simplifies API and server creation.
- **Axios:** A promise-based HTTP client for making API requests.
- **Instagram Graph API:** The primary API for interacting with Instagram's messaging and commenting features.

### Third-Party Libraries/Services

- **axios:** For making HTTP requests to the Instagram Graph API.
- **dotenv:** To manage environment variables, allowing secure storage of sensitive information like access tokens.

## Getting Started

### Prerequisites

1. **Node.js** installed on your machine (v14 or higher).
2. An Instagram **Business Account** or **Creator Account** linked to a Facebook Page.
3. A Facebook App with the required permissions:
   - `instagram_basic`
   - `instagram_manage_messages`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/instagram-webhook-messaging.git
   cd instagram-webhook-messaging


Install dependencies:

npm install

Create a .env file in the root of the project and add your Instagram access token and other environment variables:

INSTAGRAM_ACCESS_TOKEN=EAAMsnMaoqYQBO0M7G9RqOc88PoHFH6x0ECs7LTpcKZAVLkCd6e71nCutSEw2GuuA25nzg5cvSJI002rSPXIBB9ZBsDwr0w8QE2OV1yoO5fZBFgFcTyEO4MCJ8oZC1xfL8mfxzDmcXGS2VpZAgd4Wgr9qR2u61TpkKLOObKSZBXKuaLrbBxPGNW1ZCeONZA3AZCfK86axfrFCoFVu0I17wQTYtggcwDRpJvKuteyLu9eEZD
VERIFY_TOKEN=kfffjfjfjddjdjfjfj
PORT=3000
PAGE_ID=399564553248654
PAGE_ACCESS_TOKEN=EAAMsnMaoqYQBO0M7G9RqOc88PoHFH6x0ECs7LTpcKZAVLkCd6e71nCutSEw2GuuA25nzg5cvSJI002rSPXIBB9ZBsDwr0w8QE2OV1yoO5fZBFgFcTyEO4MCJ8oZC1xfL8mfxzDmcXGS2VpZAgd4Wgr9qR2u61TpkKLOObKSZBXKuaLrbBxPGNW1ZCeONZA3AZCfK86axfrFCoFVu0I17wQTYtggcwDRpJvKuteyLu9eEZD


npm start

Webhook Setup
In your Facebook App settings, navigate to Webhooks and configure the callback URL to your server endpoint (e.g., https://yourdomain.com/webhook).
Ensure your server is accessible from the internet (you can use tools like ngrok for testing locally).
S