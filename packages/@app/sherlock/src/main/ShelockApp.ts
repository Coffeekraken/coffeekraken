import { ISherlockSpace } from '../shared/SherlockTypes.js'
import __SherlockContentfulAdapter from './adapters/contentful/SherlockContentfulAdapter.js'
import type { ISherlockAdapter } from './adapters/SherlockAdapter.js'

export default class SherlockApp {
    adapter: ISherlockAdapter

    constructor() {
        // create temporary contentful adapter inline
        this.adapter = new __SherlockContentfulAdapter({
            space: 'yan2xvlohj6d',
            accessToken: 'TNoFUnIbPBHxFd0EUjsWmhPfPdKyf5WQ0PYWJ-iYiCs'
        })
    }

    getSpaces(): Promise<Record<ISherlockSpace>> {
        return new Promise((resolve) => {})
    }
}
