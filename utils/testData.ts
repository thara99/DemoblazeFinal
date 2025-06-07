import { faker } from "@faker-js/faker";

// Export functions instead of constants to generate fresh data each time
export const generateTestData = () => ({
  randomName: faker.person.fullName(),
  randomCountry: faker.location.country(),
  randomCity: faker.location.city(),
  randomCreditCard: faker.finance.creditCardNumber(),
  randomMonth: String(faker.number.int({ min: 1, max: 12 })),
  randomYear: String(faker.date.future().getFullYear()),
});
