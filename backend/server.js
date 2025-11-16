//require('dotenv').config(); // Load environment variables from .env file
//const mysql = require('mysql2');
//const express = require('express');
//const cors = require('cors');
//const session = require('express-session');
//const cookieParser = require('cookie-parser');
//const bcrypt = require('bcrypt');
//const moment = require('moment');
//const saltRounds = 10;
//const app = express();
//
//app.use(cors());
//app.use(express.json());
//app.use(cookieParser());
//
//
//
//app.use(session({
//    secret:'default_secret',
//    resave: false,
//    saveUninitialized: false,
//    cookie: {
//        secure: false, 
//        maxAge: 1000 * 60 * 60 * 24 // 24 hours
//    }
//}));
//
//// Database connection
//const db = mysql.createConnection({
//    host: process.env.DB_HOST, 
//    user: process.env.DB_USER,
//    password: process.env.DB_PASSWORD,
//    database: process.env.DB_NAME
//});
//
//// Check if server is running
//app.get('/', (req, res) => {
//    res.send('Server is running');
//});
//
//// Register new user
//app.post('/NewUser', (req, res) => {
//    bcrypt.hash(req.body.Password, saltRounds, (err, hash) => {
//        if (err) return res.status(500).json({ Error: "Error hashing password" });
//
//        const sql = 'INSERT INTO users(FName, LName, Email, Password) VALUES (?, ?, ?, ?)';
//        const values = [req.body.FName, req.body.LName, req.body.Email, hash];
//
//        db.query(sql, values, (err, result) => {
//            if (err) {
//                console.error(err);
//                return res.status(500).json({ Error: "Error inserting new user" });
//            }
//            return res.status(201).json(result);
//        });
//    });
//});
//
//// Update User Profile Route (without password)
//app.post('/updateUser', (req, res) => {
//    const { userId, address, gender, dob, phone } = req.body;
//  
//    // Check if userId is provided
//    if (!userId) {
//      return res.status(400).json({ Error: 'User ID is required' });
//    }
//  
//    // Prepare SQL query and values for inserting the profile details
//    const sql = 'INSERT INTO user_profile (user_id, address, gender, dob, phone) VALUES (?, ?, ?, ?, ?)';
//    const values = [userId, address, gender, dob, phone];
//  
//    // Insert user profile details
//    db.query(sql, values, (err, result) => {
//      if (err) {
//        console.error('Error inserting user profile:', err);
//        return res.status(500).json({ Error: 'Error inserting user profile' });
//      }
//  
//      return res.status(201).json({ message: 'User profile inserted successfully' });
//    });
//  });
//  app.put('/updateUser/:id', (req, res) => {
//    const { address, gender, dob, phone } = req.body;
//    const userId = req.params.id;
//  
//    // Check if userId is provided
//    if (!userId) {
//      return res.status(400).json({ Error: 'User ID is required' });
//    }
//  
//    // Validate the input fields (optional)
//    if (!address || !gender || !dob || !phone) {
//      return res.status(400).json({ Error: 'All fields are required' });
//    }
//  
//    // Prepare SQL query to check if the profile already exists
//    const checkSql = 'SELECT * FROM user_profile WHERE user_id = ?';
//    
//    // Check if profile exists
//    db.query(checkSql, [userId], (err, results) => {
//      if (err) {
//        console.error('Error checking user profile:', err);
//        return res.status(500).json({ Error: 'Error checking user profile' });
//      }
//  
//      // If profile does not exist, return an error
//      if (results.length === 0) {
//        return res.status(404).json({ Error: 'User profile not found' });
//      }
//  
//      // Profile exists, proceed to update it
//      const updateSql = 'UPDATE user_profile SET address = ?, gender = ?, dob = ?, phone = ? WHERE user_id = ?';
//      const values = [address, gender, dob, phone, userId];
//  
//      // Execute the update query
//      db.query(updateSql, values, (err, result) => {
//        if (err) {
//          console.error('Error updating user profile:', err);
//          return res.status(500).json({ Error: 'Error updating user profile' });
//        }
//  
//        return res.status(200).json({ message: 'User profile updated successfully' });
//      });
//    });
//  });
//  
//  
//  app.get('/userprofile', (req, res) => {
//    // Get the user id from the query string or parameters
//    const userId = req.query.id;  // Use req.params.id if it's in the URL path
//    
//    // Check if the userId is provided
//    if (!userId) {
//      return res.status(400).json({ message: "User ID is required" });
//    }
//  
//    // SQL query to fetch the user profile by user id
//    const sql = "SELECT * FROM user_profile WHERE user_id = ?";
//  
//    // Execute the query
//    db.query(sql, [userId], (err, result) => {
//      if (err) {
//        // Handle error if the query fails
//        console.error("Error fetching user profile:", err);
//        return res.status(500).json({ message: "Error fetching user profile" });
//      }
//  
//      // If no result found, return a 404 response
//      if (result.length === 0) {
//        return res.status(404).json({ message: "User profile not found" });
//      }
//  
//      // Send the result of the query as the response
//      return res.status(200).json({ profile: result[0] });
//    });
//  });
//  
//
////get users 
//app.get('/user', (req, res) => {
//    const sql = "SELECT * FROM users";
//    db.query(sql, (err, result) => {
//        if (err) {
//            console.error('Error fetching users:', err);
//            return res.status(500).json({ error: 'Error fetching users' });
//        }
//        res.status(200).json(result);
//    });
//});
////get user and product 
//app.get('/userinfo', (req, res) => {
//    // SQL query to join users, orders, and order_items tables, and filter by role 'user'
//    const sql = `
//        SELECT users.*, orders.*, order_items.Product_name, order_items.Quantity, order_items.Price, order_items.Subtotal
//        FROM users
//        JOIN orders ON users.id = orders.Id
//        JOIN order_items ON orders.Id = order_items.Order_id
//        WHERE users.role = 'user';  -- Filtering by role 'user'
//    `;
//
//    db.query(sql, (err, result) => {
//        if (err) {
//            console.error('Error fetching users, orders, and order items:', err);
//            return res.status(500).json({ error: 'Error fetching users, orders, and order items' });
//        }
//        res.status(200).json(result);
//    });
//});
//app.get('/customerinfo', (req, res) => {
//    // SQL query to join orders and order_items tables
//    const sql = `
//        SELECT orders.*, order_items.Product_name, order_items.Quantity, order_items.Price, order_items.Subtotal
//        FROM orders
//        JOIN order_items ON orders.Id = order_items.Order_id;
//    `;
//
//    db.query(sql, (err, result) => {
//        if (err) {
//            console.error('Error fetching orders and order items:', err);
//            return res.status(500).json({ error: 'Error fetching orders and order items' });
//        }
//        res.status(200).json(result);
//    });
//});
//
//app.delete('/deleteuser/:id', (req, res) => {
//    const userId = req.params.id;
//
//    // SQL query to delete the user from the users table
//    const sql = `
//        DELETE FROM users WHERE id = ?;
//    `;
//    db.query(sql, [userId], (err, result) => {
//        if (err) {
//            console.error('Error deleting user:', err);
//            return res.status(500).json({ error: 'Error deleting user' });
//        }
//
//        if (result.affectedRows > 0) {
//            res.status(200).json({ message: `User with ID ${userId} deleted successfully.` });
//        } else {
//            res.status(404).json({ message: 'User not found.' });
//        }
//    });
//});
//app.delete('/deleteform/:id', (req, res) => {
//    const userId = req.params.id;
//
//    // SQL query to delete the user from the users table
//    const sql = `
//        DELETE FROM form WHERE id = ?;
//    `;
//    db.query(sql, [userId], (err, result) => {
//        if (err) {
//            console.error('Error deleting user:', err);
//            return res.status(500).json({ error: 'Error deleting user' });
//        }
//
//        if (result.affectedRows > 0) {
//            res.status(200).json({ message: `User with ID ${userId} deleted successfully.` });
//        } else {
//            res.status(404).json({ message: 'User not found.' });
//        }
//    });
//});
//app.delete('/deleteforms/:id', (req, res) => {
//    const userId = req.params.id;
//
//    // SQL query to delete the user from the users table
//    const sql = `
//        DELETE FROM forms WHERE id = ?;
//    `;
//    db.query(sql, [userId], (err, result) => {
//        if (err) {
//            console.error('Error deleting user:', err);
//            return res.status(500).json({ error: 'Error deleting user' });
//        }
//
//        if (result.affectedRows > 0) {
//            res.status(200).json({ message: `User with ID ${userId} deleted successfully.` });
//        } else {
//            res.status(404).json({ message: 'User not found.' });
//        }
//    });
//});
//app.delete('/deletecustomer/:id', (req, res) => {
//    const userId = req.params.id;
//
//    const deleteOrders = `DELETE FROM orders WHERE Id = ?`;
//    db.query(deleteOrders, [userId], (err, result) => {
//        if (err) {
//            console.error('Error deleting user:', err);
//            return res.status(500).json({ error: 'Error deleting user' });
//        }
//
//        if (result.affectedRows > 0) {
//            res.status(200).json({ message: `User with ID ${userId} deleted successfully.` });
//        } else {
//            res.status(404).json({ message: 'User not found.' });
//        }
//    });
//});
//
//// Login
//app.post('/login', (req, res) => {
//    const sql = 'select * from users Where Email = ?';
//    db.query(sql, [req.body.Email], (err, result) => {
//        if (err) return res.status(500).json({ Message: "Error querying database" });
//
//        if (result.length > 0) {
//            const user = result[0];
//            bcrypt.compare(req.body.Password, user.Password, (err, match) => {
//                if (err) return res.status(500).json({ Message: "Error comparing passwords" });
//
//                if (match) {
//                    req.session.user_id = user.id;
//                    const role = user.role;  // Assuming the `role` field is stored in the `users` table
//                    return res.status(200).json({
//                        Login: true,
//                        user_session_id: req.session.user_id,
//                        role: role // Add the role to the response
//                    });
//                } else {
//                    return res.status(401).json({ Login: false, Message: 'Incorrect password' });
//                }
//            });
//        } else {
//            return res.status(404).json({ Login: false, Message: 'Email does not exist' });
//        }
//    });
//});
//
//// Check if email exists
//app.post('/check-email', async (req, res) => {
//    const { Email } = req.body;
//
//    try {
//        const user = await new Promise((resolve, reject) => {
//            db.query('SELECT * FROM users WHERE Email = ?', [Email], (err, result) => {
//                if (err) reject(err);
//                else resolve(result);
//            });
//        });
//
//        if (user.length > 0) {
//            return res.status(200).json({ exists: true });
//        } else {
//            return res.status(200).json({ exists: false });
//        }
//    } catch (err) {
//        console.error(err);
//        res.status(500).json({ message: 'Server error' });
//    }
//});
//
//// Fetch user data
//app.get('/userdata', (req, res) => {
//    const sql = 'SELECT FName,LName, Email,Password FROM users WHERE id = ?';
//    db.query(sql, [req.query.id], (err, result) => {
//        if (err) {
//            console.error(err.message);
//            res.status(500).json({ error: 'Error fetching user data' });
//        } else {
//            if (result.length > 0) {
//                res.status(200).json({ user: result[0] });
//            } else {
//                res.status(404).json({ error: 'User not found' });
//            }
//        }
//    });
//});
//
//// Fetch admin data
//app.get('/admindata', (req, res) => {
//    const sql = 'SELECT FName, Email FROM users WHERE id = ?';
//    db.query(sql, [req.query.id], (err, result) => {
//        if (err) {
//            console.error(err.message);
//            return res.status(500).json({ error: 'Error fetching admin data' });
//        }
//
//        if (result.length > 0) {
//            return res.status(200).json({ admin: result[0] });
//        } else {
//            return res.status(404).json({ error: 'Admin not found' });
//        }
//    });
//});
//// Contact form submission
//app.post('/Contact', (req, res) => {
//    const sql = 'INSERT INTO contactus(username, email, number, message) VALUES (?, ?, ?, ?)';
//    const values = [req.body.username, req.body.email, req.body.number, req.body.message];
//    db.query(sql, values, (err, data) => {
//        if (err) {
//            return res.status(500).json('Error');
//        }
//        return res.status(201).json(data);
//    });
//});
//
//app.get('/Contact', (req, res) => {
//    const sql = 'SELECT * FROM contactus';
//    
//    db.query(sql, (err, result) => {
//        if (err) {
//            return res.status(500).json({ error: 'Error fetching contact data' });
//        }
//        return res.status(200).json(result);
//    });
//});
//app.delete('/Contact/:id', (req, res) => {
//    const { id } = req.params;
//    const sql = 'DELETE FROM contactus WHERE id = ?';
//
//    db.query(sql, [id], (err, result) => {
//        if (err) {
//            console.error('Error deleting contact data:', err);
//            return res.status(500).json({ error: 'Error deleting contact data' });
//        }
//
//        if (result.affectedRows === 0) {
//            return res.status(404).json({ message: 'Contact not found' });
//        }
//
//        return res.status(200).json({ message: 'Contact deleted successfully' });
//    });
//});
//
//
//// Form submission
//app.post('/form', (req, res) => {
//    const { name, mobile, email, address, location, garden_service, garden_area, price } = req.body;
//  
//    if (!name || !mobile || !email || !address || !location || !garden_service || !garden_area || !price) {
//      return res.status(400).json({ message: 'All fields are required' });
//    }
//  
//    const sql = 'INSERT INTO form SET ?';
//    const values = { name, mobile, email, address, location, garden_service, garden_area, price };
//  
//    db.query(sql, values, (err, result) => {
//      if (err) {
//        console.error(err);
//        return res.status(500).json({ message: 'Server error' });
//      }
//      res.status(200).json({ message: 'Data saved successfully' });
//    });
//  });   
//
//  app.get('/form', (req, res) => {
//    const sql = 'SELECT * FROM form';
//
//    db.query(sql, (err, result) => {
//        if (err) {
//            console.error('Error fetching form data:', err);
//            return res.status(500).json({ message: 'Server error' });
//        }
//        res.status(200).json(result);
//    });
//});
//
//  app.get('/form/:email', (req, res) => {
//    const { email } = req.params;  // Fetch email from URL params
//    const sql = 'SELECT * FROM form WHERE email = ?';
//
//    db.query(sql, [email], (err, result) => {
//        if (err) {
//            console.error('Error fetching service data:', err);
//            return res.status(500).json({ error: 'Error fetching service data' });
//        }
//        if (result.length === 0) {
//            return res.status(404).json({ message: 'Service not found' });
//        }
//        res.status(200).json(result);
//    });
//});
//
//// Another form submission
//app.post('/forms', (req, res) => {
//    const { name, mobile, email, address, location, garden_area, garden_service, price } = req.body;
//    const sql = 'INSERT INTO Forms (name, mobile, email, address, location, garden_area, garden_service, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
//    const values = [name, mobile, email, address, location, garden_area, garden_service, price];
//    db.query(sql, values, (err, result) => {
//        if (err) {
//            console.error('Error inserting form data:', err);
//            return res.status(500).json({ error: 'Error inserting form data' });
//        }
//        console.log('Form data inserted successfully');
//        return res.status(200).json({ message: 'Form data inserted successfully', result });
//    });
//});
//app.get('/forms', (req, res) => {
//    const sql = 'SELECT * FROM Forms';
//
//    db.query(sql, (err, result) => {
//        if (err) {
//            console.error('Error fetching form data:', err);
//            return res.status(500).json({ error: 'Error fetching form data' });
//        }
//        res.status(200).json(result);
//    });
//});
//
//app.get('/forms/:email', (req, res) => {
//    const { email } = req.params;  // Fetch email from URL params
//    const sql = 'SELECT * FROM forms WHERE email = ?';
//
//    db.query(sql, [email], (err, result) => {
//        if (err) {
//            console.error('Error fetching service data:', err);
//            return res.status(500).json({ error: 'Error fetching service data' });
//        }
//        if (result.length === 0) {
//            return res.status(404).json({ message: 'Service not found' });
//        }
//        res.status(200).json(result);
//    });
//});
//
//// Register new admin
//app.post('/newadmin', (req, res) => {
//    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
//        if (err) return res.status(500).json({ Error: "Error hashing password" });
//
//        const sql = 'INSERT INTO admin(adminName, adminEmail, password) VALUES (?, ?, ?)';
//        const values = [req.body.adminName, req.body.adminEmail, hash];
//        db.query(sql, values, (err, result) => {
//            if (err) return res.status(500).json('Error');
//            return res.status(201).json(result);
//        });
//    });
//});
//
//// Admin login
//app.post('/admin', (req, res) => {
//    const sql = 'SELECT * FROM users WHERE id = ?';
//    db.query(sql, [req.body.Email], (err, result) => {
//        console.log(req.body?.adminEmail);
//        if (err) return res.status(500).json({ Message: 'Error querying database' });
//
//        if (result.length > 0) {
//            const admin = result[0];
//            bcrypt.compare(req.body.Password, admin.Password, (err, match) => {
//                if (err) return res.status(500).json({ Message: 'Error comparing passwords' });
//
//                if (match) {
//                    req.session.admin_id = admin.id;
//                    console.log(req.session?.admin_id);
//                    return res.status(200).json({ Login: true, admin_session_id: req.session.admin_id });
//                } else {
//                    return res.status(401).json({ Login: false });
//                }
//            });
//        } else {
//            return res.status(404).json({ Login: false });
//        }
//    });
//});
//app.get('/admin', (req, res) => {
//    // Ensure that Email and Password are passed as query parameters in the URL
//    const { Email, Password } = req.query;
//
//    // If either Email or Password is missing, return an error
//    if (!Email || !Password) {
//        return res.status(400).json({ Message: 'Email and Password are required' });
//    }
//
//    const sql = 'SELECT * FROM users WHERE id = ?';
//    db.query(sql, [Email], (err, result) => {
//        if (err) return res.status(500).json({ Message: 'Error querying database' });
//
//        if (result.length > 0) {
//            const admin = result[0];
//            bcrypt.compare(Password, admin.Password, (err, match) => {
//                if (err) return res.status(500).json({ Message: 'Error comparing passwords' });
//
//                if (match) {
//                    req.session.admin_id = admin.id;
//                    return res.status(200).json({ Login: true, admin_session_id: req.session.admin_id });
//                } else {
//                    return res.status(401).json({ Login: false });
//                }
//            });
//        } else {
//            return res.status(404).json({ Login: false });
//        }
//    });
//});
//
//// Fetch plant data
//app.get('/plants', (req, res) => {
//    const sql = 'SELECT * FROM plants'; // Adjust SQL query as needed
//    db.query(sql, (err, result) => {
//        if (err) {
//            console.error('Error fetching plant data:', err);
//            return res.status(500).json({ error: 'Error fetching plant data' });
//        }else{
//         return res.status(200).json(result);
//        }
//    });
//});
//
//app.get('/GardeningTools',(req,res)=>{
//    const sql = "SELECT * FROM GardeningTools";
//    db.query(sql,(err,result)=>{
//        if(err){
//            console.error("Error fetching Tools data:",err);
//            return res.status(500).json({error:"Error fetching tools data"});
//        }
//        return res.status(200).json(result);
//       
//    })
//})
//app.post("/orders", (req, res) => {
//    const { FName, LName, Email, Phone, Address, Total_price, Discount, Final_price, items } = req.body;
//  
//    // Insert into Orders table
//    const orderQuery = `
//      INSERT INTO Orders (FName, LName, Email, Phone, Address, Total_price, Discount, Final_price) 
//      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
//  
//    db.query(orderQuery, [FName, LName, Email, Phone, Address, Total_price, Discount, Final_price], (err, result) => {
//      if (err) {
//        console.error("Error inserting order:", err);
//        return res.status(500).json({ error: "Database error while inserting order" });
//      }
//  
//      const orderId = result.insertId; // Get last inserted order ID
//  
//      // Insert order items
//      const itemQuery = `INSERT INTO Order_items (Order_id, Product_name, Quantity, Price, Subtotal) VALUES ?`;
//      const values = items.map(item => [orderId, item.Product_name, item.Quantity, item.Price, item.Subtotal]);
//  
//      db.query(itemQuery, [values], (err) => {
//        if (err) {
//          console.error("Error inserting order items:", err);
//          return res.status(500).json({ error: "Database error while inserting order items" });
//        }
//        res.status(201).json({ message: "Order placed successfully!", orderId });
//      });
//    });
//  });
//  
//  // Fetch all Orders
//  app.get("/order", (req, res) => {
//    const query = `SELECT * FROM Orders`;
//    db.query(query, (err, results) => {
//      if (err) {
//        console.error("Error fetching orders:", err);
//        return res.status(500).json({ error: "Database error while fetching orders" });
//      }
//      res.json(results);
//    });
//  });
//   // Import moment.js to format the date
//
//  app.get("/orders", (req, res) => {
//    const email = req.query.email; // Get email from query parameters
//  
//    // Updated query to join Orders and Order_items tables
//    const query = `
//      SELECT 
//        Orders.Id AS OrderID,
//        Orders.Email AS OrderEmail,
//        Orders.Total_price,
//        Orders.Final_price,
//        Orders.Phone,
//        Orders.Created_at,
//        Order_items.Id AS ItemID,
//        Order_items.Product_name,
//        Order_items.Quantity,
//        Order_items.Price,
//        Order_items.Subtotal
//      FROM Orders
//      JOIN Order_items ON Orders.Id = Order_items.Order_id
//      WHERE Orders.Email = ?
//    `;
//  
//    db.query(query, [email], (err, results) => {
//      if (err) {
//        console.error("Error fetching orders:", err);
//        return res.status(500).json({ error: "Database error while fetching orders" });
//      }
//  
//      // Process results to group items by order
//      const orders = [];
//      results.forEach(row => {
//        const existingOrder = orders.find(order => order.OrderID === row.OrderID);
//        if (existingOrder) {
//          // Add item details to the existing order
//          existingOrder.order_items.push({
//            ItemID: row.ItemID,
//            Product_name: row.Product_name,
//            Quantity: row.Quantity,
//            Price: row.Price,
//            Subtotal: row.Subtotal,
//          });
//        } else {
//          // Create a new order with the item details
//          orders.push({
//            OrderID: row.OrderID,
//            Email: row.OrderEmail,
//            Phone: row.Phone,
//            Total_price: row.Total_price,
//            Final_price: row.Final_price,
//            Created_at: moment(row.Created_at).format('YYYY-MM-DD'),  // Format the date
//            order_items: [{
//              ItemID: row.ItemID,
//              Product_name: row.Product_name,
//              Quantity: row.Quantity,
//              Price: row.Price,
//              Subtotal: row.Subtotal,
//            }],
//          });
//        }
//      });
//  
//      // Handle case where no orders are found
//      if (orders.length === 0) {
//        return res.status(404).json({ message: "No orders found for this email." });
//      }
//  
//      res.json(orders); // Return the grouped orders with their items
//    });
//  });
//  
//
//  // Fetch Single Order with Items
//  app.get("/orders/:id", (req, res) => {
//    const orderId = req.params.id;
//  
//    const orderQuery = `SELECT * FROM Orders WHERE Id = ?`;
//    const itemsQuery = `SELECT * FROM Order_items WHERE Order_id = ?`;
//  
//    db.query(orderQuery, [orderId], (err, orderResult) => {
//      if (err || orderResult.length === 0) {
//        return res.status(404).json({ error: "Order not found" });
//      }
//  
//      db.query(itemsQuery, [orderId], (err, itemsResult) => {
//        if (err) {
//          return res.status(500).json({ error: "Error fetching order items" });
//        }
//        res.json({ order: orderResult[0], items: itemsResult });
//      });
//    });
//  });
//
//// Start the server
//app.listen(8080, () => {
//    console.log('Server is running on port 8080');
//});
//

