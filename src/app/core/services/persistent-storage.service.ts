import { Injectable } from '@angular/core';
import { LocalStorageRefService } from './local-storage-ref.service';

@Injectable({
  providedIn: 'root'
})
export class PersistentStorageService {

  private localStorage: Storage;
  constructor(private localStorageRefService: LocalStorageRefService ) {
    this.localStorage = this.localStorageRefService.localStorage;
  }
  async getItemAsync(key: string) {
    let data = null;
    data = await this.getItem(key).catch(e => console.error(`(PersistentStorageService) getItemAsync ${e}`))
    if (data) { console.log(`(PersistentStorageService) successfully getItem ${key}`) }
    return data
  }
  async setItemAsync(key: string, value: string) {
    await this.setItem(key, value).catch(e => console.error(`(PersistentStorageService) setItemAsync ${e}`))
    console.log(`(PersistentStorageService) successfully setItem ${key}`)
    console.log(`(PersistentStorageService) saved to persistent storage`)
  }
  async removeItemAsync(key: string) {
    await this.removeItem(key).catch(e => console.error(`(PersistentStorageService) removeItemAsync ${e}`))
    console.log(`(PersistentStorageService) successfully removeItem ${key}`)
  }
  async clearAsync() {
    await this.clear().catch(e => console.error(`(PersistentStorageService) clearAsync ${e}`))
    console.log(`(PersistentStorageService) successfully clear`)
  }
  private getItem(key: string) {
    return new Promise(resolve => {
      setTimeout(() => {
        const value = this.localStorage.getItem(key) as string | null;
        resolve(value)
      // }, 1000)
      }, 0)
    })
  }
  private setItem(key: string, value: string) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.localStorage.setItem(key, value)
        resolve(undefined)
      // }, 1000)
      }, 0)
    })
  }
  private removeItem(key: string) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.localStorage.removeItem(key)
        resolve(undefined)
      }, 1000)
    })
  }
  private clear() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.localStorage.clear()
        resolve(undefined)
      }, 1000)
    })
  }
}
