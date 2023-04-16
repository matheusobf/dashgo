import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { Profile } from './Profile'
import { NotificationsNav } from './NotificationsNav'
import { SearchBox } from './SearchBox'
import { Logo } from './Logo'
import { useSidebarDrawer } from '../../contexts/SidebardDrawerContext'
import { RiMenuLine } from 'react-icons/ri'
export function Header() {
    const { onOpen } = useSidebarDrawer()
    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })
    return (
        <Flex as="header" w="100%" maxWidth={1480} h="20" mx="auto" mt="4" px="6" align="center">
            { !isWideVersion && (
                <IconButton icon={<Icon as={RiMenuLine} />} fontSize="24" variant="unstyled" onClick={onOpen} aria-label="Open navigation" mr="2"/>
            )}
            <Logo/>
            { isWideVersion && <SearchBox/>}
            <Flex alignItems="center" ml="auto">
                <NotificationsNav/>
                <Profile showProfileData={isWideVersion}/>
            </Flex>
        </Flex>
    )
}