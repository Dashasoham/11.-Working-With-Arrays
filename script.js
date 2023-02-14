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

const displayMovements = function (movements, sort = false) {
  //EMPTYING THE CONTAINER
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (movement, i) {
    const type = movement > 0 ? "deposit" : "withdrawal";

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1}
    ${type}</div>
    <div class="movements__value">${movement}</div>
  </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// const user = "Steven Thomas Williams"; //stw
console.log("---CREATE USER NAMES---");
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

const updateUI = function (acc) {
  displayMovements(acc.movements);

  //DISPLAY BALANCE
  calcDisplayBalance(acc);

  //DISPLAY SUMMARY
  calcDisplaySummary(acc);
};
console.log("----CALCULATE MOVEMENTS-----");

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce(
    (account, mov) => account + mov,
    0
  );
  labelBalance.textContent = `${account.balance}`;
};

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter(function (int, i, arr) {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

//EVENT HANDLER
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  //Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(function (acc) {
    return acc.username === inputLoginUsername.value;
  });
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //DISPLAY UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    //CLEAR INPUT FIELDS

    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    //UPDATE UI
    updateUI(currentAccount);

    //DISPLAY MOVEMENTS
  }
});
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAccount);

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount),
      receiverAccount.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount / 10)
  ) {
    //ADD movement

    currentAccount.movements.push(amount);
    //Update UI

    updateUI(currentAccount);
  }
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  // console.log(currentAccount.username);

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    accounts.splice(index, 1);

    labelWelcome.textContent = `Bye, ${currentAccount.owner.split(" ")[0]}`;

    containerApp.style.opacity = 0;

    inputCloseUsername.value = inputClosePin.value = "";
  } else {
    labelWelcome.textContent = `Wrong username OR password`;
  }
});

let sorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

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


let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const EurToUsd = 1.1;
console.log(movements);

console.log("---REDUCE METHOD----");
//Accumulator=>Snowball
const balance = movements.reduce(function (accumulator, cur, i, arr) {
  console.log(`Iteration ${i}:${accumulator}`);
  return accumulator + cur;
}, 0);
console.log(balance);

let sum1 = 0;
for (const mov of movements) sum1 += mov;
console.log(sum1);

//MAXIMUM VALUE
const max = movements.reduce(function (acc, mov) {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);

console.log("----CHAINING METHODS----");

//PIPELINE
console.log(movements);
const totalDepositsUSD = movements
  .filter(function (mov) {
    return mov > 0;
  })
  .map(function (mov) {
    return mov * EurToUsd;
  })
  .reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
// const totalDepositsUSD = movements
//   .filter((mov) => mov > 0)
//   .map((mov) => mov * EurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

/*
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

// console.log("---FILTER METHOD----");

// const deposits = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(movements);
// console.log(deposits);

// const depositsFor = [];
// for (const mov of movements)
//   if (mov > 0) {
//     depositsFor.push(mov);
//   }
// console.log(depositsFor);

// const withdrawals = movements.filter(function (mov) {
//   return mov < 0;
// });
// console.log(withdrawals);

// const withdrawals2 = [];
// for (const withdraw of movements) {
//   if (withdraw < 0) withdrawals2.push(withdraw);
// }
// console.log(withdrawals2);

console.log("----CHALLENGE WITH THE DOGS----");

const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaAjusted = dogsJulia.slice(1, 3);
  const dogs = dogsJuliaAjusted.concat(dogsKate);
  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
console.log("---TEST DATA 2---");
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

console.log("----HUMANAGE-----");

const calcAverageHumanAge = function (ages) {
  const dogAge = ages
    .map(function (age) {
      // age <= 2 ? 2*age : 16+age*4);
      if (age <= 2) {
        return 2 * age;
      } else {
        return 16 + age * 4;
      }
    })
    .filter((age) => age >= 18)
    .reduce((accumulator, age, i, arr) => accumulator + age / arr.length, 0);
  // const adultAges = dogAge.filter(function (age) {
  //   return age >= 18;
  // });
  // const averageHumanAgeAdults = adultAges.reduce(function (accumulator, age) {
  //   return accumulator + age / adultAges.length;
  // }, 0);
  // console.log(averageHumanAgeAdults);
  console.log(dogAge);
};
// return dogAge;

// const humanAges =
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(humanAges);

// const filteredAges = humanAges.filter(function (age) {
//   return age >= 18;
// });
// console.log(filteredAges);

// const averageHumanAge = humanAges.reduce(function (accumulator, age) {
//   return (accumulator + age) / humanAges.length;
// }, humanAges[0]);
// console.log(averageHumanAge);

console.log("----THE FIND METHOD---");

let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithdrawal = movements.find(function (mov) {
  return mov < 0;
});
console.log(firstWithdrawal);

console.log(accounts);
// const account = accounts.find((acc) => acc.owner === "Jessica Davis");
// console.log(account);
for (const acc of accounts) {
  acc.owner === "Jessica Davis" ? console.log(acc) : console.log();
}


let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//EQUALITY
console.log(movements);
console.log(movements.includes(-130));

//SOME:CONDITION
const anyDeposits = movements.some(function (mov) {
  return mov > 1500;
});

console.log(anyDeposits);

//EVERY

console.log(
  movements.every(function (mov) {
    return mov > 0;
  })
);
console.log(account4.movements.every((mov) => mov > 0));

//Separate callback

const deposit = (mov) => mov > 0;
console.log(movements.some(deposit));


const arr = [[1, 2, 3], [4, 5, 6], 7, 8];

console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));

//flat
const overallBalance = accounts
  .map(function (acc) {
    return acc.movements;
  })
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

//flatMap
const overallBalance2 = accounts
  .flatMap(function (acc) {
    return acc.movements;
  })

  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2);


const owners = ["Jonas", "Zach", "Adam", "Martha"];
console.log(owners);
//SORT() MUTATES THE ARRAY
console.log(owners.sort());
console.log(owners);

let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements.slice());
console.log(movements);

//return <0, A,B(keep order)
//return >0, B,A(switch order)

//Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });

movements.sort((a, b) => a - b);
console.log(movements);
*/
const x = new Array(7);
console.log(x);

//Empy arrays +  x.fill(1);
x.fill(1, 3, 5);
console.log(x);

const arr = [1, 2, 3, 4, 5, 6, 7, 8];
arr.fill(23, 4, 6);
console.log(arr);

//Array.from()a
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (cur, i) => i + 1);
console.log(z);

const r = Array.from({ length: 100 }, (cur, i) => i + Math.random());
console.log(r);

labelBalance.addEventListener("click", function (e) {
  const movementsUi = Array.from(
    document.querySelectorAll(".movements__value")
  );
  console.log(movementsUi.map((el) => el.textContent.replace("€", "")));
});
