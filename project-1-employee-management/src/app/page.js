'use client'

import { useState } from 'react'
import EmployeeTable from '@/components/EmployeeTable'
import EmployeeForm from '@/components/EmployeeForm'

export default function Home() {

  const [formVisibility, setFormVisibility] = useState(false)

  const [employees, setEmployees] = useState([
    { id: 1, name: "Asad Asad", email: "asad@example.com", department: "IT", role: "Developer" },
    { id: 2, name: "Ahmed Ahmed", email: "ahmed@example.com", department: "HR", role: "Manager" }
  ])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    id: ""
  })
  const [errors, setErrors] = useState({})

  function handleAddEmployee() {
    setFormVisibility(true)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validate = () => {
    let newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.department.trim()) newErrors.department = "Department is required"
    if (!formData.role.trim()) newErrors.role = "Role is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    if (formData.id) {
      setEmployees(employees.map(employee => employee.id === formData.id ? { ...formData } : employee))
    } else {
      setEmployees([
        ...employees,
        { 
          ...formData,
          id: Date.now() 
        }
      ])
    }

    setFormData({
      name: "",
      email: "",
      department: "",
      role: "",
      id: ""
    })

    setErrors({})
    setFormVisibility(false)
  }

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id))
  }

  const handleEditEmployee = (id) => {
    const employee = employees.find(emp => emp.id === id)
    if (employee) {
      setFormData(employee)
      setFormVisibility(true)
    }
  }

  return (
    <>
      <div className='flex justify-around py-10 p-6 overflow-auto'>
        <div>
          <div className='flex justify-between items-center'>
            <h1 className='text-gray-700 font-semibold py-2 inline'>Employee Management System</h1>
            <button onClick={handleAddEmployee} className='cursor-pointer uppercase text-[11px] font-bold text-center text-white bg-green-400 px-2 h-6 rounded-sm'>Add Employee</button>
          </div>
          <EmployeeTable employees={employees} onDelete={handleDeleteEmployee} onEdit={handleEditEmployee} />
        </div>
      </div>
      {formVisibility && (
        <EmployeeForm
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </>
  )
}