require('dotenv').config(); // Load environment variables from .env file
const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const moment = require('moment');
const saltRounds = 10;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());



app.use(session({
    secret:'default_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, 
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
    }
}));

// Database connection
const db = new Pool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432
});

// Check if server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Register new user
app.post('/NewUser', (req, res) => {
    bcrypt.hash(req.body.Password, saltRounds, (err, hash) => {
        if (err) return res.status(500).json({ Error: "Error hashing password" });

        const sql = 'INSERT INTO users(FName, LName, Email, Password) VALUES ($1, $2, $3, $4)';
        const values = [req.body.FName, req.body.LName, req.body.Email, hash];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ Error: "Error inserting new user" });
            }
            return res.status(201).json(result);
        });
    });
});

// Update User Profile Route (without password)
app.post('/updateUser', (req, res) => {
    const { userId, address, gender, dob, phone } = req.body;
  
    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ Error: 'User ID is required' });
    }
  
    // Prepare SQL query and values for inserting the profile details
    const sql = 'INSERT INTO user_profile (user_id, address, gender, dob, phone) VALUES ($1, $2, $3, $4, $5)';
    const values = [userId, address, gender, dob, phone];
  
    // Insert user profile details
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting user profile:', err);
        return res.status(500).json({ Error: 'Error inserting user profile' });
      }
  
      return res.status(201).json({ message: 'User profile inserted successfully' });
    });
  });
  app.put('/updateUser/:id', (req, res) => {
    const { address, gender, dob, phone } = req.body;
    const userId = req.params.id;
  
    // Check if userId is provided
    if (!userId) {
      return res.status(400).json({ Error: 'User ID is required' });
    }
  
    // Validate the input fields (optional)
    if (!address || !gender || !dob || !phone) {
      return res.status(400).json({ Error: 'All fields are required' });
    }
  
    // Prepare SQL query to check if the profile already exists
    const checkSql = 'SELECT * FROM user_profile WHERE user_id = $1';
    
    // Check if profile exists
    db.query(checkSql, [userId], (err, results) => {
      if (err) {
        console.error('Error checking user profile:', err);
        return res.status(500).json({ Error: 'Error checking user profile' });
      }
  
      // If profile does not exist, return an error
      if (results.rows.length === 0) {
        return res.status(404).json({ Error: 'User profile not found' });
      }
  
      // Profile exists, proceed to update it
      const updateSql = 'UPDATE user_profile SET address = $1, gender = $2, dob = $3, phone = $4 WHERE user_id = $5';
      const values = [address, gender, dob, phone, userId];
  
      // Execute the update query
      db.query(updateSql, values, (err, result) => {
        if (err) {
          console.error('Error updating user profile:', err);
          return res.status(500).json({ Error: 'Error updating user profile' });
        }
  
        return res.status(200).json({ message: 'User profile updated successfully' });
      });
    });
  });
  
  
  app.get('/userprofile', (req, res) => {
    // Get the user id from the query string or parameters
    const userId = req.query.id;  // Use req.params.id if it's in the URL path
    
    // Check if the userId is provided
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
  
    // SQL query to fetch the user profile by user id
    const sql = "SELECT * FROM user_profile WHERE user_id = $1";
  
    // Execute the query
    db.query(sql, [userId], (err, result) => {
      if (err) {
        // Handle error if the query fails
        console.error("Error fetching user profile:", err);
        return res.status(500).json({ message: "Error fetching user profile" });
      }
  
      // If no result found, return a 404 response
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "User profile not found" });
      }
  
      // Send the result of the query as the response
      return res.status(200).json({ profile: result.rows[0] });
    });
  });
  

