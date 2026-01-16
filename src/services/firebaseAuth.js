const FIREBASE_API_KEY = "AIzaSyB64LBSeIesA1w7zgmpHLAqsmlITjkdSJs";

export const login = async (email, password) => {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || "Login failed");
  }

  return data;
};

export const signup = async (email, password) => {
  const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || "Signup failed");
  }

  return data;
};
