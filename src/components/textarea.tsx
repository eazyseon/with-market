interface TextAreaProps {
  label?: string;
  name?: string;
  [key: string]: any;
}

const TextArea = ({ label, name, ...rest }: TextAreaProps) => {
  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={name}
        className="px-4 py-2 my-1 shadow-sm w-full rounded-md focus:outline-none focus:outline-primaryB-400"
        rows={4}
        {...rest}
      />
    </div>
  );
};

export default TextArea;
