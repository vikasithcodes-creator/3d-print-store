import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

// Default password: "admin123"
// To change: console.log(await hashPassword("your_new_password"))
const DEFAULT_PASSWORD_HASH = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9';

// Simple SHA-256 hash function
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    // Check sessionStorage on mount
    return sessionStorage.getItem('sm_admin_session') === 'true';
  });

  const [passwordHash, setPasswordHash] = useState(() => {
    // Check if custom password hash is stored
    return localStorage.getItem('sm_admin_password_hash') || DEFAULT_PASSWORD_HASH;
  });

  useEffect(() => {
    // Sync session state to sessionStorage
    if (isAdmin) {
      sessionStorage.setItem('sm_admin_session', 'true');
    } else {
      sessionStorage.removeItem('sm_admin_session');
    }
  }, [isAdmin]);

  const login = async (password) => {
    try {
      const inputHash = await hashPassword(password);
      if (inputHash === passwordHash) {
        setIsAdmin(true);
        return { success: true };
      } else {
        return { success: false, error: 'Incorrect password' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('sm_admin_session');
  };

  const changePassword = async (oldPassword, newPassword) => {
    try {
      const oldHash = await hashPassword(oldPassword);
      if (oldHash !== passwordHash) {
        return { success: false, error: 'Current password incorrect' };
      }

      const newHash = await hashPassword(newPassword);
      localStorage.setItem('sm_admin_password_hash', newHash);
      setPasswordHash(newHash);

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Password change failed' };
    }
  };

  const resetPassword = () => {
    localStorage.removeItem('sm_admin_password_hash');
    setPasswordHash(DEFAULT_PASSWORD_HASH);
    logout();
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        login,
        logout,
        changePassword,
        resetPassword
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
