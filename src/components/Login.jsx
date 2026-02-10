import { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const initialForm = {
    email: '',
    password: '',
    terms: false,
};

export default function Login() {
    const [form, setForm] = useState(initialForm);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                    id="examplePassword"
                    name="password"
                    placeholder="Enter your password "
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                />
            </FormGroup>
            <FormGroup check>
                <Input
                    id="terms"
                    name="terms"
                    checked={form.terms}
                    type="checkbox"
                    onChange={handleChange}
                />{' '}
                <Label htmlFor="terms" check>
                    I agree to terms of service and privacy policy
                </Label>
            </FormGroup>
            <FormGroup className="text-center p-4">
                <Button color="primary" disabled={!form.terms}>Sign In</Button>
            </FormGroup>
        </Form>
    )
}