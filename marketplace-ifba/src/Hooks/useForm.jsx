import React from 'react'

const validacao = {
    email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Preencha um email válido!'
    }
}

const useForm = () => {
    const [value, setValue] = React.useState('');

    function onChange({ target }) {
        setValue(target.value);
    }

    return {
        value,
        setValue,
        onChange
    }
}

export default useForm;