var dataset = require('./dataset.json');

/*
  create an array with accounts from bankBalances that are
  greater than 100000
  assign the resulting new array to `hundredThousandairs`
*/
var hundredThousandairs = dataset['bankBalances'].filter(function(elem) {
  return elem.amount > 100000;
});

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `rounded`

  `rounded` value is `amount` rounded to the nearest dollar

  Example:
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting new array to `datasetWithRoundedDollar`
*/
var datasetWithRoundedDollar = dataset['bankBalances'].map(function(elem) {
  let newBalance = {
    amount: elem.amount,
    state: elem.state,
    rounded: null
  };
  elem.rounded = Math.round(elem.amount);
  return elem;
});

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `roundedDime`

  `roundedDime` value is `amount` rounded to the nearest 10th of a cent

  Example 1
    {
      "amount": "134758.46",
      "state": "HI"
      "roundedDime": 134758.5
    }
  Example 2
    {
      "amount": "134758.44",
      "state": "HI"
      "roundedDime": 134758.4
    }
  assign the resulting new array to `roundedDime`
*/
var datasetWithRoundedDime = dataset['bankBalances'].map(function(elem) {
  let newBalance = {
    amount: elem.amount,
    state: elem.state,
    roundedDime: null
  };
  let temp = Number.parseFloat(elem.amount).toFixed(1);
  newBalance.roundedDime = Number.parseFloat(temp);
  return newBalance;
});

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = dataset['bankBalances'].reduce(function(sum, curr) {
  return Number.parseFloat((sum + Number.parseFloat(curr.amount)).toFixed(2));
}, 0);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest cent
  and then sum it all up into one value saved to `sumOfInterests`
 */
let states = { WI: true, IL: true, WY: true, OH: true, GA: true, DE: true };
var sumOfInterests = dataset['bankBalances']
  .filter(function(elem) {
    return states.hasOwnProperty(elem.state);
  })
  .reduce(function(sum, curr) {
    // console.log(curr);
    let amount = Number.parseFloat(curr.amount);
    let interest = Number.parseFloat(amount * 0.189);
    let newAmount = amount + interest;
    return Number.parseFloat((sum + interest).toFixed(2));
  }, 0);

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest cent

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
var stateSums = {};

dataset['bankBalances'].forEach(function(elem) {
  if (stateSums.hasOwnProperty(elem.state)) {
    let amount = Number.parseFloat(elem.amount);
    let sum = stateSums[elem.state] + amount;
    stateSums[elem.state] = Number.parseFloat(sum.toFixed(2));
  } else {
    let amount = Number.parseFloat(elem.amount);
    stateSums[elem.state] = Number.parseFloat(amount.toFixed(2));
  }
});

/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */

states = { WI: true, IL: true, WY: true, OH: true, GA: true, DE: true };

var sumOfHighInterests = Object.entries(stateSums)
  .filter(function(elem) {
    return !states.hasOwnProperty(elem[0]);
  })
  .reduce(function(sum, curr) {
    let interest = curr[1] * 0.189;
    if (interest > 50000) {
      return Number.parseFloat((sum + interest).toFixed(2));
    } else {
      return sum;
    }
  }, 0);

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */

var lowerSumStates = Object.entries(stateSums)
  .filter(function(elem) {
    if (elem[1] < 1000000) {
      return elem[0];
    }
  })
  .map(function(elem) {
    return elem[0];
  });

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */

var higherStateSums = Object.values(stateSums).reduce(function(sum, curr) {
  if (curr > 1000000) {
    return sum + curr;
  } else {
    return sum;
  }
}, 0);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
states = { WI: true, IL: true, WY: true, OH: true, GA: true, DE: true };

var areStatesInHigherStateSum = Object.entries(stateSums)
  .filter(function(elem) {
    return states.hasOwnProperty(elem[0]);
  })
  .every(function(elem) {
    return elem[1] > 2550000;
  });

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */

var anyStatesInHigherStateSum = Object.entries(stateSums)
  .filter(function(elem) {
    return states.hasOwnProperty(elem[0]);
  })
  .some(function(elem) {
    return elem[1] > 2550000;
  });

module.exports = {
  hundredThousandairs: hundredThousandairs,
  datasetWithRoundedDollar: datasetWithRoundedDollar,
  datasetWithRoundedDime: datasetWithRoundedDime,
  sumOfBankBalances: sumOfBankBalances,
  sumOfInterests: sumOfInterests,
  sumOfHighInterests: sumOfHighInterests,
  stateSums: stateSums,
  lowerSumStates: lowerSumStates,
  higherStateSums: higherStateSums,
  areStatesInHigherStateSum: areStatesInHigherStateSum,
  anyStatesInHigherStateSum: anyStatesInHigherStateSum
};
