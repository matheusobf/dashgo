import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex align="center">
            {showProfileData && (
                <Box mr="4" textAlign="right">
                    <Text>Matheus Santos</Text>
                    <Text color="gray.300" fontSize="small">mat982005@gmail.com</Text>
                </Box>
            )}
            <Avatar size="md" name="Matheus Santos" src="https://github.com/matheusobf.png" />
        </Flex>
    )
}