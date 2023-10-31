/** @format */

interface FormGroupProps {
	children: React.ReactNode;
	label: string;
	id: string;
}

const FormGroup = ({ children, label, id, ...props }: FormGroupProps) => {
	return (
		<div
			className='form-group'
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				width: '100%',
				// give the form group a margin bottom of 1rem
				marginBottom: '1rem',
				// give grayish background
				backgroundColor: '#e9ecef',
				padding: '1rem',
				borderRadius: '.3rem',
			}}
			{...props}>
			<label htmlFor={id}>{label}:</label>
			{children}
		</div>
	);
};

export default FormGroup;
