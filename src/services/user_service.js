import { apiBaseURL } from "../configs/server.js";

async function login(email, password) {
    const response = await fetch(`${apiBaseURL}/login`, {
        method: 'post',
        body: JSON.stringify({email, password}),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.status === 401) return null;
    if (response.status !== 200) return null; 


    return (await response.json()).token;
}

const userService = {
    login
};

export default userService;