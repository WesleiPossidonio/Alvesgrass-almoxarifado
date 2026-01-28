import { type ReactNode } from 'react'
import { UserContextProvider } from './UserContext'
import { ProductContextProvider } from './ProductContext'


interface AppProviderProps {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <UserContextProvider>
      <ProductContextProvider>
        {children}
      </ProductContextProvider>
    </UserContextProvider>
  )
}