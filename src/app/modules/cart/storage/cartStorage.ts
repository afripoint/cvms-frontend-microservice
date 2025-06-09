// cartStorage.ts

interface CartItem {
  id: string
  name: string
  quantity: number
  price: number
  type: string
  vin?: string
}

interface CartState {
  items: CartItem[]
  totalPrice: number
  promoCode: string | null
  discount: number
  isLoading: boolean
  error: string | null
  removingVin: string | null // Track which VIN is being removed
}
const CART_STORAGE_KEY = 'cartState';

export const saveCartToLocalStorage = (state: CartState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(CART_STORAGE_KEY, serializedState);
  } catch (e) {
    console.warn("Could not save cart to localStorage", e);
  }
};

export const loadCartFromLocalStorage = (): CartState | undefined => {
  try {
    const serializedState = localStorage.getItem(CART_STORAGE_KEY);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load cart from localStorage", e);
    return undefined;
  }
};