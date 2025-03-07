const {  
    client,
    createUser,
    getAllUsers

  } = require('./index.cjs');
  
  async function dropTables() {
    try {
      console.log("Starting to drop tables...");
  
      // have to make sure to drop in correct order
      await client.query(`
        DROP TABLE IF EXISTS users;
      `);
  
      console.log("Finished dropping tables!");
    } catch (error) {
      console.error("Error dropping tables!");
      throw error;
    }
  }
  
  async function createTables() {
    try {
      console.log("Starting to build tables...");
  
      await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          email varchar(255) NOT NULL,
          password varchar(255) NOT NULL,
          name varchar(255) NOT NULL,
          location varchar(255) NOT NULL,
          active boolean DEFAULT true
        );
      `);
  
      console.log("Finished building tables!");
    } catch (error) {
      console.error("Error building tables!");
      throw error;
    }
  }
  
  async function createInitialUsers() {
    try {
      console.log("Starting to create users...");
  
      await createUser({ 
        email: 'albert@email.com', 
        password: 'bertie99',
        name: 'Al Bert',
        location: 'Maple Plain, MN' 
      });
      await createUser({ 
        email: 'sandra@email.com', 
        password: '2sandy4me',
        name: 'Just Sandra',
        location: 'Delano, MN'
      });
      await createUser({ 
        email: 'glamgal@email.com',
        password: 'soglam',
        name: 'Joshua',
        location: 'Minnetonka, MN'
      });
      
      console.log("Finished creating users!");
    } catch (error) {
      console.error("Error creating users!");
      throw error;
    }
  }
  
  
  async function rebuildDB() {
    try {
      client.connect();
  
      await dropTables();
      await createTables();
      await createInitialUsers();
    } catch (error) {
      console.log("Error during rebuildDB")
      throw error;
    }
  }
  
  async function testDB() {
    try {
      console.log("Starting to test database...");
  
      console.log("Calling getAllUsers");
      const users = await getAllUsers();
      console.log("Result:", users);
  
      
      console.log("Finished database tests!");
    } catch (error) {
      console.log("Error during testDB");
      throw error;
    }
  }
  
  
  rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());