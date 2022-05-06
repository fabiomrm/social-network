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

describe("Friend request", () => {
  it('should not allow send friend request when not authenticated', async () => {
    const response = await fetch("http://localhost:3001/api/v1/friend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        friendId: 2,
      })
    })

    expect(response.status).toBe(401);
  })
  it('should  allow send friend request when authenticated', async () => {
    const response = await fetch("http://localhost:3001/api/v1/friend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        friendId: 2,
        test: true,
      })
    })
    console.log(response)
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
  })

  it('should  allow accept/decline friend request when authenticated', async () => {
    const response = await fetch("http://localhost:3001/api/v1/friend/accept", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        friendId: 2,
        accepted: true,
        test: true,
      })
    })
    console.log(response)
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
  })
});