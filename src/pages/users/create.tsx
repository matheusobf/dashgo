import { Input } from "@/components/Form/Input";
import { Header } from "@/components/Header";
import { Sidebard } from "@/components/Sidebar";
import { Box, Flex, Heading, Divider, VStack, SimpleGrid, HStack, Button } from "@chakra-ui/react";
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { useMutation } from "react-query";
import { api } from "@/services/api";
import { queryClient } from "@/services/queryClient";
import { useRouter } from "next/router";

type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }
  
  const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([
        null, yup.ref('password')
    ], 'As senhas precisam ser iguais'),
  })
  

export default function CreateUser() {
    const router = useRouter()
    const createUser = useMutation(async (user: CreateUserFormData) => {
        const response = await api.post('users', {
            user: {
                ...user,
                created_at: new Date(),
            }
        })
        return response.data.user
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('users')
        }
    })
    const { register, handleSubmit, formState, errors } = useForm({
        resolver: yupResolver(createUserFormSchema)
    })
    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
       await createUser.mutateAsync(values)
       router.push('/users')
    }
    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebard />
                <Box as="form" onSubmit={handleSubmit(handleCreateUser)} flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}>
                    <Heading size="lg" fontWeight="normal">Criar Usuário</Heading>
                    <Divider my="6" borderColor="gray.700" />
                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input name="name" label="Nome Completo" ref={register} error={errors.name}/>
                            <Input name="email" label="E-mail" ref={register} error={errors.email}/>
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input name="password" label="Senha" ref={register} error={errors.password}/>
                            <Input name="password_confirmation" label="Confirmação da senha" ref={register} error={errors.password_confirmation}/>
                        </SimpleGrid>
                    </VStack>
                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/users" passHref><Button colorScheme="whiteAlpha">Cancelar</Button></Link>
                            <Button type="submit" isLoading={formState.isSubmitting} colorScheme="pink">Salvar</Button>
                        </HStack>

                    </Flex>

                </Box>
            </Flex>
        </Box>
    )
}