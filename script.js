"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements) {
  //EMPTYING THE CONTAINER
  containerMovements.innerHTML = "";

  movements.forEach(function (movement, i) {
    const type = movement > 0 ? "deposit" : "withdrawal";

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1}
    ${type}</div>
    <div class="movements__value">${movement}</div>
  </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
displayMovements(account1.movements);

// const user = "Steven Thomas Williams"; //stw

console.log("---MY CODE---");
const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(function (name) {
        return name[0];
      })
      .join("");
  });
};
createUserName(accounts);
console.log(accounts);

// console.log("---FROM THE COURSE_----");

// const createUsernames = function (accs) {
//   accs.forEach(function (acc) {
//     acc.username = acc.owner
//       .toLowerCase()
//       .split(" ")
//       .map((name) => name[0])
//       .join("");
//   });
// };
// createUsernames(accounts);
// console.log(accounts);

//---------------------------------

// const username = user
//   .toLowerCase()
//   .split(" ")
//   .map(function (name) {
//     return name[0];
//   })
//   //.map((name) => name[0])

//   .join("");
// return username;

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/////////////////////////////////////////////////
/*
let arr = ["a", "b", "c", "d", "e"];

console.log("----SLICE-----");
//DOESN´T MUTATE the original array
console.log(arr.slice(2));
console.log(arr.slice(-1));
console.log(arr);
console.log(arr.slice(1, 3));

console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));

console.log(arr.slice());
console.log([...arr]);

console.log("----SPLICE-----");
//MUTATES the original array
console.log(arr);

// console.log(arr.splice(2));
console.log(arr.splice(-1));
console.log(arr.splice(1, 2));
console.log(arr);

console.log("-----REVERSE------");
//MUTATES the original array
const arr2 = ["j", "i", "h", "g", "f"];
console.log(arr2.reverse());
console.log(arr2);

console.log("---CONCAT---");
//DOESN´T MUTATE the original array
arr = ["a", "b", "c", "d", "e"];

const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

console.log("---JOIN---");
console.log(letters.join(" - "));

const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0));

console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log("jonas".at(-1));

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`${i + 1}: You deposeted ${Math.abs(movement)}`);
  }
}
console.log("----forEach----");
movements.forEach(function (movement, i, array) {
  if (movement > 0) {
    console.log(`${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`${i + 1}: You deposeted ${Math.abs(movement)}`);
  }
});

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

//MAP
currencies.forEach(function (value, key, map) {
  console.log(`${key}:${value}`);
});

//SET
const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
console.log(currenciesUnique);

currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}:${value}`);
});


console.log("----CHALLENGE WITH THE DOGS----");

// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaAjusted = dogsJulia.slice(1, 3);
//   const dogs = dogsJuliaAjusted.concat(dogsKate);
//   dogs.forEach(function (dog, i) {
//     if (dog >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
//     } else {
//       console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//     }
//   });
// };

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// console.log("---TEST DATA 2---");
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
// console.log(allAges);

//



const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const EurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * EurToUsd;
// });
console.log(movements);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * EurToUsd);
console.log(movementsUSDfor);

const movementsUSD = movements.map((mov) => {
  return mov * EurToUsd;
});
console.log(movementsUSD);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `${i + 1}: You  ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(mov)}`
);
console.log(movementsDescriptions);

//WHY ForEach cannot substitute MAP?
// const movementsDescriptions2 = movements.forEach(function (mov, i) {
//   `${i + 1}: You  ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(mov)}`;
// });

*/
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const EurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * EurToUsd;
// });
// console.log(movements);

// const movementsUSDfor = [];
// for (const mov of movements) movementsUSDfor.push(mov * EurToUsd);
// console.log(movementsUSDfor);

// const movementsUSD = movements.map((mov) => {
//   return mov * EurToUsd;
// });
// console.log(movementsUSD);

// const movementsDescriptions = [];

// movements.forEach((mov, i) =>
//   movementsDescriptions.push(
//     `${i + 1}: You  ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(mov)}`
//   )
// );
// console.log(movementsDescriptions);
// console.log(movements);

// WHY ForEach cannot substitute MAP?
// const movementsDescriptions2 = movements.forEach(function (mov, i) {
//   `${i + 1}: You  ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(mov)}`;
// });

console.log("---FILTER METHOD----");

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements)
  if (mov > 0) {
    depositsFor.push(mov);
  }
console.log(depositsFor);

const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawals);

const withdrawals2 = [];
for (const withdraw of movements) {
  if (withdraw < 0) withdrawals2.push(withdraw);
}
console.log(withdrawals2);
