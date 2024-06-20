import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router()






router.post('/add_employee', async (req, res) => {
  const sql = "INSERT INTO soundeffect (name, salary, role, worker_id) VALUES (?, ?, ?, ?)";
  const { name, salary, role, worker_id } = req.body;

  try {
    const [result] = await con.execute(sql, [name, salary, role, worker_id]);
    return res.json({ Status: true }); // Assuming successful insertion
  } catch (err) {
    console.error("Error inserting employee:", err.message);
    return res.status(500).json({ Status: false, Error: "Internal server error" }); // Return a proper HTTP status code
  }
});

router.post('/soundeffect_data', async (req, res) => {
  // Insert into soundeffect_data table
  const sql = "INSERT INTO soundeffect_data (worker_id, name, data) VALUES (?, ?, ?)";
  const { worker_id, name, data } = req.body; // Destructure data for cleaner code

  try {
    const [result] = await con.query(sql, [worker_id, name, data]);
    return res.json({ Status: true }); // Assuming successful insertion
  } catch (err) {
    console.error("Error inserting worker data:", err.message);
    return res.json({ Status: false, Error: "Internal server error" }); // Generic error for security
  }
});






// Get All Employees
router.get("/employee", async (req, res) => {
  try {
    const sql = "SELECT * FROM soundeffect ORDER BY name ASC";
    const [result] = await con.query(sql);

    return res.json({ Status: true, Result: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Status: false, Error: "Failed to retrieve employees" });
  }
});


router.get("/employeeprog", async (req, res) => {
  try {
    const sql = "SELECT * FROM soundeffect WHERE team = 'soundeffect' ORDER BY name ASC";
    const [result] = await con.query(sql);

    return res.json({ Status: true, Result: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Status: false, Error: "Failed to retrieve employees" });
  }
});



// Get Employee by ID
router.get("/employee/:worker_id", async (req, res) => {
  try {
    const id = req.params.worker_id;
    const sql = "SELECT * FROM soundeffect WHERE worker_id = ?";
    const [result] = await con.query(sql, [id]);

    return res.json({ Status: true, Result: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Status: false, Error: "Failed to retrieve employee" });
  }
});



// Route to edit an employee's details and update their salary history
router.put("/edit_employee/:worker_id", async (req, res) => {
  const id = req.params.worker_id;
  const { name, salary, role } = req.body;
  const sqlUpdateEmployee = "UPDATE soundeffect SET name = ?, salary = ?, role = ? WHERE worker_id = ?";
  const sqlInsertHistory = "INSERT INTO salary_history (worker_id, salary, effective_date) VALUES (?, ?, NOW())";

  try {
    // Update the employee's details in the soundeffect table
    await con.execute(sqlUpdateEmployee, [name, salary, role, id]);

    // Insert salary change into salary_history table
    await con.execute(sqlInsertHistory, [id, salary]);

    return res.json({ Status: true, Message: "Employee details updated successfully" });
  } catch (err) {
    console.error("Error updating employee details:", err.message);
    return res.status(500).json({ Status: false, Error: "Internal server error" });
  }
});


router.delete("/delete_employee/:worker_id", async (req, res) => {
  const id = req.params.worker_id;
  const sql = "DELETE FROM soundeffect WHERE worker_id = ?";

  try {
    const [result] = await con.query(sql, [id]);
    return res.json({ Status: true }); // Assuming successful deletion
  } catch (err) {
    console.error("Error deleting employee:", err.message);
    return res.json({ Status: false, Error: "Internal server error" }); // Generic error for security
  }
});

router.delete("/delete_worker/:worker_id", async (req, res) => {
  const id = req.params.worker_id; 
  const sql = "DELETE FROM soundeffect_data WHERE worker_id = ?";

  try {
    const [result] = await con.query(sql, [id]);
    return res.json({ Status: true }); // Assuming successful deletion
  } catch (err) {
    console.error("Error deleting worker:", err.message);
    return res.json({ Status: false, Error: "Internal server error" }); // Generic error for security
  }
});

// Get Worker Data List (fixed)
router.get('/klista', async (req, res) => {
  try {
    const sql = "SELECT * FROM soundeffect_data ORDER BY data ASC, name ASC";
    const [result] = await con.query(sql); // Execute the query with prepared statement

    return res.json({ Status: true, Result: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Status: false, Error: "Worker data retrieval failed" });
  }
});

