import React from 'react'

const typesValidation = {
    email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Preencha um email válido!',
    },
    dataMaioridade: {
        validate: (value) => {
            if (!value) return false;
            const inputDate = new Date(value);
            const today = new Date();
            const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
            return inputDate <= minDate;
        },
        message: 'Você deve ter pelo menos 18 anos!',
    },
    data: {
        validate: (value) => {
            if (!value) return false;
            const inputDate = new Date(value);
            return !isNaN(inputDate.getTime());
        },
        message: 'Preencha uma data válida!',
    }
}

const useForm = (type) => {
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(null);

    function validate(value) {
        if (type === false) return true;
        if (value.length === 0) {
            setError('Preencha um valor!');
            return false;
        } else if (typesValidation[type]) {
            const validation = typesValidation[type];
            let isValid = false;
            
            if (validation.regex) {
                isValid = validation.regex.test(value);
            } else if (validation.validate) {
                isValid = validation.validate(value);
            }
            
            if (!isValid) {
                setError(validation.message);
                return false;
            }
        }
        
        setError(null);
        return true;
    }

    function onChange({ target }) {
        if (error) validate(target.value);
        setValue(target.value);
    }

    return {
        value,
        setValue,
        onChange,
        validate: () => validate(value),
        onBlur: () => validate(value),
        error
    }
}

export default useForm;