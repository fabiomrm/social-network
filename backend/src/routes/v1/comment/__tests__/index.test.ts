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

describe("Create comment", () => {
  it('should not allow add comment when not authenticated', async () => {
    const response = await fetch("http://localhost:3001/api/v1/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: "Meu primeiro comentário",
        postId: 1,
      })
    })

    expect(response.status).toBe(401);
  })
  it('should  allow add comment when authenticated', async () => {
    const response = await fetch("http://localhost:3001/api/v1/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        text: "Meu primeiro comentário",
        postId: 1,

      })
    })
    expect(response.status).toBe(201);
    const json = await response.json();
    console.log(json.comment)
    expect(Number(json.comment.id) > 0).toBe(true)

  })
});

