export async function asyncFetch(url, method, token, content, user) {
    const res = await fetch(url, { method: method, headers: { 'Content-Type': 'application/json', 'x-auth-token': token }, content: JSON.stringify(user) })
    return res.json()
}