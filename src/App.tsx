import { useAnimate, useInView, motion } from "framer-motion"
import { useEffect, useState } from "react"

const App = () => {
  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)
  const [isCursorLoaded, setIsCursorLoaded] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  useEffect(() => {
    if (isSubscribed) {
      const buttonTextAnimation = async () => {
        await animate(
          "#subscribe",
          {
            opacity: 0,
            y: 20,
          },
          {
            duration: 0.5,
            ease: "easeOut",
          }
        )

        await animate(
          "#subscribed",
          {
            opacity: 1,
            y: -20,
            display: "inline",
          },
          {
            duration: 0.5,
          }
        )
      }

      buttonTextAnimation()
    }
  }, [isSubscribed])

  useEffect(() => {
    if (isInView && isCursorLoaded) {
      const cursorAnimation = async () => {
        await animate(
          "#cursor",
          {
            opacity: [0, 1],
            x: [100, -10],
            y: [100, 30],
          },
          {
            duration: 1,
          }
        )

        await animate(
          "#cursor",
          {
            scale: 0.9,
          },
          {
            delay: 0.05,
            repeatType: "reverse",
            repeat: 1,
            onComplete() {
              setIsSubscribed(true)
            },
          }
        )

        await animate(
          "#cursor",
          {
            x: [-10, 30],
            y: [30, 80],
          },
          {
            duration: 1,
          }
        )
      }

      const buttonAnimation = async () => {
        await animate(
          "#subscribeButton",
          {
            boxShadow: "5px 5px 0 rgba(0, 0, 0, 0.9)",
          },
          {
            delay: 0.4,
            duration: 0.1,
          }
        )
        await animate(
          "#subscribeButton",
          {
            boxShadow: "2px 2px 0 rgba(0, 0, 0, 0.9)",
          },
          {
            delay: 0.5,
            repeatType: "reverse",
            repeat: 1,
          }
        )
        await animate("#subscribeButton", {
          backgroundColor: "#4338ca",
        })
      }

      cursorAnimation()
      buttonAnimation()
    }
  }, [isInView, isCursorLoaded])

  return (
    <main className="h-screen flex items-center justify-center" ref={scope}>
      <button
        id="subscribeButton"
        className="bg-rose-700 border border-rose-950 w-80 h-16 flex flex-col justify-center text-4xl font-bold tracking-tight text-neutral-100"
      >
        <span className="w-full" id="subscribe">
          Subscribe
        </span>
        <motion.span
          className="w-full"
          initial={{ opacity: 0, display: "none" }}
          id="subscribed"
        >
          Subscribed
        </motion.span>
      </button>
      <img
        src="/pointinghand.svg"
        alt="Pointing Hand Cursor"
        id="cursor"
        className="w-20 h-20 absolute"
        onLoad={() => setIsCursorLoaded(true)}
        style={{ display: isCursorLoaded ? "block" : "none" }}
      />
    </main>
  )
}

export default App
