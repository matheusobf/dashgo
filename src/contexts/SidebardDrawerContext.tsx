import { UseDisclosureReturn, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect } from "react";

interface SidebarDrawerContextData {
    children: React.ReactNode;
}

type SidebarDrawerContextType = UseDisclosureReturn

const SidebarDrawerContext = createContext({} as SidebarDrawerContextType);

export function SidebarDrawerProvider({ children }: SidebarDrawerContextData) {
    const disclosure = useDisclosure();
    const router = useRouter()

    useEffect(() => {
        disclosure.onClose()
    }, [router.asPath])
    return (
        <SidebarDrawerContext.Provider value={disclosure}>
            {children}
        </SidebarDrawerContext.Provider>
    )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);