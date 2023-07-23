import { useCallback, useState } from "react";
import { isEmail } from "validator/";


function useValidation (initValues) {
	const [ formValues, setFormValues ] = useState(initValues); // стейт значений
	const handleChange = (event) => {
		const { target: input } = event;
		setFormValues({
			...formValues,
			[input.name]: {
				value: input.value,
				validationMessage: input.type === 'email' ? isEmail(input.value) ? '' : 'Не Email' : input.validationMessage,
				isValidValue: input.type === 'email' ? isEmail(input.value) : input.checkValidity(),
				isEmpty: input.value.length === 0,
				isDirty: true,
				isEmail: input.type === 'email' && !isEmail(input.value),
				isTypeEmail: input.type === 'email',
				isValid: function () {
					return (this.isValidValue && this.isDirty);
				}
			},
		});
	}
	
	const resetForm = useCallback((newValues = initValues) => setFormValues(newValues), [setFormValues]);

	return { formValues, handleChange, setFormValues, resetForm };
}

export default useValidation;