import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useLocation } from "react-router-dom";



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const hideNavbarRoutes = () => {
  const location = useLocation()
  const hideNavbarRoutes = ['/login']
  return hideNavbarRoutes.includes(location.pathname)
}

export const getImage = (moduleName: string, fileName: string) => {
  return (`src/assets/${moduleName}/${fileName}`);
};
