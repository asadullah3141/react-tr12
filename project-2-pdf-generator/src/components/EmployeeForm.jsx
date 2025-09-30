'use client'

export default function EmployeeForm({ formData, errors, handleChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-[12px]">
      {[
        { label: "Name", name: "name" },
        { label: "Department", name: "department" },
        { label: "Role", name: "role" },
        { label: "Joining Date", name: "joiningDate" },
        { label: "Note", name: "note" },
      ].map((field) => (
        <div key={field.name}>
          <label className="block text-gray-600 font-medium">{field.label}</label>
          <input
            type="text"
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-100"
          />
          {errors[field.name] && (
            <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-500 transition"
      >
        Generate PDF Report
      </button>
    </form>
  )
}
