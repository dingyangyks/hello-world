'use strict'
function TEST (vip) {
  const amount = 0;
  if (vip) {
    const amount = 1;
  }
  { 
    const amount = 100;
    {
      const amount = 1000;
      }
  }  
  return amount;
}
 
console.log(TEST(true));

const a = 30;
console.log(a);