export function logout() {
  localStorage.removeItem("career_user");
  window.location.href = "/login";
}
