import { useState, useCallback, useEffect } from "react";

interface CookieOptions {
  expires?: Date | number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  httpOnly?: boolean;
}

interface UseCookieReturn {
  value: string | null;
  setCookie: (value: string, options?: CookieOptions) => void;
  removeCookie: () => void;
  updateCookie: (value: string, options?: CookieOptions) => void;
}

/**
 * Custom hook for managing cookies
 * @param name - The name of the cookie
 * @param defaultValue - Default value if cookie doesn't exist
 * @returns Object with cookie value and methods to manage it
 */
export function useCookie(
  name: string,
  defaultValue: string | null = null
): UseCookieReturn {
  const [value, setValue] = useState<string | null>(() => {
    if (typeof window === "undefined") return defaultValue;
    return getCookie(name) ?? defaultValue;
  });

  // Update state when cookie changes externally
  useEffect(() => {
    const checkCookie = () => {
      const currentValue = getCookie(name);
      if (currentValue !== value) {
        setValue(currentValue);
      }
    };

    // Check cookie on mount and when window gains focus
    checkCookie();
    window.addEventListener("focus", checkCookie);

    return () => {
      window.removeEventListener("focus", checkCookie);
    };
  }, [name, value]);

  const setCookie = useCallback(
    (cookieValue: string, options: CookieOptions = {}) => {
      const {
        expires,
        path = "/",
        domain,
        secure = false,
        sameSite = "lax",
        httpOnly = false,
      } = options;

      let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(
        cookieValue
      )}`;

      if (expires) {
        const expiryDate =
          expires instanceof Date ? expires : new Date(expires);
        cookieString += `; expires=${expiryDate.toUTCString()}`;
      }

      if (path) cookieString += `; path=${path}`;
      if (domain) cookieString += `; domain=${domain}`;
      if (secure) cookieString += "; secure";
      if (sameSite) cookieString += `; samesite=${sameSite}`;
      if (httpOnly) cookieString += "; httpOnly";

      document.cookie = cookieString;
      setValue(cookieValue);
    },
    [name]
  );

  const removeCookie = useCallback(() => {
    document.cookie = `${encodeURIComponent(
      name
    )}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    setValue(null);
  }, [name]);

  const updateCookie = useCallback(
    (cookieValue: string, options: CookieOptions = {}) => {
      setCookie(cookieValue, options);
    },
    [setCookie]
  );

  return {
    value,
    setCookie,
    removeCookie,
    updateCookie,
  };
}

/**
 * Get a cookie value by name
 * @param name - The name of the cookie
 * @returns The cookie value or null if not found
 */
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const nameEQ = `${encodeURIComponent(name)}=`;
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }

  return null;
}

/**
 * Get all cookies as an object
 * @returns Object with all cookies
 */
export function getAllCookies(): Record<string, string> {
  if (typeof document === "undefined") return {};

  const cookies: Record<string, string> = {};
  const cookieArray = document.cookie.split(";");

  for (let cookie of cookieArray) {
    cookie = cookie.trim();
    const [name, value] = cookie.split("=");
    if (name && value) {
      cookies[decodeURIComponent(name)] = decodeURIComponent(value);
    }
  }

  return cookies;
}

/**
 * Remove a cookie by name
 * @param name - The name of the cookie to remove
 * @param path - The path of the cookie (defaults to '/')
 */
export function removeCookie(name: string, path: string = "/"): void {
  if (typeof document === "undefined") return;

  document.cookie = `${encodeURIComponent(
    name
  )}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
}

/**
 * Set a cookie with options
 * @param name - The name of the cookie
 * @param value - The value of the cookie
 * @param options - Cookie options
 */
export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  const {
    expires,
    path = "/",
    domain,
    secure = false,
    sameSite = "lax",
    httpOnly = false,
  } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (expires) {
    const expiryDate = expires instanceof Date ? expires : new Date(expires);
    cookieString += `; expires=${expiryDate.toUTCString()}`;
  }

  if (path) cookieString += `; path=${path}`;
  if (domain) cookieString += `; domain=${domain}`;
  if (secure) cookieString += "; secure";
  if (sameSite) cookieString += `; samesite=${sameSite}`;
  if (httpOnly) cookieString += "; httpOnly";

  document.cookie = cookieString;
}
