"use client"

import type React from "react"

import { Inter } from "next/font/google"
import { useState, createContext, useEffect } from "react"
import { Bell, User, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

// Create context for global state
export const AppContext = createContext({
  notifications: 0,
  setNotifications: (count: number) => {},
  userName: "Mark",
  setUserName: (name: string) => {},
  showNotifications: false,
  setShowNotifications: (show: boolean) => {},
  showProfile: false,
  setShowProfile: (show: boolean) => {},
  notificationsList: [] as { id: string; message: string; time: string }[],
  markNotificationAsRead: (id: string) => {},
  clearAllNotifications: () => {},
})

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const [notifications, setNotifications] = useState(2)
  const [userName, setUserName] = useState("Mark")
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [notificationsList, setNotificationsList] = useState([
    { id: "1", message: "Your pickup request has been confirmed", time: "10 minutes ago" },
    { id: "2", message: "Payment received for monthly service", time: "2 hours ago" },
  ])

  const markNotificationAsRead = (id: string) => {
    setNotificationsList(notificationsList.filter((notification) => notification.id !== id))
    setNotifications(notifications - 1)
  }

  const clearAllNotifications = () => {
    setNotificationsList([])
    setNotifications(0)
  }

  // Handle clicks on profile and notification buttons
  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowProfile(!showProfile)
    if (showNotifications) setShowNotifications(false)
  }

  const handleNotificationClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowNotifications(!showNotifications)
    if (showProfile) setShowProfile(false)
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('[data-dropdown="profile"]') && !target.closest('[data-dropdown-toggle="profile"]')) {
        setShowProfile(false)
      }
      if (
        !target.closest('[data-dropdown="notifications"]') &&
        !target.closest('[data-dropdown-toggle="notifications"]')
      ) {
        setShowNotifications(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <html lang="en">
      <body className={inter.className} onClick={() => {}}>
        <AppContext.Provider
          value={{
            notifications,
            setNotifications,
            userName,
            setUserName,
            showNotifications,
            setShowNotifications,
            showProfile,
            setShowProfile,
            notificationsList,
            markNotificationAsRead,
            clearAllNotifications,
          }}
        >
          <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-[140px] bg-teal-700 text-white flex flex-col">
              <div className="p-4 border-b border-teal-600 flex justify-center items-center h-[80px]">
                <div className="flex flex-col items-center">
                  <Image src="/logo.jpg" alt="TrashGo Logo" width={60} height={40} />
                  <div className="text-center font-bold mt-1">TRASHGO</div>
                </div>
              </div>
              <nav className="flex flex-col flex-1">
                <Link
                  href="/"
                  className={`p-4 flex flex-col items-center hover:bg-teal-600 ${
                    pathname === "/" ? "bg-teal-600" : ""
                  }`}
                >
                  <div className="w-6 h-6 mb-1">🏠</div>
                  <span className="text-sm">Overview</span>
                </Link>
                <Link
                  href="/service-pickup"
                  className={`p-4 flex flex-col items-center hover:bg-teal-600 ${
                    pathname.startsWith("/service-pickup") ? "bg-teal-600" : ""
                  }`}
                >
                  <div className="w-6 h-6 mb-1">🚚</div>
                  <span className="text-sm">Service pickup</span>
                </Link>
                <Link
                  href="/billing"
                  className={`p-4 flex flex-col items-center hover:bg-teal-600 ${
                    pathname.startsWith("/billing") ? "bg-teal-600" : ""
                  }`}
                >
                  <div className="w-6 h-6 mb-1">💰</div>
                  <span className="text-sm">Billing</span>
                </Link>
                <Link
                  href="/feedback"
                  className={`p-4 flex flex-col items-center hover:bg-teal-600 ${
                    pathname.startsWith("/feedback") ? "bg-teal-600" : ""
                  }`}
                >
                  <div className="w-6 h-6 mb-1">📝</div>
                  <span className="text-sm">Feedback</span>
                </Link>
              </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <header className="h-[60px] border-b flex items-center justify-end px-6">
                <div className="flex items-center gap-4">
                  <div className="relative" data-dropdown="profile">
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={handleProfileClick}
                      data-dropdown-toggle="profile"
                    >
                      <User className="h-5 w-5" />
                    </button>
                    {showProfile && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
                        <div className="p-4 border-b">
                          <p className="font-medium">{userName}</p>
                          <p className="text-sm text-gray-500">client@trashgo.com</p>
                        </div>
                        <div className="py-1">
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Your Profile
                          </a>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Settings
                          </a>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Sign out
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="relative" data-dropdown="notifications">
                    <button
                      className="text-gray-500 hover:text-gray-700 relative"
                      onClick={handleNotificationClick}
                      data-dropdown-toggle="notifications"
                    >
                      <Bell className="h-5 w-5" />
                      {notifications > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          {notifications}
                        </span>
                      )}
                    </button>
                    {showNotifications && (
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10 border">
                        <div className="flex items-center justify-between p-4 border-b">
                          <h3 className="font-medium">Notifications</h3>
                          {notificationsList.length > 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                clearAllNotifications()
                              }}
                              className="text-xs text-teal-600 hover:text-teal-800"
                            >
                              Clear all
                            </button>
                          )}
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          {notificationsList.length > 0 ? (
                            notificationsList.map((notification) => (
                              <div key={notification.id} className="p-4 border-b hover:bg-gray-50">
                                <div className="flex justify-between">
                                  <p className="text-sm">{notification.message}</p>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      markNotificationAsRead(notification.id)
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                              </div>
                            ))
                          ) : (
                            <div className="p-4 text-center text-gray-500">No notifications</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </header>

              {/* Page content */}
              <main className="flex-1 p-6 bg-gray-50">{children}</main>
            </div>
          </div>
        </AppContext.Provider>
      </body>
    </html>
  )
}
