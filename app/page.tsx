"use client"

import { useState, useEffect } from "react"

export default function RedButtonPage() {
  const [showMessage, setShowMessage] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    // Trigger entrance animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleButtonClick = () => {
    // Play the beep sound
    const audio = new Audio("https://www.soundjay.com/button/beep-07.wav")
    audio.play().catch((error) => {
      console.log("Audio playback failed:", error)
    })

    // Play the background music in loop
    const music = new Audio("/track.mp3")
    music.loop = true
    music.play().catch((error) => {
      console.log("Music playback failed:", error)
    })

    // Trigger shake animation
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 500)

    // Show the GIF overlay and message
    setIsClicked(true)

    // Show the message with a slight delay for drama
    setTimeout(() => {
      setShowMessage(true)
    }, 200)
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 overflow-hidden">
      <div className="flex flex-col items-center space-y-12">
        {/* Warning text with entrance animation */}
        <h1
          className={`text-white text-2xl md:text-3xl font-bold text-center font-sans transition-all duration-1000 ease-out ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          {"don't click the red button."}
        </h1>

        {/* Red button with glowing shadow and animations */}
        <button
          onClick={handleButtonClick}
          className={`w-32 h-32 md:w-40 md:h-40 bg-red-600 hover:bg-red-700 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(239,68,68,0.6)] hover:shadow-[0_0_50px_rgba(239,68,68,0.9)] active:scale-95 ${
            isLoaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-75"
          } ${isShaking ? "animate-shake" : ""}`}
          aria-label="Red button"
        >
          <span className="sr-only">Red button</span>
        </button>

        {/* Hidden message with dramatic entrance */}
        {showMessage && (
          <p className="text-red-500 text-xl md:text-2xl font-bold text-center font-sans animate-bounce-in">
            {"fuck you! I told you not to click."}
          </p>
        )}
      </div>

      {/* Full-screen GIF overlay */}
      {isClicked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <img src="/clicked_gif.gif" alt="Reaction GIF" className="w-full h-full object-cover" />
        </div>
      )}

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(20px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05) translateY(-5px);
          }
          70% {
            transform: scale(0.95) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