//get users 
app.get('/user', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({ error: 'Error fetching users' });
        }
        res.status(200).json(result.rows);
    });
});
//get user and product 
app.get('/userinfo', (req, res) => {
    // SQL query to join users, orders, and order_items tables, and filter by role 'user'
    const sql = `
        SELECT users.*, orders.*, order_items.Product_name, order_items.Quantity, order_items.Price, order_items.Subtotal
        FROM users
        JOIN orders ON users.id = orders.Id
        JOIN order_items ON orders.Id = order_items.Order_id
        WHERE users.role = 'user'
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching users, orders, and order items:', err);
            return res.status(500).json({ error: 'Error fetching users, orders, and order items' });
        }
        res.status(200).json(result.rows);
    });
});
app.get('/customerinfo', (req, res) => {
    // SQL query to join orders and order_items tables
    const sql = `
        SELECT orders.*, order_items.Product_name, order_items.Quantity, order_items.Price, order_items.Subtotal
        FROM orders
        JOIN order_items ON orders.Id = order_items.Order_id
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching orders and order items:', err);
            return res.status(500).json({ error: 'Error fetching orders and order items' });
        }
        res.status(200).json(result.rows);
    });
});

app.delete('/deleteuser/:id', (req, res) => {
    const userId = req.params.id;

    // SQL query to delete the user from the users table
    const sql = `DELETE FROM users WHERE id = $1`;
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Error deleting user' });
        }

        if (result.rowCount > 0) {
            res.status(200).json({ message: `User with ID ${userId} deleted successfully.` });
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    });
});
app.delete('/deleteform/:id', (req, res) => {
    const userId = req.params.id;

    // SQL query to delete the user from the users table
    const sql = `DELETE FROM form WHERE id = $1`;
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Error deleting user' });
        }

        if (result.rowCount > 0) {
            res.status(200).json({ message: `User with ID ${userId} deleted successfully.` });
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    });
});
app.delete('/deleteforms/:id', (req, res) => {
    const userId = req.params.id;

    // SQL query to delete the user from the users table
    const sql = `DELETE FROM forms WHERE id = $1`;
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Error deleting user' });
        }

        if (result.rowCount > 0) {
            res.status(200).json({ message: `User with ID ${userId} deleted successfully.` });
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    });
});
app.delete('/deletecustomer/:id', (req, res) => {
    const userId = req.params.id;

    const deleteOrders = `DELETE FROM orders WHERE Id = $1`;
    db.query(deleteOrders, [userId], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Error deleting user' });
        }

        if (result.rowCount > 0) {
            res.status(200).json({ message: `User with ID ${userId} deleted successfully.` });
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    });
});

