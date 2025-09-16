import { create } from 'zustand'
import { combine } from 'zustand/middleware'

import type { CartItem, CartType } from '@/types'

type State = {
    carts: CartType[];  
}

const initialState: State = {
    carts: []
} 

const useCartStore = create((set) => ({
    ...initialState,
    addToCart: () => {},
}))