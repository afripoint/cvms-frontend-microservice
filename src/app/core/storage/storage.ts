
export const StorageKeys = {
    TOKEN_DATA: "tokenDataKey",
    USER_DATA: "userDataKey",
    OTP_DATA: "otpDataKey"
  } as const;
  
  
  export type StorageKey = keyof typeof StorageKeys | string;
  
  
  
  export const appSaveToLocalStorage = <T>(key: StorageKey, value: T): boolean => {
    try {
      localStorage.setItem(
        typeof key === 'string' ? key : StorageKeys[key], 
        JSON.stringify(value)
      );
      return true;
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      return false;
    }
  };
  
  
  export const appGetFromLocalStorage = <T>(key: StorageKey): T | null => {
    try {
      const storageKey = typeof key === 'string' ? key : StorageKeys[key];
      const value = localStorage.getItem(storageKey);
      
      if (!value) return null;
      
      return JSON.parse(value) as T;
    } catch (error) {
      console.error('Failed to retrieve from localStorage:', error);
      return null;
    }
  };
  
  
  export const appRemoveFromLocalStorage = (key: StorageKey): boolean => {
    try {
      const storageKey = typeof key === 'string' ? key : StorageKeys[key];
      localStorage.removeItem(storageKey);
      return true;
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
      return false;
    }
  };
  
  
  export const appClearAllLocalStorage = (preserveKeys: string[] = []): boolean => {
    try {
      if (preserveKeys.length > 0) {
        
        const preserved = preserveKeys.reduce<Record<string, string | null>>((acc, key) => {
          acc[key] = localStorage.getItem(key);
          return acc;
        }, {});
        
        
        localStorage.clear();
        sessionStorage.clear();
        
        
        Object.entries(preserved).forEach(([key, value]) => {
          if (value !== null) {
            localStorage.setItem(key, value);
          }
        });
      } else {
       
        localStorage.clear();
        sessionStorage.clear();
      }
      return true;
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
      return false;
    }
  };
  
  
  export const isLocalStorageAvailable = (): boolean => {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  
  export const getLocalStorageSize = (): number => {
    try {
      let totalSize = 0;
      for (const key in localStorage) {
        if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
          totalSize += (localStorage.getItem(key)?.length || 0) + key.length;
        }
      }
      return totalSize;
    } catch (error) {
      console.error('Failed to calculate localStorage size:', error);
      return 0;
    }
  };