// Login
app.post('/login', (req, res) => {
    const sql = 'select * from users Where Email = $1';
    db.query(sql, [req.body.Email], (err, result) => {
        if (err) return res.status(500).json({ Message: "Error querying database" });

        if (result.rows.length > 0) {
            const user = result.rows[0];
            bcrypt.compare(req.body.Password, user.password, (err, match) => {
                if (err) return res.status(500).json({ Message: "Error comparing passwords" });

                if (match) {
                    req.session.user_id = user.id;
                    const role = user.role;  // Assuming the `role` field is stored in the `users` table
                    return res.status(200).json({
                        Login: true,
                        user_session_id: req.session.user_id,
                        role: role // Add the role to the response
                    });
                } else {
                    return res.status(401).json({ Login: false, Message: 'Incorrect password' });
                }
            });
        } else {
            return res.status(404).json({ Login: false, Message: 'Email does not exist' });
        }
    });
});

// Check if email exists
app.post('/check-email', async (req, res) => {
    const { Email } = req.body;

    try {
        const result = await db.query('SELECT * FROM users WHERE Email = $1', [Email]);

        if (result.rows.length > 0) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch user data
app.get('/userdata', (req, res) => {
    const sql = 'SELECT FName,LName, Email,Password FROM users WHERE id = $1';
    db.query(sql, [req.query.id], (err, result) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Error fetching user data' });
        } else {
            if (result.rows.length > 0) {
                res.status(200).json({ user: result.rows[0] });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        }
    });
});

// Fetch admin data
app.get('/admindata', (req, res) => {
    const sql = 'SELECT FName, Email FROM users WHERE id = $1';
    db.query(sql, [req.query.id], (err, result) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Error fetching admin data' });
        }

        if (result.rows.length > 0) {
            return res.status(200).json({ admin: result.rows[0] });
        } else {
            return res.status(404).json({ error: 'Admin not found' });
        }
    });
});
// Contact form submission
app.post('/Contact', (req, res) => {
    const sql = 'INSERT INTO contactus(username, email, number, message) VALUES ($1, $2, $3, $4)';
    const values = [req.body.username, req.body.email, req.body.number, req.body.message];
    db.query(sql, values, (err, data) => {
        if (err) {
            return res.status(500).json('Error');
        }
        return res.status(201).json(data);
    });
});

