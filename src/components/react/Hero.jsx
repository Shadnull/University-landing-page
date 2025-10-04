// src/components/react/Hero.jsx
import { useState } from 'react';


// src/components/react/Hero.jsx
export default function Hero() {
    return (
        <div className="text-center text-white">
            <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">Universidad Tecnológica de Nayarit</h1>
            <p className="text-2xl mb-8 drop-shadow-md">no le sé a web</p>
            <button className="bg-yellow-400 text-blue-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-300 transition-colors">
                Inscríbete
            </button>
        </div>
    );
}