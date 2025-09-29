'use client'
import { useState } from 'react'

export default function Home() {
  const [formVisibility, setFormVisibility] = useState(false);


  const [employees, setEmployees] = useState([
    { id: 1, name: "Asad Asad", email: "asad@example.com", department: "IT", role: "Developer" },
    { id: 2, name: "Ahmed Ahmed", email: "ahmed@example.com", department: "HR", role: "Manager" }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    id: "",
  });

  const [errors, setErrors] = useState({});

  function handleAddEmployee() {
    if (formVisibility != true) {
      setFormVisibility(true);
    }
  }



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.department.trim())
      newErrors.department = "Department is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if(formData.id){
      const updatedEmployees = employees.map((employee) =>
        employee.id === formData.id ? { ...formData } : employee
      );
      setEmployees(updatedEmployees);
      setFormData({
        name: "",
        email: "",
        department: "",
        role: "",
        id: "",
      });
      setErrors({});
      setFormVisibility(false);
      return;
    }

    const newEmployee = {
      ...formData,
      id: Date.now(),
    };



    setEmployees([...employees, newEmployee]);


    setFormData({
      name: "",
      email: "",
      department: "",
      role: "",
      id: "",
    });
    setErrors({});
    setFormVisibility(false);
  };

  const handleDeleteEmployee = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  };


  const handleEditEmployee = (id) => {
    const employeeToEdit = employees.find((employee) => employee.id === id);
    if (employeeToEdit) {
      setFormData({
        name: employeeToEdit.name,
        email: employeeToEdit.email,
        department: employeeToEdit.department,
        role: employeeToEdit.role,
        id: id,
      });
      setFormVisibility(true);
      console.log(formData.id);
    }
  };


  return (
    <>
      <div className='flex justify-around py-10 p-6 overflow-auto'>
        <div>
          <div className='flex justify-between items-center'>
            <h1 className='text-gray-700 font-semibold py-2 inline'>
              Employee Managment System
            </h1>
            <button onClick={handleAddEmployee} className='cursor-pointer uppercase text-[11px] font-bold text-center text-white bg-green-600 px-2 h-6 rounded-sm'>Add Employee</button>
          </div>
          <div className='overflow-x-auto shadow-md rounded-sm'>

            <table className='text-sm text-left text-gray-700'>
              <thead className='text-[10px] uppercase bg-gray-200'>
                <tr>
                  <th className='px-2 pl-4 py-3' >Name</th>
                  <th className='px-2 py-3' >Email</th>
                  <th className='px-2 py-3' >Department</th>
                  <th className='px-2 py-3' >Role</th>
                  <th className='px-2 py-3 text-center' >Delete</th>
                  <th className='px-2 py-3 text-center' >Edit</th>
                </tr>
              </thead>
              <tbody>
                {
                  employees.map((employee) => {
                    return (
                      <tr key={employee.id} className='border-t border-gray-200 text-[12px]'>
                        <td className='px-2 pl-4 py-3' >{employee.name}</td>
                        <td className='px-2 py-3' >{employee.email}</td>
                        <td className='px-2 py-3' >{employee.department}</td>
                        <td className='px-2 py-3' >{employee.role}</td>
                        <td className='px-2 py-2 text-center' ><button onClick={() => handleDeleteEmployee(employee.id)} className='cursor-pointer uppercase text-[11px] font-bold text-center text-white bg-red-400 px-2 py-[2px] rounded-sm'>Delete</button></td>
                        <td className='px-2 py-2 text-center' ><button onClick={() => handleEditEmployee(employee.id)} className='cursor-pointer uppercase text-[11px] font-bold text-center text-white bg-gray-500 px-2 py-[2px] rounded-sm'>Edit</button></td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={`${formVisibility ? "" : "hidden"} absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] bg-opacity-70 flex justify-center items-center`}>
        <div className="bg-white p-6 rounded-lg shadow-md mx-auto w-[280px]">
          <h2 className="text-gray-700 font-semibold mb-4">
            Add Employee
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-[12px]">

            <div>
              <label className="block text-gray-600 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-100"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>


            <div>
              <label className="block text-gray-600 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-100"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>


            <div>
              <label className="block text-gray-600 font-medium">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-100"
              />
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">{errors.department}</p>
              )}
            </div>


            <div>
              <label className="block text-gray-600 font-medium">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-100"
              />
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>


            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-500 transition"
            >
              Add Employee
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
