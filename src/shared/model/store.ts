import { createStore } from 'effector';

interface RootState {
  someState: string;
}

export const rootStore = createStore<RootState>({
  someState: '',
});