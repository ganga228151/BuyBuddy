import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const BargainBot = ({ originalPrice }) => {
  const [chat, setChat] = useState([
    { sender: "bot", text: "Hi! Want to bargain? Let's talk!" }
  ]);
  const [input, setInput] = useState("");
  const [totalDiscount, setTotalDiscount] = useState(0);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom when chat updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const isNonEnglish = (text) => /[^\u0000-\u007F]+/.test(text);

  const getBotResponse = (userInput) => {
    if (isNonEnglish(userInput)) {
      return "Please talk to me in English so I can understand you better. 😊";
    }

    const hasNumber = /\d+/.test(userInput);
    if (!hasNumber) {
      return "I'm only a bargaining bot. Please tell me your expected price.";
    }

    const maxAllowedDiscount = Math.floor(originalPrice * 0.4);

    if (totalDiscount >= maxAllowedDiscount) {
      const finalPrice = originalPrice - totalDiscount;
      return `🚫 Sorry, I can't offer more discount.\n✅ Maximum allowed discount is ₹${maxAllowedDiscount} (40% of product price).\n🎁 Total Discount Given: ₹${totalDiscount}\n💰 Final Price: ₹${finalPrice}`;
    }

    if (Math.random() > 0.5) {
      const maxOffer = maxAllowedDiscount - totalDiscount;
      const offer = Math.floor(Math.random() * (maxOffer / 2)) + 1;
      const newTotal = totalDiscount + offer;
      const finalPrice = originalPrice - newTotal;

      setTotalDiscount(newTotal);
      return `🎉 Okay, I can offer ₹${offer} more!\n🎁 Total Discount: ₹${newTotal}\n💰 You have to pay: ₹${finalPrice}`;
    } else {
      return "🤔 Hmm... I can't give a discount right now. Try again later.";
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const botReply = { sender: "bot", text: getBotResponse(input) };

    setChat((prev) => [...prev, userMessage, botReply]);
    setInput("");
  };
  return (
    <div className="min-h-screen flex flex-col items-center p-6 ">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 flex flex-col">
        <h2 className="text-xl font-bold text-center text-indigo-600 mb-4">
          🛍️ Bargaining Bot
        </h2>

        <div className="flex-1 overflow-y-auto mb-4 space-y-2 max-h-96" ref={chatEndRef}>
          {chat.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-lg text-sm whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-indigo-100 text-right ml-auto"
                  : "bg-gray-200 text-left mr-auto"
              } max-w-[80%]`}
            >
              {msg.text}
            </motion.div>
          ))}
          {/* <div ref={chatEndRef} /> */}
        </div>


        <div className="flex gap-2">
          {/* write code for input box  */}

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask for a discount..."
            className="flex-1 p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default BargainBot;
