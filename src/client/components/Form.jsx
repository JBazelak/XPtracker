import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Form = ({ fields, headerText, buttonText, apiEndpoint, redirectTo }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(
        Object.fromEntries(fields.map(field => [field.name, '']))
    );

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (apiEndpoint) {
                const response = await axios.post(apiEndpoint, formData);
                localStorage.setItem('token', response.data.token);
                if (redirectTo) {
                    navigate(redirectTo);
                }
            }
        } catch (error) {
            setError(error.response?.data?.error)
            console.error('Błąd:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormWrapper onSubmit={handleSubmit}>

            <h1>{headerText}</h1>
            <hr style={{ width: "100%", marginBottom: "3rem" }} />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {fields.map(({ name, type, label, required }) => (
                <FormGroup key={name}>
                    {type === 'textarea' ? (
                        <Textarea
                            id={name}
                            name={name}
                            placeholder={label}
                            value={formData[name]}
                            onChange={handleChange}
                            required={required}
                        />
                    ) : (
                        <Input
                            type={type}
                            id={name}
                            name={name}
                            placeholder={label}
                            value={formData[name]}
                            onChange={handleChange}
                            required={required}
                        />
                    )}
                </FormGroup>
            ))}
            <hr style={{ width: "100%", marginTop: "2rem", marginBottom: "3rem" }} />

            <SubmitButton type="submit" disabled={loading}>
                {loading ? 'Przetwarzanie...' : buttonText}
            </SubmitButton>

            <BackArrow>
                <BackLink to='/'>&larr;</BackLink>
            </BackArrow>

        </FormWrapper>
    );
};

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20svw;
    padding: 3rem;
    background-color: #190F38cc;
    border-radius: 10px;
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
`;

const FormGroup = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    width: 100%;
`;

const Input = styled.input`
    width: 60%;
    padding: 0.8rem;
    color: #fff;
    background-color: #462f9C;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    font-size: 1rem;
    margin-bottom: 0.5rem;


    &:hover,
    &:active,
    &:focus {
        background-color: #532DC7;

        border-color: #421cb6;
        outline: none;
        transition: background-color 0.3s ease;
    }

    &::placeholder {
        color: #fff; /* Tutaj zmieniasz kolor placeholdera */
    }

    /* Wsparcie dla starszych przeglądarek */
    &::-webkit-input-placeholder {
        color: #fff;
    }

    &::-moz-placeholder {
        color: #fff;
    }

    &:-ms-input-placeholder {
        color: #fff;
    }

    &::-ms-input-placeholder {
        color: #fff;
    }
`;

const Textarea = styled.textarea`
    ${Input}
    resize: vertical;
    min-height: 100px;
`;

const SubmitButton = styled.button`
    font-size: 1svw;
    padding: 0.8rem 1rem;
    width: 10svw;
    background-color: #360079;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover,
    &:focus {
        background-color: #6700E6;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.6), 0 0 10px rgba(98, 0, 234, 0.4), 0 0 20px rgba(98, 0, 234, 0.2);
        transition: background-color 0.3s ease;
        transition: box-shadow 0.3s ease;
    }
`;

const BackArrow = styled.div`
    text-decoration: none;
    position: absolute;
    top: 0;
    left: 1svw;
    margin: 2rem
    bacground-color: #000;
    font-size: 2em

`;

const BackLink = styled(Link)`
    text-decoration: none; 
    color: #fff; 
`;

const ErrorMessage = styled.p`
    position: absolute;
    top: 15svh;
    color: red;
`;

export default Form;
