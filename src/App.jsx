import { useState } from "react";
import "./App.css";
import { InputBox } from "./components/index";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setForm] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currenyInfo = useCurrencyInfo(from);
  const options = Object.keys(currenyInfo);

  const swap = () => {
    setForm(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    setConvertedAmount(parseFloat(amount * currenyInfo[to]).toFixed(2));
  };

  const image = "https://images.pexels.com/photos/259249/pexels-photo-259249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <div className="flex flex-wrap justify-center items-center">
            <button
              className="mb-2 mx-2 px-1 py-1 rounded-md bg-blue-600 text-white px-2 py-0.5 "
              onClick={() => {
                setForm("btc");
                setAmount(0);
                setConvertedAmount(0);
              }}
            >
              Crypto
            </button>
            <button
              className="mb-2 px-1 py-1 rounded-md bg-blue-600 text-white px-2 py-0.5"
              onClick={() => {
                setForm("usd");
                setAmount(0);
                setConvertedAmount(0);
              }}
            >
              Fiat
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                lable="from"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setForm(currency)}
                onAmountChange={(amount) => (amount === 0 ? setAmount(0) : setAmount(amount))}
                selectedCurrency={from}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 broder-2 broder-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mb-1">
              <InputBox
                lable="to"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectedCurrency={to}
                amountDisabled
              />
            </div>
            <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg" type="submit">
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