app.get('/Contact', (req, res) => {
    const sql = 'SELECT * FROM contactus';
    
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching contact data' });
        }
        return res.status(200).json(result.rows);
    });
});
app.delete('/Contact/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM contactus WHERE id = $1';

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting contact data:', err);
            return res.status(500).json({ error: 'Error deleting contact data' });
        }

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        return res.status(200).json({ message: 'Contact deleted successfully' });
    });
});


// Form submission
app.post('/form', (req, res) => {
    const { name, mobile, email, address, location, garden_service, garden_area, price } = req.body;
  
    if (!name || !mobile || !email || !address || !location || !garden_service || !garden_area || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    const sql = 'INSERT INTO form (name, mobile, email, address, location, garden_service, garden_area, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [name, mobile, email, address, location, garden_service, garden_area, price];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
      res.status(200).json({ message: 'Data saved successfully' });
    });
  });   

  app.get('/form', (req, res) => {
    const sql = 'SELECT * FROM form';

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching form data:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.status(200).json(result.rows);
    });
});

  app.get('/form/:email', (req, res) => {
    const { email } = req.params;  // Fetch email from URL params
    const sql = 'SELECT * FROM form WHERE email = $1';

    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error('Error fetching service data:', err);
            return res.status(500).json({ error: 'Error fetching service data' });
        }
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json(result.rows);
    });
});

