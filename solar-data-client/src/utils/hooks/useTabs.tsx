import { useState, createContext, useContext } from "react";

type TabContextProps = {
    tab: string,
    setTab: any
}
const TabContext = createContext<TabContextProps>({ tab: '', setTab: () => '' })

export function useTabs<T>() {

    const tab = useContext(TabContext)

    const changeTab = (tabProp: T) => {
        tab.setTab(tabProp)

    }

    return (
        {
            changeTab,
            activeTab: tab.tab
        } as {
            changeTab: (tabProp: T) => void,
            activeTab: T
        }
    )
}

export function TabProvider({ children }: any) {
    const [tab, setTab] = useState<string>('')


    return (
        <TabContext.Provider value={{ setTab, tab }}>
            {children}
        </TabContext.Provider>
    )

}