// src/App.jsx

import React, { useState, useEffect, useRef } from 'react';
import { IoSend } from 'react-icons/io5';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);
  
  // Initial welcome message from the bot
  useEffect(() => {
    setMessages([
      {
        text: "Hello! I am NeoHritik, your personal AI assistant. How can I help you today?",
        sender: 'bot',
        id: Date.now()
      }
    ]);
  }, []);

  const getBotResponse = (userInput) => {
    const text = userInput.toLowerCase().trim();
    
    // Simple rule-based responses
    if (text.includes("hello") || text.includes("hi")) {
      return "Hello there! How are you?";
    }
    if (text.includes("how are you")) {
      return "I'm doing great! Thanks for asking.";
    }
    if (text.includes("your name")) {
      return "You can call me NeoHritik. It's a pleasure to meet you!";
    }
    if (text.includes("help")) {
      return "How can i help you?";
    }
    if (text.includes("time")) {
      return `The current time is ${new Date().toLocaleTimeString()}.`;
    }
     if (text.includes("what is your name")) {
      return "You can call me NeoHritik. It's a pleasure to meet you!";
     }

     if (text.includes("education") || text.includes("study") || text.includes("Hritik's qualification")) {
  return "Hritik is currently in a third year of B.tech at Galgotias University.";
}

if (text.includes("your creator") || text.includes("who made you")) {
  return "I was created by Hritik, a passionate developer who loves building cool web apps!";
}

if (text.includes("who is Hritik") || text.includes("about Hritik")) {
  return "Hritik is a skilled frontend developer from India. He creates web apps using React, HTML, CSS, and JavaScript!";
}

if (text.includes("Hritik's project") || text.includes("portfolio")) {
  return "Hritik has built projects like a Typing Speed Test, a Buddha Teachings page, a room rental finder, and more!";
}

if (text.includes("Hritik's skills")) {
  return "Hritik is skilled in HTML, CSS, JavaScript, React, and UI/UX design. He’s also good at writing project documentation.";
}

if (text.includes("Hritik's dream") || text.includes("goal")) {
  return "Hritik dreams of becoming a top developer and building tech that helps people in the real world!";
}


     if (text.includes("hobby") || text.includes("free time") || text.includes("Hritik likes")) {
  return "Hritik enjoys coding, photography, exploring AI tools, and sharing knowledge through social media.";
}

if (text.includes("favorite tools") || text.includes("AI tools")) {
  return "Hritik loves using tools like ChatGPT, DALL·E, Midjourney, Quillbot, and Notion AI to boost productivity and creativity.";
}

if (text.includes("GitHub") || text.includes("projects link")) {
  return "You can check out Hritik's projects on his GitHub profile. They're innovative and solve real-world problems!";
}

if (text.includes("LinkedIn")) {
  return "Hritik actively shares development tips and project updates on LinkedIn. Follow him to stay inspired!";
}

if (text.includes("fun fact") || text.includes("something interesting")) {
  return "Fun fact: Hritik built a chatbot that talks about himself — and I’m that chatbot!";
}

if (text.includes("describe Hritik")) {
  return "Hritik is a creative, ambitious, and hard-working developer who believes in building apps that matter.";
}


    if (text.includes("joke")) {
      const jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "I told my wife she was drawing her eyebrows too high. She looked surprised."
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
    
    return "I'm sorry, I don't understand that yet. I am still learning. Try asking for 'help'.";
  };
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user', id: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot thinking and responding
    setTimeout(() => {
      const botResponse = getBotResponse(input);
      const botMessage = { text: botResponse, sender: 'bot', id: Date.now() + 1 };
      setIsTyping(false);
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>NeoHritik</h2>
        <span>Online</span>
      </div>
      <div className="chat-body">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        {isTyping && (
          <div className="message bot typing-indicator">
            <span></span><span></span><span></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-footer" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          aria-label="Type a message"
        />
        <button type="submit" aria-label="Send message">
          <IoSend />
        </button>
      </form>
    </div>
  );
};

export default App;