// Another form submission
app.post('/forms', (req, res) => {
    const { name, mobile, email, address, location, garden_area, garden_service, price } = req.body;
    const sql = 'INSERT INTO Forms (name, mobile, email, address, location, garden_area, garden_service, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [name, mobile, email, address, location, garden_area, garden_service, price];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting form data:', err);
            return res.status(500).json({ error: 'Error inserting form data' });
        }
        console.log('Form data inserted successfully');
        return res.status(200).json({ message: 'Form data inserted successfully', result });
    });
});
app.get('/forms', (req, res) => {
    const sql = 'SELECT * FROM Forms';

    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching form data:', err);
            return res.status(500).json({ error: 'Error fetching form data' });
        }
        res.status(200).json(result.rows);
    });
});

app.get('/forms/:email', (req, res) => {
    const { email } = req.params;  // Fetch email from URL params
    const sql = 'SELECT * FROM forms WHERE email = $1';

    db.query(sql, [email], (err, result) => {
        if (err) {
            console.error('Error fetching service data:', err);
            return res.status(500).json({ error: 'Error fetching service data' });
        }
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json(result.rows);
    });
});

// Register new admin
app.post('/newadmin', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) return res.status(500).json({ Error: "Error hashing password" });

        const sql = 'INSERT INTO admin(adminName, adminEmail, password) VALUES ($1, $2, $3)';
        const values = [req.body.adminName, req.body.adminEmail, hash];
        db.query(sql, values, (err, result) => {
            if (err) return res.status(500).json('Error');
            return res.status(201).json(result);
        });
    });
});

