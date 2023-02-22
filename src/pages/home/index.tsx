import { Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'
import { Container, Hero, Preview } from './styles'

import previewImage from '../../../public/image/image 1.png'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'

export default function Home() {
  return (
    // The commented lines below were removed, probably temporarily, for some reason
    // but there's no harm in leaving them there as a reference for future work or to other developers
    // who may need to understand what was there before.
    // <>
    //   <NextSeo
    //     title="Descomplique sua agenda | Ignite Call"
    //     description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
    //   />
    // >

    // The main container for this page component
    <Container>
      {/* The hero section with a main heading, a subheading and a form */}
      <Hero>
        <Heading as="h1" size="4xl">
          Agendamento descomplicado
        </Heading>
        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>

        {/* A form component to claim a username */}
        <ClaimUsernameForm />
      </Hero>

      {/* A preview section with an image */}
      <Preview>
        <Image
          src={previewImage}
          height={400}
          quality={100}
          priority
          alt="Calendário simbolizando aplicação em funcionamento"
        />
      </Preview>
    </Container>
    // The commented lines below were removed, probably temporarily, for some reason
    // but there's no harm in leaving them there as a reference for future work or to other developers
    // who may need to understand what was there before.
    // </>
  )
}
