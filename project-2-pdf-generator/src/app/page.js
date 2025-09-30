'use client'
import { useState } from 'react'
import PdfGenerator from '@/components/PdfGenerator'
import EmployeeForm from '@/components/EmployeeForm'

export default function Home() {
  const [reportVisibility, setReportVisibility] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    role: "",
    joiningDate: "",
    note: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.department.trim()) newErrors.department = "Department is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";
    if (!formData.joiningDate.trim()) newErrors.joiningDate = "Joining Date is required";
    if (!formData.note.trim()) newErrors.note = "Note is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setReportVisibility(true);
    setErrors({});
  };

  if (reportVisibility) {
    return <PdfGenerator data={formData} />
  } 

  return (
    <div className="p-6 bg-opacity-70 flex justify-center items-center">
      <div className="p-6 rounded-lg shadow-md mx-auto w-[400px] bg-gray-200">
        <h2 className="text-gray-700 font-semibold mb-4">
          Generate Employee Report
        </h2>
        <EmployeeForm
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>

    </div>
  )
}
