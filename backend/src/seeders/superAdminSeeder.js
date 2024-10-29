import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import userModel from '../models/userModel.js'; 
import dbConnect from '../config/dbConnection.js';

dotenv.config();
dbConnect();

const updateOrCreateSuperAdmin = async () => {
  try {
    const superAdminData = {
      username: 'superadmin',
      role: 'SuperAdmin',
      password: await bcrypt.hash('1234', 10),
    };

    // Update the super admin if they exist, or create a new one
    const superAdmin = await userModel.findOneAndUpdate(
      { role: 'SuperAdmin' }, // Filter to find super admin by role
      superAdminData,           // Update fields
      { new: true, upsert: true } // Options: create if not exists, return new doc
    );

    if (superAdmin) {
      console.log("Super admin updated successfully");
    } else {
      console.log("Super admin created successfully");
    }

  } catch (error) {
    console.error("Error in updating or creating super admin:", error);
  } finally {
    mongoose.connection.close(); 
  }
};

updateOrCreateSuperAdmin();
