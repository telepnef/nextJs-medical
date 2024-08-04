const login = (email, password) => {
  return fetch("https://feeltect.interactive.ie/api/galen/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export async function signIn(type = "credentials", formData) {
  try {
    const userData = await login(
      formData.get("email"),
      formData.get("password"),
    ).then((response) => response.json());

    if (userData.userId) {
      return userData;
    }

    return false;
  } catch (e) {
    console.log("AUTH ERROR", e);

    return false;
  }
}
