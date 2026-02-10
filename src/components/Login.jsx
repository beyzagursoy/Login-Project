import { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { useNavigate } from 'react-router-dom'

const initialForm = {
    email: '',
    password: '',
    terms: false,
};

export default function Login() {
    const [form, setForm] = useState(initialForm);
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        terms: false,
    });
    const [touched, setTouched] = useState({
        email: false,
        password: false,
        terms: false,
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setForm({ ...form, [name]: type === "checkbox" ? checked : value });

        setTouched({
            ...touched,
            [name]: true,
        });
    }

    const validate = () => {
        const newErrors = {}

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const strongPasswordRegex =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/

        if (touched.email && !emailRegex.test(form.email)) {
            newErrors.email = "Geçerli bir email adresi giriniz"
        }

        if (touched.password && !strongPasswordRegex.test(form.password)) {
            newErrors.password = "Parola en az 8 karakter, bir büyük harf, bir küçük harf ve bir rakam içermelidir"
        }

        if (touched.terms && !form.terms) {
            newErrors.terms = "Lütfen şartları kabul edin"
        }

        setErrors(newErrors)

        const formIsValid =
            emailRegex.test(form.email) &&
            strongPasswordRegex.test(form.password) &&
            form.terms;

        setIsValid(formIsValid);
    }

    useEffect(() => {
        validate()
    }, [form, touched])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isValid) {
            navigate("/success")
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                    data-cy="email-input"
                    id="exampleEmail"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    invalid={!!errors.email}
                />
                {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                    data-cy="password-input"
                    id="examplePassword"
                    name="password"
                    placeholder="Enter your password "
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    invalid={!!errors.password}
                />
                {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
            </FormGroup>
            <FormGroup check>
                <Input
                    data-cy="terms-checkbox"
                    id="terms"
                    name="terms"
                    checked={form.terms}
                    type="checkbox"
                    onChange={handleChange}
                    invalid={!!errors.terms}
                />{' '}
                <Label htmlFor="terms" check>
                    I agree to terms of service and privacy policy
                </Label>
                {errors.terms && <FormFeedback>{errors.terms}</FormFeedback>}
            </FormGroup>
            <FormGroup className="text-center p-4">
                <Button data-cy="submit-btn" color="primary" disabled={!isValid}>Login</Button>
            </FormGroup>
        </Form>
    )
}