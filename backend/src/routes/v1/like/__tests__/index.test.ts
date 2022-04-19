import fetch from 'cross-fetch';

let token = '';

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

describe('like test', () => {
  it('shoud not be able to like post when not authenticated', async () => {
    const response = await fetch("http://localhost:3001/api/v1/like", {
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
  it('shoud be able to like post when authenticated', async () => {
    const response = await fetch("http://localhost:3001/api/v1/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        text: "Meu primeiro post",
        userId: 1,
        test: true
      })
    })


    expect(response.status).toBe(201);
    const json = await response.json();
    expect(Number(json.comment.id > 0)).toBe(true);

  })
})