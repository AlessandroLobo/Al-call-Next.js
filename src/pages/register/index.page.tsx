import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react' // Importing UI components from Ignite UI
import { ArrowRight } from 'phosphor-react' // Importing an icon from Phosphor
import { Container, Form, FormError, Header } from './styles' // Importing styled components
import { useForm } from 'react-hook-form' // Importing useForm hook from react-hook-form
import { z } from 'zod' // Importing zod for data validation
import { zodResolver } from '@hookform/resolvers/zod' // Importing zodResolver from hookform resolvers
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'

// Defining the schema for the registration form using zod
const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'Username can only contain letters and hyphens.',
    })
    .transform((username) => username.toLowerCase()),
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema> // Defining the type of the form data using the schema

export default function Register() {
  // Using the useForm hook to handle the form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema), // Using zodResolver to validate the form data
  })

  const router = useRouter()

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  // Function to handle form submission
  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })

      await router.push('/register/connect-calendar')
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
        return
      }
      console.log(err)
    }
  }

  // Rendering the registration form
  return (
    <Container>
      <Header>
        <Heading as="strong">Welcome to Al Call</Heading>{' '}
        {/* Using a Heading component from Ignite UI */}
        <Text>
          Please provide some information to create your profile. You can edit
          this information later.
        </Text>
        <MultiStep size={4} currentStep={1} />{' '}
        {/* Using a MultiStep component from Ignite UI */}
      </Header>

      <Form as="form" onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size="sm">Username</Text>{' '}
          {/* Using a Text component from Ignite UI */}
          <TextInput
            prefix="alsystem.com/"
            placeholder="your-username"
            {...register('username')} // Using the register function to register the username input field
          />
          {errors.username && (
            <FormError size="sm">{errors.username?.message}</FormError> // Displaying an error message if the username input is invalid
          )}
        </label>
        <label>
          <Text size="sm">Full Name</Text>{' '}
          {/* Using a Text component from Ignite UI */}
          <TextInput placeholder="Your name" {...register('name')} />
          the register function to register the name input field
          {errors.name && (
            <FormError size="sm">{errors.name?.message}</FormError> // Displaying an error message if the name input is invalid
          )}
        </label>
        <Button type="submit" disabled={isSubmitting}>
          Next Step
          <ArrowRight /> {/* Using an icon from Phosphor */}
        </Button>
      </Form>
    </Container>
  )
}
