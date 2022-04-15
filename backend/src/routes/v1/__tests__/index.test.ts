import fetch from 'cross-fetch';

describe('Check if webserver is running', () => {
    it('should return success when test route', async () => {
        const response = await fetch("http://localhost:3001/api/v1", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })

        expect(response.status).toBe(200)
        const json = await response.json();
        expect(json.success).toBe(true);
    })
})