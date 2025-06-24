// src/context/AlertContext.jsx
import React, { createContext, useState, useEffect } from 'react'

export const AlertContext = createContext()

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({ visible: false, message: '' })

  const showAlert = message => setAlert({ visible: true, message })

  useEffect(() => {
    if (!alert.visible) return
    const timer = setTimeout(() => setAlert(v => ({ ...v, visible: false })), 2000)
    return () => clearTimeout(timer)
  }, [alert.visible])

  return (
    <AlertContext.Provider value={showAlert}>
      {alert.visible && (
        <div className="alert alert-warning" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
          {alert.message}
        </div>
      )}
      {children}
    </AlertContext.Provider>
  )
}
