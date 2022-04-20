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
        postId: 1,
        userId: 1,
        test: true
      })
    })


    expect(response.status).toBe(201);
    const json = await response.json();
    expect(Number(json.like.id) > 0).toBe(true);

  })
  it('shoud not be able to like comment when not authenticated', async () => {
    const response = await fetch("http://localhost:3001/api/v1/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
      })
    })

    expect(response.status).toBe(401);
  })
  it('shoud be able to like comment when authenticated', async () => {
    const response = await fetch("http://localhost:3001/api/v1/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        commentId: 1,
        userId: 1,
        test: true
      })
    })


    expect(response.status).toBe(201);
    const json = await response.json();
    expect(Number(json.like.id) > 0).toBe(true);

  })
})