// Admin login
app.post('/admin', (req, res) => {
    const sql = 'SELECT * FROM users WHERE id = $1';
    db.query(sql, [req.body.Email], (err, result) => {
        console.log(req.body?.adminEmail);
        if (err) return res.status(500).json({ Message: 'Error querying database' });

        if (result.rows.length > 0) {
            const admin = result.rows[0];
            bcrypt.compare(req.body.Password, admin.password, (err, match) => {
                if (err) return res.status(500).json({ Message: 'Error comparing passwords' });

                if (match) {
                    req.session.admin_id = admin.id;
                    console.log(req.session?.admin_id);
                    return res.status(200).json({ Login: true, admin_session_id: req.session.admin_id });
                } else {
                    return res.status(401).json({ Login: false });
                }
            });
        } else {
            return res.status(404).json({ Login: false });
        }
    });
});
app.get('/admin', (req, res) => {
    // Ensure that Email and Password are passed as query parameters in the URL
    const { Email, Password } = req.query;

    // If either Email or Password is missing, return an error
    if (!Email || !Password) {
        return res.status(400).json({ Message: 'Email and Password are required' });
    }

    const sql = 'SELECT * FROM users WHERE id = $1';
    db.query(sql, [Email], (err, result) => {
        if (err) return res.status(500).json({ Message: 'Error querying database' });

        if (result.rows.length > 0) {
            const admin = result.rows[0];
            bcrypt.compare(Password, admin.password, (err, match) => {
                if (err) return res.status(500).json({ Message: 'Error comparing passwords' });

                if (match) {
                    req.session.admin_id = admin.id;
                    return res.status(200).json({ Login: true, admin_session_id: req.session.admin_id });
                } else {
                    return res.status(401).json({ Login: false });
                }
            });
        } else {
            return res.status(404).json({ Login: false });
        }
    });
});

