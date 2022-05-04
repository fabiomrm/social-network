import fetch from "cross-fetch";

let token = ''

beforeAll(async () => {
  const response = await fetch("http://localhost:3001/api/v1/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: "teste@teste.com",
      password: "teste",
    })
  })

  const json = await response.json();
  token = json.token;
})

describe("Search users", () => {
  it('should not allow search users when not authenticated', async () => {
    const response = await fetch("http://localhost:3001/api/v1/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        searchTerm: "Teste",
      })
    })

    expect(response.status).toBe(401);
  })
  it('should  allow search user when authenticated', async () => {
    const response = await fetch("http://localhost:3001/api/v1/user/0/20", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        searchTerm: "Teste"
      })
    })

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(Array.isArray(json.users)).toBe(true);
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