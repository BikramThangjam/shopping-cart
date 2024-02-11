import React, { createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Product } from "../model/model";

type ShoppingCartProviderProps = {
    children: React.ReactNode
    products: Product[]
}

type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    cartQuantity: number
    cartItems: CartItem[]
    getItemQuantity : (id:number) => number
    increaseCartQuantity: (id:number) => void
    decreaseCartQuantity: (id:number) => void
    removeFromCart: (id:number) => void

}


const ShoppingCartContext = createContext({} as ShoppingCartContext)


//custom hook
export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}


export function ShoppingCartProvider({children, products}: ShoppingCartProviderProps){
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[])
    
    const cartQuantity = cartItems.reduce((quantity, currentItem)=> currentItem.quantity + quantity, 0)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id:number){
        return cartItems.find(item => item.id === id) ?.quantity || 0
    }

    function increaseCartQuantity(id:number){
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null){
                return [...currItems, {id, quantity: 1}]
            }else{
                return currItems.map(item => {
                    if(item.id === id){
                        return {...item, quantity: item.quantity + 1}
                    }else{
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id:number){
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1){
                return currItems.filter(item => item.id !== id)
            }else{
                return currItems.map(item => {
                    if (item.id === id){
                        return {...item, quantity: item.quantity - 1}
                    }else{
                        return item
                    }
                })
            }
        })
    }

    function removeFromCart(id:number){
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity, 
            increaseCartQuantity, 
            decreaseCartQuantity, 
            removeFromCart,
            cartItems,
            cartQuantity,
            openCart,
            closeCart
            }}
        >
            {children}
            <ShoppingCart isOpen={isOpen} products={products}/>
        </ShoppingCartContext.Provider>
    )
}