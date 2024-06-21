import React from 'react'

function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

async function openRazorpayCheckout(){
    await loadScript();
    // 1. get the order from backend 
    const resp=await fetch("http://localhost:3000/checkout",{method:"POST"});
    const data =await resp.json();
    console.log("data",data);
    const {order:{amount,currency,id}}=data;
    // 2. create a new order object that will be sent to payment gateway
    const finalOrderObject={
        "key": "rzp_test_IMtjdhN37urOgb", //public key
        "amount": amount,
        "currency": currency,
        "name": "Acme Corp",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": id,
        "handler": function (response){
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)
        },
        "prefill": {
            "name": "Abhishek Goel",
            "email": "goel.abhishek@example.com",
            "contact": "9000090000"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new Razorpay(finalOrderObject);
    rzp1.open();

     // // error handling
    rzp1.on('payment.failed', function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
    });
}







function App() {
  return (
    <>
        <h1>Payment Demo</h1>
        <a onClick={openRazorpayCheckout}>Buy Now</a>
    </>
  )
}

export default App