'use client'

import { FiSun, FiMoon } from "react-icons/fi"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from "next/image"
import { useDarkMode } from "@/hooks/DarkModeContext"
import { Moon, Sun } from "lucide-react"

export default function UpdateTheme() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  const { isDark, toggleDarkMode } = useDarkMode();
  useEffect(() =>  setMounted(true), [])

  // if (!mounted) return (
  //   <Image
  //     src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
  //     width={36}
  //     height={36}
  //     sizes="36x36"
  //     alt="Loading Light/Dark Toggle"
  //     priority={false}
  //     title="Loading Light/Dark Toggle"
  //   />
  // )

  // if (resolvedTheme === 'dark') {
  //   return <FiSun size={25} onClick={() => setTheme('light')} />
  // }

  // if (resolvedTheme === 'light') {
  //   return <FiMoon size={25} onClick={() => setTheme('dark')} />
  // }
return (
    <button
      onClick={toggleDarkMode}
      className="z-10 p-1 font-medium text-black  dark:text-white"
    >
      {isDark ? <Sun className="" /> : <Moon className="" />}
    </button>
  );
}