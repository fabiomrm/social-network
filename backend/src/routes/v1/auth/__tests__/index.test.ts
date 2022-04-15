import fetch from 'cross-fetch';

describe('Register new user', () => {
    it('should return user ID when correct data', async () => {
        const response = await fetch("http://localhost:3001/api/v1/sign-up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "Fulano",
                surname: "Silva",
                email: "fulaunosilva@gmail.com",
                password: "abcd1234",
                test: true,
            })

        })

        expect(response.status).toBe(201)
        const json = await response.json();
        expect(Number.isInteger(json.user.id) && Number(json.user.id > 0)).toBe(1);
    })
})

describe('Login as user', () => {
    it('should receive error message when incorrect credentials', async () => {
        const response = await fetch("http://localhost:3001/api/v1/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: "fulaunosilva@gmail.com",
                password: "312456",
            })
        })

        expect(response.status).toBe(401);
    })

    it('should receive auth token when correct credentials', async () => {
        const response = await fetch("http://localhost:3001/api/v1/sign-in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: "fulaunosilva@gmail.com",
                password: "abcd1234",
            })
        })

        expect(response.status).toBe(200);
        const json = await response.json();
        expect(json.token !== undefined && json.token !== null && json.token.length > 0).toBe(true);
    })
})