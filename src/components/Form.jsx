// eslint-disable-next-line react/prop-types
const Form = ({ onSubmit, onChange, value,text,placeholder }) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-5">
      <input
        type='text'
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="inline-block px-2 py-2 bg-white border border-gray-300  focus:outline-none "
      />
      <button type='submit' className="bg-blue-950 p-2 text-white w-full">{text}</button>
    </form>
  )
}

export default Form
