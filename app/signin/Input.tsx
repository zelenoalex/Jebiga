interface InputProps {
    type: string
    value?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    name: string
    id: string
    placeholder?: string
    big?: boolean
    onBlur?: () => void
    error?: string
  }
  
  const Input = ({
    type,
    value,
    onChange,
    name,
    id,
    placeholder,
    big,
    onBlur,
    error,
  }: InputProps) => {
    return (
      <div>
        <input
          id={id}
          type={type}
          onChange={onChange}
          value={value}
          name={name}
          placeholder={placeholder}
          onBlur={onBlur}
          className="w-full  bg-card p-4 text-foreground border-primary-foreground border mb-2"
        />
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </div>
    )
  }
  
  export default Input