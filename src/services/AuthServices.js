// export const loginService = async (credentials) => {
//     const response = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(credentials),
//     });
//     if (!response.ok) throw new Error("Login failed");
//     return response.json();
//   };
  
//   export const signupService = async (userData) => {
//     const response = await fetch("/api/auth/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(userData),
//     });
//     if (!response.ok) throw new Error("Signup failed");
//     return response.json();
//   };
  
//   export const validateTokenService = async (token) => {
//     const response = await fetch("/api/auth/validate-token", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (!response.ok) throw new Error("Token validation failed");
//     return response.json();
//   };
  