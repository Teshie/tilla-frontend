// FormField.js
const FormField = ({ label, defaultValue, isEditable = false }) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium text-gray-700 flex-shrink-0 w-32">
        {label}
      </label>
      <input
        type="text"
        className={`border border-gray-300  px-2    ${
          isEditable ? "bg-white" : " cursor-not-allowed"
        }`}
        defaultValue={defaultValue}
        readOnly={!isEditable}
      />
    </div>
  );
};

export default FormField;
