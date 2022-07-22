/// <reference lib="webworker" />




addEventListener('message', ({ data }) => {

  let recievedData = data;

  switch (data.coupon) {

    case 'EAR00010':
      for (let i = 0; i < recievedData.savedCartProducts.length; i++) {
        let index = recievedData.savedCartProducts[i].name.search('Earrings');
        if (index < 0) {
          recievedData.flag = true;
        }
      }
      if (!recievedData.flag) {
        recievedData.totalDiscount = (recievedData.totalItemPrice * 10) / 100;
        recievedData.discountApplied = recievedData.totalDiscount;
        // this.totalItemPrice = this.totalItemPrice-this.discountApplied;

        recievedData.flag = false;
      }

      console.log(recievedData.savedCartProducts, "web workers");
      console.log(recievedData.coupon);
      console.log(recievedData.totalDiscount, "coupons");
      break;

    case 'NEC00020':
      for (let i = 0; i < recievedData.savedCartProducts.length; i++) {
        let product = recievedData.savedCartProducts[i].name.search('Necklace');
        if (product < 0) {
          recievedData.flag = true;
          break;
        }
      }
      if (!recievedData.flag) {
        recievedData.totalDiscount = (recievedData.totalItemPrice * 20) / 100;
        recievedData.discountApplied = recievedData.totalDiscount;
        // this.totalItemPrice = this.totalItemPrice-this.discountApplied;
        recievedData.flag = false;
      }
      break;

    case 'RIN00015':
      for (let i = 0; i < recievedData.savedCartProducts.length; i++) {
        let product = recievedData.savedCartProducts[i].name.search('Ring');
        if (product < 0) {
          recievedData.flag = true;
          break;
        }
      }
      if (!recievedData.flag) {
        recievedData.totalDiscount = (recievedData.totalItemPrice * 15) / 100;
        recievedData.discountApplied = recievedData.totalDiscount;
        //  recievedData.totalItemPrice = recievedData.totalItemPrice-recievedData.discountApplied;
        recievedData.flag = false;
        break;
      }
      console.log(recievedData.appliedCoupons, 'RIN00015');
      break;

    case 'BRC00025':
      for (let i = 0; i < recievedData.savedCartProducts.length; i++) {
        let product = recievedData.savedCartProducts[i].name.search('Bracelet');
        if (product < 0) {
          recievedData.flag = true;
        }
      }
      if (!recievedData.flag) {
        recievedData.totalDiscount = (recievedData.totalItemPrice * 25) / 100;
        recievedData.discountApplied = recievedData.totalDiscount;
        //  recievedData.totalItemPrice = recievedData.totalItemPrice-recievedData.discountApplied;
        recievedData.flag = false;
      }
      break;

    case 'BRCRIN20':
      for (let i = 0; i < recievedData.savedCartProducts.length; i++) {
        let product = recievedData.savedCartProducts[i].name.search('Bracelet');
        let product2 = recievedData.savedCartProducts[i].name.search('Ring');
        if (product < 0 && product2 < 0) {
          recievedData.flag = true;
        }
      }
      if (!recievedData.flag) {
        recievedData.totalDiscount = (recievedData.totalItemPrice * 20) / 100;
        recievedData.discountApplied = recievedData.totalDiscount;
        // this.totalItemPrice = recievedData.totalItemPrice-recievedData.discountApplied;
        recievedData.flag = false;
      }
      break;

    case 'NECRIN25':
      for (let i = 0; i < recievedData.savedCartProducts.length; i++) {
        let product = recievedData.savedCartProducts[i].name.search('Necklace');
        let product2 = recievedData.savedCartProducts[i].name.search('Ring');
        if (product < 0 && product2 < 0) {
          recievedData.flag = true;
        }
      }
      if (!recievedData.flag) {
        recievedData.totalDiscount = (recievedData.totalItemPrice * 25) / 100;
        console.log(recievedData.totalDiscount, "NECRIN00020");
        recievedData.discountApplied = recievedData.totalDiscount;
        // this.totalItemPrice = recievedData.totalItemPrice-recievedData.discountApplied;
        recievedData.flag = false;
      }
      console.log(recievedData.appliedCoupons, 'NECRIN25');
      break;

    case 'EARNEC20':
      for (let i = 0; i < recievedData.savedCartProducts.length; i++) {
        let product = recievedData.savedCartProducts[i].name.search('Necklace');
        let product2 = recievedData.savedCartProducts[i].name.search('Earrings');
        if (product < 0 && product2 < 0) {
          recievedData.flag = true;
        }
      }
      if (!recievedData.flag) {
        recievedData.totalDiscount = (recievedData.totalItemPrice * 20) / 100;
        recievedData.discountApplied = recievedData.totalDiscount;
        // this.totalItemPrice = recievedData.totalItemPrice-recievedData.discountApplied;
        recievedData.flag = false;
      }
      break;

    case '':
      recievedData.discountApplied = 0;
      break;

    default:
      recievedData.discountApplied = 0;
      break;
  }
  recievedData.flag = false;

  postMessage(recievedData);
});

