/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
// const CryptoJS = require('crypto-js')
import CryptoJS from 'crypto-js'

class CryptoJSAesJson {
  public static stringify (cipherParams: any): string {
    const j: any = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) }
    if (cipherParams.iv) j.iv = cipherParams.iv.toString()
    if (cipherParams.salt) j.s = cipherParams.salt.toString()

    return JSON.stringify(j).replace(/\s/g, '')
  }

  public static parse (jsonStr: string): any {
    const j: any = JSON.parse(jsonStr)
    const cipherParams: any = CryptoJS.lib.CipherParams.create({ ciphertext: CryptoJS.enc.Base64.parse(j.ct) })

    if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv)
    if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s)

    return cipherParams
  }
}

export const useEncrypt = () => {
  const password = process.env.APP_ENCRYPT_KEY || 'undefined'

  const encrypt = (value: unknown): string | null => {
    return CryptoJS.AES.encrypt(
      JSON.stringify(value),
      password,
      { format: CryptoJSAesJson }
    ).toString() || null
  }

  const decrypt = (jsonStr: string): unknown => {
    return JSON.parse(
      CryptoJS.AES.decrypt(
        jsonStr,
        password,
        { format: CryptoJSAesJson }
      ).toString(CryptoJS.enc.Utf8)) || null
  }

  return {
    encrypt,
    decrypt
  }
}

export default useEncrypt