// Fetch plant data
app.get('/plants', (req, res) => {
    const sql = 'SELECT * FROM plants'; // Adjust SQL query as needed
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching plant data:', err);
            return res.status(500).json({ error: 'Error fetching plant data' });
        }else{
         return res.status(200).json(result.rows);
        }
    });
});

app.get('/GardeningTools',(req,res)=>{
    const sql = "SELECT * FROM GardeningTools";
    db.query(sql,(err,result)=>{
        if(err){
            console.error("Error fetching Tools data:",err);
            return res.status(500).json({error:"Error fetching tools data"});
        }
        return res.status(200).json(result.rows);
       
    })
})
app.post("/orders", (req, res) => {
    const { FName, LName, Email, Phone, Address, Total_price, Discount, Final_price, items } = req.body;
  
    // Insert into Orders table
    const orderQuery = `
      INSERT INTO Orders (FName, LName, Email, Phone, Address, Total_price, Discount, Final_price) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING Id`;
  
    db.query(orderQuery, [FName, LName, Email, Phone, Address, Total_price, Discount, Final_price], (err, result) => {
      if (err) {
        console.error("Error inserting order:", err);
        return res.status(500).json({ error: "Database error while inserting order" });
      }
  
      const orderId = result.rows[0].id; // Get last inserted order ID
  
      // Insert order items
      const itemQuery = `INSERT INTO Order_items (Order_id, Product_name, Quantity, Price, Subtotal) VALUES ($1, $2, $3, $4, $5)`;
      
      let completed = 0;
      items.forEach(item => {
        db.query(itemQuery, [orderId, item.Product_name, item.Quantity, item.Price, item.Subtotal], (err) => {
          if (err) {
            console.error("Error inserting order items:", err);
            return res.status(500).json({ error: "Database error while inserting order items" });
          }
          completed++;
          if (completed === items.length) {
            res.status(201).json({ message: "Order placed successfully!", orderId });
          }
        });
      });
    });
  });
  
  // Fetch all Orders
  app.get("/order", (req, res) => {
    const query = `SELECT * FROM Orders`;
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching orders:", err);
        return res.status(500).json({ error: "Database error while fetching orders" });
      }
      res.json(results.rows);
    });
  });
   // Import moment.js to format the date

  app.get("/orders", (req, res) => {
    const email = req.query.email; // Get email from query parameters
  
    // Updated query to join Orders and Order_items tables
    const query = `
      SELECT 
        Orders.Id AS OrderID,
        Orders.Email AS OrderEmail,
        Orders.Total_price,
        Orders.Final_price,
        Orders.Phone,
        Orders.Created_at,
        Order_items.Id AS ItemID,
        Order_items.Product_name,
        Order_items.Quantity,
        Order_items.Price,
        Order_items.Subtotal
      FROM Orders
      JOIN Order_items ON Orders.Id = Order_items.Order_id
      WHERE Orders.Email = $1
    `;
  
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error("Error fetching orders:", err);
        return res.status(500).json({ error: "Database error while fetching orders" });
      }
  
      // Process results to group items by order
      const orders = [];
      results.rows.forEach(row => {
        const existingOrder = orders.find(order => order.OrderID === row.orderid);
        if (existingOrder) {
          // Add item details to the existing order
          existingOrder.order_items.push({
            ItemID: row.itemid,
            Product_name: row.product_name,
            Quantity: row.quantity,
            Price: row.price,
            Subtotal: row.subtotal,
          });
        } else {
          // Create a new order with the item details
          orders.push({
            OrderID: row.orderid,
            Email: row.orderemail,
            Phone: row.phone,
            Total_price: row.total_price,
            Final_price: row.final_price,
            Created_at: moment(row.created_at).format('YYYY-MM-DD'),  // Format the date
            order_items: [{
              ItemID: row.itemid,
              Product_name: row.product_name,
              Quantity: row.quantity,
              Price: row.price,
              Subtotal: row.subtotal,
            }],
          });
        }
      });
  
      // Handle case where no orders are found
      if (orders.length === 0) {
        return res.status(404).json({ message: "No orders found for this email." });
      }
  
      res.json(orders); // Return the grouped orders with their items
    });
  });
  

  // Fetch Single Order with Items
  app.get("/orders/:id", (req, res) => {
    const orderId = req.params.id;
  
    const orderQuery = `SELECT * FROM Orders WHERE Id = $1`;
    const itemsQuery = `SELECT * FROM Order_items WHERE Order_id = $1`;
  
    db.query(orderQuery, [orderId], (err, orderResult) => {
      if (err || orderResult.rows.length === 0) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      db.query(itemsQuery, [orderId], (err, itemsResult) => {
        if (err) {
          return res.status(500).json({ error: "Error fetching order items" });
        }
        res.json({ order: orderResult.rows[0], items: itemsResult.rows });
      });
    });
  });

// Start the server
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
