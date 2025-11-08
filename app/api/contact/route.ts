import { NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/email'
import type { ContactRequest } from '@/types'

export async function POST(request: Request) {
  try {
    const data: ContactRequest = await request.json()

    // Validation
    if (!data.firstName || !data.lastName || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      )
    }

    // Envoyer les emails
    await sendContactEmail(data)

    return NextResponse.json({ 
      success: true,
      message: 'Votre message a été envoyé avec succès'
    })
  } catch (error) {
    console.error('Contact error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
