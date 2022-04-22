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
});

describe('get posts', () => {
  it('should not allow get posts when not authenticated', async () => {
    const response = await fetch("http://localhost:3001/api/v1/post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })

    expect(response.status).toBe(401);
  })
  it('should allow get posts when authenticated', async () => {
    const response = await fetch("http://localhost:3001/api/v1/post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(Array.isArray(json.posts)).toBe(true);
  })
  it('should allow get post by id when authenticated', async () => {
    const response = await fetch("http://localhost:3001/api/v1/post/1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.post.id > 0).toBe(true);
  })
})