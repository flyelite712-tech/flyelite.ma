import { NextResponse } from 'next/server'
import { sendQuoteEmail } from '@/lib/email'
import airports from '@/data/airports.json'
import type { QuoteRequest } from '@/types'

export async function POST(request: Request) {
  try {
    const data: QuoteRequest = await request.json()

    // Validation
    if (!data.from || !data.to || !data.contact.email || !data.contact.phone) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      )
    }

    if (!data.consent) {
      return NextResponse.json(
        { error: 'Vous devez accepter les termes et conditions' },
        { status: 400 }
      )
    }

    // Envoyer les emails
    await sendQuoteEmail(data, airports)

    return NextResponse.json({ 
      success: true,
      message: 'Votre demande a été envoyée avec succès'
    })
  } catch (error) {
    console.error('Quote error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