router.get("/klista/:id", async (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM soundeffect_data WHERE id = ?";

  try {
    const [result] = await con.query(sql, [id]); // Use pool connection and prepared statement
    res.json({ Status: true, Result: result });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.json({ Status: false, Error: "Query Error" });
  }
});
router.put("/edit_klista/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE soundeffect_data 
      set name = ?, ora = ?
      Where id = ?`;
  const values = [req.body.name, req.body.ora];
  con.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.post('/soundeffect_data', async (req, res) => {
  // Insert into soundeffect_data table
  const sql = "INSERT INTO soundeffect_data (worker_id, name, data, dita, ora) VALUES (?, ?, ?, ?, ?)";
  const { worker_id, name, data, dita, ora } = req.body;

  try {
    const [result] = await con.query(sql, [worker_id, name, data, dita, ora]);
    return res.json({ Status: true }); // Assuming successful insertion
  } catch (err) {
    console.error("Error inserting worker data:", err.message);
    return res.json({ Status: false, Error: "Internal server error" }); // Generic error for security
  }
});




// Get Worker List (fixed)
router.get('/addklista', async (req, res) => {
  try {
    const sql = "SELECT worker_id, name FROM soundeffect_data";
    const [result] = await con.query(sql); // Execute the query with prepared statement

    return res.json({ Status: true, Result: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Status: false, Error: "Worker data retrieval failed" });
  }
});

router.post('/addworkerklista', async (req, res) => {
  // Insert into soundeffect_data table
  const sql = "INSERT INTO soundeffect_data (worker_id, name, data, dita, ora) VALUES (?, ?, ?, ?, ?)";
  
  try {
      const selectedEmployeesData = req.body;

      // Iterate over the array of selected employees' data and insert each one into the database
      for (const employeeData of selectedEmployeesData) {
          const { worker_id, name, data, dita, ora } = employeeData;
          await con.query(sql, [worker_id, name, data, dita, ora]);
      }

      return res.json({ Status: true }); // Assuming successful insertion
  } catch (err) {
      console.error("Error inserting worker data:", err.message);
      return res.status(500).json({ Status: false, Error: "Internal server error" }); // Generic error for security
  }
});


router.delete("/delete_klista/:id", async (req, res) => {
  const workerId = req.params.id;

  const sql = "DELETE FROM soundeffect_data WHERE id = ?";

  try {
    const [result] = await con.query(sql, [workerId]);
    return res.json({ Status: true }); // Assuming successful deletion
  } catch (err) {
    console.error("Error deleting worker data:", err.message);
    return res.json({ Status: false, Error: "Internal server error" }); // Generic error for security
  }
});

router.get('/senior_count', async (req, res) => {
    try {
        const sql = "SELECT COUNT(*) AS worker_count FROM soundeffect WHERE role = 'Senior'";
        const [result] = await con.query(sql);
        return res.json({ Status: true, Result: result[0] });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ Status: false, Error: `Error fetching employee count: ${err.message}` });
      }
    });

router.get('/junior_count', async (req, res) => {
  try {
    const sql = "SELECT COUNT(*) AS worker_count FROM soundeffect WHERE role = 'Junior'";
    const [result] = await con.query(sql);
    return res.json({ Status: true, Result: result[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Status: false, Error: `Error fetching employee count: ${err.message}` });
  }
});

router.get('/midlevel_count', async (req, res) => {
  try {
    const sql = "SELECT COUNT(*) AS worker_count FROM soundeffect WHERE role = 'Mid-level'";
    const [result] = await con.query(sql);
    return res.json({ Status: true, Result: result[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Status: false, Error: `Error fetching employee count: ${err.message}` });
  }
});



router.get("/oret/:worker_id", async (req, res) => {
  try {
    const id = req.params.worker_id;
    const sql = "SELECT * FROM soundeffect_data WHERE worker_id = ? ORDER BY data ASC";
    const [result] = await con.query(sql, [id]);

    return res.json({ Status: true, Result: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Status: false, Error: "Failed to retrieve employee" });
  }
});


router.get("/workerdate", async (req, res) => {
  try {
    const sql = "SELECT data, worker_id FROM soundeffect_data ORDER BY data ASC";
    const [result] = await con.query(sql);

    return res.json({ Status: true, Result: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ Status: false, Error: "Failed to retrieve employees" });
  }
});

router.delete("/delete_workers", async (req, res) => {
  const idsToDelete = req.body.idsToDelete; // Array of IDs to delete
  const sql = "DELETE FROM soundeffect_data WHERE id IN (?)";

  try {
    const [result] = await con.query(sql, [idsToDelete]);
    return res.json({ Status: true }); // Assuming successful deletion
  } catch (err) {
    console.error("Error deleting workers:", err.message);
    return res.json({ Status: false, Error: "Internal server error" }); // Generic error for security
  }
});









router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as SoundEffectRoute };