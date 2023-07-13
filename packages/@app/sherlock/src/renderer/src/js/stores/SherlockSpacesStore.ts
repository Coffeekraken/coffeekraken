import __SState from '@coffeekraken/s-state'
import type { ISDobbyTaskMetas } from '@coffeekraken/s-dobby'

import type { ISherlockSpace } from '../../shared/SherlockTypes.js'

export interface ISherlockSpacesStore {
    [key: string]: ISherlockSpace
}

const spacesStore = new __SState({})

// load the spaces
;(async () => {
    const spaces = await window.sherlock.getSpaces()
    Object.assign(spacesStore, spaces)
})()

export function __getSpaces(): Record<string, ISherlockSpace> {
    return spacesStore
}
export function __getSpace(spaceUid: string): ISherlockSpace {
    return spacesStore[spaceUid]
}

export default spacesStore
