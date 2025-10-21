//import { faker } from '@faker-js/faker';

export function getRandonNumber() {
  return new Date().getTime();
  // return faker.number.bigInt();
}


export function getRandonEmail() {
  return `qa-tester${getRandonNumber()}@tester.com`
  //return faker.internet.email({ firstName: 'qa-tester-pgats' });
}
