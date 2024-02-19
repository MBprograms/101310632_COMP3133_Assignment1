// resolvers/employeeResolvers.js

const Employee = require('../models/employees');

const employeeResolvers = {
  Query: {
    getAllEmployees: async () => {
      try {
        const employees = await Employee.find();
        return employees;
      } catch (error) {
        throw new Error(error);
      }
    },
    searchEmployeeById: async (_, { eid }) => {
      try {
        const employee = await Employee.findById(eid);
        return employee;
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  Mutation: {
    addEmployee: async (_, { first_name, last_name, email, gender, salary }) => {
      try {
        const employee = new Employee({ first_name, last_name, email, gender, salary });
        await employee.save();
        return employee;
      } catch (error) {
        throw new Error(error);
      }
    },
    updateEmployeeById: async (_, { eid, first_name, last_name, email, gender, salary }) => {
      try {
        const updatedEmployee = await Employee.findByIdAndUpdate(eid, { first_name, last_name, email, gender, salary }, { new: true });
        return updatedEmployee;
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteEmployeeById: async (_, { eid }) => {
      try {
        const deletedEmployee = await Employee.findByIdAndDelete(eid);
        return deletedEmployee;
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};

module.exports = employeeResolvers;
