
# **Sports Booking App**

**College ID:** [IIT2021090]

## **Goal**
Build a booking app for a sports technology company's operations team, providing functionalities to manage multiple sports centers, resources, and customer bookings.

### **Key Features**
1. **Multiple Centers**: Supports multiple sports centers (e.g., Indiranagar, Koramangala).
2. **Multiple Sports per Center**: Each center offers various sports (e.g., badminton, squash).
3. **Multiple Courts/Resources**: Each sport has multiple courts/resources (e.g., badminton has 2 courts, squash has 3 courts).
4. **60-Minute Booking Slots**: Each booking slot is 60 minutes long.
5. **Customer Bookings**: Customers can book slots as per their preference.
6. **Operations Management**: The app allows the operations team to manage bookings for all sports in their facility.
7. **Core Functionality**: Centre managers can **view** and **create** bookings for any sport in their facility.

---

## **Technical Requirements**

### **Data Models**
- Define data models/schemas for:
  - **Centers**
  - **Courts/Resources**
  - **Sports**
  - **Bookings**
- **authentication is implemented**

### **Backend Development**
- Develop APIs to:
  - **View Bookings**: Retrieve bookings for a specific center, sport, and date.
  - **Create Booking**: Allow creating a new booking while preventing double bookings.
- Implement basic error handling and input validation.
- **Authentication**: implemented (e.g., JWT tokens, sessions).

### **Frontend Development**
- Create a user-friendly interface for the operations team to:
  - Select a center and a sport.
  - View bookings for the selected day for all resources (courts) of the selected sport.
  - Create new bookings.

### **Tech Stack Flexibility**
- Build on MERN Stack - MongoDb, ReactJs, Express, NodeJs.

### **Database**
- Used Database  is (MongoDB).

### **Deployment**
- Deploy the application on Onrender.com

---

## **Installation & Setup**

### **Clone the Repository**
```bash
git clone https://github.com/technoayan7/SportsBooking.git
cd SportsBooking
```

### **Backend Setup**
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file for configuration (if applicable):
   ```bash
   touch .env
   ```
   Add your database URI and any other necessary configuration.

4. Start the backend server:
   ```bash
   npm start
   ```

### **Frontend Setup**
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   npm start
   ```

---

## **APIs**

### **Backend APIs**
1. **View Bookings API**
   - **Endpoint**: `GET /api/bookings`
   - **Query Parameters**:
     - `centreId`: The ID of the center.
     - `sportId`: The ID of the sport.
     - `date`: The date for which bookings are fetched.
  
2. **Create Booking API**
   - **Endpoint**: `POST /api/bookings`
   - **Body**: 
     ```json
     {
       "centreId": "string",
       "sportId": "string",
       "courtId": "string",
       "timeSlot": "YYYY-MM-DDTHH:mm:ss"
     }
     ```
   - **Response**: Booking confirmation or error message.

---

## **User Interface**

### **Frontend Features**
1. **Select Facility and Sport**: Dropdowns to select a center and sport.
2. **View Bookings**: Display bookings for the selected day and sport.
3. **Create New Booking**: Allow users to select a time slot and court/resource.

### **Usability**
- Provide feedback for successful operations (e.g., booking confirmation).
- Display error messages for invalid actions (e.g., overlapping bookings).

---

## **Deployed Links**
- **Frontend**: [Frontend Link](https://sportbookings.onrender.com)  
- **Backend**: [Backend Link](https://sportsbooking.onrender.com)

---

## **Assumptions and Limitations**
- Future bookings only can be made (no past bookings).
- Administrative control is manually managed for blocked slots.

---

## **Challenges and Solutions**
- **Double Booking Prevention**: Implemented checks in the API to prevent conflicts.
- **User Experience Improvements**: Simplified UI for ease of use and navigability.

---

## **Future Improvements**
- **Payment Integration**: Implement payment gateway for bookings.
- **Email Notifications**: Send confirmations and reminders via email.
- **User Dashboard**: Enhanced features for administrative control over bookings.

---

