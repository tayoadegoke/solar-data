import { useState, createContext, useContext } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next"

import en from '../../../public/locales/en/common.json'
import mk from '../../../public/locales/mk/common.json'


export type Language = 'en' | 'mk'
export type LanguageProps = {
    language: Language
    changeLang?: any
}

const LanguageContext = createContext<LanguageProps>({ language: 'en', changeLang: undefined })
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: {
                translation: en

            },
            mk: {
                translation: mk
            }

        },
        lng: 'en',
        fallbackLng: "en",

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });


export const useLanguage = () => {

    const language = useContext(LanguageContext)

    const changeLanguage = (langProp: Language) => {
        i18n.changeLanguage(langProp)
        language?.changeLang && language.changeLang(langProp)

    }

    return (
        {
            changeLanguage,
            language: language.language
        }
    )
}

export const LanguageProvider = ({ children }: any) => {
    const [language, setLanguage] = useState<Language>('en')


    return (
        <LanguageContext.Provider value={{ language, changeLang: setLanguage }}>
            {children}
        </LanguageContext.Provider>
    )

}