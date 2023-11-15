import { useEffect, useState } from "react";
import FormGroup from "./FormGroup";

type ValueChangerProps = {
	label: string;
	value: number | string;
	onSubmit: (newValue: number | string) => void;
};

export const ValueChanger = ({ label, value, onSubmit }: ValueChangerProps) => {
	const [newValue, setNewValue] = useState(value);

    useEffect(() => {
        setNewValue(value);
    }, [value]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit(newValue);
	};

	return (
		<form onSubmit={handleSubmit}
			className='form-inline container'
		>
			<fieldset className='bg-light text-dark mb-2 p-4'>
				<legend>{label}</legend>
				<div className='row'>
					<FormGroup label='Value' id='value'>
						<input
							type={typeof value === 'number' ? 'number' : 'text'}
							className='form-control'
							placeholder='Value'
							value={newValue}
							onChange={(e) => setNewValue(e.target.value)}
						/>
					</FormGroup>
					<button className='btn btn-primary'>
						{label}
					</button>
				</div>
			</fieldset>
		</form>
	);
};