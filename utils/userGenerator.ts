export function generateRandomUser() {
  const timestamp = Date.now();
  return {
    username: `user${timestamp}`,
    password: "Test@123",
  };
}
