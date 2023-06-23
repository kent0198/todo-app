import { atom } from "recoil";

export const colorPrimaryState = atom<string>({
    key: 'colorPrimaryState',
    default: '#222222'
})

export const isModalAboutShowState = atom<boolean>({
    key: 'isModalAboutShowState',
    default: false
})