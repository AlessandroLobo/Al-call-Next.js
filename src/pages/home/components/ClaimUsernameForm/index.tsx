import { Button, Text, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormAnnotation } from './styles'
import { useRouter } from 'next/router'

// Define a schema to validate the form data
const ClaimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'The username must have at least 3 letters.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'The username can only contain letters and hyphens.',
    })
    .transform((username) => username.toLowerCase()),
})

// Infer the type of the form data from the schema
type ClaimUsernameFormData = z.infer<typeof ClaimUsernameFormSchema>

export function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(ClaimUsernameFormSchema),
  })

  const router = useRouter()

  // Handle the form submission
  async function handleClaimUsername(data: ClaimUsernameFormData) {
    const { username } = data

    // Redirect to the registration page with the reserved username
    await router.push(`/register?username=${username}`)
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
        <TextInput
          size="sm"
          prefix="alsystem.com/"
          placeholder="seu-usuário"
          {...register('username')}
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Reservar
          <ArrowRight />
        </Button>
      </Form>

      <FormAnnotation>
        <Text size="sm">
          {/* Display an error message if the username is invalid, otherwise display a prompt */}
          {errors.username
            ? errors.username.message
            : 'Enter the desired username'}
        </Text>
      </FormAnnotation>
    </>
  )
}
