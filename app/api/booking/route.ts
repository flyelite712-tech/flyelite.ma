import { NextResponse } from 'next/server'
import { sendBookingEmail } from '@/lib/email'
import airports from '@/data/airports.json'
import type { BookingRequest } from '@/types'

export async function POST(request: Request) {
  try {
    const data: BookingRequest = await request.json()

    // Validation
    if (!data.from || !data.to || !data.contact.email || !data.offerId) {
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
    await sendBookingEmail(data, airports)

    return NextResponse.json({ 
      success: true,
      message: 'Votre réservation a été envoyée avec succès'
    })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
