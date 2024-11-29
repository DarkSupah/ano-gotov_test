// API Mock
import Messengers from '~/resources/messengers.json';
import type { Messenger } from "~/entities/messenger";

export const getMessengers = async (): Promise<Messenger[]> => {
    return Messengers as Messenger[];
}
