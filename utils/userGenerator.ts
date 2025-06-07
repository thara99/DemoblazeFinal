import { faker } from "@faker-js/faker";

export function generateRandomUser() {
  return {
    username: faker.internet.email(),
    password: faker.internet.password(),
  };
}
