
# Supply Chain Management System

A comprehensive platform for vendors and suppliers to manage their supply chain operations.

## Features

### Vendor Portal
- Dashboard with key metrics and visualizations
- Order management
- Inventory tracking
- Supplier management
- Payment processing
- Real-time messaging with suppliers

### Supplier Portal
- Dashboard with key metrics and visualizations
- Order tracking and management
- Inventory management
- Customer management
- Payment processing
- Real-time messaging with vendors

## Message System
The platform includes a real-time messaging system that allows vendors and suppliers to communicate directly within the application. Key features include:

- Conversation list showing all contacts
- Real-time message exchange
- Message history
- Notification of new messages

## Database Schema
The application uses Supabase as its backend with the following key tables:

- `vendors`: Stores vendor information
- `suppliers`: Stores supplier information
- `products`: Manages product inventory
- `orders`: Tracks order information
- `customers`: Manages customer data
- `payments`: Records payment transactions
- `messages`: Stores communication between vendors and suppliers

## Authentication
The system uses Supabase authentication to secure access to the platform. Users can:
- Register as either a vendor or supplier
- Login with email and password
- Recover forgotten passwords
- Manage their profile information

Each user type has access to different features and views based on their role.
