export default function EmployeeForm({ formData, errors, onChange, onSubmit }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md mx-auto w-[280px]">
        <h2 className="text-gray-700 font-semibold mb-4">Add Employee</h2>
        <form onSubmit={onSubmit} className="space-y-4 text-[12px]">
          <div>
            <label className="text-gray-700 font-medium">Name</label>
            <input type="text" name="name" value={formData.name} onChange={onChange} className="w-full mt-1 p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-100" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input type="email" name="email" value={formData.email} onChange={onChange} className="w-full mt-1 p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-100" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="text-gray-700 font-medium">Department</label>
            <input type="text" name="department" value={formData.department} onChange={onChange} className="w-full mt-1 p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-100" />
            {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
          </div>
          <div>
            <label className="text-gray-700 font-medium">Role</label>
            <input type="text" name="role" value={formData.role} onChange={onChange} className="w-full mt-1 p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-100" />
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
          </div>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-500 transition">
            Add Employee
          </button>
        </form>
      </div>
    </div>
  )
}