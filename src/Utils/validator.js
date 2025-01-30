export const validateSignup = (name, phNo, password, confirmPassword) => {
  console.log("Validating Signup Data:", { name, phNo, password, confirmPassword });

  if (!name.trim()) return "Name is required.";
  if (!phNo.trim() || phNo.length !== 10) return "Enter a valid 10-digit phone number.";
  if (!password || password.length < 6) return "Password must be at least 6 characters long.";
  if (password !== confirmPassword) return "Passwords do not match.";

  return null;
};
