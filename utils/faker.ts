import { faker } from "@faker-js/faker";

export function createRandomUser() {
  return {
    name: faker.internet.username(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
  };
}
