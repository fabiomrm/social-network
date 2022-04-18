import fetch from "cross-fetch";

let token = ''

beforeAll(async () => {
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

  const json = await response.json();
  token = json.token;
})

describe("Create post", () => {
  it('should not allow create post when not authenticated', async () => {
    const response = await fetch("http://localhost:3001/api/v1/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: "Meu primeiro post",
      })
    })

    expect(response.status).toBe(401);
  })
  it('should  allow create post when authenticated', async () => {
    const response = await fetch("http://localhost:3001/api/v1/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        text: "Meu primeiro post",
        test: true
      })
    })

    const json = await response.json();
    console.log(json)
    expect(response.status).toBe(201);
  })
})