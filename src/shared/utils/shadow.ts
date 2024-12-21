import { App } from 'vue'

class AppShadow {
  private static instance: App<Element>
  private static $vue: App<Element>

  private constructor () {
    if (AppShadow.instance) {
      throw new Error('Error - use ApiService.getInstance()')
    }
  }

  public static getInstance (): AppShadow {
    AppShadow.instance = AppShadow.instance || new AppShadow()
    return AppShadow.instance
  }

  public static init (vue: App<Element>): void {
    AppShadow.$vue = vue
  }

  public static getVue (): App<Element> {
    return AppShadow.$vue
  }
}

export default AppShadow

export const useShadow = (): App<Element> => {
  return AppShadow.getVue()
}
