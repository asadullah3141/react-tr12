export default function EmployeeTable({ employees, onDelete, onEdit }) {
  return (
    <div className='overflow-x-auto shadow-md rounded-sm'>
      <table className='text-sm text-left text-gray-700'>
        <thead className='text-[10px] uppercase bg-gray-200'>
          <tr>
            <th className='px-2 pl-4 py-3'>Name</th>
            <th className='px-2 py-3'>Email</th>
            <th className='px-2 py-3'>Department</th>
            <th className='px-2 py-3'>Role</th>
            <th className='px-2 py-3 text-center'>Delete</th>
            <th className='px-2 py-3 text-center'>Edit</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className='border-t border-gray-200 text-[12px]'>
              <td className='px-2 pl-4 py-3'>{employee.name}</td>
              <td className='px-2 py-3'>{employee.email}</td>
              <td className='px-2 py-3'>{employee.department}</td>
              <td className='px-2 py-3'>{employee.role}</td>
              <td className='px-2 py-2 text-center'>
                <button onClick={() => onDelete(employee.id)} className='cursor-pointer uppercase text-[11px] font-bold text-center text-white bg-red-400 px-2 py-[2px] rounded-sm'>Delete</button>
              </td>
              <td className='px-2 py-2 text-center'>
                <button onClick={() => onEdit(employee.id)} className='cursor-pointer uppercase text-[11px] font-bold text-center text-white bg-gray-400 px-2 py-[2px] rounded-sm'>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
